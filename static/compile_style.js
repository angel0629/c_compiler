// Initialize ACE Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setValue(`#include <stdio.h>\nint main() {\nchar name[100];\nprintf("請輸入你的名字: ");\nscanf("%s", name);\nprintf("你好, %s!", name);\nint age;\nprintf("請輸入你的年齡: ");\nscanf("%d", &age);\nprintf("age: %d!", age);\nreturn 0;\n}\n`);
editor.clearSelection();
editor.setFontSize(14);
editor.setOptions({
  vScrollBarAlwaysVisible: true,
  scrollPastEnd: 0.5,
  animatedScroll: true
});
editor.session.on('change', function(delta) {
  editor.renderer.scrollCursorIntoView({ padding: 20 });
});

// Input simulation & execution handling
let userInputs = [];
let expectedInputs = [];
let outputDiv = document.getElementById("terminal");
let waitingForInput = false;
let currentInputIndex = 0;



async function sendCodeToCompiler() {
  const problemDiv = document.getElementById("problem_output");
  outputDiv.innerHTML = result.run?.stdout || "無輸出";
  problemDiv.innerHTML = "";

  if (result.run?.stderr) {
    problemDiv.innerHTML += `執行錯誤:\n${result.run.stderr}`;
  }
  if (result.compile?.stderr) {
    problemDiv.innerHTML += `編譯錯誤:\n${result.compile.stderr}`;
  }
  if (!problemDiv.innerHTML) {
    problemDiv.innerHTML = "沒有錯誤。";
  }

}

// Chat functions
// function toggleChatBox() {
//   const chatBox = document.getElementById("chat-box");
//   chatBox.classList.toggle("active");
// }
// function closeChatBox() {
//   const chatBox = document.getElementById("chat-box");
//   chatBox.classList.remove("active");
// }




