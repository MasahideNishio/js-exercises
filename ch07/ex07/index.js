// バブルソートは隣り合う要素同士を比較して入れ替えていくアルゴリズム。計算量はO(N2)

export function bubbleSort(
  arr,
  compare = (a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      if (aLower < bLower) return -1;
      if (aLower > bLower) return 1;
      return 0;
    }
    return a - b; // 数値の場合
  }
) {
  // 調べる範囲の開始位置を後ろにずらしていく
  for (let i = 0; i < arr.length; i++) {
    // 末尾から前に向かって比較していく
    for (let j = arr.length - 1; j > i; j--) {
      if (compare(arr[j - 1], arr[j]) > 0) {
        const tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    }
  }
}
