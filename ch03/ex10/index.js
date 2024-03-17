const testObject = { hoge: 123, fuga: "abc", foo: true };
console.log(`testObject = { hoge: 123, fuga: "abc", foo: true }`);
console.log("プロパティ名の一覧");
for (const property in testObject) {
  console.log(property);
}
console.log("値の一覧");
for (const property in testObject) {
  console.log(testObject[property]);
}
