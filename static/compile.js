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
        headers: { 'Content-Type': 'application/json', 'Accept-Language': 'zh-TW'},
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
let syntaxMarkers = [];

function clearEditorMarkers() {
  if (!window.editor) return;
  const sess = window.editor.session;
  // 沒有 addMarker 就不需要移除；保留這段也可
  syntaxMarkers.forEach(id => { try { sess.removeMarker(id); } catch (_) {} });
  syntaxMarkers = [];
  sess.setAnnotations([]);  // 清掉舊的 gutter 標記
}
const Range = ace.require('ace/range').Range; // 要先引用 Range

// 取出行號裡的數字並轉 0-based row
function toRow(lineLike) {
  // 把任何格式的行號（"10", "第 10 行", "10:", "line 10"）都抓出數字
  const m = String(lineLike ?? '').match(/\d+/);
  const n = m ? parseInt(m[0], 10) : 1;     // 沒抓到就當第 1 行
  return Math.max(0, n - 1);                 // 轉成 0-based，且不小於 0
}

function markErrorsInEditor(errors = [], warnings = []) {
  clearEditorMarkers();
  if (!window.editor) return;

  const sess = window.editor.session;
  const ann = [];

  const addOne = (item, type, css) => {
    const row = toRow(item.line);            // ✅ 用可靠的行號轉換

    // gutter 顯示（這個決定左邊行號的紅/黃圖示）
    ann.push({ row, column: 0, text: item.message || '', type });

    // 如果你要整行淡色背景，建議用 fullLine（不需要欄位範圍也能對齊）
    const Range = ace.require('ace/range').Range;
    const range = new Range(row, 0, row, Infinity);
    const id = sess.addMarker(range, css, 'fullLine');
    syntaxMarkers.push(id);
  };

  (errors   || []).forEach(e => addOne(e, 'error',   'ace_error_line'));//未成功
  (warnings || []).forEach(w => addOne(w, 'warning', 'ace_warning_line')); //未成功

  sess.setAnnotations(ann);
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
//  AI 偵測（三條件觸發）
//  需求：#aiToggle、#problems_ai、#problem_ai_output、#problem_output 存在
// =====================
(function () {
  const EDITOR_ID = 'editor';
  const AI_TOGGLE_ID = 'aiToggle';
  const PANEL_ID = 'problems_ai';
  const PRE_ID = 'problem_ai_output';
  const PROBLEM_OUT_ID = 'problem_output';

  const toggleEl = document.getElementById(AI_TOGGLE_ID);
  const panelEl  = document.getElementById(PANEL_ID);
  const preEl    = document.getElementById(PRE_ID);
  const probEl   = document.getElementById(PROBLEM_OUT_ID);

  if (!toggleEl || !panelEl || !preEl || !probEl) {
    console.warn('[AI] 缺少必要 DOM：#aiToggle/#problems_ai/#problem_ai_output/#problem_output');
    return;
  }

  // ---- 狀態 ----
  let aiEnabled = !!toggleEl.checked;
  let inFlight = false;        // 送出中保護
  let lastObservedSig = null;  // 最近「看到」的簽章
  let lastSentSig = null;      // 最近「已送」的簽章

  // ---- 工具 ----
  function setStatus(s) {
    const now = new Date().toLocaleTimeString?.() || '';
    const firstLine = s.replace('{time}', now);
    const cur = preEl.textContent || '';
    if (!cur) {
      preEl.textContent = firstLine;
    } else {
      const lines = cur.split('\n');
      lines[0] = firstLine;
      preEl.textContent = lines.join('\n');
    }
    //panelEl.style.display = 'block';
  }

  function debounce(fn, ms) { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; }

  function getEditorCode() { try { return window.editor?.getValue() || ''; } catch { return ''; } }

  // 輕量簽章（FNV-1a 變體 + 長度）
  function sigOf(s) { let h = 2166136261 >>> 0; for (let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=(h*16777619)>>>0; } return (h>>>0).toString(16)+':'+s.length; }

  // 判斷語法檢查是否通過（支援多種文字）
  function isCompileSuccess() {
    const raw = (probEl.innerText || probEl.textContent || '').replace(/\s+/g, ' ').trim();
    const candidates = [
      '✅ 語法檢查通過',
      '語法檢查通過',
      '✔ 語法檢查通過',
      'Syntax check passed',
      'No errors'
    ];
    return candidates.some(k => raw.includes(k));
  }

  // ---- 主流程：嘗試送一次 AI 偵測 ----
  async function tryDetectOnce(reason) {
    if (!aiEnabled)                { setStatus('【狀態】AI 即時偵測未開啟'); return; }
    if (!isCompileSuccess())       { setStatus('【狀態】等待編譯成功（尚未通過或尚未執行）'); return; }
    if (inFlight)                  { setStatus('【狀態】前一次偵測尚未完成，略過'); return; }

    const code = getEditorCode();
    if (!code.trim())              { setStatus('【狀態】沒有可分析的程式碼'); return; }

    const slice = code.slice(0, 6000);     // 控制 payload 大小
    const sig   = sigOf(slice);

    // 沒變更就不送
    if (sig === lastSentSig) {
      setStatus('【狀態】內容未變更，略過重複偵測');
      return;
    }
    if (lastObservedSig !== null && sig === lastObservedSig && reason !== 'compile-true') {
      setStatus('【狀態】內容未變更，略過重複偵測');
      return;
    }

    inFlight = true;
    setStatus('【狀態】已送出，等待 AI 回傳中…');

    try {
      // 送到後端（參考 ai_detection.js 的寫法）
      const res = await fetch('http://localhost:5000/ai-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: slice, lang: 'c', local_findings: [] })
      });

      const data = await res.json().catch(() => ({}));

      if (data?.ok && data.ai) {
        lastSentSig = sig;

        // 盡量人性化輸出（簡化版）
        const issues = Array.isArray(data.ai?.Issues) ? data.ai.Issues
                     : Array.isArray(data.ai?.issues) ? data.ai.issues : [];

        let lines = [];
        if (issues.length) {
          lines.push('【AI 偵測結果】🤖');
          lines.push(`找到 ${issues.length} 個可能問題`);
          issues.slice(0, 20).forEach((it, i) => {
            const lineNo = it.Line ?? it.line ?? '-';
            const msg = it.Message || it.description || '(無說明)';
            lines.push(`#${i+1} 行 ${lineNo}：${msg}`);
          });
          if (issues.length > 20) lines.push('（其餘略…）');
        } else {
          lines.push('【AI 偵測結果】🤖');
          //lines.push('(格式較特別，以下為原始回應前 1000 字)');
          try { 
            lines.push(data.ai); 
            //lines.push(JSON.stringify(data.ai, null, 2).slice(0, 1000)); 
          } catch (e) {
            lines.push('無法解析 AI 回應：' + e.message);
          }
        }

        setStatus('【狀態】已更新（{time}）');
        preEl.textContent = `${preEl.textContent.split('\n')[0]}\n` + lines.join('\n');
        //panelEl.style.display = 'block';
      } else {
        const msg = data?.error || `HTTP ${res.status}：伺服器回傳無效`;
        setStatus(`【狀態】發生錯誤：${msg}`);
      }
    } catch (e) {
      setStatus(`【狀態】發生錯誤：${e?.message || e}`);
    } finally {
      inFlight = false;
    }
  }

  // ---- 事件：編輯器內容變更 → 記錄簽章並嘗試觸發 ----
  const onEditorChange = debounce(() => {
    const slice = getEditorCode().slice(0, 6000);
    lastObservedSig = sigOf(slice);
    tryDetectOnce('code-change');
  }, 300);

  try { window.editor?.getSession()?.on('change', onEditorChange); } catch {}

  // ---- 事件：語法檢查輸出變更（觀察 #problem_output）----
  if (typeof MutationObserver !== 'undefined') {
    const obs = new MutationObserver(() => {
      if (aiEnabled && isCompileSuccess()) {
        tryDetectOnce('compile-true');   // 剛變成通過時可立即偵測一次
      }
    });
    obs.observe(probEl, { childList: true, characterData: true, subtree: true });
  }

  // ---- 事件：AI 開關 ----
  toggleEl.addEventListener('change', () => {
    aiEnabled = !!toggleEl.checked;
    if (!aiEnabled) {
      setStatus('【狀態】AI 即時偵測未開啟');
      preEl.textContent = preEl.textContent.split('\n')[0]; // 只留狀態列
      return;
    }
    // 開啟時若已通過編譯，且內容與上次送的不一樣，立即偵測
    if (isCompileSuccess()) tryDetectOnce('toggle-on');
    else setStatus('【狀態】等待編譯成功（尚未通過或尚未執行）');
  });

  // ---- 初始化 ----
  lastObservedSig = sigOf(getEditorCode().slice(0, 6000));
  if (!aiEnabled) setStatus('【狀態】AI 即時偵測未開啟');
  else if (!isCompileSuccess()) setStatus('【狀態】等待編譯成功（尚未通過或尚未執行）');
  else setStatus('【狀態】內容未變更，略過重複偵測');
})();



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