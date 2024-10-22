const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // shadow DOMを作成してカスタム要素を外部のHTML/CSSと独立させる
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.todoList = this.shadowRoot.querySelector("#todo-list");
    this.input = this.shadowRoot.querySelector("#new-todo");

    this.form.addEventListener("submit", (e) => this.addTodo(e)); // フォームが送信されたとき（「Add」ボタンを押したとき）に addTodo メソッドを実行するよう、イベントリスナーを設定
  }

  // ToDoを追加するメソッド
  addTodo(e) {
    e.preventDefault(); // デフォルトのフォーム送信を防止

    const todoText = this.input.value.trim();
    if (todoText === "") return; // 空の入力は無視
    this.input.value = "";

    // ToDoアイテムの要素を作成
    const li = document.createElement("li");
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = todoText;

    const toggle = document.createElement("input");
    toggle.type = "checkbox";

    // チェックボックスの状態に応じてラベルの取り消し線を切り替える
    toggle.addEventListener("change", () => {
      label.style.textDecoration = toggle.checked ? "line-through" : "none";
    });

    // 削除ボタンを作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
      this.todoList.removeChild(li);
    });

    // 要素を組み立てる
    div.append(toggle, label, deleteButton);
    li.appendChild(div);
    this.todoList.prepend(li);
  }
}

customElements.define("todo-app", TodoApp);
