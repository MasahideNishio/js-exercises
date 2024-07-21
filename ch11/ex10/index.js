// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysOfMonth(year, month) {
  if (month < 1 || month > 12) {
    throw new Error("monthには1～12を指定すること");
  }
  return new Date(year, month, 0).getDate(); // getDateで返すだけ
}
// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getWeekdays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  // 1日ずつ進めていき、土日(0と6以外ならカウントする)
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
  }
  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeekByLocale(dateStr, localeStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(localeStr, { weekday: "long" }); // optionsのweekdayにlongを指定し長い書式で返す
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getStartOfLastMonth() {
  const retval = new Date(); // 今月
  retval.setDate(0); // 0をセットすると先月末になる
  retval.setDate(1); // 1をセットし先月の頭にする
  retval.setHours(0, 0, 0, 0); // 時刻に 0 時 0 分 0 秒をセットする
  return retval;
}

// これのテストだけここで。
console.log("getStartOfLastMonth()");
console.log(getStartOfLastMonth().toLocaleString()); // 2024/6/1 0:00:00 (7月に試したときの結果)
