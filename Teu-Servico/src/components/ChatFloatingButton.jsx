import React from "react";
import { FaComments } from "react-icons/fa";

export const ChatFloatingButton = ({ onClick, unreadCount = 0 }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#F69027] shadow-lg hover:shadow-xl transition-all hover:scale-110 z-[9999] flex items-center justify-center group"
      aria-label="Abrir chat"
      style={{ zIndex: 9999 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ícone de chat - usando react-icons */}
        <FaComments className="text-[#002C57] text-2xl" />

        {/* Badge de notificação (mockado) */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#002C57] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#F69027]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
    </button>
  );
};
