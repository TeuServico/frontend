import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/buscar-profissional"); // ajustar essa rota
  };

  return (
    <section className="w-full bg-white py-12 px-4 text-center">
      <h2
        className="text-[22px] md:text-[28px] font-bold mb-6"
        style={{ color: "#002C57" }}
      >
        Encontre agora o especialista que vai solucionar seu problema.
      </h2>

      <button className="mt-4 bg-[#F69027] text-[#002C57] px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition cursor-pointer">
        Procurar profissional
      </button>
    </section>
  );
};

export default CallToAction;
