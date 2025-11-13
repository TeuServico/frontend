import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CounterOfferModal from "../../components/CounterOfferModal";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import {
  aceitarAgendamento,
  aceitarContraOferta,
  cancelarAgendamentoCliente,
  cancelarAgendamentoProfissional,
  concluirAgendamento,
  fazerContraOferta,
  meusAgendamentosCliente,
  meusAgendamentosProfissional,
} from "../../services/api";
import {
  formatarMoeda,
  formatarPrazo,
  getAcoesDisponiveis,
  getStatusColor,
  traduzirStatus,
} from "../../utils/appointmentUtils";
import { getFriendlyErrorMessage } from "../../utils/errorMessages";

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);

  const isCliente = role === "CLIENTE" || role === "Cliente";
  const isProfissional = role === "PROFISSIONAL" || role === "Profissional";

  useEffect(() => {
    async function fetchAgendamento() {
      if (!id) {
        setError("ID do agendamento não fornecido");
        setLoading(false);
        return;
      }

      try {
        // Buscar em ambos os endpoints e encontrar o agendamento
        let agendamentoEncontrado = null;

        if (isCliente) {
          const data = await meusAgendamentosCliente({
            pagina: 1,
            qtdMaximaElementos: 1000,
          });
          agendamentoEncontrado = data?.conteudo?.find(
            (a) =>
              String(a.id) === String(id) ||
              String(a.idAgendamento) === String(id)
          );
        } else if (isProfissional) {
          const data = await meusAgendamentosProfissional({
            pagina: 1,
            qtdMaximaElementos: 1000,
          });
          agendamentoEncontrado = data?.conteudo?.find(
            (a) =>
              String(a.id) === String(id) ||
              String(a.idAgendamento) === String(id)
          );
        }

        if (agendamentoEncontrado) {
          setAgendamento(agendamentoEncontrado);
        } else {
          setError("Agendamento não encontrado");
        }
      } catch (err) {
        setError(err?.message || "Erro ao carregar agendamento");
      } finally {
        setLoading(false);
      }
    }
    fetchAgendamento();
  }, [id, isCliente, isProfissional]);

  const handleAction = async (acao) => {
    if (!agendamento) return;

    setActionLoading(true);
    setError("");

    try {
      const agendamentoId =
        agendamento.id || agendamento.idAgendamento || Number(id);

      switch (acao) {
        case "aceitar":
          if (isProfissional) {
            await aceitarAgendamento(agendamentoId);
          } else if (isCliente) {
            await aceitarContraOferta(agendamentoId);
          }
          break;
        case "contraOferta":
          setShowCounterOfferModal(true);
          setActionLoading(false);
          return;
        case "recusar":
        case "cancelar":
          if (isCliente) {
            await cancelarAgendamentoCliente(agendamentoId);
          } else if (isProfissional) {
            await cancelarAgendamentoProfissional(agendamentoId);
          }
          break;
        case "concluir":
          await concluirAgendamento(agendamentoId);
          break;
      }

      // Recarregar agendamento após ação
      navigate("/edit-profile");
    } catch (err) {
      const errorMsg = err?.originalText
        ? typeof err.originalText === "string"
          ? err.originalText
          : JSON.parse(err.originalText)?.message || err.message
        : err?.message || getFriendlyErrorMessage(err);
      setError(errorMsg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCounterOffer = async (dados) => {
    if (!agendamento) return;

    setActionLoading(true);
    setError("");

    try {
      const agendamentoId =
        agendamento.id || agendamento.idAgendamento || Number(id);

      await fazerContraOferta({
        idDoAgendamento: agendamentoId,
        dataEntrega: dados.dataEntrega,
        precoDesejado: dados.precoDesejado,
      });

      setShowCounterOfferModal(false);
      navigate("/edit-profile");
    } catch (err) {
      const errorMsg = err?.originalText
        ? typeof err.originalText === "string"
          ? err.originalText
          : JSON.parse(err.originalText)?.message || err.message
        : err?.message || getFriendlyErrorMessage(err);
      setError(errorMsg);
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-[#002C57] py-8">
            Carregando agendamento...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !agendamento) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600 py-8">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  const status = agendamento?.status;
  const acoes = getAcoesDisponiveis(status, role);
  const servicoNome =
    agendamento?.ofertaServicoResponseDTO?.tipoServico?.nome ||
    agendamento?.ofertaServico?.tipoServico?.nome ||
    agendamento?.tipoServico?.nome ||
    "Serviço não especificado";

  // Se houver contra-oferta, usar os valores da contra-oferta, senão usar os valores originais
  const temContraOferta = agendamento?.temContraOferta || false;
  const prazo = temContraOferta
    ? agendamento?.contraOferta?.contraOfertaDataDeEntrega ||
      agendamento?.dataEntrega
    : agendamento?.dataEntrega || "Não informado";
  const valor = temContraOferta
    ? agendamento?.contraOferta?.contraOfertaPrecoDesejado ||
      agendamento?.precoDesejado
    : agendamento?.precoDesejado || 0;

  const observacoes = agendamento?.observacoes || "";
  const clienteNome =
    agendamento?.clienteNome || agendamento?.cliente?.nomeCompleto || "Cliente";
  // Acessar nome do profissional corretamente
  const profissionalNomeRaw =
    agendamento?.ofertaServicoResponseDTO?.profissionalNome ||
    agendamento?.profissionalNome ||
    agendamento?.profissional?.nomeCompleto;

  // Validar se não é um ID (IDs geralmente contêm "/" ou "=" ou são muito longos)
  const profissionalNome =
    profissionalNomeRaw &&
    !profissionalNomeRaw.includes("/") &&
    !profissionalNomeRaw.includes("=") &&
    profissionalNomeRaw.length < 100 &&
    profissionalNomeRaw !==
      agendamento?.ofertaServicoResponseDTO?.profissionalId
      ? profissionalNomeRaw
      : "Profissional";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-3xl border border-[#ccd9e6] shadow-sm p-6 md:p-10">
          {/* Botão voltar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#002C57] hover:text-[#F69027] mb-6"
          >
            <span className="text-2xl">&#9668;</span>
            <span className="text-base font-medium">Voltar</span>
          </button>

          <h1
            className="text-center text-2xl md:text-3xl font-semibold text-[#002C57] mb-8"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Proposta
          </h1>

          {/* Card de informações */}
          <div className="bg-[#f5f8fb] rounded-xl border border-[#ccd9e6] p-6 mb-6 shadow-sm">
            {/* Serviço */}
            <div className="mb-4">
              <p
                className="text-[#F69027] text-base font-semibold mb-1"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Serviço:
              </p>
              <p
                className="text-[#002C57] text-base"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {servicoNome}
              </p>
            </div>

            {/* Prazo */}
            <div className="mb-4">
              <p
                className="text-[#F69027] text-base font-semibold mb-1"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Prazo:
              </p>
              <p
                className="text-[#002C57] text-base"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {prazo ? formatarPrazo(prazo) : "Não informado"}
                {temContraOferta && (
                  <span className="ml-2 text-[#F69027] font-semibold text-sm">
                    (Contra-oferta)
                  </span>
                )}
              </p>
              {temContraOferta && agendamento?.dataEntrega && (
                <p
                  className="text-[#002C57] text-sm opacity-70 mt-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Prazo original: {formatarPrazo(agendamento.dataEntrega)}
                </p>
              )}
            </div>

            {/* Valor */}
            <div className="mb-4">
              <p
                className="text-[#F69027] text-base font-semibold mb-1"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Valor:
              </p>
              <p
                className="text-green-600 text-base font-semibold"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {formatarMoeda(valor)}
                {temContraOferta && (
                  <span className="ml-2 text-[#F69027] font-semibold text-sm">
                    (Contra-oferta)
                  </span>
                )}
              </p>
              {temContraOferta && agendamento?.precoDesejado && (
                <p
                  className="text-[#002C57] text-sm opacity-70 mt-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Valor original: {formatarMoeda(agendamento.precoDesejado)}
                </p>
              )}
            </div>

            {/* Observações */}
            {observacoes && (
              <div className="mb-4">
                <p
                  className="text-[#F69027] text-base font-semibold mb-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Observações:
                </p>
                <p
                  className="text-[#002C57] text-base"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {observacoes}
                </p>
              </div>
            )}

            {/* Informações do Cliente/Profissional */}
            <div className="mb-4">
              {isProfissional && (
                <>
                  <p
                    className="text-[#F69027] text-base font-semibold mb-1"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Cliente:
                  </p>
                  <p
                    className="text-[#002C57] text-base"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {clienteNome}
                  </p>
                </>
              )}
              {isCliente && (
                <>
                  <p
                    className="text-[#F69027] text-base font-semibold mb-1"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Profissional:
                  </p>
                  <p
                    className="text-[#002C57] text-base"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {profissionalNome}
                  </p>
                </>
              )}
            </div>

            {/* Status */}
            {status && (
              <div className="mt-4">
                <p
                  className="text-[#F69027] text-base font-semibold mb-2"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Status:
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                    status
                  )}`}
                >
                  {traduzirStatus(status)}
                </span>
              </div>
            )}
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          {/* Botões de ação */}
          {acoes.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {acoes.includes("aceitar") && (
                <button
                  onClick={() => handleAction("aceitar")}
                  disabled={actionLoading}
                  className="flex-1 min-w-[140px] rounded-lg border-2 border-green-500 bg-white px-4 py-3 text-base font-semibold text-green-600 hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Aceitar proposta
                </button>
              )}

              {acoes.includes("contraOferta") && (
                <button
                  onClick={() => handleAction("contraOferta")}
                  disabled={actionLoading}
                  className="flex-1 min-w-[140px] rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-semibold text-[#F69027] hover:bg-[#fff2e4] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Contra proposta
                </button>
              )}

              {(acoes.includes("recusar") || acoes.includes("cancelar")) && (
                <button
                  onClick={() =>
                    handleAction(
                      acoes.includes("recusar") ? "recusar" : "cancelar"
                    )
                  }
                  disabled={actionLoading}
                  className="flex-1 min-w-[140px] rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {acoes.includes("recusar") ? "Recusar proposta" : "Cancelar"}
                </button>
              )}

              {acoes.includes("concluir") && (
                <button
                  onClick={() => handleAction("concluir")}
                  disabled={actionLoading}
                  className="flex-1 min-w-[140px] rounded-lg border-2 border-green-500 bg-green-500 px-4 py-3 text-base font-semibold text-white hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Concluir
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal de contra-oferta */}
      {showCounterOfferModal && (
        <CounterOfferModal
          isOpen={showCounterOfferModal}
          onClose={() => {
            setShowCounterOfferModal(false);
            setActionLoading(false);
          }}
          onSubmit={handleCounterOffer}
          agendamento={agendamento}
        />
      )}

      <Footer />
    </div>
  );
}
