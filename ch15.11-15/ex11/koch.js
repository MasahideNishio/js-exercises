// takagi.js
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const worker = new Worker("kochWorker.js");

  // キャンバスのサイズ設定
  const width = 512;
  const height = 512;
  canvas.width = width;
  canvas.height = height;

  // 再帰の深さ（maxDepth）
  const maxDepth = 5;

  // ワーカーにデータを送信
  worker.postMessage({ maxDepth, width, height });

  // ワーカーから画像データを受信
  worker.onmessage = function (e) {
    const { imageData } = e.data;
    ctx.putImageData(imageData, 0, 0);
  };
});
