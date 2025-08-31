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


// /rag/answer：先檢索，有證據就用引用；無證據則（可選）後備到模型常識
router.post('/answer', async (req, res, next) => {
  try {
    const { q, topK = 6, threshold = 0.25 } = req.body || {};
    if (!q) return res.status(400).json({ error: 'q is required' });

    // 1) 查嵌入
    const emb = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: q });
    const vector = emb.data[0].embedding;

    // 2) Qdrant 搜尋（來源過濾 + 分數門檻）
    const filter = (ALLOWED && ALLOWED.length)
      ? { must: [{ key: 'source_tag', match: { any: ALLOWED } }] }
      : undefined;

    const results = await qdrant.search(COLLECTION, {
      vector, limit: topK, with_payload: true, score_threshold: threshold, filter
    });

    const best = results.reduce((m, r) => Math.max(m, r.score ?? 0), 0);
    const hasEvidence = results.length > 0 && best >= threshold;

    if (hasEvidence) {
      // 用「全部命中」組上下文（保留原本答題效果）
      const ctx = results.map((r, i) =>
        `[${i+1}] ${r.payload?.title || '(no title)'}\n${r.payload?.source_url || ''}\n${r.payload?.text || ''}`
      ).join('\n\n');

      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '只根據提供段落回答，使用繁體中文；用到的句子後標 [1][2] 出處編號。' },
          { role: 'user', content: `問題：${q}\n\n參考段落：\n${ctx}` }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });

      // ★ 顯示層去重：同一網址只留一筆（去 #、去追蹤參數、排序參數）
      const seen = new Set();
      const displayHits = [];
      for (const r of results) {
        const rawUrl = r.payload?.source_url || '';
        const key = normalizeUrl(rawUrl);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        displayHits.push({
          idx: displayHits.length + 1,
          score: r.score,
          title: r.payload?.title,
          source_url: rawUrl
        });
      }

      return res.json({
        ok: true,
        mode: 'rag',
        answer: chat.choices[0]?.message?.content ?? '',
        hits: displayHits      // ← 回傳「去重後」清單給前端顯示
      });
    }

    // 沒證據 → 視設定決定是否用模型常識
    if (String(process.env.RAG_ALLOW_MODEL_FALLBACK) === '1') {
      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '可用一般技術知識回答；若不確定請明說。繁體中文作答。' },
          { role: 'user', content: q }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });
      return res.json({
        ok: true,
        mode: 'model-fallback',
        answer: chat.choices[0]?.message?.content ?? '',
        hits: []
      });
    }

    // 嚴格模式
    return res.json({ ok: true, mode: 'strict', answer: '找不到可引用的來源。', hits: [] });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
