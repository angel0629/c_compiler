// === AI 偵測：開關打開 && 程式碼有更新 && 編譯成功 -> 觸發一次 ===
(function () {
  const EDITOR_ID = "editor";
  const PANEL_ID = "problems_ai";
  const PRE_ID = "problem_ai_output";
  const AI_TOGGLE_ID = "aiToggle"; // <input type="checkbox" id="aiToggle">

  const editorEl = document.getElementById(EDITOR_ID);
  const panelEl = document.getElementById(PANEL_ID);
  const preEl = document.getElementById(PRE_ID);
  const toggleEl = document.getElementById(AI_TOGGLE_ID);

  if (!editorEl || !panelEl || !preEl || !toggleEl) {
    console.warn("[AI] 缺少必要的 DOM 元素 (#editor/#problems_ai/#problem_ai_output/#aiToggle)");
    return;
  }

  // ---- 狀態 ----
  let aiEnabled = !!toggleEl.checked;
  let compileSuccess = false;       // 由外部編譯流程告知（window.setCompileStatus(true/false)）
  let inFlight = false;             // 併發保護：尚有請求未回就不再送
  let lastObservedSig = null;       // 最近一次「看見」的程式碼簽章
  let lastSentSig = null;           // 最近一次「已送給 AI」的程式碼簽章

  // ---- 小工具 ----
  function debounce(fn, ms) { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; }

  function getEditorCode() {
    try { if (window.ace && window.ace.edit) return window.ace.edit(EDITOR_ID).getValue(); } catch(_) {}
    try { if (editorEl.__monaco_editor__) return editorEl.__monaco_editor__.getValue(); } catch(_) {}
    if (editorEl.value != null) return String(editorEl.value);          // <textarea> 或 <input>
    return editorEl.innerText || editorEl.textContent || "";            // contenteditable 或一般 DIV
  }

  // 輕量簽章（避免相同內容重送）
  function sigOf(s) { let h = 2166136261 >>> 0; for (let i=0;i<s.length;i++) { h^=s.charCodeAt(i); h=(h*16777619)>>>0; } return (h>>>0).toString(16)+":"+s.length; }

  function showPanel(lines) {
    if (!lines || !lines.length) { panelEl.style.display="none"; preEl.textContent=""; return; }
    preEl.textContent = lines.join("\n");
    panelEl.style.display = "block";
  }

  function renderAI(aiJson) {
    const out = ["【AI 建議】"];
    if (aiJson?.root_cause) out.push(`根因：${aiJson.root_cause}`);
    if (Array.isArray(aiJson?.suggested_fixes)) aiJson.suggested_fixes.forEach((s,i)=>out.push(`修復${i+1}：${s}`));
    if (aiJson?.next_action_cmd) out.push(`下一步：${aiJson.next_action_cmd}`);
    if (typeof aiJson?.confidence === "number") out.push(`信心度：${(aiJson.confidence*100).toFixed(0)}%`);
    showPanel(out);
  }
  function renderError(msg) { showPanel([`【AI 偵測失敗】${msg||"未知錯誤"}`]); }

  // ---- 只要符合條件就「嘗試」觸發一次 ----
  async function tryDetectOnce(reason) {
    if (!aiEnabled) return;                 // 開關沒開
    if (!compileSuccess) return;            // 還沒編譯成功
    if (inFlight) return;                   // 上一次還在跑
    const code = getEditorCode();
    const slice = code.slice(0, 6000);      // 控制 payload，省 token
    const sig = sigOf(slice);

    // 若「看見的」更新了但「送出的」與現在相同，就不送
    if (sig === lastSentSig) return;

    // 僅在「確實有更新」時觸發：觀察到的簽章變動才送
    if (lastObservedSig !== null && sig === lastObservedSig && reason !== "compile-turned-true") {
      // 正常 code-change 走到這裡表示沒有變更，不觸發
      return;
    }

    inFlight = true;
    // console.log("[AI] detect reason:", reason, "sig:", sig);
    try {
      const res = await fetch("http://localhost:5000/ai-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: slice, lang: "c", local_findings: [] })
      });
      const data = await res.json();
      if (data?.ok && data.ai) {
        lastSentSig = sig;
        renderAI(data.ai);
      } else {
        renderError(data?.error || "伺服器回傳無效");
      }
    } catch (e) {
      renderError(String(e?.message || e));
    } finally {
      inFlight = false;
    }
  }

  // ---- 編輯器「內容有更新」就記錄簽章，並嘗試觸發（若開關ON且已編譯成功） ----
  const onEditorChange = debounce(function () {
    const slice = getEditorCode().slice(0, 6000);
    lastObservedSig = sigOf(slice);
    tryDetectOnce("code-change");
  }, 300);

  // Ace / Monaco / MutationObserver 三擇一（全部掛上也沒關係）
  try { if (window.ace && window.ace.edit) window.ace.edit(EDITOR_ID).session.on("change", onEditorChange); } catch(_) {}
  try { if (editorEl.__monaco_editor__) editorEl.__monaco_editor__.onDidChangeModelContent(onEditorChange); } catch(_) {}
  const mo = new MutationObserver(onEditorChange);
  mo.observe(editorEl, { childList:true, characterData:true, subtree:true });

  // ---- UI 開關 ----
  toggleEl.addEventListener("change", () => {
    aiEnabled = !!toggleEl.checked;
    // 開關剛打開時，如果「當前已編譯成功」而且「當前程式碼與上次送出不同」，就立即偵測一次
    if (aiEnabled) tryDetectOnce("toggle-on");
    else showPanel(null); // 關閉 -> 收起面板
  });

  // ---- 外部編譯流程在成功/失敗時要呼叫：window.setCompileStatus(true/false) ----
  const _oldSet = window.setCompileStatus;
  window.setCompileStatus = function (ok) {
    compileSuccess = !!ok;
    // 編譯剛成功：若開關ON，且目前程式碼與上次送出不同，立刻偵測一次
    if (compileSuccess && aiEnabled) tryDetectOnce("compile-turned-true");
    if (typeof _oldSet === "function") _oldSet(ok); // 若你原本有定義就鏈接回去
  };

  // ---- 初始化：記住當前程式碼簽章（避免一進頁面就觸發） ----
  lastObservedSig = sigOf(getEditorCode().slice(0, 6000));
  // console.log("[AI] init sig:", lastObservedSig);
})();
