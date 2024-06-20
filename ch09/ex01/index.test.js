import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1); // Cの静的メソッド
  expect(new C().method()).toBe(2); // Cのインスタンスのメソッド
  expect(C.C.method()).toBe(3); // Cの静的プロパティCクラスの静的メソッド
  expect(new C.C().method()).toBe(4); // Cの静的プロパティCクラスのインスタンスのメソッド
  expect(new C().C.method()).toBe(5); // Cのインスタンスの静的プロパティCのメソッド
  expect(new new C().C().method()).toBe(6); // CのインスタンスのプロパティCのインスタンスのメソッド
});
