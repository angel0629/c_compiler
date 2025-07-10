// Initialize ACE Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setValue(`#include<stdio.h>\n#include<stdlib.h>\n\nint main(){\n    int a;\n    printf("測試1");\n    printf("測試2");\n    printf("輸入:");\n    int b = 3;\n    scanf("%d",&a);\n    printf("你剛剛輸入:%d",a);\n    return 0;\n}`);
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
let outputDiv = document.getElementById("output");
let waitingForInput = false;
let currentInputIndex = 0;
let handledPrintfQueue = [];

async function runCode() {
  userInputs = [];
  expectedInputs = [];
  currentInputIndex = 0;
  waitingForInput = false;
  outputDiv.innerHTML = "";

  const code = editor.getValue();
  const lines = code.split("\n");
  const promptQueue = [];
  const scanfLines = [];
  

  // Step 1: 掃描所有 printf 與 scanf，分別記錄
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("printf")) {
      const match = line.match(/printf\(["'](.+?)["']\)/);
      const text = match ? match[1] : "";
      promptQueue.push(text);
      handledPrintfQueue.push(text);
    } else if (line.startsWith("scanf")) {
      scanfLines.push(i);  // 存 index 即可
    }
  }

  // Step 2: 為每個 scanf 配對最後一個 promptQueue
  for (let i = 0; i < scanfLines.length; i++) {
    const lineDiv = document.createElement("div");

    const promptText = promptQueue.length > 0
      ? promptQueue.pop()
      : `請輸入第 ${i + 1} 筆資料：`;

    const promptSpan = document.createElement("span");
    promptSpan.innerText = promptText + " ";
    lineDiv.appendChild(promptSpan);

    const inputSpan = document.createElement("span");
    inputSpan.contentEditable = "true";
    inputSpan.className = "user-input";
    inputSpan.onkeypress = function (event) {
      handleUserInput(event, this);
    };

    lineDiv.appendChild(inputSpan);
    outputDiv.appendChild(lineDiv);
    expectedInputs.push(inputSpan);
  }

  // Step 3: 將剩下的 printf 全部直接輸出（先印出）
  for (const remaining of promptQueue) {
    const div = document.createElement("div");
    div.innerText = remaining;
    outputDiv.appendChild(div);  // 改為 append (非 insertBefore)
  }

  if (expectedInputs.length > 0) {
    waitingForInput = true;
    expectedInputs[0].focus();
  } else {
    sendCodeToCompiler();
  }
}

function removeHandledPrintf(code, handledPrints) {
  const lines = code.split("\n");
  const newLines = [];

  for (let line of lines) {
    let trimmed = line.trim();
    let isHandled = false;

    for (let text of handledPrints) {
      const pattern = new RegExp(`^printf\\(["']${text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}["']\\);?$`);
      if (pattern.test(trimmed)) {
        isHandled = true;
        break;
      }
    }

    if (!isHandled) newLines.push(line);
  }

  return newLines.join("\n");
}


function handleUserInput(event, inputElement) {
  if (event.key === "Enter" && waitingForInput) {
    event.preventDefault();
    let inputText = inputElement.innerText.trim();
    if (inputText === "") {
      alert("請輸入資料後再按 Enter！");
      return;
    }

    userInputs.push(inputText);
    inputElement.contentEditable = "false";
    currentInputIndex++;

    if (currentInputIndex < expectedInputs.length) {
      outputDiv.appendChild(document.createElement("br"));
      setTimeout(() => {
        expectedInputs[currentInputIndex].focus();
      }, 50);
    } else {
      waitingForInput = false;
      sendCodeToCompiler();
    }
  }
}

async function sendCodeToCompiler() {
  let code = editor.getValue();
  code = removeHandledPrintf(code, handledPrintfQueue);
  const stdin = userInputs.join("\n");

  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      language: "c",
      version: "*",
      stdin: stdin,
      files: [
        {
          name: "main.c",
          content: code
        }
      ]
    })
  });

  const result = await response.json();
  console.log(result,"213123123")
  let cleanOutput = "";

  if (result.run?.stdout) cleanOutput += result.run.stdout;
  // console.log(cleanOutput,"11111")
  if (result.run?.stderr) cleanOutput += `<br><span style='color:red'>${result.run.stderr}</span>`;
  // console.log(cleanOutput,"22222")
  if (result.compile?.stderr) cleanOutput += `<br><span style='color:orange'>${result.compile.stderr}</span>`;

  // 剛加入的

  // 剛加入的

  outputDiv.innerHTML += cleanOutput || "無輸出";
}

// Chat functions
function toggleChatBox() {
  const chatBox = document.getElementById("chat-box");
  chatBox.classList.toggle("active");
}
function closeChatBox() {
  const chatBox = document.getElementById("chat-box");
  chatBox.classList.remove("active");
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
