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

  // === 狀態列：永遠顯示在面板第一行 ===
  let statusLine = "【狀態】初始化…";
  function setStatus(type, extra) {
    const now = new Date();
    const tt = now.toLocaleTimeString?.() || "";
    const map = {
      off: "【狀態】AI 即時偵測未開啟",
      need_compile: "【狀態】等待編譯成功（尚未通過或尚未執行）",
      inflight: "【狀態】偵測中…請稍候",
      waiting: "【狀態】已送出，等待 AI 回傳中…",
      ok: `【狀態】已更新（${tt}）`,
      no_change: "【狀態】內容未變更，略過重複偵測",
      dedup_busy: "【狀態】前一次偵測尚未完成，略過",
      error: `【狀態】發生錯誤：${extra || "未知"}`
    };
    statusLine = map[type] || `【狀態】${type}${extra ? "：" + extra : ""}`;

    // 即時更新面板第一行
    if (panelEl && preEl) {
      const cur = preEl.textContent || "";
      if (!cur || cur.startsWith("【狀態】")) {
        preEl.textContent = statusLine;
        panelEl.style.display = "block";
      } else {
        const lines = cur.split("\n");
        lines[0] = statusLine;
        preEl.textContent = lines.join("\n");
        panelEl.style.display = "block";
      }
    }
  }

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

  // ---- 面板渲染：永遠把【狀態】放在第一行
  function showPanel(lines) {
    const arr = [];
    if (statusLine) arr.push(statusLine);
    if (lines && lines.length) arr.push(...lines);
    preEl.textContent = arr.join("\n");
    panelEl.style.display = "block";
  }

  // ====== 人性化輸出（兼容多種回傳格式） ======
  function zhSeverity(s) {
    if (!s) return "提示";
    const z = String(s).toLowerCase();
    if (z.includes("error") || z.includes("critical") || z.includes("fatal")) return "錯誤";
    if (z.includes("warn")) return "警告";
    if (z.includes("info") || z.includes("note")) return "提示";
    return s;
  }
  function buildSuggestion(item) {
    const msg = (item.Message || item.description || item.type || "").toLowerCase();
    if (msg.includes("scanf") && msg.includes("%s")) {
      return "改用 fgets() 讀字串，或在 scanf 中加入長度限制，例如：scanf(\"%31s\", buf);";
    }
    if (msg.includes("unreachable")) {
      return "移除 return 後的程式碼，或將 return 移到適當位置。";
    }
    if (msg.includes("buffer") && msg.includes("overflow")) {
      return "檢查目標緩衝區大小，採用邊界檢查或使用較安全的 API。";
    }
    return null;
  }
  function normalizeAI(ai) {
    let issues = [];
    if (Array.isArray(ai?.Issues)) issues = ai.Issues;
    if (Array.isArray(ai?.issues)) issues = ai.issues;
    const hasSchema =
      typeof ai?.kind === "string" ||
      typeof ai?.root_cause === "string" ||
      Array.isArray(ai?.suggested_fixes);
    return { issues, hasSchema };
  }

  function renderAI(aiJson) {
    const { issues, hasSchema } = normalizeAI(aiJson);
    const lines = [];

    if (issues.length > 0) {
      // 總結
      const sevCount = issues.reduce((acc, it) => {
        const s = zhSeverity(it.Severity || it.severity || it.type);
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      }, {});
      const sevSummary = Object.entries(sevCount).map(([k, v]) => `${k}×${v}`).join("、");
      lines.push("【AI 偵測結果】🤖");
      lines.push(`找到 ${issues.length} 個可能問題（${sevSummary || "無"}）`);

      // 明細
      issues.forEach((it, idx) => {
        const lineNo = it.Line ?? it.line ?? "-";
        const sev = zhSeverity(it.Severity || it.severity || it.type);
        const msg = it.Message || it.description || "(無說明)";
        lines.push(`\n#${idx + 1}（${sev}）行 ${lineNo}`);
        lines.push(`說明：${msg}`);
        const tip = buildSuggestion(it);
        if (tip) lines.push(`建議：${tip}`);
      });

      lines.push("\n下一步：請先處理「錯誤/警告」等級的項目，修正後再次編譯並重新偵測。");
    } else if (hasSchema) {
      // schema 風格：根因 + 修正 + 指令 + 信心度
      const out = ["【AI 建議】"];
      if (aiJson?.root_cause) out.push(`根因：${aiJson.root_cause}`);
      if (Array.isArray(aiJson?.suggested_fixes) && aiJson.suggested_fixes.length) {
        out.push("建議修正：");
        aiJson.suggested_fixes.forEach((s, i) => out.push(`- (${i + 1}) ${s}`));
      }
      if (aiJson?.next_action_cmd) out.push(`下一步：${aiJson.next_action_cmd}`);
      if (typeof aiJson?.confidence === "number") out.push(`信心度：約 ${(aiJson.confidence * 100).toFixed(0)}%`);
      lines.push(...out);
    } else {
      // 無法解析：回原始片段
      lines.push("【AI 偵測結果】🤖");
      lines.push("（格式較特別，以下為原始回應片段）");
      try { lines.push(JSON.stringify(aiJson, null, 2).slice(0, 800)); }
      catch { lines.push(String(aiJson).slice(0, 800)); }
    }

    setStatus("ok");
    showPanel(lines);
  }

  function renderError(msg) {
    setStatus("error", msg || "未知錯誤");
    const lines = [
      `原因：${msg || "未知錯誤"}`,
      "建議：請檢查網路、API 金鑰、伺服器 log 或稍後再試。"
    ];
    showPanel(lines);
  }

  // ---- 只要符合條件就「嘗試」觸發一次 ----
  async function tryDetectOnce(reason) {
    if (!aiEnabled) { setStatus("off"); return; }                 // 開關沒開
    if (!compileSuccess) { setStatus("need_compile"); return; }   // 還沒編譯成功
    if (inFlight) { setStatus("dedup_busy"); return; }            // 上一次還在跑

    const code = getEditorCode();
    const slice = code.slice(0, 6000);      // 控制 payload，省 token
    const sig = sigOf(slice);

    // 若「看見的」更新了但「送出的」與現在相同，就不送
    if (sig === lastSentSig) { setStatus("no_change"); return; }

    // 僅在「確實有更新」時觸發：觀察到的簽章變動才送
    if (lastObservedSig !== null && sig === lastObservedSig && reason !== "compile-turned-true") {
      setStatus("no_change");
      return;
    }

    inFlight = true;
    setStatus("inflight");
    try {
      setStatus("waiting");
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
        renderError(data?.error || `HTTP ${res.status}：伺服器回傳無效`);
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
    if (!aiEnabled) {
      setStatus("off");
      showPanel([]); // 只留狀態列
      return;
    }
    // 開關剛打開時，如果「當前已編譯成功」而且「當前程式碼與上次送出不同」，就立即偵測一次
    if (!compileSuccess) setStatus("need_compile");
    else tryDetectOnce("toggle-on");
  });

  // ---- 外部編譯流程在成功/失敗時要呼叫：window.setCompileStatus(true/false) ----
  // --- 新增：統一從 DOM 判斷是否編譯成功 ---
  function isCompileSuccess() {
    const el = document.getElementById("problem_output");
    if (!el) return false;
    // 取純文字，去除多餘空白
    const raw = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();

    // 兼容多種成功訊息（你可再加關鍵字）
    const candidates = [
      "✅ 語法檢查通過",
      "語法檢查通過",
      "✔ 語法檢查通過",
      "Syntax check passed",        // 若之後要英文訊息也能吃
      "No errors",                  // 其他系統可能用
    ];
    return candidates.some(k => raw.includes(k));
  }

  // --- 可選：監聽 #problem_output 的內容變化，自動更新 compileSuccess 與觸發偵測 ---
  (function observeProblemOutput() {
    const target = document.getElementById("problem_output");
    if (!target || typeof MutationObserver === "undefined") return;
    const obs = new MutationObserver(() => {
      const okNow = isCompileSuccess();
      if (okNow !== compileSuccess) {
        compileSuccess = okNow;
        if (!aiEnabled) { setStatus("off"); return; }
        if (compileSuccess) {
          tryDetectOnce("compile-observer-true");
        } else {
          setStatus("need_compile");
          showPanel([]); // 只留狀態列
        }
      }
    });
    obs.observe(target, { childList: true, characterData: true, subtree: true });
  })();

  // ---- 初始化：記住當前程式碼簽章（避免一進頁面就觸發） ----
  lastObservedSig = sigOf(getEditorCode().slice(0, 6000));
  if (!aiEnabled) setStatus("off");
  else if (!compileSuccess) setStatus("need_compile");
  else setStatus("no_change");
})();
