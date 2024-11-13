const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const MAX_RETRY_ATTEMPTS = 3;
const INITIAL_DELAY = 1000; // 初回リトライ待機時間（ミリ秒）
const TIMEOUT_DURATION = 3000; // タイムアウト設定（ミリ秒）

// リトライ処理付きの fetch 関数
async function retryWithExponentialBackoff(
  url,
  options,
  attempts = MAX_RETRY_ATTEMPTS
) {
  let delay = INITIAL_DELAY;

  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetchWithTimeout(url, options, TIMEOUT_DURATION);
      if (response.ok) return response;
      if (response.status >= 500) throw new Error("Server error");
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // 待機時間を倍にする
    }
  }
}

// タイムアウト付きの fetch 関数
async function fetchWithTimeout(url, options, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// UIの有効/無効を切り替える関数
function toggleFormDisabled(isDisabled) {
  input.disabled = isDisabled;

  // ボタンの有効/無効を切り替える
  form.querySelector("button").disabled = isDisabled;

  // オーバーレイの表示切替
  document.querySelector("#overlay").style.display = isDisabled
    ? "block"
    : "none";
}

// ページ読み込み時にタスクを取得
document.addEventListener("DOMContentLoaded", async () => {
  toggleFormDisabled(true); // 操作を無効化
  try {
    const response = await retryWithExponentialBackoff("/api/tasks", {
      method: "GET",
    });
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (error) {
    alert(error.message);
  } finally {
    toggleFormDisabled(false); // 操作を有効化
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") return;
  input.value = "";
  toggleFormDisabled(true); // 操作を無効化

  try {
    const response = await retryWithExponentialBackoff("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name: todo }),
    });
    const newTask = await response.json();
    appendToDoItem(newTask);
  } catch (error) {
    alert(error.message);
  } finally {
    toggleFormDisabled(false); // 操作を有効化
  }
});

function appendToDoItem(task) {
  const elem = document.createElement("li");
  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    toggleFormDisabled(true); // 操作を無効化
    try {
      const response = await retryWithExponentialBackoff(
        `/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            status: toggle.checked ? "completed" : "active",
          }),
        }
      );
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    } catch (error) {
      alert(error.message);
    } finally {
      toggleFormDisabled(false); // 操作を有効化
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", async () => {
    toggleFormDisabled(true); // 操作を無効化
    try {
      const response = await retryWithExponentialBackoff(
        `/api/tasks/${task.id}`,
        {
          method: "DELETE",
        }
      );
      elem.remove();
    } catch (error) {
      alert(error.message);
    } finally {
      toggleFormDisabled(false); // 操作を有効化
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
