import React from "react";
import { Header } from "./components/Header";
import "./index.css";
import Footer from "./components/Footer";
import { MainServices } from "./components/MainServices";

function App() {
  return (
    <div>
      <Header />
      <MainServices />
      <Footer />
    </div>
  );
}

export default App;
