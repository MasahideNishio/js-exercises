async function retryWithExponentialBackoff(func, maxRetry) {
  let retryCount = 0;
  let delay = 1000;

  return new Promise(async (resolve, reject) => {
    // リトライ処理のためのループ
    while (retryCount < maxRetry) {
      try {
        const result = await func(); // 関数を実行し成功すればその結果を返す
        return resolve(result);
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetry) {
          return reject(new Error("Max retries exceeded"));
        }
        console.log(
          `Retrying in ${delay / 1000} seconds (retryCount ${retryCount})`
        );
        await new Promise((r) => setTimeout(r, delay)); // 遅延を入れて次のリトライへ
        delay *= 2; // 遅延時間を指数的に増加
      }
    }
  });
}
async function fetchWithRetry(url) {
  try {
    const response = await retryWithExponentialBackoff(
      () => fetch(url),
      5 // 最大5回リトライ
    );
    console.log("Request succeeded:", response);
  } catch (error) {
    console.error("Request failed:", error);
  }
}
async function test() {
  await fetchWithRetry("https://example.com"); // すぐに成功する
  await fetchWithRetry("https://hoge.com"); // 1、2、4、8、16秒後にリトライして最後エラーになる
}

test();
// 実行結果
// Request succeeded: Response {
//   status: 200,
//   statusText: 'OK',
//   headers: Headers {
//     'content-encoding': 'gzip',
//     'accept-ranges': 'bytes',
//     age: '402825',
//     'cache-control': 'max-age=604800',
//     'content-type': 'text/html; charset=UTF-8',
//     date: 'Tue, 27 Aug 2024 10:35:56 GMT',
//     etag: '"3147526947"',
//     expires: 'Tue, 03 Sep 2024 10:35:56 GMT',
//     'last-modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
//     server: 'ECAcc (sac/252A)',
//     vary: 'Accept-Encoding',
//     'x-cache': 'HIT',
//     'content-length': '648'
//   },
//   body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
//   bodyUsed: false,
//   ok: true,
//   redirected: false,
//   type: 'basic',
//   url: 'https://example.com/'
// }
// Retrying in 1 seconds (retryCount 1)
// Retrying in 2 seconds (retryCount 2)
// Retrying in 4 seconds (retryCount 3)
// Retrying in 8 seconds (retryCount 4)
// Request failed: Error: Max retries exceeded
//     at file:///C:/Users/r00514699/js_ex/js-exercises/ch13/ex11/index.js:14:25
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5
// )
