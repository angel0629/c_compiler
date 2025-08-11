let term;

// window.addEventListener('DOMContentLoaded', () => {
//   term = new Terminal({ cursorBlink: true });
//   term.open(document.getElementById('output'));
// });

term = new Terminal({ cursorBlink: true });
term.open(document.getElementById('terminal'));

function runCode() {
  const codeValue = editor.getValue();
  
  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeValue}),
  }).then(() => {
    const ws = new WebSocket(`ws://${location.host}/ws`);

    ws.onmessage = (event) => term.write(event.data);
    
    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket closed');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    term.onData((data) => {
      console.log('code:', data);
      ws.send(data);
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
// document.getElementById('runBtn').addEventListener('click', () => {
//     if (term) {
//     term.clear();
//   }
//     runCode();
// });
