import { fibFor, fibWhile, fibDoWhile } from "./index.js";
const answer = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
describe("fib", () => {
  it("by for loop", () => {
    expect(fibFor()).toEqual(answer);
  });
  it("by for while", () => {
    expect(fibWhile()).toEqual(answer);
  });
  it("by for do while", () => {
    expect(fibDoWhile()).toEqual(answer);
  });
});
