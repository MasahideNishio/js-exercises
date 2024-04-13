import { sub } from "./index.js";

describe("sub Test", () => {
  it.each([
    [5, 3],
    [2, 3],
    [-1, -2],
    [-1, 3],
    [2, -3],
    [1, NaN],
    [NaN, 1],
    [1, undefined],
    [undefined, 1],
    [1, null],
    [null, 1],
  ])("%s - %s", (num1, num2) => {
    expect(sub(num1, num2)).toEqual(num1 - num2);
  });
});
