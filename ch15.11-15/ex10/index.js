const imageInput = document.getElementById("image");
const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const animationCanvas = document.getElementById("animation"); // ★15.11-15 ex10で追加
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");
const animationCtx = animationCanvas.getContext("2d"); // ★15.11-15 ex10で追加

let circleX = 0; // アニメーション用の円の位置 ★15.11-15 ex10で追加
const maxCanvasWidth = 600; // キャンバスの最大幅 ★15.11-15 ex10で追加(画像が大きく表示されすぎるので縮小するようにした)

// 動く円のアニメーション ★15.11-15 ex10で追加
function animate() {
  animationCtx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
  animationCtx.beginPath();
  animationCtx.arc(circleX, 50, 20, 0, Math.PI * 2);
  animationCtx.fillStyle = "blue";
  animationCtx.fill();
  circleX = (circleX + 2) % animationCanvas.width; // 円を移動
  requestAnimationFrame(animate);
}

animate(); // アニメーション開始 ★15.11-15 ex10で追加

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    // アスペクト比を保持しつつキャンバスサイズを調整 ★15.11-15 ex10で追加
    const scale = Math.min(maxCanvasWidth / img.width, 1);
    const canvasWidth = img.width * scale;
    const canvasHeight = img.height * scale;

    originalCanvas.width = canvasWidth;
    originalCanvas.height = canvasHeight;
    filteredCanvas.width = canvasWidth;
    filteredCanvas.height = canvasHeight;

    originalCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight); // ★15.11-15 ex10で追加 (画像が大きく表示されすぎるので縮小するようにした)

    const imageData = originalCtx.getImageData(0, 0, canvasWidth, canvasHeight);

    // Web Workerを使って画像処理を実行 ★15.11-15 ex10で追加
    const worker = new Worker("worker.js");
    worker.postMessage({ imageData });

    worker.onmessage = (event) => {
      const outputImageData = event.data.imageData;
      filteredCtx.putImageData(outputImageData, 0, 0);
    };
  });

  reader.readAsDataURL(file);
});
