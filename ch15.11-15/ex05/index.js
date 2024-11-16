const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// IndexedDBの初期化 ★ex05で追加
const dbPromise = new Promise((resolve, reject) => {
  const request = indexedDB.open("ToDoAppDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("todos")) {
      db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

async function getDB() {
  return dbPromise;
}

// IndexedDBからデータを読み込む★ex05で追加
async function loadFromIndexedDB() {
  const db = await getDB();
  const transaction = db.transaction("todos", "readonly");
  const store = transaction.objectStore("todos");

  const request = store.getAll();
  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result);
  });
}

// IndexedDBにデータを保存する★ex05で追加
async function saveToIndexedDB(todos) {
  const db = await getDB();
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");

  // 現在のデータを全削除してから再保存
  await new Promise((resolve, reject) => {
    const clearRequest = store.clear();
    clearRequest.onsuccess = resolve;
    clearRequest.onerror = reject;
  });

  todos.forEach((todo) => store.add(todo));
}

// ToDoリストに要素を追加
function addTodoElement(text, completed = false, id = Date.now()) {
  const elem = document.createElement("li");
  elem.dataset.id = id;
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = text;
  label.style.textDecorationLine = completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = completed;
  toggle.addEventListener("change", async () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    await saveTodosToDB();
    notifyTabs();
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    list.removeChild(elem);
    await saveTodosToDB();
    notifyTabs();
  });

  div.append(toggle, label, destroy);
  elem.appendChild(div);
  list.prepend(elem);
}

// IndexedDBからデータを読み込んでリストを初期化
document.addEventListener("DOMContentLoaded", async () => {
  const todos = await loadFromIndexedDB();
  todos.forEach((todo) => addTodoElement(todo.text, todo.completed, todo.id));
});

// IndexedDBへ現在のリスト状態を保存 ★ex05で追加
async function saveTodosToDB() {
  const todos = Array.from(document.querySelectorAll("#todo-list li")).map(
    (li) => ({
      id: parseInt(li.dataset.id, 10),
      text: li.querySelector("label").textContent,
      completed:
        li.querySelector("label").style.textDecorationLine === "line-through",
    })
  );
  await saveToIndexedDB(todos);
}

// BroadcastChannelでタブ間の同期 ★ex05で追加
const channel = new BroadcastChannel("todo-updates");

channel.onmessage = async () => {
  list.innerHTML = ""; // リストをクリア
  const todos = await loadFromIndexedDB();
  todos.forEach((todo) => addTodoElement(todo.text, todo.completed, todo.id));
};

// 他のタブに変更を通知 ★ex05で追加
function notifyTabs() {
  channel.postMessage("update");
}

// 新しいタスクの追加
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") return;
  input.value = "";
  addTodoElement(todo);
  await saveTodosToDB();
  notifyTabs();
});
