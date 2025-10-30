import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isTokenValid, logout } = useContext(AuthContext);
  const location = useLocation();

  const valid =
    isLoggedIn && (typeof isTokenValid === "function" ? isTokenValid() : true);
  if (valid) return children;
  if (isLoggedIn && !valid && typeof logout === "function") {
    logout();
  }
  return <Navigate to="/login" replace state={{ from: location }} />;
};
