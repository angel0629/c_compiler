// Initialize ACE Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setValue(`#include<stdio.h>\n#include<stdlib.h>\n\nint main(){\n    int a;\n    printf("輸入:");\n    scanf("%d",&a);\n    printf("你剛剛輸入:%d",a);\n    return 0;\n}`);
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

async function runCode() {
  console.log("[debug] runCode() called");
  userInputs = [];
  expectedInputs = [];
  currentInputIndex = 0;
  waitingForInput = false;
  outputDiv.innerHTML = "";

  const code = editor.getValue();
  console.log("[debug] 編輯器取得程式碼：", code);
  const lines = code.split("\n");

  const printfRegex = /printf\(["']([^"']+)["']\);/g;
  const scanfRegex = /scanf\(["'][^"']*["'],\s*&?\w+\)/g;

  let printfMatches = [];
  let match;
  while ((match = printfRegex.exec(code)) !== null) {
    printfMatches.push(match[1]);
  }

  let scanfMatches = code.match(scanfRegex);
  if (scanfMatches) {
    for (let i = 0; i < scanfMatches.length; i++) {
      let promptText = printfMatches[i] || `請輸入第 ${i + 1} 個輸入值：`;
      let lineDiv = document.createElement("div");
      lineDiv.innerHTML = promptText + " <span contenteditable='true' class='user-input' onkeypress='handleUserInput(event, this)'></span>";
      outputDiv.appendChild(lineDiv);
      expectedInputs.push(lineDiv.querySelector(".user-input"));
    }
    waitingForInput = true;
    expectedInputs[0].focus();
    return;
  }

  // Fallback: line-by-line scanning
  let lastWasPrintf = false;
  let questionBuffer = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith("printf")) {
      questionBuffer = line.match(/printf\(["'](.+?)["']\)/);
      lastWasPrintf = true;
    } else if (line.startsWith("scanf")) {
      let lineDiv = document.createElement("div");

      if (!lastWasPrintf) {
        outputDiv.appendChild(document.createElement("br"));
      }

      if (questionBuffer) {
        let promptSpan = document.createElement("span");
        promptSpan.innerText = questionBuffer[1] + " ";
        lineDiv.appendChild(promptSpan);
        questionBuffer = null;
      }

      let inputSpan = document.createElement("span");
      inputSpan.contentEditable = "true";
      inputSpan.className = "user-input";
      inputSpan.onkeypress = function(event) {
        handleUserInput(event, this);
      };

      lineDiv.appendChild(inputSpan);
      outputDiv.appendChild(lineDiv);
      expectedInputs.push(inputSpan);

      lastWasPrintf = false;
    }
  }

  if (expectedInputs.length > 0) {
    waitingForInput = true;
    expectedInputs[0].focus();
  } else {
    sendCodeToCompiler(); // auto run if no scanf
  }
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
  const code = editor.getValue();
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
  let cleanOutput = "";

  if (result.run?.stdout) cleanOutput += result.run.stdout;
  if (result.run?.stderr) cleanOutput += `<br><span style='color:red'>${result.run.stderr}</span>`;
  if (result.compile?.stderr) cleanOutput += `<br><span style='color:orange'>${result.compile.stderr}</span>`;

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
