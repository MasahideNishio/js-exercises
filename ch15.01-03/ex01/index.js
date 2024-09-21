const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // フォームデータをサーバーに送信しようとするため　https://qiita.com/yusuke2310/items/acbe84ae418013d10122
  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const div = document.createElement("div"); // div要素を作成

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox"; // チェックボックスのタイプを指定

  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through";
    } else {
      label.style.textDecorationLine = "none";
    }
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌"; // テキストを設定
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  div.append(toggle, label, destroy);
  elem.appendChild(div);
  list.prepend(elem);
});

// npx http-server で実行
// type="module"を削除した場合に期待通り動作させるには、formの変数名を変更する必要がある(グローバルスコープで名前がぶつかるため)
