import { test, expect } from "@playwright/test";

test.describe("Product List Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/ch15.01-03/ex14/index.html"); // テスト対象のページを開く
  });

  test("カテゴリが全てのときに全商品が表示される", async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', "all"); // 「すべて」を選ぶ
    const products = await page.locator("ul#productList li");
    await expect(products).toHaveCount(3); // 3つの商品が表示される
  });

  test("カテゴリで食品を選択したときに食品のみ表示される", async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', "food"); // 食品を選ぶ

    // toBeVisible(),toBeHidden()が複数の要素に対して実行するとエラーになったため、Promise.allで実行
    // 食品アイテムが表示されることを確認
    const foodItems = await page.locator('li[data-category="food"]');
    const foodCount = await foodItems.count();

    await Promise.all(
      Array.from({ length: foodCount }).map((_, index) =>
        expect(foodItems.nth(index)).toBeVisible()
      )
    );

    // 文房具アイテムが非表示であることを確認
    const stationeryItems = await page.locator(
      'li[data-category="stationery"]'
    );
    const stationeryCount = await stationeryItems.count();

    await Promise.all(
      Array.from({ length: stationeryCount }).map((_, index) =>
        expect(stationeryItems.nth(index)).toBeHidden()
      )
    );
  });

  test("カテゴリで文房具を選択したときに文房具のみ表示される", async ({
    page,
  }) => {
    await page.selectOption('select[data-testid="select"]', "stationery"); // 文房具を選ぶ

    // toBeVisible(),toBeHidden()が複数の要素に対して実行するとエラーになったため、Promise.allで実行
    // 文房具アイテムが表示されることを確認
    const stationeryItems = await page.locator(
      'li[data-category="stationery"]'
    );
    const stationeryCount = await stationeryItems.count();

    await Promise.all(
      Array.from({ length: stationeryCount }).map((_, index) =>
        expect(stationeryItems.nth(index)).toBeVisible()
      )
    );

    // 食品アイテムが非表示であることを確認
    const foodItems = await page.locator('li[data-category="food"]');
    const foodCount = await foodItems.count();

    await Promise.all(
      Array.from({ length: foodCount }).map((_, index) =>
        expect(foodItems.nth(index)).toBeHidden()
      )
    );
  });
});
