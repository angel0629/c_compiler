var socket = io();
var terminalOutput = document.getElementById("terminal-output");
var terminalInput = document.getElementById("terminal-input");
 
function compileCode() {
    var code = document.getElementById("code").value;
    // 清空終端輸出
    terminalOutput.textContent = ""; 
    fetch("/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            terminalOutput.innerHTML += "編譯錯誤：\n" + data.error + "\n";
        } else {
            terminalOutput.innerHTML += "程式執行中...\n";
        }
    });
}

// 監聽伺服器發送的輸出
socket.on("terminal_output", function (data) {
    if (!terminalOutput.textContent.trim()) {
        terminalOutput.textContent = "";
    }
    terminalOutput.innerHTML += data.output+ "\n";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
});

// 監聽使用者輸入
terminalInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        var input = terminalInput.value;
        terminalInput.value = "";
        socket.emit("terminal_input", { input: input });
        terminalOutput.innerHTML += "> " + input + "\n";
    }
});
