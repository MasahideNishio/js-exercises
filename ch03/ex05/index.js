export function convertLFtoCRLF(text) {
  return text.replace(/\r?\n/g, "\r\n"); // \r\nと\nを\r\nに変換する
}
export function convertCRLFtoLF(text) {
  return text.replace(/\r\n/g, "\n"); // \r\nを\nに変換する
}
