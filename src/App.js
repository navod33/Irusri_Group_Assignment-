// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';

function App() {
  return (
    <AuthProvider>
        <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
