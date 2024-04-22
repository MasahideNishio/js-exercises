const NUM_MAX = 10;

export function fibFor() {
  let prev = 0;
  let curr = 1;
  const retval = [curr];
  for (let i = 2; i <= NUM_MAX; i++) {
    const newFib = prev + curr;
    prev = curr;
    curr = newFib;
    retval.push(curr);
  }
  return retval;
}

export function fibWhile() {
  let prev = 0;
  let curr = 1;
  let i = 2;
  const retval = [curr];
  while (i <= NUM_MAX) {
    const newFib = prev + curr;
    prev = curr;
    curr = newFib;
    retval.push(curr);
    i++;
  }
  return retval;
}

export function fibDoWhile() {
  let prev = 0;
  let curr = 1;
  let i = 2;
  const retval = [curr];
  do {
    const newFib = prev + curr;
    prev = curr;
    curr = newFib;
    retval.push(curr);
    i++;
  } while (i <= NUM_MAX);
  return retval;
}
