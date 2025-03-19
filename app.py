from flask import Flask, request, jsonify, render_template
import os
import uuid
import subprocess
import threading
from flask_socketio import SocketIO, emit
from backend.compile_utils import compile_code
from backend.syntax_check import check_syntax

app = Flask(__name__)
socketio = SocketIO(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

process = None  # 全局變數存放 subprocess


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/compile", methods=["POST"])
def compile_and_run():
    global process
    code = request.json.get("code", "")
    if not code:
        return jsonify({"error": "請輸入程式碼"})

    # 編譯 C 程式
    compile_result = compile_code(code)
    
    if compile_result["error"]:
        return jsonify({"error": compile_result["error"]})

    # 執行 C 程式
    output_file = compile_result["output_file"]
    process = subprocess.Popen(
    output_file, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8"
    )

    def read_output():
        while process.poll() is None:
            output = process.stdout.readline()
            if output:
                # 去掉每行結尾的換行符
                remaining_output = output.rstrip("\n")
                # 發送處理後的輸出
                socketio.emit("terminal_output", {"output": remaining_output})
        # 程式結束時發送剩餘內容
        remaining_output = process.stdout.read()
        if remaining_output:
            # 處理剩餘內容的結尾換行符
            remaining_output = remaining_output.rstrip("\n")
            # 發送處理後的剩餘內容
            socketio.emit("terminal_output", {"output": remaining_output})

    threading.Thread(target=read_output, daemon=True).start()

    return jsonify({"success": "編譯成功，開始執行"})

@socketio.on("terminal_input")
def handle_input(data):
    global process
    if process and process.poll() is None:
        process.stdin.write(data["input"] + "\n")
        process.stdin.flush()

@app.route('/check_syntax', methods=['POST'])
def syntax_check_route():
    code = request.json.get('code')
    errors = check_syntax(code)
    return jsonify({'errors': errors})

if __name__ == '__main__':
    socketio.run(app, debug=True)
