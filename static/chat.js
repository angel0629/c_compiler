// GAI 小助手的畫面大小
const RAG_ENDPOINT = 'http://localhost:3000/rag/answer';
const RAG_TOPK = 6;
const RAG_THRESHOLD = 0.25;
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

// 問 RAG（Hybrid：你的 /rag/answer 會先檢索，有證據就附引用，沒證據用常識）
async function askRAG(question) {
  const r = await fetch(RAG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ q: question, topK: RAG_TOPK, threshold: RAG_THRESHOLD })
  });
  if (!r.ok) throw new Error('RAG API error');
  return r.json(); // { ok, mode: 'rag'|'model-fallback'|'strict', answer, hits: [...] }
}

// 把來源清單渲染成一個小區塊（附連結）
function renderSources(hits = []) {
  if (!hits.length) return null;
  const wrap = document.createElement('div');
  wrap.className = 'rag-sources';
  wrap.innerHTML = `
    <div class="rag-sources-title">參考來源</div>
    <ol class="rag-sources-list">
      ${hits.map(h => `
        <li>
          <a href="${h.source_url || '#'}" target="_blank" rel="noopener noreferrer">
            ${h.title || h.source_url || '來源'}
          </a>
        </li>
      `).join('')}
    </ol>`;
  return wrap;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById("chatMessages");

  // 顯示使用者訊息
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  // 加入歷史訊息並限制長度
  messages.push({ role: "user", content: text });
  if (messages.length > 10) {
    messages = [messages[0], ...messages.slice(-9)];
  }

  input.value = "";

  // 載入中
  const loadingMsg = document.createElement("div");
  loadingMsg.className = "bot-message";
  loadingMsg.textContent = "請稍候...";
  chatMessages.appendChild(loadingMsg);

  // 一個小工具：把 AI 回覆 + 來源插入畫面
  const insertBotReply = (reply, hits, modeNote) => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.innerHTML = DOMPurify.sanitize(marked.parse(reply));
    chatMessages.appendChild(botMsg);

    // 來源（有命中時）
    const src = renderSources(hits);
    if (src) chatMessages.appendChild(src);

    // 無引用時的小提示（model-fallback）
    if (!src && modeNote) {
      const tip = document.createElement('div');
      tip.className = 'rag-note';
      tip.textContent = modeNote;
      chatMessages.appendChild(tip);
    }

    messages.push({ role: "assistant", content: reply });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  try {
    // 1) 先問 RAG
    let ragResp;
    try {
      ragResp = await askRAG(text);
    } catch (e) {
      // RAG 掛了就走原本 /gpt
    }

    loadingMsg.remove();

    if (ragResp && ragResp.ok) {
      insertBotReply(
        ragResp.answer || "（沒有內容）",
        ragResp.hits || [],
        ragResp.mode === 'model-fallback' ? '此答案使用模型內建知識' : ''
      );
      return;
    }

    // 2) 回退：打你原本的小助手 API（/gpt）
    const response = await fetch("http://localhost:5000/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = document.createElement("div");
      errorMsg.className = "bot-message error";
      errorMsg.textContent = errorData.reply || "伺服器錯誤";
      chatMessages.appendChild(errorMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }

    const data = await response.json();
    const reply = data.reply || "AI 沒有回應";
    insertBotReply(reply, []);
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