import React, { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const openChat = (professionalInfo = null) => {
    setSelectedProfessional(professionalInfo);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedProfessional(null);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        selectedProfessional,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
