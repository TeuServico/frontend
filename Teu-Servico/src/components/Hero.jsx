export function Hero() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
                
                <h1 className="text-3xl md:text-5xl font-bold text-[#002C57] leading-tight mb-6">
                    Resolva seu problema de forma{" "}
                    <span className="text-[#F69027]">rápida</span> e{" "}
                    <span className="text-[#F69027]">segura</span>
                </h1>

                <p className="text-lg text-[#002C57] opacity-80 mb-8">
                    Conectamos você a profissionais próximos e qualificados
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10">
                    <input
                        type="text"
                        placeholder="O que você precisa..."
                        className="w-full md:w-96 px-4 py-3 border border-[#002C57] rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-[#F69027]
                                   transition duration-300 ease-in-out"
                    />
                    <button className="bg-[#F69027] text-[#002C57] font-semibold px-6 py-3 rounded-md 
                                       hover:bg-[#d96c15] transform hover:scale-105 
                                       transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                        Buscar
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-3">

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Desenvolvedor
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Eletricista
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Pedreiro
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Encanador
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Pintor
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Design
  </span>

  <span className="px-5 py-2 bg-[#D3d3d3] text-[#002C57] border border-gray-300 rounded-full text-sm font-medium cursor-pointer
                  shadow-sm transition-all duration-300 ease-in-out
                  hover:bg-[#F69027] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
    Excel
  </span>
</div>

            </div>
        </section>
    );
}
