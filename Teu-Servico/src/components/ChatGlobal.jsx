import React from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { ChatAside } from "./ChatAside";
import { ChatFloatingButton } from "./ChatFloatingButton";

export const ChatGlobal = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const { isChatOpen, selectedProfessional, openChat, closeChat } = useChat();
  const location = useLocation();

  // Rotas onde o chat não deve aparecer
  const hiddenRoutes = [
    "/login",
    "/create-account",
    "/forgot-password",
    "/reset-password",
  ];

  // Verifica se está em uma rota onde o chat deve estar oculto
  const shouldHideChat = hiddenRoutes.includes(location.pathname);

  // Só renderiza o chat se estiver logado e não estiver em uma rota de autenticação
  if (!isLoggedIn || shouldHideChat) {
    return null;
  }

  return (
    <>
      <ChatFloatingButton onClick={() => openChat()} />
      <ChatAside
        isOpen={isChatOpen}
        onClose={closeChat}
        professionalInfo={selectedProfessional}
      />
    </>
  );
};
