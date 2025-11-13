import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { buscarOfertasPorTipo, solicitarAgendamento } from "../../services/api";
import { getFriendlyErrorMessage } from "../../utils/errorMessages";

export default function RequestAppointment() {
  const { ofertaId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState(null);
  const [dataEntrega, setDataEntrega] = useState("");
  const [precoDesejado, setPrecoDesejado] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOferta() {
      if (!ofertaId) {
        setError("ID da oferta não fornecido");
        setLoading(false);
        return;
      }

      // Primeiro, tentar usar a oferta passada via state (navegação)
      if (location.state?.oferta) {
        setOferta(location.state.oferta);
        setLoading(false);
        return;
      }

      // Se não tiver state, buscar via API
      try {
        // Tentar buscar com diferentes estratégias
        let data;
        let ofertaEncontrada = null;

        // Estratégia 1: Buscar sem nome (se o backend permitir)
        try {
          data = await buscarOfertasPorTipo({
            nome: "",
            pagina: 1,
            qtdMaximoElementos: 1000,
          });
          ofertaEncontrada = data?.conteudo?.find(
            (o) => o.id === Number(ofertaId)
          );
        } catch (err) {
          // Estratégia 2: Buscar com caractere genérico
          console.warn("Tentando buscar com valor genérico:", err);
          data = await buscarOfertasPorTipo({
            nome: "a",
            pagina: 1,
            qtdMaximoElementos: 1000,
          });
          ofertaEncontrada = data?.conteudo?.find(
            (o) => o.id === Number(ofertaId)
          );
        }

        if (ofertaEncontrada) {
          setOferta(ofertaEncontrada);
        } else {
          setError("Oferta não encontrada. Verifique se o ID está correto.");
        }
      } catch (err) {
        console.error("Erro ao carregar oferta:", err);
        setError(err?.message || "Erro ao carregar oferta. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    fetchOferta();
  }, [ofertaId, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!dataEntrega || dataEntrega.trim() === "") {
      setError("A data de entrega é obrigatória");
      return;
    }

    // Validar que a data é futura
    const dataSelecionada = new Date(dataEntrega);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataSelecionada <= hoje) {
      setError("A data de entrega deve ser uma data futura");
      return;
    }

    if (!precoDesejado || parseFloat(precoDesejado) <= 0) {
      setError("O preço desejado deve ser maior que zero");
      return;
    }

    if (!observacoes || observacoes.trim() === "") {
      setError("As observações são obrigatórias");
      return;
    }

    if (!oferta || !oferta.tipoServico?.nome) {
      setError("Erro: informações do serviço não encontradas");
      return;
    }

    setSubmitting(true);
    try {
      // Debug: verificar dados antes de enviar
      console.log("Dados do agendamento:", {
        ofertaServicoId: Number(ofertaId),
        dataEntrega: dataEntrega.trim(),
        observacoes: observacoes.trim(),
        precoDesejado: parseFloat(precoDesejado),
        oferta: oferta,
        tipoServico: oferta?.tipoServico,
      });

      await solicitarAgendamento({
        ofertaServicoId: Number(ofertaId),
        dataEntrega: dataEntrega.trim(),
        observacoes: observacoes.trim(),
        precoDesejado: parseFloat(precoDesejado),
      });
      navigate("/edit-profile");
    } catch (err) {
      let errorMsg = "";

      // Tentar extrair mensagem de erro do backend
      try {
        if (err?.originalText) {
          const errorData =
            typeof err.originalText === "string"
              ? JSON.parse(err.originalText)
              : err.originalText;

          // Verificar diferentes formatos de erro
          if (errorData?.message) {
            errorMsg = errorData.message;
          } else if (errorData?.error) {
            errorMsg = errorData.error;
          } else if (typeof errorData === "string") {
            errorMsg = errorData;
          } else if (errorData?.detail) {
            errorMsg = errorData.detail;
          }
        }

        if (!errorMsg && err?.message) {
          errorMsg = err.message;
        }

        if (!errorMsg) {
          errorMsg = getFriendlyErrorMessage(err);
        }
      } catch {
        errorMsg =
          err?.message || "Erro ao solicitar agendamento. Tente novamente.";
      }

      setError(errorMsg);
      console.error("Erro ao solicitar agendamento:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Calcular data mínima (hoje)
  const hoje = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-3xl border border-[#ccd9e6] shadow-sm p-6 md:p-10">
          <h1
            className="text-center text-2xl md:text-3xl font-semibold text-[#002C57] mb-8"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Solicitar Agendamento
          </h1>

          {loading && (
            <div className="text-center text-[#002C57] py-8">
              Carregando informações da oferta...
            </div>
          )}

          {error && !loading && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          {!loading && oferta && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Serviço (readonly) */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-base font-semibold text-[#002C57]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Serviço
                </label>
                <div className="w-full rounded-lg border-2 border-[#E6EDF5] bg-[#f5f8fb] px-4 py-3 text-base font-normal text-[#002C57]">
                  {oferta.tipoServico?.nome ||
                    oferta.nome ||
                    "Serviço não especificado"}
                </div>
                {oferta.descricao && (
                  <p className="text-sm text-[#002C57] opacity-70">
                    {oferta.descricao}
                  </p>
                )}
                {oferta.tipoServico?.categoria && (
                  <p className="text-sm text-[#002C57] opacity-70">
                    Categoria: {oferta.tipoServico.categoria}
                  </p>
                )}
              </div>

              {/* Data de entrega */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-base font-semibold text-[#002C57]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Data de entrega *
                </label>
                <input
                  type="date"
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                  min={hoje}
                  className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  required
                />
              </div>

              {/* Preço desejado */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-base font-semibold text-[#002C57]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Preço desejado (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={precoDesejado}
                  onChange={(e) => setPrecoDesejado(e.target.value)}
                  placeholder="Ex: 200.00"
                  className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  required
                />
              </div>

              {/* Observações */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-base font-semibold text-[#002C57]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Observações *
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Adicione observações sobre o serviço desejado..."
                  className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none min-h-[100px] resize-y"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  required
                />
                <p className="text-sm text-[#002C57] opacity-70">
                  Este campo é obrigatório
                </p>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <div className="rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p className="font-semibold mb-1">
                    Erro ao solicitar agendamento:
                  </p>
                  <p>{error}</p>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border-2 border-[#F69027] bg-white px-10 py-3 text-lg font-semibold text-[#F69027] shadow-md transition hover:bg-[#fff2e4]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#F69027] px-10 py-3 text-lg font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Solicitar Agendamento"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
