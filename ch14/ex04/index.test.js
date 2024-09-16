import { HiraganaChar } from "./index.js";

describe("HiraganaChar Class", () => {
  test("文字列が期待される場合、ひらがなを返す", () => {
    const char = new HiraganaChar("あ");
    expect(`${char}`).toBe("あ");
  });

  test("数字が期待される場合、UTF-16コード単位を返す", () => {
    const char = new HiraganaChar("あ");
    expect(+char).toBe(12354); // "あ" のUTF-16コード単位は12354
  });

  test("ソートが正しく動作する", () => {
    const chars = [
      new HiraganaChar("お"),
      new HiraganaChar("い"),
      new HiraganaChar("あ"),
    ];
    chars.sort((a, b) => (a > b ? 1 : -1));
    expect(chars.map((c) => `${c}`)).toEqual(["あ", "い", "お"]);
  });

  test("無効な文字が入力された場合にエラーをスローする", () => {
    expect(() => new HiraganaChar("abc")).toThrow(
      "ひらがな１文字を入力してください"
    );
  });
});
