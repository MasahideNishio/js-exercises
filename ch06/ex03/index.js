const o = {};
o.x = 1;
const p = Object.create(o);
p.y = 2;
const q = Object.create(p);
q.z = 3;
// const f = q.toString();
// q.x + q.y;

// ここから確認
console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true
console.log(p.isPrototypeOf(q)); // true
console.log(q.isPrototypeOf(p)); // false

// Object, Array, Date, Map のプロトタイプチェーンの継承関係を確認
const obj = {};
const arr = [];
const date = new Date();
const map = new Map();

// プロトタイプチェーンの確認
// Object.prototypeを継承してるか
console.log(Object.prototype.isPrototypeOf(obj)); // true
console.log(Object.prototype.isPrototypeOf(arr)); // true
console.log(Object.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(map)); // true

// それぞれArray、Date、Mapのprototypeを継承
console.log(Array.prototype.isPrototypeOf(arr)); // true
console.log(Date.prototype.isPrototypeOf(date)); // true
console.log(Map.prototype.isPrototypeOf(map)); // true

// Array、Date、MapのprototypeはObjectのprototypeを継承
console.log(Object.prototype.isPrototypeOf(Array.prototype)); // true
console.log(Object.prototype.isPrototypeOf(Date.prototype)); // true
console.log(Object.prototype.isPrototypeOf(Map.prototype)); // true
