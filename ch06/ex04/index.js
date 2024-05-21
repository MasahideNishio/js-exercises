const hoge = {};
Object.defineProperty(hoge, "prop1_allTrue", {
  value: 111,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(hoge, "prop2_writableFalse", {
  value: 222,
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(hoge, "prop3_enumerableFalse", {
  value: 333,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(hoge, "prop4_configurableFalse", {
  value: 444,
  writable: true,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(hoge, "prop5_writableFalse_enumerableFalse", {
  value: 555,
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(hoge, "prop6_writableFalse_configurableFalse", {
  value: 666,
  writable: false,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(hoge, "prop7_enumerableFalse_configurableFalse", {
  value: 777,
  writable: true,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(hoge, "prop8_allFalse", {
  value: 888,
  writable: false,
  enumerable: false,
  configurable: false,
});

// 代入
// writableはデフォルトはfalse。falseだと代入演算子での代入はTypeErrorになる。
// enumerableとconfigurableは影響しない
console.log("代入");
hoge.prop1_allTrue = 1111;
console.log(hoge.prop1_allTrue); // 成功
// hoge.prop2_writableFalse = 2222; // TypeError
hoge.prop3_enumerableFalse = 3333;
console.log(hoge.prop3_enumerableFalse); // 成功
hoge.prop4_configurableFalse = 4444;
console.log(hoge.prop4_configurableFalse); // 成功
// hoge.prop5_writableFalse_enumerableFalse = 5555; // TypeError
// hoge.prop6_writableFalse_configurableFalse = 6666; // TypeError
hoge.prop7_enumerableFalse_configurableFalse = 7777;
console.log(hoge.prop7_enumerableFalse_configurableFalse); // 成功
// hoge.prop8_allFalse = 8888; // TypeError

// hasOwnProperty
// すべてtrue
console.log("hasOwnProperty");
console.log(hoge.hasOwnProperty("prop1_allTrue"));
console.log(hoge.hasOwnProperty("prop2_writableFalse"));
console.log(hoge.hasOwnProperty("prop3_enumerableFalse"));
console.log(hoge.hasOwnProperty("prop4_configurableFalse"));
console.log(hoge.hasOwnProperty("prop5_writableFalse_enumerableFalse"));
console.log(hoge.hasOwnProperty("prop6_writableFalse_configurableFalse"));
console.log(hoge.hasOwnProperty("prop7_enumerableFalse_configurableFalse"));
console.log(hoge.hasOwnProperty("prop8_allFalse"));

// propertyIsEnumerable (enumerableがfalseのときだけfalseになる)
console.log("propertyIsEnumerable");
console.log(hoge.propertyIsEnumerable("prop1_allTrue")); // true
console.log(hoge.propertyIsEnumerable("prop2_writableFalse")); // true
console.log(hoge.propertyIsEnumerable("prop3_enumerableFalse")); // false
console.log(hoge.propertyIsEnumerable("prop4_configurableFalse")); // true
console.log(hoge.propertyIsEnumerable("prop5_writableFalse_enumerableFalse")); // false
console.log(hoge.propertyIsEnumerable("prop6_writableFalse_configurableFalse")); // true
console.log(
  hoge.propertyIsEnumerable("prop7_enumerableFalse_configurableFalse") // false
);
console.log(hoge.propertyIsEnumerable("prop8_allFalse")); // false

// 削除できるか configurableがfalseだと削除不可
console.log("削除できるか");
console.log(delete hoge.prop1_allTrue); // true
console.log(delete hoge.prop2_writableFalse); // true
console.log(delete hoge.prop3_enumerableFalse); // true
// console.log(delete hoge.prop4_configurableFalse); // TypeError
console.log(delete hoge.prop5_writableFalse_enumerableFalse); // true
// console.log(delete hoge.prop6_writableFalse_configurableFalse); // TypeError
// console.log(delete hoge.prop7_enumerableFalse_configurableFalse); // TypeError
// console.log(delete hoge.prop8_allFalse); // TypeError
