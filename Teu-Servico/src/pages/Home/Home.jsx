import React from "react";
import { Header} from "../../components/Header.jsx"
import {Hero} from "../../components/Hero.jsx" 
import {MainServices} from "../../components/MainServices.jsx"
import {ClientTestimonials} from "../../components/ClientTestimonials.jsx"
import {FindAPro} from "../../components/FindAPro.jsx"
import {Footer} from "../../components/Footer.jsx"


export function Home() {

  return (
     <section>
      <Header />
      <Hero />
      <MainServices />
      <ClientTestimonials />
      <FindAPro />
      <Footer />
    </section>
  )
} 
