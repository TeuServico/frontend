import { About } from "./components/About";
import { ClientTestimonials } from "./components/ClientTestimonials";
import { FindAPro } from "./components/FindAPro";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MainServices } from "./components/MainServices";
import "./index.css";

function App() {
  return (
    <section>
      <Header />
      <Hero />
      <MainServices />
      <About />
      <ClientTestimonials />
      <FindAPro />
      <Footer />
    </section>
  );
}

export default App;
