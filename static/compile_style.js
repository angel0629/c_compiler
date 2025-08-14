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
