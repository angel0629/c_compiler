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

let debounceTimer;
editor.session.on('change', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const code = editor.getValue();
        runSyntaxCheck(code);  // 這函式等一下要定義
    }, 500);
});
editor.session.setAnnotations([{
  row: 2,
  column: 5,
  text: "測試錯誤：這裡有問題",
  type: "error"
}]);

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

async function checkSyntaxErrors(code) {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            language: "c",
            version: "*",
            args: ["-fsyntax-only"],
            files: [{ name: "main.c", content: code }]
        })
    });

    const result = await response.json();
    // 🟡 有時錯誤會在 run.stderr
    return (result.compile?.stderr || result.run?.stderr || "");
}


async function runSyntaxCheck(code) {
    const errorText = await checkSyntaxErrors(code);
    const annotations = [];

    const lines = errorText.split('\n');
    for (const line of lines) {
        const match = line.match(/main\.c:(\d+):(\d+):\s+error:\s+(.*)/);
        if (match) {
            const lineNumber = parseInt(match[1], 10) - 1;
            const column = parseInt(match[2], 10) - 1;
            const message = match[3];

            annotations.push({
                row: lineNumber,
                column: column,
                text: message,
                type: "error"
            });
        }
    }

    editor.session.setAnnotations(annotations);
}


