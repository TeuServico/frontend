import React from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

const ProfessionalProfile = () => {
  return (
    <>
      <Header />

      <div className="w-screen h-[2px] bg-[#002C57] mb-20" />

      <div className="max-w-6xl mx-auto px-4 mt-6 mb-4">
  <button className="flex items-center gap-2 cursor-pointer">
    
    <div className="w-8 h-8 rounded-full bg-[#F69027] flex items-center justify-center">
      <span className="text-[#002C57] text-2xl">&#9668;</span> {/* ◄ */}
    </div>
    
    {/* Texto ao lado */}
    <span className="text-[#002C57] hover:text-[#F69027]">Voltar a procurar</span>
  </button>
</div>

      <main className="max-w-6xl mx-auto px-4 py-15 bg-white">
        {/* TOPO DO PERFIL */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* FOTO */}
          <div className="w-40 h-40 bg-gray-200 rounded-md overflow-hidden">
            {/* Substituir com <img src={...} /> depois */}
          </div>

          {/* INFO DO PERFIL */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-[#002C57]">João da Silva</h2>
            <p className="text-[#F69027] font-medium">Eletricista</p>

            {/* AVALIAÇÃO */}
           <div className="flex items-center gap-1 text-[#F69027]">
           {'★'.repeat(5)}
           <span className="text-[#F69027] text-sm">
           (4.80 - 50 avaliações)
           </span>
           </div>

            {/* INFOS ADICIONAIS */}
          <div className="flex flex-wrap items-center text-sm text-[#002C57] mt-2 gap-2">
      <p>
       <strong className="text-[#002C57]">Serviços concluídos:</strong>{' '}
       <span className="text-[#F69027]">55</span>
      </p>
       <span className="text-[#002C57]">|</span>
      <p>
       <strong className="text-[#002C57]">Recomendações:</strong>{' '}
       <span className="text-[#F69027]">40</span>
      </p>
       <span className="text-[#002C57]">|</span>
       <p>
        <strong className="text-[#002C57]">Cadastrado desde:</strong>{' '}
        <span className="text-[#F69027]">20/08/2025</span>
       </p>
           </div>

            {/* BOTÃO CONVERSAR */}
            <div className="mt-4">
               <button className="bg-[#F69027] text-[#002C57] px-12 py-1.3 rounded font-semibold  border border-[#002C57] hover:brightness-110 transition cursor-pointer">
                Conversar
              </button>
            </div>
          </div>
        </section>

        {/* HABILIDADES */}
        <section className="mt-10">
          {<h3 className="text-lg font-semibold text-[#F69027] mb-3"> Habilidades:</h3>}
          <div className="flex flex-wrap gap-2">
  {[
    'Elétrica residencial',
    'Manutenção preventiva',
    'Instalação de chuveiro',
    'Quadros de energia'
  ].map((skill, idx) => (
    <span
      key={idx}
      className="bg-[#F69027] text-[#002C57] px-3 py-1 text-sm rounded-full border border-[#002C57]">
      {skill}
    </span>
  ))}
</div>
        </section>

        {/* SOBRE MIM */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-[#F69027] mb-2">Sobre mim:</h3>
          <p className="text-[#002C57]">
  Sou um profissional dedicado e apaixonado pelo que faço. Tenho experiência em serviços residenciais e comerciais, prezando sempre pela qualidade, segurança e satisfação do cliente.
         </p>
        </section>

        {/* EXPERIÊNCIA PROFISSIONAL */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-[#F69027] mb-2">Experiências:</h3>
          <p className="text-[#002C57]">
  Tenho 5 anos de experiência com instalações elétricas residenciais e comerciais, atuando em projetos de manutenção preventiva e corretiva. Também trabalho com leitura e interpretação de esquemas elétricos, sempre prezando pela segurança e qualidade dos serviços.
          </p>
          </section>
        {/* SERVIÇOS AVALIADOS */}
        <section className="bg-white p-6 rounded-lg mt-6">
  {<h3 className="text-lg font-medium text-[#F69027] mb-4 text-center">Serviços Avaliados:</h3>}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
    {[
      {
        title: "Instalação de chuveiro elétrico",
        description: "O profissional foi pontual e resolveu tudo rapidamente.",
        user: "Ana Paula",
        category: "Elétrica",
      },
      {
        title: "Manutenção em tomadas",
        description: "Muito atencioso e resolveu todos os problemas.",
        user: "Carlos Henrique",
        category: "Elétrica",
      },
      {
        title: "Troca de disjuntor",
        description: "Fez tudo com muito cuidado e segurança.",
        user: "Fernanda Souza",
        category: "Manutenção",
      },
      {
        title: "Instalação de ventilador de teto",
        description: "Serviço impecável, tudo funcionando perfeitamente.",
        user: "Roberto Lima",
        category: "Instalações",
      },
      {
        title: "Verificação do quadro de energia",
        description: "Fez um ótimo diagnóstico do problema.",
        user: "Jéssica Andrade",
        category: "Elétrica",
      },
      {
        title: "Instalação de luminárias",
        description: "Trabalho limpo e eficiente, super recomendo.",
        user: "Marcos Silva",
        category: "Iluminação",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="border-2 border-[#F69027] rounded-lg p-4 w-[90%] h-60 flex flex-col justify-between bg-white">
        <div>
          <h4 className="font-semibold text-[#F69027] mb-2">{item.title}</h4>
          <p className="text-sm text-[#002C57] mb-2">{item.description}</p>
        </div>
        <div className="text-sm text-[#002C57]">
          <p className="text-sm text-[#F69027] mb-2">{item.user}</p>
          <p>{item.category}</p>
        </div>
      </div>
    ))}
  </div>
  <div className="text-center mt-6">
  <p className="text-[#002C57] text-base font-medium cursor-pointer">Ver mais</p>
  <div className="text-[#F69027] text-2xl mt-1 cursor-pointer">&#9660;</div>
</div>

</section>
      </main>

      <Footer />
    </>
)}

export default ProfessionalProfile;
