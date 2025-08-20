const term = new Terminal({
  cursorBlink: true,
  cols: 70,
  rows: 14
});
term.open(document.getElementById('terminal'));

let ws = null;              // 目前這次執行用的 WebSocket
let inputDispose = null;    // xterm 的 onData 監聽（可 dispose）
let inputBuffer = '';       // 暫存一行輸入

function cleanupWS() {
  // 關閉舊的鍵盤監聽
  if (inputDispose && typeof inputDispose.dispose === 'function') {
    inputDispose.dispose();
  }
  inputDispose = null;

  // 關閉舊的 WS
  if (ws && ws.readyState === 1) {
    try { ws.close(); } catch (_) {}
  }
  ws = null;

  // 重置輸入緩衝
  inputBuffer = '';
}

// 執行程式（先存檔，再開 WS）
async function runCode() {
  // 每次執行先清乾淨
  cleanupWS();
  term.reset();
  term.clear();

  // 先把目前編輯器內容存到後端（後端會把 main.c 寫到 /app 再複製到 /jobs/xxx）
  const codeValue = editor.getValue();
  try {
    const saveRes = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: codeValue })
    });
    if (!saveRes.ok) throw new Error('save 失敗');
  } catch (err) {
    term.write(`保存程式碼失敗：${err.message}\r\n`);
    return;
  }

  // 建立新的 WS
  ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onopen = () => {
    // 綁一次 onData；下次 runCode() 會先 cleanupWS() 再綁新的
    inputDispose = term.onData((data) => {
      // Enter
      if (data === '\r') {
        ws?.send(inputBuffer + '\n');   // 一次送到後端
        term.write('\r\n');             // 在終端換行
        inputBuffer = '';
        return;
      }
      // Backspace
      if (data === '\u007F') {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b');          // 視覺上退格
        }
        return;
      }
      // 一般字元：回顯 + 累積
      inputBuffer += data;
      term.write(data);
    });
  };

  ws.onmessage = (event) => {
    // 統一把 \n 換成 \r\n（Windows 終端習慣）
    const msg = String(event.data);
    const pretty = msg.replace(/\n/g, '\r\n');

    // 後端會輸出 "===[程式結束 XXX]==="，讓畫面好看一點
    if (msg.includes('===[程式結束')) {
      term.write('\r\n'); // 空行貼底
      term.write(pretty);
    } else {
      term.write(pretty);
    }
  };

  ws.onerror = (err) => {
    term.write(`\r\n[WS ERROR] ${err?.message || ''}\r\n`);
  };

  ws.onclose = () => {
    // 避免殘留監聽
    if (inputDispose && typeof inputDispose.dispose === 'function') {
      inputDispose.dispose();
    }
    inputDispose = null;
  };
}


// =====================
//  語法檢查（保留你的邏輯）
// =====================
let syntaxCheckTimeout;

function checkSyntax(code) {
  clearTimeout(syntaxCheckTimeout);
  syntaxCheckTimeout = setTimeout(async () => {
    try {
      const response = await fetch('/api/check-syntax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const result = await response.json();
      displaySyntaxResults(result);
    } catch (error) {
      console.error('語法檢查錯誤:', error);
    }
  }, 500);
}

function displaySyntaxResults(result) {
  const problemOutput = document.getElementById('problem_output');

  if (result.valid) {
    problemOutput.innerHTML = '<div style="color: green;">✅ 語法檢查通過</div>';
    clearEditorMarkers();
  } else {
    let html = '<div style="color: red;">❌ 發現語法錯誤：</div>';

    if (result.errors && result.errors.length > 0) {
      html += '<div style="margin-top: 10px;"><strong>錯誤：</strong></div>';
      result.errors.forEach(error => {
        html += `<div style="color: red; margin-left: 10px;">第 ${error.line} 行: ${error.message}</div>`;
      });
    }

    if (result.warnings && result.warnings.length > 0) {
      html += '<div style="margin-top: 10px;"><strong>警告：</strong></div>';
      result.warnings.forEach(warning => {
        html += `<div style="color: orange; margin-left: 10px;">第 ${warning.line} 行: ${warning.message}</div>`;
      });
    }

    problemOutput.innerHTML = html;
    markErrorsInEditor(result.errors, result.warnings);
  }
}

function markErrorsInEditor(errors, warnings) {
  clearEditorMarkers();
  if (!window.editor) return;

  // 若你的環境需要 ace.require，請改以下兩行用 require 取 Range 物件
  // const Range = ace.require("ace/range").Range;
  // 你先前是用 new ace.Range()，沿用即可：
  const useRange = (s, e) => new ace.Range(s, 0, s, 1);

  if (errors) {
    errors.forEach(error => {
      const range = useRange(error.line - 1);
      const marker = window.editor.session.addMarker(range, 'syntax-error', 'text');
      error.marker = marker;
    });
  }

  if (warnings) {
    warnings.forEach(warning => {
      const range = useRange(warning.line - 1);
      const marker = window.editor.session.addMarker(range, 'syntax-warning', 'text');
      warning.marker = marker;
    });
  }
}

function clearEditorMarkers() {
  if (window.editor) {
    window.editor.session.removeAllMarkers();
  }
}

function setupSyntaxChecking() {
  setTimeout(() => {
    if (window.editor) {
      window.editor.getSession().on('change', () => {
        const code = window.editor.getValue();
        if (code.trim()) checkSyntax(code);
      });
    }
  }, 100);
}


// =====================
//  DOM 綁定
// =====================
window.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('runBtn');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      term.clear();
      runCode();
    });
  }
  setupSyntaxChecking();
});


// =====================
//  儲存 code（保留）
// =====================
function getQidFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('q_id');
}

function saveCode() {
  const code = editor.getValue();
  const q_id = getQidFromUrl();

  fetch('/api/save-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, q_id })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('程式碼已儲存！');
      } else {
        alert('儲存失敗：' + (data.error || '未知錯誤'));
      }
    })
    .catch(() => alert('儲存失敗，請稍後再試'));
}