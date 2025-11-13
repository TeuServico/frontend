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

  // Removido handleVerDetalhes - não temos endpoint para buscar agendamento por ID

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <div>
        <ul className="flex flex-wrap gap-2">
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
      </div>

      {/* Estados */}
      {loading && (
        <div className="text-center text-[#002C57] py-8">
          Carregando agendamentos...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-600 py-8">{error}</div>
      )}

      {!loading && !error && agendamentosFiltrados.length === 0 && (
        <div className="text-center text-[#002C57] py-8">
          Nenhum agendamento encontrado
        </div>
      )}

      {/* Lista de agendamentos */}
      {!loading && !error && agendamentosFiltrados.length > 0 && (
        <div className="flex flex-col gap-4">
          {agendamentosFiltrados.map((agendamento) => {
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
              <div
                key={agendamento.id || agendamento.idAgendamento}
                className="border border-[#ccd9e6] rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-[#002C57] mb-2"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {servicoNome}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#002C57] opacity-70">
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
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            status
                          )}`}
                        >
                          {traduzirStatus(status)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paginação */}
      {!loading && !error && agendamentosFiltrados.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
            onClick={() => setPagina(pagina - 1)}
            disabled={pagina <= 1}
          >
            Anterior
          </button>
          <span className="text-[#002C57] text-sm font-medium">
            Página {pagina} de {totalPaginas > 0 ? totalPaginas : 1}
          </span>
          <button
            className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
            onClick={() => setPagina(pagina + 1)}
            disabled={pagina >= totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};
