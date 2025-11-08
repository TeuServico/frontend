import { useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { getMinhasOfertas } from "../../services/api";

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "andamento", label: "Andamento" },
  { key: "concluidos", label: "Concluidos" },
  { key: "negociando", label: "Negociando" },
  { key: "cancelado", label: "Cancelado" },
];

const ButtonFilter = ({ isActive, label, onClick }) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 border border-[#F69027] px-4 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-[#F69027] text-white"
          : "bg-white text-[#F69027] hover:bg-[#fff2e4]"
      }`}
    >
      {isActive && <FaCheck className="text-xs" />}
      <span>{label}</span>
    </button>
  </li>
);

export const ServicesPlaceholder = () => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchOfertas() {
      setLoading(true);
      setError("");
      try {
        const data = await getMinhasOfertas({
          pagina,
          qtdMaximoElementos: limit,
        });
        const conteudo = Array.isArray(data?.conteudo) ? data.conteudo : [];
        setOfertas(conteudo);

        if (data?.totalPaginas) {
          setTotalPaginas(data.totalPaginas);
        } else if (data?.totalElementos) {
          setTotalPaginas(Math.ceil(data.totalElementos / limit));
        } else {
          setTotalPaginas(conteudo.length > 0 ? 1 : 0);
        }
      } catch (err) {
        setError(
          err?.message || "Erro ao carregar suas ofertas. Tente novamente."
        );
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOfertas();
  }, [pagina]);

  const filteredOfertas = useMemo(() => {
    if (activeFilter === "todos") {
      return ofertas;
    }
    // Por enquanto, todos os itens aparecem em "todos" já que não há status na resposta
    // Se o backend adicionar status no futuro, podemos filtrar aqui
    return ofertas;
  }, [activeFilter, ofertas]);

  const goToPage = (next) => {
    if (next < 1 || next > totalPaginas) return;
    setPagina(next);
  };

  return (
    <section className="mt-6">
      <h2 className="text-center text-lg font-semibold text-[#002C57] md:text-xl">
        Consulte e gerencie seus servicos
      </h2>

      <ul className="mt-6 flex flex-wrap items-center gap-3 justify-center">
        {FILTERS.map((filter) => (
          <ButtonFilter
            key={filter.key}
            label={filter.label}
            isActive={activeFilter === filter.key}
            onClick={() => setActiveFilter(filter.key)}
          />
        ))}
      </ul>

      {loading && (
        <div className="mt-8 text-center text-[#002C57] py-8">
          Carregando suas ofertas...
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid gap-4">
            {filteredOfertas.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#ccd9e6] bg-[#fef8f1] p-6 text-center text-sm text-[#4b5a6a]">
                Nenhuma oferta encontrada. Crie sua primeira oferta de serviço!
              </div>
            ) : (
              filteredOfertas.map((oferta) => (
                <article
                  key={oferta.id}
                  className="rounded-2xl border border-[#ccd9e6] bg-white p-5 shadow-sm"
                >
                  <header className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#002C57]">
                        {oferta.tipoServico?.nome || "Sem nome"}
                      </h3>
                      {oferta.tipoServico?.categoria && (
                        <span className="mt-1 inline-block rounded-full border border-[#F69027] px-3 py-1 text-xs font-semibold text-[#F69027]">
                          {oferta.tipoServico.categoria}
                        </span>
                      )}
                    </div>
                  </header>
                  <p className="mt-3 text-sm text-[#4b5a6a]">
                    {oferta.descricao}
                  </p>
                  {oferta.tags && oferta.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {oferta.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-lg bg-[#F69027] px-3 py-1 text-xs font-semibold text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          {/* Paginação */}
          {filteredOfertas.length > 0 && totalPaginas > 1 && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => goToPage(pagina - 1)}
                disabled={pagina <= 1}
              >
                Anterior
              </button>
              <span className="text-[#002C57] text-sm font-medium">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => goToPage(pagina + 1)}
                disabled={pagina >= totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
