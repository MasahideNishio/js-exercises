export function sum(arr) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((x, y) => x + y, 0);
}
export function join(arr, separater) {
  if (separater === undefined) separater = ",";
  if (!Array.isArray(arr)) throw new Error();
  if (arr.length === 0) return "";
  return arr.reduce((x, y) => {
    // nullのときは空文字にする
    if (y === null)
      return x + String(separater) + ""; // 文字列にしてセパレータでつなぐ
    else {
      return x + String(separater) + String(y); // 文字列にしてセパレータでつなぐ
    }
  });
}
export function reverse(arr) {
  if (!Array.isArray(arr)) throw new Error();
  return arr.reduce((x, y) => {
    return [y, ...x]; // yを先頭にしてxを展開して新たな配列として返す
  }, []);
}
export function every(arr, func) {
  if (!Array.isArray(arr)) throw new Error();
  return arr.reduce((x, y, i) => x && func(y, i, arr), true); // これまでの結果と次の要素の判定のANDを返していく(最初はtrue)
}
export function some(arr, func) {
  if (!Array.isArray(arr)) throw new Error();
  return arr.reduce((x, y, i) => x || func(y, i, arr), false); // これまでの結果と次の要素の判定のORを返していく(最初はfalse)
}
