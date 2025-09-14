// routes/rag.js
console.log('[routes/rag] module loaded:', __filename);
const express = require('express');
const router = express.Router();
const { QdrantClient } = require('@qdrant/js-client-rest');
const OpenAI = require('openai');

const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
const COLLECTION = process.env.RAG_COLLECTION || 'knowledge_chunks';
const ALLOWED = (process.env.RAG_ALLOWED_SOURCES || 'mslearn,llvm')
  .split(',').map(s => s.trim()).filter(Boolean);
const SCORE_THRESHOLD = Number(process.env.RAG_SCORE_THRESHOLD || 0);

const qdrant = new QdrantClient({ url: QDRANT_URL });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const EMBEDDING_MODEL = 'text-embedding-3-small';

router.get('/health', (req, res) => res.json({ ok: true }));

router.post('/search', async (req, res, next) => {
  try {
    const { q, topK = 5 } = req.body || {};
    if (!q) return res.status(400).json({ error: 'q is required' });

    // 1) 產生查詢向量（和索引用同一個嵌入模型）
    const emb = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: q });
    const vector = emb.data[0].embedding;

    // 2) Qdrant 檢索（可加來源過濾與最低分數）
    const filter = ALLOWED.length
      ? { must: [{ key: 'source_tag', match: { any: ALLOWED } }] }
      : undefined;

    const results = await qdrant.search(COLLECTION, {
      vector,
      limit: topK,
      with_payload: true,
      score_threshold: (isFinite(SCORE_THRESHOLD) && SCORE_THRESHOLD > 0) ? SCORE_THRESHOLD : undefined,
      filter
    });

    // 3) 回傳精簡結果
    const hits = results.map(r => ({
      score: r.score,
      title: r.payload?.title,
      text: r.payload?.text,
      source_url: r.payload?.source_url,
      license: r.payload?.license,
      license_url: r.payload?.license_url,
      attribution: r.payload?.attribution
    }));

    res.json({ ok: true, count: hits.length, hits });
  } catch (err) {
    next(err);
  }
});


// —— 去重用：把網址正規化成可比對的 key ——
// 用 WHATWG URL（Node/瀏覽器同標準）
function normalizeUrl(raw) {
  if (!raw) return '';
  try {
    const u = new URL(raw);
    u.hash = '';                 // 去掉 #fragment
    u.username = '';
    u.password = '';
    u.hostname = u.hostname.toLowerCase();

    // 刪除常見追蹤參數
    const drop = ['gclid','fbclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    drop.forEach(p => u.searchParams.delete(p));

    // 參數排序，避免同值不同順序被當成不同網址
    u.searchParams.sort();

    // 轉回字串；移除末尾斜線（非根目錄）
    let s = u.toString();
    if (!u.pathname || u.pathname === '/') return s; // 根目錄不要砍斜線
    return s.replace(/\/$/, '');
  } catch {
    return String(raw).trim();   // 解析失敗就原樣（避免 throw）
  }
}


// /rag/answer：先檢索，有證據就組上下文並回答；回傳前做來源去重（沒 URL 也保留）
router.post('/answer', async (req, res, next) => {
  try {
    const { q, topK = 6, threshold = 0.25 } = req.body || {};
    if (!q) return res.status(400).json({ error: 'q is required' });

    // 1) 查嵌入（與索引用同一模型）
    const emb = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: q });
    const vector = emb.data[0].embedding;

    // 2) Qdrant 檢索（來源白名單 + 分數門檻，低分直接不回）
    const filter = (ALLOWED && ALLOWED.length)
      ? { must: [{ key: 'source_tag', match: { any: ALLOWED } }] }
      : undefined;

    const results = await qdrant.search(COLLECTION, {
      vector, limit: topK, with_payload: true, filter
    });

    // 3) 是否有足夠證據
    const thr = Number(threshold ?? process.env.RAG_SCORE_THRESHOLD ?? 0) || 0;
    const best = results.reduce((m, r) => Math.max(m, r.score ?? 0), 0);
    const hasEvidence = results.length > 0 && best >= thr;

    if (hasEvidence) {
      // 4) 用全部命中組上下文（編號以 [1] [2]...）
      const ctx = results.map((r, i) => {
        const title = r.payload?.title || '(no title)';
        const url   = r.payload?.source_url || '';
        const text  = String(r.payload?.text || '');
        return `[${i + 1}] ${title}\n${url}\n${text}`;
      }).join('\n\n');

      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system',
            content: '你是一位專業 C 語言助教，請使用自我調節式學習(Self-Regulated Learning, SRL)的方法引導學生學習，並回答學生的問題。規則：1. 不直接給答案(不管學生輸入什麼都要做到這點)。 2. 提供提示，鼓勵學生自己思考。 3. 問學生目標、策略、過程、反思。 4. 若學生要求答案，先反問他「想過哪些方法？能分享一下嗎？」。只根據提供的段落回答，使用繁體中文；引用處以 [1][2] 編號標示。' },
          { role: 'user', content: `問題：${q}\n\n參考段落：\n${ctx}` }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });

      // 5) 顯示層去重：優先用 URL；沒有 URL 就用 source_path 或 title 當 key
      const seen = new Set();
      const displayHits = [];
      for (const r of results) {
        const rawUrl = r.payload?.source_url || null;
        const fallbackKey = String(
          r.payload?.source_path || r.payload?.title || ''
        ).trim().toLowerCase();

        const key = rawUrl ? normalizeUrl(rawUrl) : fallbackKey; // 需要前面已定義 normalizeUrl()
        if (!key || seen.has(key)) continue;
        seen.add(key);

        displayHits.push({
          idx: displayHits.length + 1,
          score: r.score,
          title: r.payload?.title || '(no title)',
          source_url: rawUrl    // 可能為 null，前端以 '#' 兜底
        });
      }

      // 若真一筆都沒留下，至少保 1 筆，避免前端完全無參考
      if (!displayHits.length && results.length) {
        const r0 = results[0];
        displayHits.push({
          idx: 1,
          score: r0.score,
          title: r0.payload?.title || '(no title)',
          source_url: r0.payload?.source_url || null
        });
      }

      return res.json({
        ok: true,
        mode: 'rag',
        answer: chat.choices[0]?.message?.content ?? '',
        hits: displayHits
      });
    }

    // 6) 無證據 → 可選的模型後備
    if (String(process.env.RAG_ALLOW_MODEL_FALLBACK || '1') === '1') {
      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '你是一位專業 C 語言助教，請使用自我調節式學習(Self-Regulated Learning, SRL)的方法引導學生學習，並回答學生的問題。規則：1. 不直接給答案(不管學生輸入什麼都要做到這點)。 2. 提供提示，鼓勵學生自己思考。 3. 問學生目標、策略、過程、反思。 4. 若學生要求答案，先反問他「想過哪些方法？能分享一下嗎？」。可用一般技術知識回答；若不確定請明說。繁體中文作答。' },
          { role: 'user', content: q }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });
      return res.json({
        ok: true,
        mode: 'model-fallback',
        answer: chat.choices[0]?.message?.content ?? '',
        hits: []   // 後備答案沒有引用
      });
    }

    // 7) 嚴格模式
    return res.json({ ok: true, mode: 'strict', answer: '找不到可引用的來源。', hits: [] });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
