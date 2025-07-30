messages=[{"role": "assistant", "content": "你是一位專業 C 語言助教，請用簡短的語句回答學生的問題。"}]
async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  // 顯示使用者訊息
  const chatMessages = document.getElementById('chatMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  // 加入歷史訊息
  messages.push({ role: "user", content: text });

  // 清空輸入欄
  input.value = '';

  // 顯示載入中訊息
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'bot-message';
  loadingMsg.textContent = '請稍候...';
  chatMessages.appendChild(loadingMsg);

  try {
    const response = await fetch('http://localhost:5000/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    loadingMsg.remove();

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = document.createElement('div');
      errorMsg.className = 'bot-message error';
      errorMsg.textContent = errorData.reply || '伺服器錯誤';
      chatMessages.appendChild(errorMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }

    const data = await response.json();
    const reply = data.reply || 'AI 沒有回應';
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message';
    botMsg.textContent = reply;
    chatMessages.appendChild(botMsg);

    // 僅在成功回應時將 AI 回覆加入歷史訊息
    messages.push({ role: "assistant", content: reply });

    // 滾到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    loadingMsg.remove();
    const errorMsg = document.createElement('div');
    errorMsg.className = 'bot-message error';
    errorMsg.textContent = '無法連接到伺服器';
    chatMessages.appendChild(errorMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}