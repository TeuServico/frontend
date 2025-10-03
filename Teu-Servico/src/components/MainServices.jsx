import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Keyboard, Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div className="max-w-6xl mx-auto my-6 py-8 text-center">
          <h2 className="text-[#002C57] text-[32px] font-bold mb-2">
            Principais serviços:
          </h2>
          <p className="text-[#f69027] text-xl mb-6 font-bold">
            Os mais solicitados
          </p>
          <div className="relative cursor-grab mx-4 px-15">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              slidesPerGroupSkip={1}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              scrollbar={true}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Keyboard, Scrollbar, Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                425: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              className="min-h-[320px] relative"
            >
              {services.map((service, index) => (
                <SwiperSlide className="h-auto flex justify-center">
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
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#f69027] rounded-full shadow-md hover:bg-[#f68f27a1] w-12 h-12 flex items-center justify-center cursor-pointer z-10">
              <img src={arrowLeft} alt="Anterior" className="max-w-2.5" />
            </div>
            <div className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#f69027] rounded-full shadow-md hover:bg-[#f68f27a1] w-12 h-12 flex items-center justify-center cursor-pointer z-10">
              <img src={arrowRight} alt="Anterior" className="max-w-2.5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
