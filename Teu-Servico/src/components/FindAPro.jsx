import React from "react";

export const FindAPro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-4 m-8 gap-4">
      <h2 className="text-[#002C57] text-[32px] text-center font-bold mb-2">
        Encontre agora o especialista que vai solucionar seu problema.
      </h2>
      <a
        href="#"
        className="bg-[#F69027] text-[#002C57] font-semibold px-4 py-2 rounded-md cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#d96c15] hover:scale-105 hover:shadow-md active:scale-95"
      >
        Procurar Profissional
      </a>
    </div>
  );
};
