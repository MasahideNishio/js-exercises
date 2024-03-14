import { convertLFtoCRLF, convertCRLFtoLF } from "./index.js";

test("Convert LF to CRLF test", () => {
  const originalText = "aaa\nbbb\r\nccc";
  const expectedText = "aaa\r\nbbb\r\nccc";
  expect(convertLFtoCRLF(originalText)).toBe(expectedText);
});

test("Convert CRLF to LF test", () => {
  const originalText = "aaa\nbbb\r\nccc";
  const expectedText = "aaa\nbbb\nccc";
  expect(convertCRLFtoLF(originalText)).toBe(expectedText);
});
