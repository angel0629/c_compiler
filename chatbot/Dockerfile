# 使用輕量級 Python 基礎映像
FROM python:3.10-slim

# 設定工作目錄
WORKDIR /chatbot

# 安裝必要工具（可選，用於除錯或 curl 測試）
RUN apt-get update && apt-get install -y curl && apt-get clean

# 複製 requirements.txt 並安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製所有程式碼到容器中
COPY . .

# 啟用 .env 支援（由 Python 使用 dotenv 載入）
ENV PYTHONUNBUFFERED=1

# 開放 Flask 使用的預設埠口
EXPOSE 5000

# 啟動 Flask API（可改成 gunicorn 若需正式部署）
CMD ["python", "gpt_api.py"]
