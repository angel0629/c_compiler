from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# 載入 .env 檔
load_dotenv()

# 從環境變數取得 OpenAI 金鑰
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app)

@app.route('/gpt', methods=['POST'])
def chat():
    try:
        user_input = request.json.get("message", "")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是一位專業 C 語言助教"},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response.choices[0].message.content
        

        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": f"錯誤: {str(e)}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
