import { Counter } from "./index.js";

const counter = new Counter();

console.log(counter.increment()); // 0 (初回のカウント)
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
