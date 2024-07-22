function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0;
  let delay = 1000;

  function innerFunc() {
    if (func()) {
      clearInterval(clock); // 成功したらIntervalを解除
      callback(true); // callbackを呼び出し
    } else {
      retryCount++; // 失敗したらリトライカウントをインクリメント
      delay *= 2; // 待ち時間を二倍にしていく
      if (retryCount >= maxRetry) {
        clearInterval(clock); // 上限を超えたらIntervalを解除
        callback(false); // callbackを呼び出し
      }
    }
  }

  // clearIntervalされるまでinnerFuncを呼び続ける。
  const clock = setInterval(innerFunc, delay);
}

// 5回呼び出されたら成功する関数
function fiveCallSuccess() {
  let n = 0;
  return {
    execute: function () {
      console.log("fiveCallSuccess.execute() called n : ", n);
      if (n > 4) {
        return true;
      } else {
        n++;
        return false;
      }
    },
  };
}
function callbackFunc(result) {
  console.log("callbackFunc called result : ", result);
}
const a = fiveCallSuccess();
const b = fiveCallSuccess();
retryWithExponentialBackoff(a.execute, 3, callbackFunc);

retryWithExponentialBackoff(b.execute, 6, callbackFunc);

// 実行結果
// 2つの処理が同時に走っているので分かりづらいが、maxが3だとfalseをcallbackし、6だとtrueをcallbackしている
// fiveCallSuccess called n :  0
// fiveCallSuccess called n :  0
// fiveCallSuccess called n :  1
// fiveCallSuccess called n :  1
// fiveCallSuccess called n :  2
// callbackFunc called result :  false
// fiveCallSuccess called n :  2
// fiveCallSuccess called n :  3
// fiveCallSuccess called n :  4
// fiveCallSuccess called n :  5
// callbackFunc called result :  true
