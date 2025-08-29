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

    // 2) 組 Qdrant 檢索參數（可加來源過濾與最低分數）
    const filter = ALLOWED.length ? { must: [{ key: 'source_tag', match: { any: ALLOWED } }] } : undefined;

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

module.exports = router;

// /rag/answer：先檢索，有證據就用引用；無證據則（可選）後備到模型常識
router.post('/answer', async (req, res, next) => {
  try {
    const { q, topK = 6, threshold = 0.25 } = req.body || {};
    if (!q) return res.status(400).json({ error: 'q is required' });

    // 1) 查嵌入
    const emb = await openai.embeddings.create({ model: 'text-embedding-3-small', input: q });
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
      const ctx = results.map((r, i) =>
        `[${i+1}] ${r.payload?.title||'(no title)'}\n${r.payload?.source_url||''}\n${r.payload?.text||''}`
      ).join('\n\n');

      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '只根據提供段落回答，繁中；用到的句子後標 [1][2] 出處編號。' },
          { role: 'user', content: `問題：${q}\n\n參考段落：\n${ctx}` }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });

      return res.json({
        ok: true, mode: 'rag',
        answer: chat.choices[0]?.message?.content ?? '',
        hits: results.map((r,i)=>({ idx:i+1, score:r.score, title:r.payload?.title, source_url:r.payload?.source_url }))
      });
    }

    if (String(process.env.RAG_ALLOW_MODEL_FALLBACK) === '1') {
      const chat = await openai.chat.completions.create({
        model: process.env.RAG_FALLBACK_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '可用一般技術知識回答；若不確定請明說。繁中。' },
          { role: 'user', content: q }
        ],
        temperature: Number(process.env.RAG_FALLBACK_TEMP ?? 0.3)
      });
      return res.json({ ok:true, mode:'model-fallback', answer: chat.choices[0]?.message?.content ?? '', hits: [] });
    }

    return res.json({ ok:true, mode:'strict', answer:'找不到可引用的來源。', hits:[] });
  } catch (e) { next(e); }
});
