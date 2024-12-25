# 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。

- 16262接続でConnection接続に失敗した
- メモリやCPU使用率が100%近くなっていたわけではなかった(30%程度)
- サーバー側でserver.maxConnections を10にしたら10で失敗した。(元々はundefinedだった)
  - このmaxConnectionsを設定するとその数までの接続数になると考えられる。
  - この値がundefinedの場合はnodeやOSが自動的にメモリやCPU負荷から上限を判断して失敗させていると考えられる。