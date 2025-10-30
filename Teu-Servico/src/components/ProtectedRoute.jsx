import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isTokenValid, token, expiresAt } =
    useContext(AuthContext);
  const location = useLocation();

  // Usa o estado do contexto; se ainda não estiver hidratado, faz fallback ao localStorage
  let valid = false;
  if (isLoggedIn) {
    if (typeof isTokenValid === "function") {
      valid = isTokenValid();
    } else {
      const stored = (() => {
        try {
          return JSON.parse(localStorage.getItem("ts_auth") || "{}");
        } catch {
          return {};
        }
      })();
      const t = token ?? stored.token;
      const exp = expiresAt ?? stored.expiresAt;
      valid = Boolean(t) && Boolean(exp) && Date.now() < Number(exp);
    }
  }
  if (valid) return children;
  return <Navigate to="/login" replace state={{ from: location }} />;
};
