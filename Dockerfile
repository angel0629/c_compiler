# 步驟 1：使用 Node.js 的映像作為基礎映像
FROM node:18-slim

# 步驟 2：設置容器中的工作目錄
WORKDIR /app

# 步驟 3：安裝 GCC 編譯器和相關工具
RUN apt-get update && apt-get install -y gcc make

# 步驟 4：將 package.json 和 package-lock.json 文件複製到工作目錄中
COPY package.json package-lock.json ./

# 步驟 5：安裝 Node.js 依賴
RUN npm install

# 步驟 6：將應用程式檔案複製到容器中
COPY . .

# 步驟 7：暴露應用程式使用的端口（如果需要）
EXPOSE 3000

# 步驟 8：定義執行應用程式的命令
CMD ["node", "server.js"]
