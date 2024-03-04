export function fib(n) {
  if (n <= 1) {
    return n;
  }
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const newFib = prev + curr;
    prev = curr;
    curr = newFib;
  }
  return curr;
}
