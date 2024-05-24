export function assign(target, ...sources) {
  for (const source of sources) {
    // プロパティ名を列挙
    const keys = Object.keys(source).concat(
      Object.getOwnPropertySymbols(source)
    );
    for (const key of keys) {
      target[key] = source[key];
    }
  }
}
