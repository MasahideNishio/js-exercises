export function returnAllProperties(obj) {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return [];
  }
  try {
    let retval = Object.getOwnPropertyNames(obj);
    retval = retval.concat(Object.getOwnPropertySymbols(obj));
    // プロトタイプチェーンを辿る
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
      retval = retval.concat(Object.keys(proto)); // 継承プロパティは列挙可能なものだけ
      proto = Object.getPrototypeOf(proto);
    }
    // 重複を消す
    retval = Array.from(new Set(retval));
    return retval;
  } catch {
    return [];
  }
}
