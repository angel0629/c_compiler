from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY 未在 .env 文件中設置")
client = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app)

@app.route('/gpt', methods=['POST'])
def chat():
    try:
        data = request.json
        print("🔥 原始 JSON:", data)

        user_messages = data.get("messages", [])
        if not isinstance(user_messages, list):
            return jsonify({"reply": "格式錯誤：messages 應該是 list"}), 400

        # 驗證每個訊息的格式
        for msg in user_messages:
            if not isinstance(msg, dict) or "role" not in msg or "content" not in msg:
                return jsonify({"reply": "格式錯誤：每個訊息必須包含 role 和 content"}), 400
            if not isinstance(msg["content"], str):
                return jsonify({"reply": "格式錯誤：content 必須是字符串"}), 400
            if msg["role"] not in ["user", "assistant"]:
                return jsonify({"reply": "格式錯誤：role 必須是 'user' 或 'assistant'"}), 400


        response = client.chat.completions.create(
            model="gpt-4o",
            messages=user_messages,
            timeout=10
        )

        reply = response.choices[0].message.content
        print("🧠 GPT 回覆：", reply)

        return jsonify({"reply": reply})
    except Exception as e:
        print("❌ 錯誤：", str(e))
        return jsonify({"reply": "伺服器內部錯誤，請稍後重試"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)