// ✅ NEW: Function to switch between Output and Problems tabs
function showTab(tab) {
  const outputTab = document.getElementById("output");
  const problemTab = document.getElementById("problems");
  const terminalTab = document.getElementById("terminal");
  const buttons = document.querySelectorAll(".tab-button");

  if (tab === "output") {
    outputTab.style.display = "block";
    problemTab.style.display = "none";
    terminalTab.style.display = "none";
  } else if (tab === "problems") {
    outputTab.style.display = "none";
    problemTab.style.display = "block";
    terminalTab.style.display = "none";
  }else{
    outputTab.style.display = "none";
    problemTab.style.display = "none";
    terminalTab.style.display = "block";
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add("active");
}





let isDragging = false;
const questionBox = document.getElementById('question-box');
questionBox.addEventListener('mousemove', (e) => {
  if (e.offsetX >= questionBox.offsetWidth - 10) {
    questionBox.style.cursor = 'ew-resize';
  } else {
    questionBox.style.cursor = 'default';
  }
});

questionBox.addEventListener('mousedown', (e) => {
  if (e.offsetX >= questionBox.offsetWidth - 10) {
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
  }
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const containerLeft = document.querySelector('.main-container').offsetLeft;
  const newWidth = e.clientX - containerLeft;
  const minWidth = 150;
  const maxWidth = window.innerWidth * 0.7;
  if (newWidth >= minWidth && newWidth <= maxWidth) {
    questionBox.style.width = `${newWidth}px`;
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.cursor = 'default';
});

let isDraggingOutputTop = false;
const outputContainer = document.getElementById('output-container');
outputContainer.addEventListener('mousemove', (e) => {
  if (e.offsetY <= 10) {
    outputContainer.style.cursor = 'ns-resize';
  } else {
    outputContainer.style.cursor = 'default';
  }
});

outputContainer.addEventListener('mousedown', (e) => {
  if (e.offsetY <= 10) {
    isDraggingOutputTop = true;
    document.body.style.cursor = 'ns-resize';
  }
});

window.addEventListener('mousemove', (e) => {
  if (!isDraggingOutputTop) return;
  const newHeight = outputContainer.offsetHeight - (e.clientY - outputContainer.offsetTop);
  const minHeight = 100;
  const maxHeight = window.innerHeight * 0.7;
  if (newHeight >= minHeight && newHeight <= maxHeight) {
    outputContainer.style.height = `${newHeight}px`;
  }
});

window.addEventListener('mouseup', () => {
  isDraggingOutputTop = false;
  document.body.style.cursor = 'default';
});

// =========================
// Tree-sitter 語法偵測整合
// =========================
let tsParser = null;
let tsLangC = null;
let tsReady = false;

function debounce(fn, delay) {
  let t = null;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function initTreeSitter() {
  try {
    if (!window.TreeSitter) return;
    await window.TreeSitter.init();
    // 嘗試多個可用路徑，避免 404
    const candidates = [
      '/tree-sitter-c/tree-sitter-c.wasm',
      '/tree-sitter-c.wasm',
      'tree-sitter-c/tree-sitter-c.wasm'
    ];
    let lastErr = null;
    for (const url of candidates) {
      try {
        tsLangC = await window.TreeSitter.Language.load(url);
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (!tsLangC) throw lastErr || new Error('language wasm not found');
    tsParser = new window.TreeSitter();
    tsParser.setLanguage(tsLangC);
    tsReady = true;
    // 初次檢查
    checkSyntax();
  } catch (err) {
    const problemDiv = document.getElementById('problem_output');
    if (problemDiv) {
      problemDiv.textContent = `Tree-sitter 初始化失敗: ${err?.message || err}`;
    }
  }
}

function hasErrorAncestor(node) {
  let p = node.parent;
  while (p) {
    if (p.type === 'ERROR') return true;
    p = p.parent;
  }
  return false;
}

function collectSyntaxErrors(node, out) {
  // 只收集真正的 ERROR 節點，移除錯誤的 missing token 檢查
  if (node.type === 'ERROR' && !hasErrorAncestor(node)) {
    const line = (node.startPosition?.row ?? 0) + 1;
    const col = (node.startPosition?.column ?? 0) + 1;
    out.push({ line, col, message: '語法錯誤' });
  }
  
  // 移除錯誤的 missing token 檢查，避免誤報正確語法
  // const missingPunctuations = new Set([';', ')', '}', ']']);
  // if (node.isMissing && missingPunctuations.has(node.type) && !hasErrorAncestor(node)) {
  //   const line = (node.startPosition?.row ?? 0) + 1;
  //   const col = (node.startPosition?.column ?? 0) + 1;
  //   out.push({ line, col, message: `缺少「${node.type}」` });
  // }
  
  const childCount = node.childCount || 0;
  for (let i = 0; i < childCount; i++) {
    collectSyntaxErrors(node.child(i), out);
  }
}

const checkSyntax = debounce(() => {
  const problemDiv = document.getElementById('problem_output');
  if (!problemDiv) return;
  if (!tsReady || !tsParser) {
    problemDiv.textContent = 'Tree-sitter 未就緒';
    return;
  }

  const code = editor.getValue();
  try {
    const tree = tsParser.parse(code);
    // 收集錯誤並去重（依行欄位）
    const errors = [];
    collectSyntaxErrors(tree.rootNode, errors);
    const seen = new Set();
    const unique = [];
    for (const e of errors) {
      const k = `${e.line}:${e.col}`;
      if (!seen.has(k)) { seen.add(k); unique.push(e); }
    }

    // 顯示於 Problems pane
    if (unique.length === 0) {
      problemDiv.innerHTML = '✓ 語法檢查通過';
    } else {
      const lines = ['語法檢查結果:'];
      unique.forEach(e => {
        lines.push(`第 ${e.line} 行, 第 ${e.col} 欄: ${e.message}`);
      });
      problemDiv.textContent = lines.join('\n');
    }

    // 同步到 ACE 註解列（Editor gutter）
    const annotations = unique.map(e => ({
      row: e.line - 1,
      column: e.col - 1,
      text: e.message,
      type: 'error'
    }));
    editor.session.setAnnotations(annotations);
  } catch (err) {
    problemDiv.textContent = `解析失敗: ${err?.message || err}`;
  }
}, 300);

// 綁定編輯器變更 → 偵測
editor.session.on('change', () => {
  checkSyntax();
});

// 頁面載入後初始化 Tree-sitter
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTreeSitter);
} else {
  initTreeSitter();
}