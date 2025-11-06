import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const LoginErrorModal = ({ isOpen, onClose, message = "Dados incorretos. Verifique seu e-mail e senha e tente novamente." }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-[#002C57] px-6 py-4">
          <h2
            className="text-[#002C57] text-2xl font-bold text-center"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Erro no Login
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            {/* Ícone de erro */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <FaTimesCircle className="text-red-600 text-4xl" />
            </div>

            {/* Mensagem */}
            <p
              className="text-[#002C57] text-base text-center leading-relaxed"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Footer com botão */}
        <div className="border-t border-[#002C57] px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#F69027] text-white rounded-lg py-3 px-6 text-base font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginErrorModal;
