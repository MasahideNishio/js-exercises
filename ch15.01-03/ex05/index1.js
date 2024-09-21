/* eslint-disable no-undef */

// defer を付与することで、スクリプトの実行がHTMLのパースが完了した後に実行される(asyncだとHTMLのパース中に実行される可能性もある)
// DOMContentLoaded イベントでHTML のパースが完了した直後に実行する。load イベントは画像などのリソースの読み込みが完了した後に実行される
// 今回はDOMが読み込まれたらすぐ実行したいのでDOMcontentLoadedを使う
document.addEventListener("DOMContentLoaded", () => {
  $("div#1000").html(_.capitalize("hello"));
});
