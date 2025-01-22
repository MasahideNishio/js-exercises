/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ch17/ex05/index.js":
/*!****************************!*\
  !*** ./ch17/ex05/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ \"./ch17/ex05/updateGrid.js\");\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ \"./ch17/ex05/renderGrid.js\");\n/*\r\n修正したこと\r\n・updateGrid.jsとrenderGrid.jsに分割\r\n・ROWSとCOLSをupdateGridの引数に追加\r\n\r\n*/\n\n\nconst ROWS = 50;\nconst COLS = 50;\nconst RESOLUTION = 10;\nconst canvas = document.querySelector(\"#screen\");\nconst ctx = canvas.getContext(\"2d\");\nconst startButton = document.querySelector(\"#start\");\nconst pauseButton = document.querySelector(\"#pause\");\ncanvas.width = ROWS * RESOLUTION;\ncanvas.height = COLS * RESOLUTION;\nlet animationId = null;\nconst sound = new Audio(\"/ch15.04-10/ex10/decision1.mp3\");\nlet grid = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));\ncanvas.addEventListener(\"click\", function (evt) {\n  const rect = canvas.getBoundingClientRect();\n  const pos = {\n    x: evt.clientX - rect.left,\n    y: evt.clientY - rect.top\n  };\n  const row = Math.floor(pos.y / RESOLUTION);\n  const col = Math.floor(pos.x / RESOLUTION);\n  grid[row][col] = !grid[row][col];\n  sound.cloneNode().play();\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\n});\nfunction update() {\n  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid, ROWS, COLS);\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\n  animationId = requestAnimationFrame(update);\n}\nstartButton.addEventListener(\"click\", () => {\n  if (animationId) return;\n  update();\n});\npauseButton.addEventListener(\"click\", () => {\n  if (!animationId) return;\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\n\n//# sourceURL=webpack://preset/./ch17/ex05/index.js?");

/***/ }),

/***/ "./ch17/ex05/renderGrid.js":
/*!*********************************!*\
  !*** ./ch17/ex05/renderGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\nfunction renderGrid(grid, ROWS, COLS, RESOLUTION, ctx) {\n  for (let row = 0; row < ROWS; row++) {\n    for (let col = 0; col < COLS; col++) {\n      const cell = grid[row][col];\n      ctx.beginPath();\n      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\n      ctx.fillStyle = cell ? \"black\" : \"white\";\n      ctx.fill();\n      ctx.stroke();\n    }\n  }\n}\n\n//# sourceURL=webpack://preset/./ch17/ex05/renderGrid.js?");

/***/ }),

/***/ "./ch17/ex05/updateGrid.js":
/*!*********************************!*\
  !*** ./ch17/ex05/updateGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n// updateGrid.js\nfunction updateGrid(grid, ROWS, COLS) {\n  const nextGrid = grid.map(arr => [...arr]);\n  for (let row = 0; row < ROWS; row++) {\n    for (let col = 0; col < COLS; col++) {\n      let neighbors = 0;\n      for (let i = -1; i <= 1; i++) {\n        for (let j = -1; j <= 1; j++) {\n          if (i === 0 && j === 0) continue;\n          const newRow = row + i;\n          const newCol = col + j;\n          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {\n            neighbors += grid[newRow][newCol] ? 1 : 0;\n          }\n        }\n      }\n      if (grid[row][col]) {\n        nextGrid[row][col] = neighbors === 2 || neighbors === 3;\n      } else {\n        nextGrid[row][col] = neighbors === 3;\n      }\n    }\n  }\n  return nextGrid;\n}\n\n//# sourceURL=webpack://preset/./ch17/ex05/updateGrid.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch17/ex05/index.js");
/******/ 	
/******/ })()
;