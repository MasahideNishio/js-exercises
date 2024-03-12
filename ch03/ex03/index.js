export function areEqual(num1, num2) {
  return Math.abs(num1 - num2) < 1e-10; // 誤差1e-10よりも絶対値の差が小さければ等しいと判定する
}
