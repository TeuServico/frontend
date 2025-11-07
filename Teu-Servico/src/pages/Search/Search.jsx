import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import filtroIcon from "../../assets/filtro.svg";
import ordenarMenor from "../../assets/ordenarMenorParaMaior.svg";
import FilterModal from "../../components/FilterModal";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import ServiceCard from "../../components/ServiceCard";
import { buscarOfertasPorTipo } from "../../services/api";

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ordenacao, setOrdenacao] = useState("Nome");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const filtrosAtivos = categoriasSelecionadas.length + tagsSelecionadas.length;

  const paginaParam = Number(searchParams.get("pagina") || 1);
  const limitParam = Number(searchParams.get("limit") || 10);
  const nomeParam = searchParams.get("nome") || "";

  const [nome, setNome] = useState(nomeParam);
  const [pagina, setPagina] = useState(paginaParam);
  const [limit] = useState(limitParam);

  const debouncedNome = useDebouncedValue(nome, 300);

  const stateToQuery = useMemo(
    () => ({
      nome: debouncedNome,
      pagina: String(pagina),
      limit: String(limit),
    }),
    [debouncedNome, pagina, limit]
  );

  useEffect(() => {
    // sincroniza query string
    const next = new URLSearchParams({
      ...(stateToQuery.nome ? { nome: stateToQuery.nome } : {}),
      pagina: stateToQuery.pagina,
      limit: stateToQuery.limit,
    });
    setSearchParams(next, { replace: true });
  }, [stateToQuery, setSearchParams]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        // Sempre chamar a API, mesmo quando não há palavra-chave (passar string vazia)
        const data = await buscarOfertasPorTipo({
          nome: debouncedNome || "",
          pagina,
          qtdMaximoElementos: limit,
        });
        const conteudo = Array.isArray(data?.conteudo) ? data.conteudo : [];
        setItems(conteudo);

        // Usar totalPaginas do backend ou calcular baseado no totalElementos
        if (data?.totalPaginas) {
          setTotalPaginas(data.totalPaginas);
        } else if (data?.totalElementos) {
          setTotalPaginas(Math.ceil(data.totalElementos / limit));
        } else {
          setTotalPaginas(conteudo.length > 0 ? 1 : 0);
        }
      } catch (err) {
        setError(err?.message || "Erro ao buscar ofertas. Tente novamente.");
        setItems([]);
        setTotalPaginas(0);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [debouncedNome, pagina, limit]);

  const goToPage = (next) => {
    if (next < 1) return;
    setPagina(next);
  };

  const clearSearch = () => {
    setNome("");
    setPagina(1);
  };

  const handleApplyFilters = (categorias, tags) => {
    setCategoriasSelecionadas(categorias);
    setTagsSelecionadas(tags);
    setPagina(1); // Resetar para primeira página ao aplicar filtros
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Campo de busca principal (estilo Figma) */}
        <div className="w-full mb-4">
          <div className="bg-[#F69027] rounded-full px-[11px] py-[11px] flex items-center gap-2">
            {/* Ícone de busca */}
            <div className="flex items-center gap-2 flex-1">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                className="text-[#002C57]"
              >
                <path
                  d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 11.5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="flex-1 bg-transparent text-[#002C57] placeholder:text-[#002C57] outline-none text-[17px] leading-[1.294]"
                style={{ fontFamily: "SF Pro, system-ui, sans-serif" }}
                placeholder="Digite uma palavra chave"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setPagina(1);
                }}
              />
            </div>
            {/* Botão X para limpar */}
            {nome && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-[#002C57] hover:opacity-70 transition-opacity"
                title="Limpar busca"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  className="text-[#002C57]"
                >
                  <path
                    d="M12.5 4.5L4.5 12.5M4.5 4.5L12.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Área de Filtragem (estilo Figma) */}
        <div className="w-full mb-6 flex items-center gap-4">
          {/* Ordenação */}
          <div className="flex items-center gap-2">
            {/* Select de ordenação */}
            <div className="relative">
              <select
                className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-4 py-3 pr-10 appearance-none text-base font-semibold"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="Nome">Nome</option>
                <option value="Preco">Preço</option>
                <option value="Avaliacao">Avaliação</option>
              </select>
              {/* Chevron down */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Botão de ordenar */}
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Ordenar"
            >
              <img src={ordenarMenor} alt="Ordenar" className="w-full h-full" />
            </button>
          </div>

          {/* Botão de filtro com badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="w-14 h-14 flex items-center justify-center hover:opacity-80 transition-opacity relative"
              title="Filtro"
            >
              <img src={filtroIcon} alt="Filtrar" className="w-12 h-12" />
              {/* Badge numérico */}
              {filtrosAtivos > 0 && (
                <div className="absolute top-0 right-0 bg-[#F69027] rounded-full w-[14px] h-[14px] flex items-center justify-center">
                  <span className="text-[8px] font-semibold text-white">
                    {filtrosAtivos > 8 ? "8+" : filtrosAtivos}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Modal de Filtros */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          categoriasSelecionadas={categoriasSelecionadas}
          tagsSelecionadas={tagsSelecionadas}
        />

        {/* Estados */}
        {loading && (
          <div className="text-center text-[#002C57] py-8">Carregando...</div>
        )}
        {!loading && error && (
          <div className="text-center text-red-600 py-8">{error}</div>
        )}
        {!loading && !error && items.length === 0 && (
          <div className="text-center text-[#002C57] py-8">
            {debouncedNome
              ? "Nenhum resultado encontrado"
              : "Digite uma palavra-chave para buscar ofertas de serviço"}
          </div>
        )}

        {/* Lista + Paginação ancorada no final */}
        <div className="flex-1 flex flex-col">
          {items.length > 0 && (
            <div className="flex flex-col gap-0">
              {items.map((it) => (
                <div key={it.id} className="py-4">
                  <ServiceCard item={it} />
                </div>
              ))}
            </div>
          )}

          {/* Paginação melhorada */}
          {items.length > 0 && (
            <div className="mt-auto pt-6 flex justify-center items-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
                onClick={() => goToPage(pagina - 1)}
                disabled={pagina <= 1}
              >
                Anterior
              </button>
              <span className="text-[#002C57] text-sm font-medium">
                Página {pagina} de {totalPaginas > 0 ? totalPaginas : 1}
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
                onClick={() => goToPage(pagina + 1)}
                disabled={pagina >= totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
