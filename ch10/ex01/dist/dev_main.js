/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\r\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\r\nconst s = new BitSet(100);\r\ns.insert(10);\r\ns.insert(20);\r\ns.insert(30);\r\nconst average = stats.mean([...s]);\r\nconsole.log(average);\r\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/index.cjs?");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((module) => {

eval("class AbstractSet {\r\n  has(x) {\r\n    throw new Error(\"Abstract method\");\r\n  }\r\n}\r\nclass NotSet extends AbstractSet {\r\n  constructor(set) {\r\n    super();\r\n    this.set = set;\r\n  }\r\n  has(x) {\r\n    return !this.set.has(x);\r\n  }\r\n  toString() {\r\n    return `{x|x∈${this.set.toString()}}`;\r\n  }\r\n}\r\n\r\n// class RangeSet extends AbstractSet {\r\n//   constructor(from, to) {\r\n//     super();\r\n//     this.from = from;\r\n//     this.to = to;\r\n//   }\r\n//   has(x) {\r\n//     return x >= this.from && x <= this.to;\r\n//   }\r\n//   toString() {\r\n//     return `x|${this.from} ≦ x ≦ ${this.to}`;\r\n//   }\r\n// }\r\nclass AbstractEnumerableSet extends AbstractSet {\r\n  get size() {\r\n    throw new Error(\"Abstract Method\");\r\n  }\r\n  [Symbol.iterator]() {\r\n    throw new Error(\"Abstract method\");\r\n  }\r\n  isEmpty() {\r\n    return this.size === 0;\r\n  }\r\n  toString() {\r\n    return `{${Array.from(this).join(\", \")}}`;\r\n  }\r\n  equals(set) {\r\n    if (!(set instanceof AbstractEnumerableSet)) return false;\r\n    if (this.size !== set.size) return false;\r\n    for (const element of this) {\r\n      if (!set.has(element)) return false;\r\n    }\r\n    return true;\r\n  }\r\n}\r\n\r\n// class SingletonSet extends AbstractEnumerableSet {\r\n//   constructor(member) {\r\n//     super();\r\n//     this.member = member;\r\n//   }\r\n//   has(x) {\r\n//     return x === this.member;\r\n//   }\r\n//   get size() {\r\n//     return 1;\r\n//   }\r\n//   *[Symbol.iterator]() {\r\n//     yield this.member;\r\n//   }\r\n// }\r\nclass AbstractWritableSet extends AbstractEnumerableSet {\r\n  insert(x) {\r\n    throw new Error(\"Abstract Method\");\r\n  }\r\n  remove(x) {\r\n    throw new Error(\"Abstract Method\");\r\n  }\r\n  add(set) {\r\n    for (const element of set) {\r\n      this.insert(element);\r\n    }\r\n  }\r\n  subtract(set) {\r\n    for (const element of set) {\r\n      this.remove(element);\r\n    }\r\n  }\r\n  intersect(set) {\r\n    for (const element of this) {\r\n      if (!set.has(element)) {\r\n        this.remove(element);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nclass BitSet extends AbstractWritableSet {\r\n  constructor(max) {\r\n    super();\r\n    this.max = max;\r\n    this.n = 0;\r\n    this.numBytes = Math.floor(max / 8) + 1;\r\n    this.data = new Uint8Array(this.numBytes);\r\n  }\r\n  _valid(x) {\r\n    return Number.isInteger(x) && x >= 0 && x <= this.max;\r\n  }\r\n  _has(byte, bit) {\r\n    return (this.data[byte] & BitSet.bits[bit]) !== 0;\r\n  }\r\n  has(x) {\r\n    if (this._valid(x)) {\r\n      const byte = Math.floor(x / 8);\r\n      const bit = x % 8;\r\n      return this._has(byte, bit);\r\n    } else {\r\n      return false;\r\n    }\r\n  }\r\n  insert(x) {\r\n    if (this._valid(x)) {\r\n      const byte = Math.floor(x / 8);\r\n      const bit = x % 8;\r\n      if (!this._has(byte, bit)) {\r\n        this.data[byte] |= BitSet.bits[bit];\r\n        this.n++;\r\n      }\r\n    } else {\r\n      throw new TypeError(\"Invalid set element: \" + x);\r\n    }\r\n  }\r\n  remove(x) {\r\n    if (this._valid(x)) {\r\n      const byte = Math.floor(x / 8);\r\n      const bit = x % 8;\r\n      if (this._has(byte, bit)) {\r\n        this.data[byte] &= BitSet.masks[bit];\r\n        this.n--;\r\n      } else {\r\n        throw new TypeError(\"Invalid set element:\" + x);\r\n      }\r\n    }\r\n  }\r\n  get size() {\r\n    return this.n;\r\n  }\r\n  *[Symbol.iterator]() {\r\n    for (let i = 0; i <= this.max; i++) {\r\n      if (this.has(i)) {\r\n        yield i;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\r\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\r\n\r\nmodule.exports = BitSet;\r\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/sets.cjs?");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const sum = (x, y) => x + y;\r\nconst square = (x) => x * x;\r\nexports.mean = (data) => data.reduce(sum) / data.length;\r\nexports.stddev = function (d) {\r\n  const m = exports.mean(d);\r\n  return Math.sqrt(\r\n    d\r\n      .map((x) => x - m)\r\n      .map(square)\r\n      .reduce(sum) /\r\n      (d.length - 1)\r\n  );\r\n};\r\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/stats.cjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;