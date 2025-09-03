import React from "react";
import { AuthContext } from "../hooks/useAuth";

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;
