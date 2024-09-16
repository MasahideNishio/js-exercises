import { getTemplateLiteralType } from "./index.js";

describe("templateLiteralType function", () => {
  it("return string", () => {
    const result = getTemplateLiteralType`This is a ${"test"}.`;
    expect(result).toBe("This is a string.");
  });

  it("return number", () => {
    const result = getTemplateLiteralType`The number is ${42}.`;
    expect(result).toBe("The number is number.");
  });

  it("return object", () => {
    const result = getTemplateLiteralType`Object: ${{ a: 1 }}.`;
    expect(result).toBe("Object: object.");
  });

  it("return boolean", () => {
    const result = getTemplateLiteralType`The boolean is ${true}.`;
    expect(result).toBe("The boolean is boolean.");
  });

  it("return undefined", () => {
    let undefinedValue;
    const result = getTemplateLiteralType`This value is ${undefinedValue}.`;
    expect(result).toBe("This value is undefined.");
  });

  it("return function", () => {
    const func = () => {};
    const result = getTemplateLiteralType`This is a ${func}.`;
    expect(result).toBe("This is a function.");
  });

  it("return Symbol", () => {
    const result = getTemplateLiteralType`Symbol: ${Symbol("sym")}.`;
    expect(result).toBe("Symbol: symbol.");
  });

  it("複数組合わせ", () => {
    const result = getTemplateLiteralType`String: ${"str"}, Number: ${100}, Boolean: ${true}.`;
    expect(result).toBe("String: string, Number: number, Boolean: boolean.");
  });

  it("空文字", () => {
    const result = getTemplateLiteralType``;
    expect(result).toBe("");
  });

  it("null", () => {
    const nullValue = null;
    const result = getTemplateLiteralType`null is a ${nullValue}.`;
    expect(result).toBe("null is a object.");
    //    expect(() => getTemplateLiteralType`This is a ${nullValue}.`).toThrow();
  });
});
