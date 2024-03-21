import { equals } from "./index.js";
describe("Object equals test", () => {
    it("値が同じオブジェクトの比較(数値型)", () => {
        const obj1 = { x: 1, y: 2 };
        const obj2 = { x: 1, y: 2 };
    expect(equals(obj1, obj2)).toBe(true);
  });
    it("値が同じオブジェクトの比較(文字列型)", () => {
        const obj1 = { x: 'abc', y: 'def' };
        const obj2 = { x: 'abc', y: 'def' };
    expect(equals(obj1, obj2)).toBe(true);
  });
    it("空のオブジェクトの比較", () => {
        const obj1 = {};
        const obj2 = {};
    expect(equals(obj1, obj2)).toBe(true);
  });
    it("プロパティの数が異なる場合", () => {
        const obj1 = {x:1,y:2};
        const obj2 = {x:1,y:2,z:3};
    expect(equals(obj1, obj2)).toBe(false);
  });
    it("プロパティの値が異なる場合(数値)", () => {
        const obj1 = {x:1,y:2};
        const obj2 = {x:2,y:1};
    expect(equals(obj1, obj2)).toBe(false);
  });
    it("プロパティの値が異なる場合(NaN)", () => {
        const obj1 = {x:NaN};
        const obj2 = {x:NaN};
    expect(equals(obj1, obj2)).toBe(false);
  });
});
