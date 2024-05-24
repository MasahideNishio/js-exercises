import { returnAllProperties } from "./index.js";

describe("error cases", () => {
  it("null", () => {
    expect(returnAllProperties(null)).toEqual([]);
  });
  it("undefined", () => {
    expect(returnAllProperties(undefined)).toEqual([]);
  });
  it("string", () => {
    expect(returnAllProperties("hoge")).toEqual([]);
  });
});
describe("success cases", () => {
  it("プロパティがない", () => {
    const obj = {};
    expect(returnAllProperties(obj)).toEqual([]);
  });
  it("シンプルなケース", () => {
    const obj = { hoge: "aaa", fuga: "bbb" };
    expect(returnAllProperties(obj)).toEqual(["hoge", "fuga"]);
  });
  it("シンプルな継承ケース", () => {
    const parent = { prop1: "aaa" };
    const child = Object.create(parent);
    child.prop2 = "bbb";
    expect(returnAllProperties(child)).toEqual(["prop2", "prop1"]);
  });
  it("継承と列挙不可(列挙不可の継承プロパティを2つもち、片方は同名の列挙不可の独自プロパティで上書きした場合)", () => {
    const parent = { show1: "show1" };
    Object.defineProperty(parent, "hide1", {
      value: "hide1",
      writable: true,
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(parent, "hide2", {
      value: "hide2",
      writable: true,
      enumerable: false,
      configurable: true,
    });
    const child = Object.create(parent);
    child.show2 = "show2";
    Object.defineProperty(child, "hide2", {
      value: "hide2",
      writable: true,
      enumerable: false,
      configurable: true,
    });
    expect(returnAllProperties(child)).toEqual(["show2", "hide2", "show1"]); // 継承した列挙不可プロパティだけ列挙されないはず
  });
  it("array", () => {
    expect(returnAllProperties(["a", "b"])).toEqual(["0", "1", "length"]);
  });

  it("Symbol", () => {
    const sym1 = Symbol("sym1");
    const sym2 = Symbol("sym2");

    const obj = {};
    obj[sym1] = "value1";
    // sym2は列挙不可にしてみる
    Object.defineProperty(obj, sym2, {
      value: "value2",
      writable: true,
      enumerable: false,
      configurable: true,
    });

    expect(returnAllProperties(obj)).toEqual([sym1, sym2]);
  });
});
