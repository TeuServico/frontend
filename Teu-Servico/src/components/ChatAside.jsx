import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export const ChatAside = ({ isOpen, onClose, professionalInfo = null }) => {
  const { role } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionSent, setSuggestionSent] = useState(false);

  const isProfessional = role === "PROFISSIONAL" || role === "Profissional";

  const message = isProfessional
    ? "Em breve você poderá conversar diretamente com seus clientes através desta plataforma. Nossa equipe está trabalhando para disponibilizar essa funcionalidade em breve!"
    : "Em breve você poderá conversar diretamente com os profissionais através desta plataforma. Nossa equipe está trabalhando para disponibilizar essa funcionalidade em breve!";

  const handleSendSuggestion = (e) => {
    e.preventDefault();
    if (suggestion.trim()) {
      // Mockado - apenas simula o envio
      console.log("Sugestão enviada:", suggestion);
      setSuggestionSent(true);
      setSuggestion("");
      setTimeout(() => {
        setSuggestionSent(false);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Aside */}
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ccd9e6] bg-[#f5f9ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F69027] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 58 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2605 24.3912H38.7388M19.2605 34.6088H33.1515M28.9996 51.8542C33.8556 51.8531 38.5793 50.2709 42.4561 47.3466C46.3329 44.4224 49.1522 40.3153 50.4874 35.6465C51.8226 30.9777 51.6012 26.001 49.8566 21.4692C48.1121 16.9373 44.9393 13.0968 40.8181 10.5285C36.6969 7.96008 31.8514 6.80354 27.0145 7.23373C22.1775 7.66392 17.6122 9.65746 14.009 12.9128C10.4058 16.1682 7.96054 20.5084 7.04317 25.277C6.1258 30.0455 6.78615 34.9832 8.92438 39.3431C9.18538 39.8748 9.27238 40.4741 9.13946 41.0493L7.16746 49.5946C7.11187 49.8344 7.11824 50.0844 7.18599 50.3211C7.25374 50.5578 7.38062 50.7733 7.5547 50.9474C7.72877 51.1214 7.94429 51.2483 8.18096 51.3161C8.41763 51.3838 8.66765 51.3902 8.90746 51.3346L17.4504 49.3602C18.0272 49.2339 18.6299 49.3107 19.1565 49.5777C22.2194 51.0818 25.5874 51.8607 28.9996 51.8542Z"
                  stroke="#002C57"
                  strokeWidth="3.625"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#002C57]">Chat</h2>
              <p className="text-xs text-[#4b5a6a]">
                {professionalInfo
                  ? `Conversar com ${professionalInfo.profissionalNome || "Profissional"}`
                  : "Em desenvolvimento"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#fff2e4] transition-colors"
            aria-label="Fechar chat"
          >
            <FaTimes className="text-[#002C57] text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Indicador de desenvolvimento */}
          <div className="rounded-xl border border-dashed border-[#F69027] bg-[#fef8f1] p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F69027] bg-opacity-20 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 58 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2605 24.3912H38.7388M19.2605 34.6088H33.1515M28.9996 51.8542C33.8556 51.8531 38.5793 50.2709 42.4561 47.3466C46.3329 44.4224 49.1522 40.3153 50.4874 35.6465C51.8226 30.9777 51.6012 26.001 49.8566 21.4692C48.1121 16.9373 44.9393 13.0968 40.8181 10.5285C36.6969 7.96008 31.8514 6.80354 27.0145 7.23373C22.1775 7.66392 17.6122 9.65746 14.009 12.9128C10.4058 16.1682 7.96054 20.5084 7.04317 25.277C6.1258 30.0455 6.78615 34.9832 8.92438 39.3431C9.18538 39.8748 9.27238 40.4741 9.13946 41.0493L7.16746 49.5946C7.11187 49.8344 7.11824 50.0844 7.18599 50.3211C7.25374 50.5578 7.38062 50.7733 7.5547 50.9474C7.72877 51.1214 7.94429 51.2483 8.18096 51.3161C8.41763 51.3838 8.66765 51.3902 8.90746 51.3346L17.4504 49.3602C18.0272 49.2339 18.6299 49.3107 19.1565 49.5777C22.2194 51.0818 25.5874 51.8607 28.9996 51.8542Z"
                  stroke="#F69027"
                  strokeWidth="3.625"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#002C57] mb-2">
              Funcionalidade em Desenvolvimento
            </p>
            <p className="text-xs text-[#4b5a6a] leading-relaxed">{message}</p>
          </div>

          {/* Campo de sugestões */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-[#002C57]">
              Envie sua sugestão
            </label>
            <form onSubmit={handleSendSuggestion} className="flex flex-col gap-3">
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Conte-nos o que você gostaria de ver no chat..."
                className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-sm font-normal text-[#002C57] focus:outline-none focus:border-[#002C57] resize-y min-h-[120px]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#F69027] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!suggestion.trim() || suggestionSent}
              >
                {suggestionSent ? "Sugestão enviada!" : "Enviar sugestão"}
              </button>
            </form>
            {suggestionSent && (
              <p className="text-xs text-[#16a34a] text-center">
                Obrigado pela sua sugestão! Ela foi registrada.
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
