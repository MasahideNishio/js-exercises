function pop(arr) {
  return arr.slice(0, -1); // 最初から末尾-1のところまでの部分配列を返す
}
function push(arr, val) {
  return [...arr, val]; // 展開して末尾に連結
}
function shift(arr) {
  return arr.slice(1); // 1番目から末尾までを返す
}
function unshift(arr, val) {
  return [val, ...arr]; // 1番目に新しい要素を加える
}
function sort(arr, func) {
  return [...arr].sort(func); // 展開して新たに作った配列をsortした結果を返す
}

// テスト
const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
