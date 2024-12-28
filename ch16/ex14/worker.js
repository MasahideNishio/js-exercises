// ワーカーで受信したデータを処理
onmessage = (event) => {
  const { imageData, width, height } = event.data;
  const { data } = imageData;

  const kernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1],
  ];
  const kernelWeight = 256;

  const outputData = new Uint8ClampedArray(data.length);

  // ガウシアンフィルタ適用
  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = -2; ky <= 2; ky++) {
        for (let kx = -2; kx <= 2; kx++) {
          const weight = kernel[ky + 2][kx + 2];
          const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
          r += data[pixelIndex] * weight;
          g += data[pixelIndex + 1] * weight;
          b += data[pixelIndex + 2] * weight;
        }
      }

      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = r / kernelWeight;
      outputData[outputIndex + 1] = g / kernelWeight;
      outputData[outputIndex + 2] = b / kernelWeight;
      outputData[outputIndex + 3] = data[outputIndex + 3]; // Alpha値はそのまま
    }
  }

  // メインスレッドにデータを送信
  postMessage({ filteredData: outputData });
};
