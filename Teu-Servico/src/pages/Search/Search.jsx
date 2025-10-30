import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import filtroIcon from "../../assets/filtro.svg";
import ordenarMenor from "../../assets/ordenarMenorParaMaior.svg";
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

  const paginaParam = Number(searchParams.get("pagina") || 1);
  const limitParam = Number(searchParams.get("limit") || 10);
  const nomeParam = searchParams.get("nome") || "";

  const [nome, setNome] = useState(nomeParam);
  const [pagina, setPagina] = useState(paginaParam);
  const [limit, setLimit] = useState(limitParam);

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
      if (!debouncedNome) {
        setItems([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const data = await buscarOfertasPorTipo({
          nome: debouncedNome,
          pagina,
          qtdMaximoElementos: limit,
        });
        setItems(Array.isArray(data?.conteudo) ? data.conteudo : []);
        // opcional: poderia usar data.totalPaginas/data.paginaAtual para paginação real do backend
      } catch (err) {
        setError(err?.message || "Erro ao buscar ofertas");
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Barra de busca (estilo Figma) */}
        <div className="w-full mb-6">
          <div className="bg-[#F69027] rounded-full px-3 py-2 flex items-center gap-3">
            <input
              className="flex-1 bg-white text-[#002C57] placeholder:text-[#9BB1CE] rounded-full px-4 py-2 outline-none"
              placeholder="Digite uma palavra chave"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setPagina(1);
              }}
            />
            {/* quantidade por página */}
            <select
              className="bg-white text-[#002C57] rounded-md px-3 py-2 border-0"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPagina(1);
              }}
              title="Quantidade por página"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            {/* ordenar e filtrar */}
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-white hover:bg-[#FFF3E6]"
              title="Ordenar"
            >
              <img src={ordenarMenor} alt="Ordenar" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-white hover:bg-[#FFF3E6]"
              title="Filtro"
            >
              <img src={filtroIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Estados */}
        {loading && (
          <div className="text-center text-[#002C57]">Carregando...</div>
        )}
        {!loading && error && (
          <div className="text-center text-red-600">{error}</div>
        )}
        {!loading && !error && debouncedNome && items.length === 0 && (
          <div className="text-center text-[#002C57]">
            Nenhum resultado encontrado
          </div>
        )}

        {/* Lista + Paginação ancorada no final */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <ServiceCard key={it.id} item={it} />
            ))}
          </div>

          {/* Paginação simples */}
          <div className="mt-auto pt-6 flex justify-center items-center gap-2">
            <button
              className="px-3 py-1 rounded border border-[#E6EDF5] text-[#002C57] disabled:opacity-50"
              onClick={() => goToPage(pagina - 1)}
              disabled={pagina <= 1}
            >
              Anterior
            </button>
            <span className="text-[#002C57] text-sm">Página {pagina}</span>
            <button
              className="px-3 py-1 rounded border border-[#E6EDF5] text-[#002C57]"
              onClick={() => goToPage(pagina + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
