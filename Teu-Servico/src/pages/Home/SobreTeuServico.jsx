import React, { useState } from "react";

import IconSoliciteServico from "../../assets/iconSoliciteServico.svg";
import IconBusqueProfissional from "../../assets/iconBusqueProfissional.svg";
import IconNegocie from "../../assets/iconNegocie.svg";
import IconPortolio from "../../assets/iconPortolio.svg";
import IconReview from "../../assets/iconReview.svg";
import IconChat from "../../assets/IconChat.svg";

const SobreTeuServico = () => {
  const [abaAtiva, setAbaAtiva] = useState("contratante");

  const isContratante = abaAtiva === "contratante";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-[#002C57]">
      <h2 className="text-3xl font-bold text-center mb-8">
        O que é a TeuServiço?
      </h2>

      <div className="flex justify-center gap-30 mb-8">
        <button
          onClick={() => setAbaAtiva("contratante")}
          className={`pb-1 border-b-4 transition-colors ${
            isContratante
              ? "border-[#F69027] font-bold italic text-lg cursor-pointer"
              : "border-transparent italic text-lg cursor-pointer"
          }`}
        >
          Para contratante
        </button>
        <button
          onClick={() => setAbaAtiva("profissional")}
          className={`pb-1 border-b-4 transition-colors ${
            !isContratante
              ? "border-[#F69027] font-bold italic text-lg cursor-pointer"
              : "border-transparent italic text-lg cursor-pointer"
          }`}
        >
          Para profissional
        </button>
      </div>

      {isContratante ? (
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center">
              <img
                src={IconSoliciteServico}
                alt="Solicite um serviço"
                className="w-16 h-16 mb-2"
              />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx-auto">
                Solicite um serviço e aguarde a proposta dos nossos
                profissionais
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={IconBusqueProfissional}
                alt="Profissionais próximos"
                className="w-16 h-16 mb-2"
              />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx auto">
                Procure por profissionais próximos à sua localidade
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={IconNegocie} alt="Negocie" className="w-16 h-16 mb-2" />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx-auto">
                Negocie diretamente com o profissional
              </p>
            </div>
          </div>
          <p className="text-[#002C57] text-light leading-relaxed font-bold max-w-3xl mx-auto mt-16">
            Conectamos você a diversos profissionais, seus portfólios e
            avaliações feitas por outros usuários, garantindo que você escolha o
            melhor e mais bem avaliado. Compare experiências, veja resultados
            reais e contrate com confiança, sabendo que está escolhendo alguém
            com credibilidade e desempenho comprovado.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center">
              <img
                src={IconPortolio}
                alt="Portfólio"
                className="w-16 h-16 mb-2"
              />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx-auto">
                Mostre seu portfólio e seja encontrado pela sua especialidade
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={IconReview}
                alt="Avaliações"
                className="w-16 h-16 mb-2"
              />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx-auto">
                Receba avaliações sobre o seu trabalho
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={IconChat}
                alt="Comunique-se"
                className="w-16 h-16 mb-2"
              />
              <p className="text-light leading-relaxed font-bold max-w-3xl mx-auto">
                Comunique-se diretamente com o seu cliente
              </p>
            </div>
          </div>
          <p className="text-[#002C57] text-light leading-relaxed font-bold max-w-3xl mx-auto mt-16">
            Publique seu portfólio com seus melhores trabalhos, escolha sua
            especialidade e destaque sua experiência profissional. Mostre
            projetos, resultados e diferenciais. Com um perfil completo, você
            começa a receber propostas alinhadas ao que faz de melhor.
          </p>
        </div>
      )}
    </div>
  );
};

export default SobreTeuServico;
