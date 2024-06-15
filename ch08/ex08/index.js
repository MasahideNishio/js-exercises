function counter() {
  let n = 0;
  return {
    count: function () {
      return n++;
    },
    reset: function () {
      n = 0;
    },
  };
}

export function counterGroup() {
  let totalCount = 0;
  return {
    newCounter: function () {
      const newCounter = counter();
      // トータルを返すために、counterの各関数をラップする
      return {
        count: function () {
          totalCount++;
          return newCounter.count();
        },
        reset: function () {
          totalCount -= newCounter.count(); // そのカウンターのカウント分だけ引く
          newCounter.reset();
        },
      };
    },
    total: function () {
      return totalCount;
    },
  };
}
