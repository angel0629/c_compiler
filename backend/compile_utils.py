import subprocess
import tempfile
import os

def compile_code(code):
    # 將程式碼寫入暫存檔
    with tempfile.NamedTemporaryFile(suffix=".c", delete=False) as temp:
        temp.write(code.encode("utf-8"))
        temp.flush()
        source_path = temp.name

    # 定義編譯後的執行檔路徑
    output_path = source_path + ".out"
    compile_command = ["C:\\MinGW\\bin\\gcc", source_path, "-o", output_path]
    
    try:
        # 執行編譯命令
        result = subprocess.run(compile_command, capture_output=True, text=True)
        if result.returncode != 0:
            # 編譯失敗，回傳錯誤訊息
            return {"error": result.stderr, "output_file": None}
        
        # 編譯成功，回傳編譯後的檔案路徑
        return {"error": None, "output_file": output_path}
    except Exception as e:
        return {"error": str(e), "output_file": None}
    finally:
        # 清除暫存的原始碼檔案
        if os.path.exists(source_path):
            os.remove(source_path)

def run_code(output_file):
    # 執行編譯後的程式
    try:
        return subprocess.Popen(
            [output_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )
    except Exception as e:
        return {"error": str(e)}
