export function powRecursion(x, n) {
  return n > 0 ? x * powRecursion(x, n - 1) : 1;
}
export function powLoop(x, n) {
  let retval = 1;
  while (n > 0) {
    retval = retval * x;
    n--;
  }
  return retval;
}
