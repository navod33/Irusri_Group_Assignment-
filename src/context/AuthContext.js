// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null); 

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser && existingUser.email === email && existingUser.password === password) {
      setUser(existingUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
