export function updateGrid(grid, ROWS, COLS) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let neighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;

          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            neighbors += grid[newRow][newCol] ? 1 : 0;
          }
        }
      }

      if (grid[row][col]) {
        nextGrid[row][col] = neighbors === 2 || neighbors === 3;
      } else {
        nextGrid[row][col] = neighbors === 3;
      }
    }
  }

  return nextGrid;
}
