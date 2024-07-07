const { RenamedCounter } = require("./index");

const counter = new RenamedCounter();

console.log(counter.increment()); // 0 (initial count)
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
