import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';
import OpenAI from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v5 as uuidv5 } from 'uuid';

// ---- Tokenizer（cl100k_base）: 用於 text-embedding-3-* ----
import { Tiktoken } from 'js-tiktoken/lite';
import cl100k_base from 'js-tiktoken/ranks/cl100k_base';
const enc = new Tiktoken(cl100k_base);

// ---- 路徑工具 ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- 環境變數 / 參數 ----
const QDRANT_URL     = process.env.QDRANT_URL || 'http://localhost:6333';
const COLLECTION     = process.env.RAG_COLLECTION || 'knowledge_chunks';

// 建議一塊 400 tokens、重疊 50；你也能從 .env 覆寫
const CHUNK_TOKENS   = Number(process.env.CHUNK_TOKENS || 400);
const CHUNK_OVERLAP  = Number(process.env.CHUNK_OVERLAP || 50);

// 單筆 embeddings 輸入上限（模型上限 8192，留安全邊界）
const MAX_IN_TOKENS  = 8000;

// 批次大小（一次送多少段做 embedding）
const EMBED_BATCH    = Number(process.env.EMBED_BATCH || 128);

// OpenAI embeddings：text-embedding-3-small（1536 維）
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIM   = 1536;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const qdrant = new QdrantClient({ url: QDRANT_URL });

// ---- Qdrant：確認/建立 collection（Cosine）----
async function ensureCollection(dim = EMBEDDING_DIM) {
  try {
    await qdrant.getCollection(COLLECTION);
  } catch {
    await qdrant.createCollection(COLLECTION, {
      vectors: { size: dim, distance: 'Cosine' },
    });
  }
}

// ---- 以 token 為單位切塊 ----
function chunkByTokens(text, size = CHUNK_TOKENS, overlap = CHUNK_OVERLAP) {
  const ids = enc.encode(text);
  const step = Math.max(1, size - overlap);
  const chunks = [];
  for (let i = 0; i < ids.length; i += step) {
    const slice = ids.slice(i, Math.min(i + size, ids.length));
    chunks.push(enc.decode(slice));
    if (i + size >= ids.length) break;
  }
  return chunks;
}

// ---- 單段安全截斷到 MAX_IN_TOKENS（避免 400 上限錯誤）----
function safeTruncate(text) {
  const ids = enc.encode(text);
  if (ids.length <= MAX_IN_TOKENS) return text;
  return enc.decode(ids.slice(0, MAX_IN_TOKENS));
}

// ---- 批次嵌入（自動切批與安全截斷）----
async function embedBatch(texts) {
  if (!texts.length) return [];
  const out = [];
  let batch = [];

  for (const t of texts) {
    batch.push(safeTruncate(t));
    if (batch.length >= EMBED_BATCH) {
      const resp = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: batch });
      out.push(...resp.data.map(d => d.embedding));
      batch = [];
    }
  }
  if (batch.length) {
    const resp = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: batch });
    out.push(...resp.data.map(d => d.embedding));
  }
  return out;
}

// ---- 穩定 UUID（同檔重跑可覆寫）----
function stableId(filePath, idx) {
  return uuidv5(`${filePath}#${idx}`, uuidv5.DNS);
}

// ---- 索引單一檔案 ----
async function indexOneFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw); // 讀 front-matter 與正文
  const title = (data.title || path.basename(filePath)).toString();

  const chunks = chunkByTokens(content);
  if (!chunks.length) return 0;

  const vectors = await embedBatch(chunks);

  const points = vectors.map((vec, i) => ({
    id: stableId(filePath, i),    // Qdrant 支援 UUID 作為 point id
    vector: vec,
    payload: {
      title,
      text: chunks[i],
      source_path: filePath,
      source_url: data.source || null,
      source_tag: data.source_tag || null,     // 例如 "mslearn" / "llvm"
      license: data.license || null,
      license_url: data.license_url || null,
      attribution: data.attribution || null,
    },
  }));

  await qdrant.upsert(COLLECTION, { points }); // 同 id 會被覆寫（insert+update）
  return points.length;
}

// ---- 入口點 ----
async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY');
  }
  await ensureCollection(EMBEDDING_DIM);

  const pattern = path.join(__dirname, '..', 'knowledge', '**/*.{md,txt}');
  const files = await glob(pattern, { nodir: true });

  let total = 0;
  for (const fp of files) {
    try {
      const n = await indexOneFile(fp);
      total += n;
      console.log(`[indexed] ${fp} → ${n} chunks`);
    } catch (e) {
      console.error(`[error] ${fp}:`, e?.message || e);
    }
  }
  console.log(`✓ 索引完成，共 ${total} 個 chunks`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
