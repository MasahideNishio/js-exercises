class FileSizeError extends Error {
  constructor(filePath, maxSize) {
    super(`${filePath} : ${maxSize}`);
    this.name = "FileSizeError";
    this.filePath = filePath;
    this.maxSize = maxSize;
  }
}
function loadFile(filePath) {
  // ファイルを読み込む処理の想定
  console.log(filePath);
}
function checkFileSize(filePath, maxSize) {
  // ファイルを開く処理
  const file = (filePath) => loadFile(filePath);
  if (file.size > maxSize) {
    throw FileSizeError(filePath, maxSize);
  }
}

checkFileSize("./hoge.bmp", 100);
