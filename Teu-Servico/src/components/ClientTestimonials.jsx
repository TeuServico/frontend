import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const clients = [
  {
    title: "Pintura residencial",
    message:
      "Ótimo serviço! O profissional foi pontual, atencioso e fez um trabalho impecável na pintura da minha casa. Recomendo a todos que precisam de um serviço de qualidade.",
    user: "João Silva",
    job: "Pintura residencial",
  },
  {
    title: "Montagem de móveis",
    message:
      "Excelente trabalho! O montador chegou no horário combinado e montou meus móveis com muita eficiência e cuidado. Fiquei muito satisfeito com o resultado final.",
    user: "Pedro Santos",
    job: "Montagem de móveis",
  },
  {
    title: "Reparos elétricos",
    message:
      "Serviço de alta qualidade! O eletricista foi muito profissional, diagnosticou o problema rapidamente e realizou os reparos necessários com segurança. Recomendo seus serviços.",
    user: "Maria Oliveira",
    job: "Reparos elétricos",
  },
  {
    title: "Desenvolvedor Web",
    message:
      "Trabalho excepcional! O desenvolvedor web criou um site moderno e funcional para minha empresa. Ele foi muito comunicativo durante todo o processo e entregou tudo dentro do prazo. Estou muito satisfeito com o resultado.",
    user: "André Costa",
    job: "Desenvolvedor Web",
  },
];

const ReviewCard = ({ title, message, user, job }) => {
  const [truncatedMessage, setTruncatedMessage] = useState(message);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 425 && message.length > 100) {
        setTruncatedMessage(message.slice(0, 100) + "...");
      } else {
        setTruncatedMessage(message);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [message]);

  return (
    <div className="border text-[#f69027] rounded-lg p-6 min-h-[350px] flex flex-col justify-between">
      <div>
        <h3 className="text-[#f69027] text-lg font-bold mb-2">{title}</h3>
        <p className="text-[#002C57] font-semibold mb-4">{truncatedMessage}</p>
      </div>
      <div>
        <p className="text-[#f69027] font-semibold">{user}</p>
        <p className="text-[#002C57] text-sm">{job}</p>
      </div>
    </div>
  );
};

export const ClientTestimonials = () => {
  const swiperSlideStyle = "h-auto flex justify-center mb-10";

  return (
    <section className="space-y-6">
      <h2 className="text-center text-3xl font-bold mb-10 text-[#002C57]">
        O que os nossos clientes estão dizendo
      </h2>

      <div>
        <Swiper
          slidesPerView={3}
          loop={true}
          spaceBetween={20}
          grabCursor={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="w-4/6 h-full"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index} className={swiperSlideStyle}>
              <ReviewCard
                title={client.title}
                message={client.message}
                user={client.user}
                job={client.job}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
