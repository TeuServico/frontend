import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "../components/ProtectedRoute";
import CreateAccount from "../pages/Auth/CreateAccount/CreateAccount";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
// Home removido - landing agora é App.jsx
import ProfessionalProfile from "../pages/ProfessionalProfile/ProfessionalProfile";
// import CallToAction from "../pages/Home/CallToAction"
import { EditInfo } from "../pages/EditInfo/EditInfor";
import Search from "../pages/Search/Search";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                }
            />
            <Route path="/edit-profile" element={<EditInfo />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/buscar" element={<Search />} />
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
