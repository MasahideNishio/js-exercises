describe("emoji length test", () => {
  it("Length of 💯 is 1", () => {
    const emoji = "💯";
    expect(emoji.length).toBe(2); // UTF-16のコード単位の数を返す(\uD83D\uDCAF)
  });
  it("UTF-16 code point test", () => {
    const emoji = "💯";
    const utf16CodePoint = "\uD83D\uDCAF";
    expect(emoji).toEqual(utf16CodePoint);
  });
  it("UTF-32 code point test", () => {
    const emoji = "💯";
    const utf32CodePoint = "\u{0001F4AF}";
    expect(emoji).toEqual(utf32CodePoint);
  });
});
