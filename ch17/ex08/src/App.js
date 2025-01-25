import React, { useState } from "react";
import "./App.css"; // スタイルファイルがあればインポート

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo = { text: newTodo.trim(), completed: false };
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <label
                style={{
                  textDecorationLine: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </label>
              <button onClick={() => deleteTodo(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App; // Appコンポーネントをエクスポート
