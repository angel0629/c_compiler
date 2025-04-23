var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");

let userInputs = [];
let expectedInputs = [];
let outputDiv = document.getElementById("output");
let waitingForInput = false;
let currentInputIndex = 0;

async function runCode() {
    userInputs = [];
    expectedInputs = [];
    currentInputIndex = 0;
    waitingForInput = false;
    outputDiv.innerHTML = "";

    const code = editor.getValue();
    const lines = code.split("\n");

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
        sendCodeToCompiler();
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
    outputDiv.innerHTML += "<br>執行中...<br>";

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
    console.log(result);
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
