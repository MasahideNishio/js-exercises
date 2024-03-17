test("オブジェクトの配列への分割代入が正しく行われること", () => {
  const points = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
  ];
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;
  expect(x1).toBe(1);
  expect(y1).toBe(2);
  expect(x2).toBe(3);
  expect(y2).toBe(4);
});
