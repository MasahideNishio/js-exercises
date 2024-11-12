1. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい

- 悪意のあるサイトからユーザーの意図しないリクエストを他のオリジンに送信できるようになり、下記のようなセキュリティリスクが発生する。

  - ユーザーがログイン中の別オリジンのサイト(インターネットバンキング)に対してリクエストを送信し、特定の振込先に現金を振り込ませる(CSRF（Cross-Site Request Forgeries))
  - 他オリジンのサイトにAPIリクエストを送信し、レスポンスとして受け取った情報を窃盗する事ができる

- 参考
  https://developer.mozilla.org/ja/docs/Web/HTTP/CORS
  https://aws.amazon.com/jp/what-is/cross-origin-resource-sharing/
  https://zenn.dev/syo_yamamoto/articles/445ce152f05b02
  https://www.ipa.go.jp/security/vuln/websecurity/csrf.html

2. クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

- Preflight Requestはブラウザが自分自身とは異なるOriginのサーバにリクエストする際、事前にブラウザから自動で送信され、サーバがリクエストに応えられるかを確認するリクエスト。これを通らないと実際のGETやPOSTなどのリクエストは送信されない。
- 単純リクエスト(Sinple Request)の場合はアクセストークンなどのセンシティブな情報が含まれている可能性が低いと判断され、Preflight(OPTIONS)は送信されない。
- 単純リクエストの定義

  - GET, HEAD, POSTのうちいずれか
  - ヘッダーに含まれるのが以下のうちいずれか
    - ユーザーエージェントによって自動的に設定されたヘッダー
      - Accept
      - Accept-Language
      - Content-Language
      - Content-Type
    - Content-Typeのヘッダーが以下のうちいずれか
      - application/x-www-form-urlencoded
      - multipart/form-data
      - text/plain
  - リクエストに使用されるどの XMLHttpRequestUpload にもイベントリスナーが登録されていないこと。
  - リクエストに ReadableStream オブジェクトが使用されていないこと。

- Content-Type: application/jsonヘッダーをつけたり、ユーザー情報の取得のためにAuthorizationヘッダーをつけたりすると単純リクエストではないと判断されてPreflightリクエストが飛ぶ。

- 参考
  https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
  https://zenn.dev/tm35/articles/ad05d8605588bd
  https://qiita.com/nnishimura/items/1f156f05b26a5bce3672
