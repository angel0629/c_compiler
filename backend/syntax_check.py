import subprocess
import tempfile
import os

def check_syntax(code):
    with tempfile.NamedTemporaryFile(suffix=".c", delete=False) as temp:
        temp.write(code.encode("utf-8"))
        temp.flush()
        source_path = temp.name

    command = ["clang", "-fsyntax-only", source_path]
    result = subprocess.run(command, capture_output=True, text=True)
    errors = result.stderr.splitlines() if result.stderr else []
    os.remove(source_path)
    return errors
