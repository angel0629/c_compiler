var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/c_cpp");

editor.setOptions({
  vScrollBarAlwaysVisible: true,
  scrollPastEnd: 0.5,
  animatedScroll: true
});

editor.session.on('change', function(delta) {
  editor.renderer.scrollCursorIntoView({ padding: 20 });
});

let userInputs = [];
let expectedInputs = [];
let outputDiv = document.getElementById("output");
let waitingForInput = false;
let currentInputIndex = 0;

async function runCode() {
  const code = editor.getValue();

  // 讓使用者輸入 stdin（可以多行）
  const input = prompt("請輸入程式所需輸入：") || "";

  const outputArea = document.getElementById("output");
  outputArea.addEventListener("click",() =>{
    document.getElementById('stdin').focus
  })
  outputArea.innerText = "執行中...\n";

  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "c",
      version: "*",
      stdin: input,
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
  if (result.run?.stderr) cleanOutput += result.run.stderr;
  if (result.compile?.stderr) cleanOutput += result.compile.stderr;

  outputArea.innerText = cleanOutput || "無輸出";
}


function handleUserInput(event, inputElement) {
  if (event.key === "Enter" && waitingForInput) {
    event.preventDefault();
    userInputs.push(inputElement.innerText.trim());
    inputElement.contentEditable = "false";
    currentInputIndex++;

    if (currentInputIndex < expectedInputs.length) {
      expectedInputs[currentInputIndex].focus();
    } else {
      waitingForInput = false;
      sendCodeToCompiler();
    }
  }
}

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