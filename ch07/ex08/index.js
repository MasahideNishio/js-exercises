export function reverse(str) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(str));
  const retval = new Array(segments.length);
  for (let i = 0; i < segments.length; i++) {
    retval[retval.length - i - 1] = segments[i].segment;
  }
  return retval.join("");
}
