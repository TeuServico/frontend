import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
          <SwiperSlide className={swiperSlideStyle}>
            <ReviewCard
              title="Desenvolvedor Web"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              user={"João Silva"}
              job={"Desenvolvedor Web"}
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ReviewCard
              title="Pintura residencial"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              user={"João Silva"}
              job={"Pintura residencial"}
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ReviewCard
              title="Montagem de móveis"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              user={"João Silva"}
              job={"Montagem de móveis"}
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ReviewCard
              title="Reparos elétricos"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              user={"João Silva"}
              job={"Reparos elétricos"}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
