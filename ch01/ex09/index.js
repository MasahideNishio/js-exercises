class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}
class WordHistogram {
  constructor() {
    this.wordCounts = new DefaultMap(0);
    this.totalWords = 0;
  }
  add(text) {
    //    text = text.replace(/\s/g, "").toUpperCase();
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    const words = [...matches].map((r) => r[0]);
    for (const word of words) {
      const count = this.wordCounts.get(word);
      this.wordCounts.set(word, count + 1);
      this.totalWords++;
    }
  }
  toString() {
    let entries = [...this.wordCounts];
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });
    for (const entry of entries) {
      entry[1] = (entry[1] / this.totalWords) * 100;
    }
    // entries = entries.filter((entry) => entry[1] >= 1);
    // const lines = entries.map(
    //   ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
    // );

    // 出現頻度 0.5% 以上を取得
    entries = entries.filter((entry) => entry[1] >= 0.5);
    // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
    );
    return lines.join("\n");
  }
}
async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  const histogram = new WordHistogram();
  for await (const chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}
histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
