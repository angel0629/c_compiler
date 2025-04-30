var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setValue(`#include<stdio.h>\n#include<stdlib.h>\n\nint main(){\n    int a;\n    printf(\"輸入:\");\n    scanf(\"%d\",&a);\n    printf(\"你剛剛輸入:%d\",a);\n    return 0;\n}`);
editor.clearSelection();
editor.setFontSize(14);

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

    let lastWasPrintf = false;
    let questionBuffer = null;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        console.log(`[debug] 處理第 ${i + 1} 行：`, line);

        if (line.startsWith("printf")) {
            questionBuffer = line.match(/printf\(["'](.+?)["']\)/);
            lastWasPrintf = true;
            console.log("[debug] 發現 printf：", questionBuffer?.[1]);
        } else if (line.startsWith("scanf")) {
            let lineDiv = document.createElement("div");

            if (!lastWasPrintf) {
                outputDiv.appendChild(document.createElement("br"));
            }

            // const showPromptText = false;
            if (questionBuffer ) {
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
            console.log("[debug] 等待輸入欄位建立");
        }
    }

    if (expectedInputs.length > 0) {
        waitingForInput = true;
        expectedInputs[0].focus();
        console.log("[debug] 等待使用者輸入...");
    } else {
        console.log("[debug] 無 scanf，自動執行程式");
        sendCodeToCompiler();
    }
}

function handleUserInput(event, inputElement) {
    if (event.key === "Enter" && waitingForInput) {
        event.preventDefault();
        let inputText = inputElement.innerText.trim();
        console.log("[debug] 使用者輸入：", inputText);
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
            console.log("[debug] 所有輸入已完成，執行送出");
            sendCodeToCompiler();
        }
    }
}

async function sendCodeToCompiler() {
    // outputDiv.innerHTML += "<br>執行中...<br>";
    const code = editor.getValue();
    const stdin = userInputs.join("\n");
    console.log("[debug] 發送 code：", code);
    console.log("[debug] 發送 stdin：", stdin);

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: "c",
            version: "*",
            stdin: userInputs.join("\n"),
            files: [
                {
                    name: "main.c",
                    content: editor.getValue()
                }
            ]
        })
    });

    const result = await response.json();
    console.log("[debug] API 回傳結果：", result);
    let cleanOutput = "";

    if (result.run && result.run.stdout) {
        cleanOutput += result.run.stdout;
    }
    if (result.run && result.run.stderr) {
        cleanOutput += "<br><span style='color:red'>" + result.run.stderr + "</span>";
    }
    if (result.compile && result.compile.stderr) {
        cleanOutput += "<br><span style='color:orange'>" + result.compile.stderr + "</span>";
    }

    outputDiv.innerHTML += cleanOutput || "無輸出";
}
