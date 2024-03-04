import { fib } from "./index.js";
describe("fib", () => {
  it("n=0のフィボナッチ数は0を返す", () => {
    expect(fib(0)).toBe(0);
  });
  it("n=1のフィボナッチ数は1を返す", () => {
    expect(fib(1)).toBe(1);
  });
  it("n=2のフィボナッチ数は1を返す", () => {
    expect(fib(2)).toBe(1);
  });
  it("n=5のフィボナッチ数は5を返す", () => {
    expect(fib(5)).toBe(5);
  });
  it("n=75のフィボナッチ数は2111485077978050を返す", () => {
    expect(fib(75)).toBe(2111485077978050);
  });
});
