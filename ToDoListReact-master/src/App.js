import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

//כל המטלות
  async function getTodos() {
    debugger
    const todos = await service.getTasks();
    setTodos(todos);
  }

//יצירת מטלה
  async function createTodo(e) {
    debugger
    console.log(newTodo)
    await service.addTask(newTodo);
    setNewTodo("");//נקה קלט
    await getTodos();//רענן את רשימת המשימות (כדי לראות את החדשה)
  }

  //עדכון מטלה

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();
  }


//מחיקת מטלה
  async function deleteTodo(id) {
    debugger
    await service.deleteTask(id);
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;