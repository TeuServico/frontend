import React, { useState } from "react";

export function About() {
  const [activeTab, setActiveTab] = useState("contratante");

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <h2 className="text-3xl font-bold text-[#002C57] text-center mb-8">
          O que é a TeuServiço?
        </h2>

        {/* Botões de seleção */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("contratante")}
              className={`px-8 py-3 rounded-md font-bold text-lg transition-all ${
                activeTab === "contratante"
                  ? "bg-[#F69027] text-[#002C57] shadow-md"
                  : "text-[#002C57] hover:bg-gray-200"
              }`}
            >
              Para contratante
            </button>
            <button
              onClick={() => setActiveTab("profissional")}
              className={`px-8 py-3 rounded-md font-bold text-lg transition-all ${
                activeTab === "profissional"
                  ? "bg-[#F69027] text-[#002C57] shadow-md"
                  : "text-[#002C57] hover:bg-gray-200"
              }`}
            >
              Para profissional
            </button>
          </div>
        </div>

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === "contratante" && (
          <div className="text-center">
            <p className="text-xl font-bold text-[#002C57] mb-12 max-w-4xl mx-auto leading-relaxed">
              Conectamos você a diversos profissionais, seus portfólios e
              avaliações feitas por outros usuários, garantindo que você escolha
              o melhor e mais bem avaliado. Compare experiências, veja
              resultados reais e contrate com confiança, sabendo que está
              escolhendo alguém com credibilidade e desempenho comprovado.
            </p>

            {/* Funcionalidades */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Solicite um serviço e aguarde a proposta dos nossos
                  profissionais
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Procure por profissionais próximos a sua localidade
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Negocie diretamente com o profissional
                </h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profissional" && (
          <div className="text-center">
            <p className="text-xl font-bold text-[#002C57] mb-12 max-w-4xl mx-auto leading-relaxed">
              Conecte-se com clientes que precisam dos seus serviços. Crie seu
              perfil profissional, mostre seu portfólio, receba avaliações
              positivas e aumente sua credibilidade no mercado. Tenha acesso a
              oportunidades de trabalho próximas a você e negocie diretamente
              com os clientes.
            </p>

            {/* Funcionalidades para profissionais */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Crie seu perfil profissional completo
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Receba avaliações e construa credibilidade
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F69027] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0H8m8 0v10a2 2 0 01-2 2H10a2 2 0 01-2-2V8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002C57] mb-2">
                  Encontre oportunidades de trabalho próximas
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
