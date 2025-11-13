import React, { useState } from "react";
import { formatarMoeda } from "../utils/appointmentUtils";

export default function CounterOfferModal({
  isOpen,
  onClose,
  onSubmit,
  agendamento,
}) {
  const [dataEntrega, setDataEntrega] = useState("");
  const [precoDesejado, setPrecoDesejado] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Calcular data mínima (hoje)
  const hoje = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!dataEntrega || dataEntrega.trim() === "") {
      setError("A data de entrega é obrigatória");
      return;
    }

    if (!precoDesejado || parseFloat(precoDesejado) <= 0) {
      setError("O preço desejado deve ser maior que zero");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        dataEntrega: dataEntrega.trim(),
        precoDesejado: parseFloat(precoDesejado),
      });
    } catch (err) {
      setError(err?.message || "Erro ao fazer contra-oferta");
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-xl font-semibold text-[#002C57] mb-4"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Fazer Contra-Oferta
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Data de entrega */}
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#002C57]"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Nova data de entrega *
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
              Novo preço desejado (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={precoDesejado}
              onChange={(e) => setPrecoDesejado(e.target.value)}
              placeholder="Ex: 250.00"
              className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              required
            />
            {agendamento?.precoDesejado && (
              <p className="text-sm text-[#002C57] opacity-70">
                Preço original: {formatarMoeda(agendamento.precoDesejado)}
              </p>
            )}
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border-2 border-[#F69027] bg-white px-6 py-2 text-base font-semibold text-[#F69027] hover:bg-[#fff2e4] transition"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#F69027] px-6 py-2 text-base font-semibold text-white hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar Contra-Oferta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
