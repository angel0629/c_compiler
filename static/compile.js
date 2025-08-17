let term;

term = new Terminal({ cursorBlink: true });
term = new Terminal({
   cursorBlink: true,
  cols: 70,   // 固定每行 80 個字
  rows: 14,   // 固定顯示 24 行
  // convertEol: true, // 讓 \n 自動換行
  // wraparoundMode: true // 啟用自動換行
});
term.open(document.getElementById('terminal'));

function runCode() {
  term.clear();
  term.reset(); // 確保游標回到左上角
  
  const codeValue = editor.getValue();
  let inputBuffer = ''; // 暫存使用者輸入

  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeValue }),
  }).then(() => {
    const ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onmessage = (event) => {
    let msg = event.data.replace(/\n/g, '\r\n'); // 統一轉成 \r\n
    if (msg.includes("===[程式結束]===")) {
      term.write('\r\n\r\n');  // 換行讓訊息貼底
      term.write(msg);
    } else {
      term.write(msg);
    }
  };

    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket closed');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    // 處理輸入
    term.onData((data) => {
      console.log(JSON.stringify(data));
      if (data === '\r') { // Enter 鍵
        ws.send(inputBuffer+'\n'); // 一次性送到後端
        term.write('\r\n'); // 在 terminal 上換行
        console.log('User input sent:', inputBuffer);
        inputBuffer = ''; // 清空緩衝區
      } else if (data === '\u007F') { // Backspace 鍵
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b'); // 在 terminal 上刪掉字
        }
      } else {
        inputBuffer += data; // 暫存字元  
        term.write(data); // 即時顯示在 terminal
      }
    });
  }).catch(error => console.error('Fetch error:', error));
}



// 語法檢查功能
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
  }, 500); // 延遲 500ms 避免過於頻繁的請求
}

function displaySyntaxResults(result) {
  const problemOutput = document.getElementById('problem_output');
  
  if (result.valid) {
    problemOutput.innerHTML = '<div style="color: green;">✅ 語法檢查通過</div>';
    // 清除編輯器中的錯誤標記
    clearEditorMarkers();
  } else {
    let html = '<div style="color: red;">❌ 發現語法錯誤：</div>';
    
    // 顯示錯誤
    if (result.errors && result.errors.length > 0) {
      html += '<div style="margin-top: 10px;"><strong>錯誤：</strong></div>';
      result.errors.forEach(error => {
        html += `<div style="color: red; margin-left: 10px;">第 ${error.line} 行: ${error.message}</div>`;
      });
    }
    
    // 顯示警告
    if (result.warnings && result.warnings.length > 0) {
      html += '<div style="margin-top: 10px;"><strong>警告：</strong></div>';
      result.warnings.forEach(warning => {
        html += `<div style="color: orange; margin-left: 10px;">第 ${warning.line} 行: ${warning.message}</div>`;
      });
    }
    
    problemOutput.innerHTML = html;
    
    // 在編輯器中標記錯誤
    markErrorsInEditor(result.errors, result.warnings);
  }
}

// 在編輯器中標記錯誤和警告
function markErrorsInEditor(errors, warnings) {
  clearEditorMarkers();
  
  if (!window.editor) return;
  
  // 標記錯誤（紅色波浪線）
  if (errors) {
    errors.forEach(error => {
      const range = new ace.Range(error.line - 1, 0, error.line - 1, 1);
      const marker = window.editor.session.addMarker(range, 'syntax-error', 'text');
      error.marker = marker;
    });
  }
  
  // 標記警告（黃色波浪線）
  if (warnings) {
    warnings.forEach(warning => {
      const range = new ace.Range(warning.line - 1, 0, warning.line - 1, 1);
      const marker = window.editor.session.addMarker(range, 'syntax-warning', 'text');
      warning.marker = marker;
    });
  }
}

// 清除編輯器中的標記
function clearEditorMarkers() {
  if (window.editor) {
    window.editor.session.removeAllMarkers();
  }
}

// 設定編輯器變更監聽
function setupSyntaxChecking() {
  // 等待編輯器初始化完成
  setTimeout(() => {
    if (window.editor) {
      window.editor.getSession().on('change', () => {
        const code = window.editor.getValue();
        if (code.trim()) {
          checkSyntax(code);
        }
      });
    }
  }, 100);
}

window.addEventListener('DOMContentLoaded', () => {
  // 現在確定整個頁面元素都已載入，可以安全使用 document.getElementById
  document.getElementById('runBtn').addEventListener('click', () => {
    const codeValue = editor.getValue();
    
    // 你後續要做的事情，例如 fetch 傳送 codeValue
    term.clear();
    runCode();
  });
  
  // 設定語法檢查
  setupSyntaxChecking();
});


