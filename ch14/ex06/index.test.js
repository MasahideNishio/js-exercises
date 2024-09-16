import { createLoggingProxy } from "./index.js";

describe("createLoggingProxy", () => {
  let obj;
  let proxy;
  let callLog;

  // 各テストの前にオブジェクトとProxyを準備しておく
  beforeEach(() => {
    obj = {
      greet(name) {
        return `Hello, ${name}!`;
      },
      add(a, b) {
        return a + b;
      },
    };
    const result = createLoggingProxy(obj);
    proxy = result.proxy;
    callLog = result.callLog;
  });

  it("元のメソッドが正しく呼ばれ、結果を返す", () => {
    expect(proxy.greet("Alice")).toBe("Hello, Alice!");
  });

  it("メソッド呼び出しが履歴に記録される", () => {
    proxy.greet("Alice");
    expect(callLog.length).toBe(1);
    expect(callLog[0]).toMatchObject({
      methodName: "greet",
      parameters: ["Alice"],
    });
  });

  it("メソッド呼び出しのタイムスタンプが正しい範囲に記録される", () => {
    const before = Date.now();
    proxy.add(2, 3);
    const after = Date.now();
    expect(callLog[0].timestamp.getTime()).toBeGreaterThanOrEqual(before);
    expect(callLog[0].timestamp.getTime()).toBeLessThanOrEqual(after);
  });

  it("別のメソッドでも正しい結果が返される", () => {
    expect(proxy.add(5, 3)).toBe(8);
  });

  it("複数のメソッド呼び出しが履歴に記録される", () => {
    proxy.greet("Bob");
    proxy.add(10, 15);
    expect(callLog.length).toBe(2);
    expect(callLog[0]).toMatchObject({
      methodName: "greet",
      parameters: ["Bob"],
    });
    expect(callLog[1]).toMatchObject({
      methodName: "add",
      parameters: [10, 15],
    });
  });

  it("関数ではないプロパティは記録されない", () => {
    obj.prop = "test";
    proxy.prop = "changed";
    expect(callLog.length).toBe(0);
  });

  it("引数なしのメソッドが正しく処理される", () => {
    obj.noArgsMethod = () => "No args!";
    expect(proxy.noArgsMethod()).toBe("No args!");
    expect(callLog[0]).toMatchObject({
      methodName: "noArgsMethod",
      parameters: [],
    });
  });

  it("メソッドがエラーを投げた場合、正しくエラーがスローされる", () => {
    obj.throwError = () => {
      throw new Error("Something went wrong");
    };
    expect(() => proxy.throwError()).toThrow("Something went wrong");
  });
});
