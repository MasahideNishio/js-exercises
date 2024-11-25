// 必要な変数と要素を設定
const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// WebSocket サーバーと接続
const socket = new WebSocket("ws://localhost:3003");

// 現在の盤面を保持する
let grid = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(false));

// WebSocket イベントを設定
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "update":
      grid = data.grid;
      renderGrid(grid); // updateのときはrenderGridを呼び出す
      break;
    case "pause":
      cancelAnimationFrame(animationId); // pauseのときはアニメーションをキャンセル
      animationId = null;
      break;
    case "start":
      if (!animationId) update();
      break;
  }
});

// ★ch15.04-10のex10から引用
// グリッドを canvas に描画する
function renderGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// ★ch15.04-10のex10から引用
// canvas がクリックされたときの処理（セルの反転）
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // WebSocket サーバーにセルの反転メッセージを送信
  socket.send(
    JSON.stringify({
      type: "toggle",
      row: row,
      col: col,
    })
  );
});

// スタートボタンのイベントリスナー
startButton.addEventListener("click", () => {
  socket.send(JSON.stringify({ type: "start" }));
});

// ポーズボタンのイベントリスナー
pauseButton.addEventListener("click", () => {
  socket.send(JSON.stringify({ type: "pause" }));
});

// 初期レンダリング
renderGrid(grid);
