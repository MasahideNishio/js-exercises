"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // EventSource を初期化
  const eventSource = new EventSource("http://localhost:3000/message");

  // メッセージを受信したときのイベント
  eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    messageElement.textContent = data.value;

    // 通信完了時（done が true の場合）、EventSource を閉じる
    if (data.done) {
      eventSource.close();
      button.disabled = false;
    }
  });

  // エラーが発生した場合の処理
  eventSource.addEventListener("error", () => {
    console.error("Error Occurred");
    eventSource.close();
    button.disabled = false;
  });
}
