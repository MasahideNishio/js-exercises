export function createLoggingProxy(target) {
  // メソッド呼び出しの履歴を保存する配列
  const callLog = [];

  // Proxyハンドラ
  const handler = {
    get(target, prop, receiver) {
      const original = target[prop];

      // プロパティが関数（メソッド）であるかを確認
      if (typeof original === "function") {
        return function (...args) {
          // 呼び出し履歴に追加
          callLog.push({
            methodName: prop, // メソッド名
            timestamp: new Date(), // 呼び出された時刻
            parameters: args, // 引数
          });
          // オリジナルメソッドを呼び出す
          return original.apply(this, args);
        };
      }

      // メソッド以外のプロパティはそのまま返す
      return Reflect.get(target, prop, receiver);
    },
  };

  // Proxyオブジェクトの作成
  const proxy = new Proxy(target, handler);

  // Proxyと履歴配列への参照を返す
  return { proxy, callLog };
}
