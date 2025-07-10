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

  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.textContent = text;
  document.getElementById('chatMessages').appendChild(userMsg);

  input.value = '';
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'bot-message';
  loadingMsg.textContent = '請稍候...';
  document.getElementById('chatMessages').appendChild(loadingMsg);

  const response = await fetch('http://localhost:5000/gpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  const data = await response.json();
  loadingMsg.remove();

  const botMsg = document.createElement('div');
  botMsg.className = 'bot-message';
  botMsg.textContent = data.reply || 'AI 沒有回應';
  document.getElementById('chatMessages').appendChild(botMsg);

  document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}
