// takagiWorker.js
onmessage = function (event) {
  const { maxDepth, width, height } = event.data;

  // https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%83%E3%83%9B%E6%9B%B2%E7%B7%9A

  // x1, y1, x2, y2: それぞれ、直線の始点と終点の座標。depth: 再帰の深さ
  class KochTile {
    constructor(x1, y1, x2, y2, depth) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.depth = depth;
    }

    // Koch曲線の再帰分割
    static *divide(tile, maxDepth) {
      if (tile.depth >= maxDepth) {
        yield tile;
        return;
      }

      const { x1, y1, x2, y2, depth } = tile;
      const dx = x2 - x1;
      const dy = y2 - y1;

      // 3分割し、中央を外向きに三角形を形成
      const xA = x1 + dx / 3;
      const yA = y1 + dy / 3;
      const xB = x1 + dx / 2 - (Math.sqrt(3) / 6) * dy;
      const yB = y1 + dy / 2 + (Math.sqrt(3) / 6) * dx;
      const xC = x1 + (2 * dx) / 3;
      const yC = y1 + (2 * dy) / 3;

      yield* KochTile.divide(new KochTile(x1, y1, xA, yA, depth + 1), maxDepth);
      yield* KochTile.divide(new KochTile(xA, yA, xB, yB, depth + 1), maxDepth);
      yield* KochTile.divide(new KochTile(xB, yB, xC, yC, depth + 1), maxDepth);
      yield* KochTile.divide(new KochTile(xC, yC, x2, y2, depth + 1), maxDepth);
    }
  }

  // Koch曲線を描画するピクセルデータを作成
  function renderKochCurve(maxDepth, width, height) {
    const imageData = new ImageData(width, height);
    const data = imageData.data;

    const startX = width * 0.1;
    const startY = height * 0.5;
    const endX = width * 0.9;
    const endY = height * 0.5;

    const initialTile = new KochTile(startX, startY, endX, endY, 0);
    const tiles = [...KochTile.divide(initialTile, maxDepth)];

    // ピクセルデータを更新
    for (const tile of tiles) {
      const x1 = Math.round(tile.x1);
      const y1 = Math.round(tile.y1);
      const x2 = Math.round(tile.x2);
      const y2 = Math.round(tile.y2);

      const index1 = (y1 * width + x1) * 4;
      const index2 = (y2 * width + x2) * 4;

      // 線を描画するために2つの点を結ぶ（単純にRGBを黒に設定）
      data[index1] = 0;
      data[index1 + 1] = 0;
      data[index1 + 2] = 0;
      data[index1 + 3] = 255;

      data[index2] = 0;
      data[index2 + 1] = 0;
      data[index2 + 2] = 0;
      data[index2 + 3] = 255;
    }

    return imageData;
  }

  const imageData = renderKochCurve(maxDepth, width, height);

  postMessage({ width, height, imageData });
};
