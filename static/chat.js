// GAI 小助手的畫面大小
const chatBox = document.getElementById('chat-box');
const resizeHandle = chatBox.querySelector('.resize-handle');
let isResizing = false;
let startX, startWidth;

resizeHandle.addEventListener('mousedown', function(e) {
  isResizing = true;
  startX = e.clientX;
  startWidth = chatBox.offsetWidth;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (isResizing) {
    const newWidth = startWidth + (startX - e.clientX);
    if (newWidth >= 200 && newWidth <= window.innerWidth * 0.9) {
      chatBox.style.width = newWidth + 'px';
    }
  }
});

document.addEventListener('mouseup', function() {
  isResizing = false;
  document.body.style.userSelect = '';
});

messages = [
  {
    role: "assistant",
    content: "你是一位專業 C 語言助教，請使用自我調節式學習(Self-Regulated Learning, SRL)的方法引導學生學習，並回答學生的問題。規則：1. 不直接給答案(不管學生輸入什麼都要做到這點)。 2. 提供提示，鼓勵學生自己思考。 3. 問學生目標、策略、過程、反思。 4. 若學生要求答案，先反問他「想過哪些方法？能分享一下嗎？」。",
  },
];

function toggleChatBox() {
  document.getElementById("chat-box").classList.toggle("active");
}

function closeChatBox() {
  document.getElementById("chat-box").classList.remove("active");
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  // 顯示使用者訊息
  const chatMessages = document.getElementById("chatMessages");
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  // 加入歷史訊息並限制長度
  messages.push({ role: "user", content: text });
  if (messages.length > 10) {
    messages = [messages[0], ...messages.slice(-9)]; // 保留 system prompt 和最後 9 條
  }

  // 清空輸入欄
  input.value = "";

  // 顯示載入中訊息
  const loadingMsg = document.createElement("div");
  loadingMsg.className = "bot-message";
  loadingMsg.textContent = "請稍候...";
  chatMessages.appendChild(loadingMsg);

  try {
    const response = await fetch("http://localhost:5000/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    loadingMsg.remove();

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = document.createElement("div");
      errorMsg.className = "bot-message error";
      errorMsg.textContent = errorData.reply || "伺服器錯誤";
      chatMessages.appendChild(errorMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }

    const data = await response.json();
    const reply = data.reply || "AI 沒有回應";
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    // 使用 marked.js 渲染 Markdown，並用 DOMPurify 清理
    botMsg.innerHTML = DOMPurify.sanitize(marked.parse(reply));
    chatMessages.appendChild(botMsg);

    // 對程式碼塊應用 highlight.js 並添加複製按鈕
    // botMsg.querySelectorAll("pre").forEach((pre) => {
    //   const codeBlock = pre.querySelector("code");
    //   if (codeBlock) {
    //     hljs.highlightElement(codeBlock);
    //     const copyButton = document.createElement("button");
    //     copyButton.textContent = "複製";
    //     copyButton.className = "copy-button";
    //     copyButton.onclick = () => {
    //       navigator.clipboard.writeText(codeBlock.textContent);
    //       copyButton.textContent = "已複製";
    //       setTimeout(() => {
    //         copyButton.textContent = "複製";
    //       }, 2000);
    //     };
    //     pre.appendChild(copyButton);
    //   }
    // });

    // 僅在成功回應時將 AI 回覆加入歷史訊息
    messages.push({ role: "assistant", content: reply });

    // 滾到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    loadingMsg.remove();
    const errorMsg = document.createElement("div");
    errorMsg.className = "bot-message error";
    errorMsg.textContent = "無法連接到伺服器";
    chatMessages.appendChild(errorMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// 初始化 highlight.js
if (typeof hljs !== "undefined") {
  hljs.registerLanguage("c", window.hljs.defineLanguage("c"));
}

// 支援 Enter 鍵發送訊息
// document.getElementById("userInput").addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     sendMessage();
//   }
// });