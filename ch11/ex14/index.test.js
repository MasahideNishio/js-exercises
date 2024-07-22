import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  it("はとぱとば", () => {
    const input = ["パイン", "ひぐらし", "ばなな", "ハナ"];
    const expected = ["パイン", "ハナ", "ばなな", "ひぐらし"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("つとっ", () => {
    const input = ["ぽっくー", "ぽつきー", "ぽっかー", "ぽちきー", "ぽてと"];
    const expected = ["ぽちきー", "ぽっかー", "ぽつきー", "ぽっくー", "ぽてと"];
    expect(sortJapanese(input)).toEqual(expected);
  });
});

describe("toJapaneseDateString", () => {
  it("和暦にフォーマットされる", () => {
    const date = new Date(2024, 3, 2); // 2024年4月2日
    const expected = "令和6年4月2日";
    expect(toJapaneseDateString(date)).toBe(expected);
  });
});
