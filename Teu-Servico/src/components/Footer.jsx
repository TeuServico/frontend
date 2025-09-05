import React from "react";
import { NavLink } from "react-router-dom";
import { FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F69027] w-full py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 md:flex-row md:items-start md:justify-center md:text-left md:gap-20">
        {/* Serviços */}
        <div>
          <h2 className="text-white text-lg font-bold mb-2">Serviços</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[#002C57] text-sm">
            <NavLink to="#" className="hover:text-[#074380]">
              Tecnologia
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Assistência
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Reforma
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Moda
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Beleza
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Eventos
            </NavLink>
          </div>
        </div>

        {/* Institucional */}
        <div>
          <h2 className="text-white text-lg font-bold mb-2">Institucional</h2>
          <div className="flex flex-col gap-2 text-[#002C57] text-sm">
            <NavLink to="#" className="hover:text-[#074380]">
              Quem somos
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Segurança
            </NavLink>
            <NavLink to="#" className="hover:text-[#074380]">
              Ajuda
            </NavLink>
          </div>
        </div>

        {/* Redes sociais */}
        <div>
          <h2 className="text-white text-lg font-bold mb-2">Redes sociais</h2>
          <div className="flex justify-center md:justify-start gap-4 text-[#002C57]">
            <NavLink to="#">
              <FaLinkedin size={20} />
            </NavLink>
            <NavLink to="#">
              <FaTiktok size={20} />
            </NavLink>
            <NavLink to="#">
              <FaYoutube size={20} />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
