const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// LocalStorageへ保存する★ex04で追加★
function saveToLocalStorage() {
  const todos = Array.from(
    document.querySelectorAll("#todo-list li label")
  ).map((label) => ({
    text: label.textContent,
    completed: label.style.textDecorationLine === "line-through",
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ページ読み込み時にLocalStorageから復元する★ex04で追加★
function loadFromLocalStorage() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  savedTodos.forEach((todo) => {
    addTodoElement(todo.text, todo.completed);
  });
}

function addTodoElement(text, completed = false) {
  const elem = document.createElement("li");
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = text;
  label.style.textDecorationLine = completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = completed;
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    saveToLocalStorage();
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
    saveToLocalStorage();
  });

  div.append(toggle, label, destroy);
  elem.appendChild(div);
  list.prepend(elem);
}

// ページ読み込み時に復元
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") return;
  input.value = "";
  addTodoElement(todo);
  saveToLocalStorage();
});

// npx http-server で実行
// type="module"を削除した場合に期待通り動作させるには、formの変数名を変更する必要がある(グローバルスコープで名前がぶつかるため)
