export class PromisePool {
  /**
   * Constructs PromisePool.
   *
   * @param queueSize the max size of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queueSize or maxRunningPromises is less than 1
   */
  constructor(queueSize, maxRunningPromises) {
    if (queueSize < 1 || maxRunningPromises < 1) {
      throw new Error();
    }
    this.queueSize = queueSize; // キューの最大数
    this.maxRunningPromises = maxRunningPromises; // 同時に実行するPromiseの最大数。この数を超えると新しいPromiseはキューに追加されて実行が保留される。
    this.queue = []; // 保留中のPromiseの実行を待機させるためのキュー
    this.runningPromises = 0; //実行中のPromiseの数
    this.started = false; // プールが開始されているかどうか
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start() {
    if (this.started) {
      throw new Error("すでに開始されています");
    }
    this.started = true;
    return Promise.resolve(); // すぐにに解決されるPromiseを返す
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop() {
    if (!this.started) {
      throw new Error("まだ開始されていません");
    }
    await Promise.all(this.queue); // 残りの全てのPromiseが完了するのを待つ
    this.started = false;
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseFactory the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async dispatch(promiseFactory) {
    if (!this.started) {
      throw new Error("まだ開始されていません");
    }

    // 実行中のPromiseが最大値に達している場合は、キューにPromiseを追加して待機させる
    if (this.runningPromises >= this.maxRunningPromises) {
      await new Promise((resolve) => this.queue.push(resolve)); // ここで一時停止し、キューが空くのを待つ。キューが空いたらresolve()が呼ばれる(finally節の処理)
    }
    // キューが空いたのでPromiseを実行するので、実行中のPromiseの数を増やす
    this.runningPromises++;

    try {
      // 渡されたPromiseを実際に呼び出す
      await promiseFactory();
    } finally {
      // 必ず実行させるためfinallyを使う
      // promiseFactory()の処理が終わったら、実行中のPromiseの数を減らす
      this.runningPromises--;
      // キューに次のPromiseがあれば、それを実行する→this.queue.push(resolve)で追加されたPromiseが実行されて、awaitから先に進む
      if (this.queue.length > 0) {
        const next = this.queue.shift(); // キューから次のPromiseを取り出す
        next(); // 次のPromiseの実行を開始
      }
    }
  }
}
