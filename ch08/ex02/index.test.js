import { powRecursion, powLoop } from "./index.js";
describe("powRecursion", () => {
  it.each([
    [2, 10],
    [-1, 2],
    [0, 4],
    [4, 0],
  ])(" %i %i ", (x, n) => {
    expect(powRecursion(x, n)).toEqual(Math.pow(x, n));
  });
});
describe("powLoop", () => {
  it.each([
    [2, 10],
    [-1, 2],
    [0, 4],
    [4, 0],
  ])(" %i %i ", (x, n) => {
    expect(powLoop(x, n)).toEqual(Math.pow(x, n));
  });
});
