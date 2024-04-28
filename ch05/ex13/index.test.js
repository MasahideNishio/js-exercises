import { fibGen } from "./index.js";
const answer = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const fib = fibGen();
describe("fibGen", () => {
  it("フィボナッチ数を10個ジェネレータ関数で生成", () => {
    for (let i = 0; i < 10; i++) {
      const resultObj = fib.next();
      console.log(JSON.stringify(resultObj));
      expect(resultObj).toEqual({ value: answer[i], done: false });
    }
    // 最後の一回はdoneが異なるので別にした
    const resultObj = fib.next();
    console.log(JSON.stringify(resultObj));
    expect(fib.next()).toEqual({ done: true });
  });
});
