import { repeatChar, square, getNow } from "./index.js";

describe("repeatChar", () => {
  it.each([
    [3, "a", ["a", "a", "a"]],
    [5, "b", ["b", "b", "b", "b", "b"]],
    [0, "c", []],
  ])("repeat character %s %i ", (n, c, expected) => {
    expect(repeatChar(n, c)).toEqual(expected);
  });

  it.each([
    [-1, "d"],
    ["a", "e"],
    [3, 1],
  ])("throws error %i, %s", (n, c) => {
    expect(() => repeatChar(n, c)).toThrow();
  });
});
describe("square", () => {
  it.each([
    [2, 4],
    [-3, 9],
    [0, 0],
    [10000, 100000000],
  ])("squares %i to equal %i", (x, expected) => {
    expect(square(x)).toBe(expected);
  });
});
describe("getNow", () => {
  test("current date", () => {
    const result = getNow();
    expect(result).toHaveProperty("now");
    expect(result.now).toBeInstanceOf(Date);
  });
});
