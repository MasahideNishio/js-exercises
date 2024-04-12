import { bitCount } from "./index.js";

describe("bitCount Test", () => {
  it.each([
    [0, 0],
    [1, 1],
    [0.1, undefined],
    [-1, 32],
    [0b111, 3],
    [0b1111111111111111111111111111111, 31],
    [0b11111111111111111111111111111111, 32],
    [0b111111111111111111111111111111111, 32],
    ["a", NaN],
    [NaN, NaN],
    [null, undefined],
  ])("num : %s, expect : %s ", (num, exp) => {
    expect(bitCount(num)).toEqual(exp);
  });
});
