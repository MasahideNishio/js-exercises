// +を使わずに2進数の足し算をするロジックはネットを参考にしてみた
function bitAdd(a, b) {
  let sum = a ^ b; // 和(XOR)を取る→片方が1なら1、両方が1または0なら0なので桁上りがまだ考慮されていない状態の和になる
  let carry = (a & b) << 1; // 桁上り→両方が1なら桁が上がるので、ANDをとって1ビット左にずらす

  // 桁上りがなくなるまで
  while (carry !== 0) {
    const tempSum = sum;
    const tempCarry = carry;

    sum = tempSum ^ tempCarry; // 和と桁上りの和(XOR)を取る。片方が1なら1、両方が1または0なら0。
    carry = (tempSum & tempCarry) << 1; // 和と桁上りの両方が1なら桁が上がるので、ANDをとって1ビット左にずらして桁上りを更新
  }

  return sum;
}

export function sub(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return NaN;
  }
  num2 = bitAdd(~num2, 1); // 2の補数(ビット反転して1を加算)
  return bitAdd(num1, num2);
}
