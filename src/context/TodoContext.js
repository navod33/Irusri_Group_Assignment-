import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when the app starts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage when the todos array changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title, description) => {
    const newTodo = { id: Date.now(), title, description, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const editTodo = (id, updatedTitle, updatedDescription) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: updatedTitle, description: updatedDescription }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleCompletion }}>
      {children}
    </TodoContext.Provider>
  );
};
