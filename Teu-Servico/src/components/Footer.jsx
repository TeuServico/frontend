import React from 'react'
import { NavLink } from "react-router-dom";
import { FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className='bg-[#F69027] fixed bottom-0 left-0 w-full p-4'>
            <div className='flex justify-center items-start gap-14'>
                <div>
                    <div className='text-white text-[18px] text-center font-bold mb-1'>Serviços</div>
                    <div className='grid grid-cols-2 gap-4 text-center'>
                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Tecnologia</NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Assistência</NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Reforma</NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Moda</NavLink>

                        <NavLink
                            to="#"
                           className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Beleza</NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Eventos</NavLink>
                    </div>

                </div>

                <div>
                    <div className='text-white text-[18px] font-bold mb-1'>Institucional</div>
                    <div className='grid grid-cols-1 gap-3'>
                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Quem Somos</NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Segurança</NavLink>
                        
                        <NavLink
                            to="#"
                            className="text-[#002C57] text-[15px] hover:text-[#074380]"
                        >Ajuda</NavLink>

                    </div>

                </div>

                <div>
                    <div className='text-white text-[18px] font-bold mb-1'>Redes sociais</div>
                    <div className='flex gap-2 mt-1'>
                        <NavLink
                            to="#"
                            className="text-[#002C57]"
                        ><FaLinkedin size={19} /></NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57]"
                        ><FaTiktok size={19} /></NavLink>

                        <NavLink
                            to="#"
                            className="text-[#002C57]"
                        ><FaYoutube size={19} /></NavLink>

                    </div>

                </div>

            </div>
        </footer>
    )
}
