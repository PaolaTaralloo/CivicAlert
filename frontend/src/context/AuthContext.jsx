import { createContext, useState } from 'react';

// Creazione del contesto
const AuthContext = createContext();

// Componente provider del contesto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    console.log('Utente salvato:', savedUser); // Aggiungi questo log
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    console.log('Login con dati:', userData); // Aggiungi questo log
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('Logout effettuato'); // Aggiungi questo log
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
