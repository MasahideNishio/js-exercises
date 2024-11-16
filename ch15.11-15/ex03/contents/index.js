const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
console.log("cookie : ", document.cookie);

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "GET",
      credentials: "include", // クロスオリジンでの Cookie の送信を許可★ex03で追加★
    }); // タスク一覧を取得★ex03で変更★

    if (!response.ok) throw new Error("Failed to GET tasks");

    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task)); // タスクを１つずつ追加
  } catch (error) {
    alert(error.message);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  try {
    // 新しいTaskをPOSTする
    // ★ex03でlocalhostに変更★
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include", // クロスオリジンでの Cookie の送信を許可★ex03で追加★
      body: JSON.stringify({ name: todo }),
    });

    if (!response.ok) throw new Error("Failed to POST task");

    const newTask = await response.json();
    appendToDoItem(newTask);
  } catch (error) {
    alert(error.message);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    try {
      // ★ex03でlocalhostに変更★
      const response = await fetch(
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          credentials: "include", // クロスオリジンでの Cookie の送信を許可★ex03で追加★
          body: JSON.stringify({
            status: toggle.checked ? "completed" : "active",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task status");

      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    } catch (error) {
      alert(error.message);
    }
  });
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  // ★ex03でlocalhostに変更★
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "DELETE",
          credentials: "include", // クロスオリジンでの Cookie の送信を許可★ex03で追加★
        }
      );
      if (!response.ok) throw new Error("Failed to delete task");

      elem.remove();
    } catch (error) {
      alert(error.message);
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
}
