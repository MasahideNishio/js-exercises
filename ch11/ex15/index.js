export function modifyUrl({ base, addQuery = [], path = "" }) {
  try {
    // base URLをURLオブジェクト化する
    const url = new URL(base);

    // クエリパラメータを足す
    addQuery.forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // パスパラメータを足す(pathが空のときは何もしない)
    if (path) url.pathname = path;

    return url.toString();
  } catch (e) {
    throw Error("Invalid URL");
  }
}
