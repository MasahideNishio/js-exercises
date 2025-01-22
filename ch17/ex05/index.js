/*
修正したこと
・updateGrid.jsとrenderGrid.jsに分割
・ROWSとCOLSをupdateGridの引数に追加

*/
import { updateGrid } from "./updateGrid.js";
import { renderGrid } from "./renderGrid.js";

const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null;
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid, ROWS, COLS, RESOLUTION, ctx);
});

function update() {
  grid = updateGrid(grid, ROWS, COLS);
  renderGrid(grid, ROWS, COLS, RESOLUTION, ctx);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  if (animationId) return;
  update();
});

pauseButton.addEventListener("click", () => {
  if (!animationId) return;
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid, ROWS, COLS, RESOLUTION, ctx);
