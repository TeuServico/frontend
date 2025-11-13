import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import {
  meusAgendamentosProfissional,
  meusAgendamentosCliente,
} from "../../services/api";
import { formatarMoeda, formatarPrazo, getStatusColor, traduzirStatus } from "../../utils/appointmentUtils";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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

export const AppointmentsPlaceholder = () => {
  const { role } = useContext(AuthContext);
  const isProfessional = role === "PROFISSIONAL" || role === "Profissional";
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("todos");
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchAgendamentos() {
      setLoading(true);
      setError("");
      try {
        const data = isProfessional
          ? await meusAgendamentosProfissional({
              pagina,
              qtdMaximaElementos: limit,
            })
          : await meusAgendamentosCliente({
              pagina,
              qtdMaximaElementos: limit,
            });
        const conteudo = Array.isArray(data?.conteudo) ? data.conteudo : [];
        setAgendamentos(conteudo);

        if (data?.totalPaginas) {
          setTotalPaginas(data.totalPaginas);
        } else if (data?.totalElementos) {
          setTotalPaginas(Math.ceil(data.totalElementos / limit));
        } else {
          setTotalPaginas(conteudo.length > 0 ? 1 : 0);
        }
      } catch (err) {
        setError(err?.message || "Erro ao carregar agendamentos");
        setAgendamentos([]);
        setTotalPaginas(0);
      } finally {
        setLoading(false);
      }
    }
    fetchAgendamentos();
  }, [pagina, limit, isProfessional]);

  const agendamentosFiltrados = useMemo(() => {
    if (activeFilter === "todos") return agendamentos;

            return agendamentos.filter((agendamento) => {
              const status = agendamento?.status;

              switch (activeFilter) {
                case "andamento":
                  return status === "EM_ANDAMENTO";
                case "concluidos":
                  return status === "CONCLUIDO";
                case "negociando":
                  return (
                    status === "AGUARDANDO_CONFIRMACAO_PROFISSIONAL" ||
                    status === "AGUARDANDO_CONFIRMACAO_CLIENTE"
                  );
                case "cancelado":
                  return status === "CANCELADO";
                default:
                  return true;
              }
            });
  }, [agendamentos, activeFilter]);

  const handleVerDetalhes = (agendamento) => {
    const id = agendamento.id || agendamento.idAgendamento;
    if (id) {
      navigate(`/agendamento/${id}`);
    }
  };

  return (
    <section className="mt-6">
      <h2 className="text-center text-lg font-semibold text-[#002C57] md:text-xl">
        Gerencie suas informacoes
      </h2>

      <ul className="mt-6 flex flex-wrap items-center gap-3 justify-center">
        {FILTERS.map((filter) => (
          <ButtonFilter
            key={filter.key}
            isActive={activeFilter === filter.key}
            label={filter.label}
            onClick={() => {
              setActiveFilter(filter.key);
              setPagina(1);
            }}
          />
        ))}
      </ul>

      {loading && (
        <div className="mt-8 text-center text-[#002C57] py-8">
          Carregando agendamentos...
        </div>
      )}

      {!loading && error && (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid gap-4">
            {agendamentosFiltrados.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#ccd9e6] bg-[#fef8f1] p-6 text-center text-sm text-[#4b5a6a]">
                Nenhum agendamento encontrado
              </div>
            ) : (
              agendamentosFiltrados.map((agendamento) => {
                const status = agendamento?.status;
                const servicoNome =
                  agendamento?.ofertaServicoResponseDTO?.tipoServico?.nome ||
                  agendamento?.ofertaServico?.tipoServico?.nome ||
                  agendamento?.tipoServico?.nome ||
                  "Serviço não especificado";
                // Se houver contra-oferta, usar os valores da contra-oferta, senão usar os valores originais
                const temContraOferta = agendamento?.temContraOferta || false;
                const prazo = temContraOferta
                  ? agendamento?.contraOferta?.contraOfertaDataDeEntrega || agendamento?.dataEntrega
                  : agendamento?.dataEntrega || "Não informado";
                const valor = temContraOferta
                  ? agendamento?.contraOferta?.contraOfertaPrecoDesejado || agendamento?.precoDesejado
                  : agendamento?.precoDesejado || 0;
                const clienteNome =
                  agendamento?.clienteNome ||
                  agendamento?.cliente?.nomeCompleto ||
                  "Cliente";
                // Acessar nome do profissional corretamente
                const profissionalNomeRaw =
                  agendamento?.ofertaServicoResponseDTO?.profissionalNome ||
                  agendamento?.profissionalNome ||
                  agendamento?.profissional?.nomeCompleto;

                // Validar se não é um ID (IDs geralmente contêm "/" ou "=" ou são muito longos)
                const profissionalNome = profissionalNomeRaw &&
                  !profissionalNomeRaw.includes("/") &&
                  !profissionalNomeRaw.includes("=") &&
                  profissionalNomeRaw.length < 100 &&
                  profissionalNomeRaw !== agendamento?.ofertaServicoResponseDTO?.profissionalId
                  ? profissionalNomeRaw
                  : "Profissional";

                return (
                  <article
                    key={agendamento.id || agendamento.idAgendamento}
                    onClick={() => handleVerDetalhes(agendamento)}
                    className="rounded-2xl border border-[#ccd9e6] bg-white p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <header className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#002C57]">
                          {servicoNome}
                        </h3>
                      </div>
                    </header>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#4b5a6a]">
                      <span>
                        <strong>Prazo:</strong> {prazo ? formatarPrazo(prazo) : "Não informado"}
                        {temContraOferta && (
                          <span className="ml-1 text-[#F69027] font-semibold">(Contra-oferta)</span>
                        )}
                      </span>
                      <span>
                        <strong>Valor:</strong> {formatarMoeda(valor)}
                        {temContraOferta && (
                          <span className="ml-1 text-[#F69027] font-semibold">(Contra-oferta)</span>
                        )}
                      </span>
                      {isProfessional && (
                        <span>
                          <strong>Cliente:</strong> {clienteNome}
                        </span>
                      )}
                      {!isProfessional && (
                        <span>
                          <strong>Profissional:</strong> {profissionalNome}
                        </span>
                      )}
                    </div>
                    {status && (
                      <div className="mt-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            status
                          )}`}
                        >
                          {traduzirStatus(status)}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          {/* Paginação */}
          {agendamentosFiltrados.length > 0 && totalPaginas > 1 && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPagina(pagina - 1)}
                disabled={pagina <= 1}
              >
                Anterior
              </button>
              <span className="text-[#002C57] text-sm font-medium">
                Página {pagina} de {totalPaginas > 0 ? totalPaginas : 1}
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPagina(pagina + 1)}
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
