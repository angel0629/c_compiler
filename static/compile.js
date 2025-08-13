let term;

term = new Terminal({ cursorBlink: true });
term.open(document.getElementById('terminal'));

function runCode() {
  term.clear();
  term.reset(); // 確保游標回到左上角
  
  const codeValue = editor.getValue();
  let inputBuffer = ''; // 暫存使用者輸入

  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeValue }),
  }).then(() => {
    const ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onmessage = (event) => {
    let msg = event.data.replace(/\n/g, '\r\n'); // 統一轉成 \r\n
    if (msg.includes("===[程式結束]===")) {
      term.write('\r\n\r\n');  // 換行讓訊息貼底
      term.write(msg);
    } else {
      term.write(msg);
    }
  };

    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket closed');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    // 處理輸入
    term.onData((data) => {
      console.log(JSON.stringify(data));
      if (data === '\r') { // Enter 鍵
        ws.send(inputBuffer+'\n'); // 一次性送到後端
        term.write('\r\n'); // 在 terminal 上換行
        console.log('User input sent:', inputBuffer);
        inputBuffer = ''; // 清空緩衝區
      } else if (data === '\u007F') { // Backspace 鍵
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b'); // 在 terminal 上刪掉字
        }
      } else {
        inputBuffer += data; // 暫存字元  
        term.write(data); // 即時顯示在 terminal
      }
    });
  }).catch(error => console.error('Fetch error:', error));
}



window.addEventListener('DOMContentLoaded', () => {
  // 現在確定整個頁面元素都已載入，可以安全使用 document.getElementById
  document.getElementById('runBtn').addEventListener('click', () => {
    const codeValue = editor.getValue();
    
    // 你後續要做的事情，例如 fetch 傳送 codeValue
    term.clear();
    runCode();
  });
});


