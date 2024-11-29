// 参考
// https://note.com/tamo2918/n/nafd616519de9
// https://github.com/ollama/ollama?tab=readme-ov-file#rest-api
// http://anakin.ai/ja-jp/blog/ollama-how-to-use/
// Select the DOM elements
// Select the DOM elements
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// メッセージを表示する
function appendMessage(content, role) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);
  messageDiv.textContent = content;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // 末尾まで自動スクロールさせる
}

// メッセージを送る
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // ユーザーからのメッセージを表示
  appendMessage(userMessage, "user");
  userInput.value = ""; // インプットフィールドを空にする

  // AIからのメッセージを表示する場所を作る
  const botMessage = document.createElement("div");
  botMessage.classList.add("message", "bot");
  chatContainer.appendChild(botMessage);

  try {
    // AIからレスポンスを取得
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:2b",
        prompt: userMessage,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Responseをパースする
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    botMessage.textContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Parse the JSON chunk and extract the "response" field
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            botMessage.textContent += json.response; // Append response content
            chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
          }
        } catch (e) {
          console.error("Failed to parse chunk:", line, e);
        }
      }
    }
  } catch (error) {
    botMessage.textContent = "Error: Unable to fetch response.";
    console.error(error);
  }
}

// イベントリスナに登録
sendButton.addEventListener("click", sendMessage);
// Enterキーでもメッセージを送信できるようにする
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
