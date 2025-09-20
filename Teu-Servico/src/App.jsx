import React from 'react';
import CreateAccount from './pages/Auth/CreateAccount/CreateAccount';
import Login from './pages/Auth/Login/Login';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import { Header } from './components/Header';
import { Hero } from "./components/Hero";
import Footer from "./components/Footer";
import "./index.css"
import { MainServices } from "./components/MainServices";


function App() {
  return (
    <div>
      <Header />
      <Hero />
      <MainServices />
      <Footer />
    </div>
  );
}

export default App;
