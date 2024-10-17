const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input.toggle");
  const label = clone.querySelector("label.content");
  const destroy = clone.querySelector("button.destroy");

  toggle.addEventListener("change", () => {
    li.classList.toggle("bg-gray-200", toggle.checked);
  });

  label.textContent = todo;

  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
