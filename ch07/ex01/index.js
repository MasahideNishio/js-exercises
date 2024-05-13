// 同じサイズの行列同士かどうかを確認
function isSameSizeMatrix(m1, m2) {
  if (m1.length !== m2.length) {
    return false;
  }
  let result = true;

  // 各行ごとに同じ列数かどうかを確認
  for (let row = 0; row < m1.length; row++) {
    if (m1[row].length !== m2[row].length) {
      result = false;
      break;
    }
  }

  return result;
}
export function sumMatrix(m1, m2) {
  if (!Array.isArray(m1) || !Array.isArray(m2) || !isSameSizeMatrix(m1, m2)) {
    return undefined;
  }
  const retval = [];
  for (let row = 0; row < m1.length; row++) {
    retval[row] = [];
    for (let col = 0; col < m1[row].length; col++) {
      retval[row][col] = m1[row][col] + m2[row][col];
    }
  }
  return retval;
}
export function subMatrix(m1, m2) {
  if (!Array.isArray(m1) || !Array.isArray(m2) || !isSameSizeMatrix(m1, m2)) {
    return undefined;
  }
  const retval = [];
  for (let row = 0; row < m1.length; row++) {
    retval[row] = [];
    for (let col = 0; col < m1[row].length; col++) {
      retval[row][col] = m1[row][col] - m2[row][col];
    }
  }
  return retval;
}
