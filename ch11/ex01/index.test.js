import { TypeMap } from "./index.js"; // ts でも可

class Foo {}
class Bar {}

describe("TypeMap", () => {
  // テスト実行前にTypeMap生成
  let typeMap;
  beforeEach(() => {
    typeMap = new TypeMap();
  });

  it("String", () => {
    typeMap.set(String, "string");
    expect(typeMap.get(String)).toBe("string");
  });

  it("Number", () => {
    typeMap.set(Number, 123);
    expect(typeMap.get(Number)).toBe(123);
  });

  it("Boolean", () => {
    typeMap.set(Boolean, true);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  it("Foo", () => {
    const fooInstance = new Foo();
    typeMap.set(Foo, fooInstance);
    expect(typeMap.get(Foo)).toBe(fooInstance);
  });

  it("Date(error)", () => {
    expect(() => typeMap.set(Date, "not a date")).toThrow(Error);
    expect(() => typeMap.set(Date, "not a date")).toThrow(
      "Value must be an instance of Date"
    );
  });

  it("コンストラクタ違い", () => {
    expect(() => typeMap.set(Foo, new Bar())).toThrow(Error);
    expect(() => typeMap.set(Foo, new Bar())).toThrow(
      "Value must be an instance of Foo"
    );
  });

  it("型違い1", () => {
    expect(() => typeMap.set(Number, "not a number")).toThrow(Error);
    expect(() => typeMap.set(Number, "not a number")).toThrow(
      "Value must be an instance of Number"
    );
  });

  it("型違い2", () => {
    expect(() => typeMap.set(String, 123)).toThrow(Error);
    expect(() => typeMap.set(String, 123)).toThrow(
      "Value must be an instance of String"
    );
  });

  it("型違い3", () => {
    expect(() => typeMap.set(Boolean, "true")).toThrow(Error);
    expect(() => typeMap.set(Boolean, "true")).toThrow(
      "Value must be an instance of Boolean"
    );
  });
});
