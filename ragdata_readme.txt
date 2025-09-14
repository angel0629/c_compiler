新增索引資料範例
# 抓 Microsoft Learn
docker compose run --rm rag-indexer node static/crawl_mslearn.mjs
# 抓 LLVM/Clang
docker compose run --rm rag-indexer node static/crawl_llvm.mjs


docker compose run --rm `
  --env QDRANT_URL=http://qdrant:6333 `
  rag-indexer node static/indexer.mjs



# 最後一步 寫入向量到 Qdrant
docker compose run --rm rag-indexer node static/indexer.mjs

docker compose up -d
