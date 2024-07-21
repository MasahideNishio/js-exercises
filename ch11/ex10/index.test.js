import { getDaysOfMonth, getWeekdays, getDayOfWeekByLocale } from "./index.js";

describe("getDaysOfMonth", () => {
  it("閏年の2月", () => {
    expect(getDaysOfMonth(2024, 2)).toBe(29);
  });
  it("閏年じゃない2月", () => {
    expect(getDaysOfMonth(2023, 2)).toBe(28);
  });

  it("4月は30日", () => {
    expect(getDaysOfMonth(2023, 4)).toBe(30);
  });
  it("12月は31日", () => {
    expect(getDaysOfMonth(2023, 12)).toBe(31);
  });

  it("エラー", () => {
    expect(() => getDaysOfMonth(2023, 13)).toThrow(
      "monthには1～12を指定すること"
    );
  });
});

describe("getWeekdays", () => {
  it("平日のみ", () => {
    expect(getWeekdays("2024-01-01", "2024-01-07")).toBe(5);
  });

  it("1ヶ月＝平日は21日分", () => {
    expect(getWeekdays("2023-07-01", "2023-07-31")).toBe(21);
  });

  it("1日", () => {
    expect(getWeekdays("2024-02-29", "2024-02-29")).toBe(1);
  });
});

describe("getDayOfWeekByLocale", () => {
  it("日本語ロケール", () => {
    expect(getDayOfWeekByLocale("2024-01-01", "ja-JP")).toBe("月曜日");
  });

  it("英語ロケール", () => {
    expect(getDayOfWeekByLocale("2024-07-04", "en-US")).toBe("Thursday");
  });
});
