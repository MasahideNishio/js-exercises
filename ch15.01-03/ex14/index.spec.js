const { test, expect } = require("@playwright/test");

test.describe("Product List Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("全てのカテゴリが選択されたときにすべての商品が表示される", async ({
    page,
  }) => {
    await page.selectOption('select[data-testid="select"]', "all");
    const products = await page.locator("ul#productList li");
    await expect(products).toHaveCount(3); // すべての商品が表示される
  });

  test("食品カテゴリを選択したときに食品のみ表示される", async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', "food");
    const foodProduct = await page.locator('li[data-testid="food1"]');
    await expect(foodProduct).toBeVisible(); // 食品が表示される
    const stationeryProducts = await page.locator(
      'li[data-category="stationery"]'
    );
    await expect(stationeryProducts).toBeHidden(); // 文房具は非表示
  });

  test("文房具カテゴリを選択したときに文房具のみ表示される", async ({
    page,
  }) => {
    await page.selectOption('select[data-testid="select"]', "stationery");
    const stationeryProducts = await page.locator(
      'li[data-category="stationery"]'
    );
    await expect(stationeryProducts).toBeVisible(); // 文房具が表示される
    const foodProduct = await page.locator('li[data-testid="food1"]');
    await expect(foodProduct).toBeHidden(); // 食品は非表示
  });
});
