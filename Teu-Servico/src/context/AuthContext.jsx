import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Hidrata estado inicial a partir do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ts_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setIsLoggedIn(Boolean(parsed.isLoggedIn));
          setUser(parsed.user ?? null);
        }
      }
    } catch {
      // Ignora erros de parse e segue com estado padrão
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    try {
      localStorage.setItem(
        "ts_auth",
        JSON.stringify({ isLoggedIn: true, user: userData })
      );
    } catch {
      // storage pode falhar em modo privado; app segue funcionando em memória
    }
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem("ts_auth");
    } catch {
      // noop
    }
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
