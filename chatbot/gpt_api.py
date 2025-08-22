from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os, json, re, time, hashlib

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

# AI 自動偵測
@app.route('/ai-detect', methods=['POST'])
def ai_detect():
    try:
        data = request.json or {}
        code = (data.get("code") or "")[:8000]
        lang = (data.get("lang") or "c").lower()
        local_findings = data.get("local_findings") or []

        if not code.strip():
            return jsonify({"ok": False, "error": "no code"}), 400

        summary = "\n".join(
            f"- {f.get('message','')}" for f in local_findings[:5]
        )

        SCHEMA = {
          "type": "object",
          "properties": {
            "kind": {"type":"string"},
            "root_cause": {"type":"string"},
            "suggested_fixes": {"type":"array","items":{"type":"string"}},
            "next_action_cmd": {"type":"string"},
            "confidence": {"type":"number", "minimum":0, "maximum":1}
          },
          "required": ["kind","root_cause","suggested_fixes","confidence"],
          "additionalProperties": False
        }

        prompt = (
            "你是極度精簡且專業的 C 語言程式審核助手。"
            "會給你一串 C 語言程式碼，幫我分析此程式碼是否有問題。"
            "用繁體中文回答。"
            "格式請用：1.問題種類：[種類] \n 2.問題行數範圍：[第?行到第?行] \n3.問題原因：[原因] \n4.建議修改方式：[用引導的，不要直接給要改什麼]  \n5.信心指數：[0~1之間的數字，代表你對此判斷的信心，並用 % 數表示]"
            f"\n[Language]\n{lang}"
            f"\n[LocalFindings]\n{summary or '(none)'}"
            "\n[Code]\n"
        )

        # 用和 /gpt 一樣的呼叫方式
        resp = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": prompt},
                      {"role": "user", "content": code}],
            max_tokens=300,
            temperature=0
        )
        ai_json_text = resp.choices[0].message.content
        print("正確回傳："+ai_json_text)

        return jsonify({"ok": True, "ai": ai_json_text, "local": local_findings})
    except Exception as e:
        print("❌ ai-detect 錯誤：", str(e))
        return jsonify({"ok": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)