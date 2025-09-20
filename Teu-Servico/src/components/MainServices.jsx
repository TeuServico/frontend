import React, { useEffect, useRef, useState } from "react";
import developer from "../assets/developer.png";
import excel from "../assets/excel.png";
import pintor from "../assets/pintor.png";
import montador from "../assets/montador.png";
import frete from "../assets/frete.jpg";
import reformas from "../assets/reformas.jpg";
import ti from "../assets/ti.jpg";
import aulas from "../assets/aulas.jpg";
import design from "../assets/design.jpg";
import marketing from "../assets/marketing.jpg";
import arrowLeft from "../assets/arrowLeft.svg";
import arrowRight from "../assets/arrowRight.svg";

const services = [
  { title: "Desenvolvimento web", image: developer },
  { title: "Criação de planilhas Excel", image: excel },
  { title: "Pintura de imóveis", image: pintor },
  { title: "Montagem de móveis", image: montador },
  { title: "Fretes e mudanças", image: frete },
  { title: "Reformas em geral", image: reformas },
  { title: "Consultoria em TI", image: ti },
  { title: "Aulas particulares", image: aulas },
  { title: "Design gráfico", image: design },
  { title: "Marketing digital", image: marketing },
];

export const MainServices = () => {
  const scrollRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToCard = (newIndex) => {
    const container = scrollRef.current;
    if (!container || !container.firstChild) return;

    const cardWidth = container.firstChild.offsetWidth + 16; // 16px = space-x-4
    const scrollPosition = newIndex * cardWidth;

    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCardIndex(newIndex);
  };

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col items-center space-y-6 px-4 mx-8">
          <h2 className="text-[#002C57] text-[32px] font-bold mb-2">
            {" "}
            Principais serviços:{" "}
          </h2>{" "}
          <p className="text-[#f69027] text-xl mb-6 font-bold">
            {" "}
            Os mais solicitados{" "}
          </p>
          {services.map((service, index) => (
            <div
              key={index}
              className="w-full max-w-sm shadow-[0_2px_10px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[280px] object-cover"
              />
              <h3 className="text-base text-[#002C57] bg-[#f69027] text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-14 py-8 text-center">
          {" "}
          <h2 className="text-[#002C57] text-[32px] font-bold mb-2">
            {" "}
            Principais serviços:{" "}
          </h2>{" "}
          <p className="text-[#f69027] text-xl mb-6 font-bold">
            {" "}
            Os mais solicitados{" "}
          </p>
          <div className="relative">
            <button
              onClick={() =>
                scrollToCard(
                  (cardIndex - 1 + services.length) % services.length
                )
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#f69027] rounded-full shadow-md hover:bg-[#f68f27a1] w-12 h-12 flex items-center justify-center cursor-pointer z-10"
            >
              <img src={arrowLeft} alt="" className="max-w-2.5" />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-4 scroll-hidden px-4 max-w-5xl mx-10"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="max-w-[240px] min-h-[280px] shadow-md flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-[240px] h-[280px] object-cover"
                  />
                  <h3 className="text-base text-[#002C57] bg-[#f69027] text-center">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToCard((cardIndex + 1) % services.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#f69027] rounded-full shadow-md hover:bg-[#f68f27a1] w-12 h-12 flex items-center justify-center cursor-pointer z-10"
            >
              <img src={arrowRight} alt="" className="max-w-2.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
