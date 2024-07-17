export function detectFileType(buffer) {
  const byteArray = new Uint8Array(buffer); // バイト列に変換

  // PDF
  if (
    byteArray[0] === 0x25 &&
    byteArray[1] === 0x50 &&
    byteArray[2] === 0x44 &&
    byteArray[3] === 0x46 &&
    byteArray[4] === 0x2d
  ) {
    return "PDF";
  }

  // ZIP
  if (byteArray[0] === 0x50 && byteArray[1] === 0x4b) {
    return "ZIP";
  }

  // GIF
  if (
    byteArray[0] === 0x47 &&
    byteArray[1] === 0x49 &&
    byteArray[2] === 0x46 &&
    byteArray[3] === 0x38
  ) {
    return "GIF";
  }

  // PNG
  if (
    byteArray[0] === 0x89 &&
    byteArray[1] === 0x50 &&
    byteArray[2] === 0x4e &&
    byteArray[3] === 0x47
  ) {
    return "PNG";
  }

  return "UNKNOWN";
}
