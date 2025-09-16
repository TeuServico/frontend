import React from 'react';
import CreateAccount from './pages/Auth/CreateAccount/CreateAccount';
import Login from './pages/Auth/Login/Login';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import { Header } from './components/Header';
import { Hero } from "./components/Hero";
import "./index.css"

function App() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default App;
