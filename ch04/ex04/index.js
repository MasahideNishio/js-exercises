export function bitCount(num) {
  if (isNaN(num)) {
    return NaN;
  }
  if (!Number.isInteger(num)) {
    return undefined;
  }
  let count = 0;
  for (let i = 0; i < 32; i++) {
    // 1をiの分だけビットをずらしていき、numとの論理積が1になるところを数える
    if (num & (1 << i)) {
      count++;
    }
  }
  return count;
}
