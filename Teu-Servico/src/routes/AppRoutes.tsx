import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import CreateAccount from "../pages/Auth/CreateAccount/CreateAccount";
import App from "../App";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Home } from "../pages/Home/Home";
import ProfessionalProfile from "../pages/ProfessionalProfile/ProfessionalProfile";
import CallToAction from "../pages/Home/CallToAction"


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
       <Route
        path="/professional-profile"
        element={
          <ProtectedRoute>
            <ProfessionalProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
