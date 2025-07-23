let messages = [
  {
    role: "system",
    content: "你是一位熟悉 C 語言的助教。請直接回答使用者問題，且用簡單清楚的繁體中文。避免反問或推問，鼓勵學生思考且引導他們。"
  }
];

function toggleChatBox() {
  document.getElementById('chat-box').classList.toggle('active');
}

function closeChatBox() {
  document.getElementById('chat-box').classList.remove('active');
}

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
  
  console.log("送出的 messages:", messages);
  // 清空輸入欄
  input.value = '';

  // 顯示載入中訊息
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'bot-message';
  loadingMsg.textContent = '請稍候...';
  chatMessages.appendChild(loadingMsg);

  // 發送 POST 請求
  const response = await fetch('http://localhost:5000/gpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }) // ✅ 傳整個 messages 陣列
  });

  const data = await response.json();
  loadingMsg.remove();

  const reply = data.reply || 'AI 沒有回應';
  const botMsg = document.createElement('div');
  botMsg.className = 'bot-message';
  botMsg.textContent = reply;
  chatMessages.appendChild(botMsg);

  // 將 AI 回覆也加入歷史對話中
  messages.push({ role: "assistant", content: reply });

  // 滾到底部
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
