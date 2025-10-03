import React from "react";
import CreateAccount from "./pages/Auth/CreateAccount/CreateAccount";
import Login from "./pages/Auth/Login/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Footer from "./components/Footer";
import "./index.css";
import { MainServices } from "./components/MainServices";
import { FindAPro } from "./components/FindAPro";
import { ClientTestimonials } from "./components/ClientTestimonials";

function App() {
  return (
    <section>
      <Header />
      <Hero />
      <MainServices />
      <ClientTestimonials />
      <FindAPro />
      <Footer />
    </section>
  );
}

export default App;

