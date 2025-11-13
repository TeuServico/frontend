// Formatar data para exibição (ex: "15 dias")
export function formatarPrazo(dataEntrega) {
  if (!dataEntrega) return "Não informado";

  const hoje = new Date();
  const data = new Date(dataEntrega);
  const diffTime = data - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Prazo vencido";
  } else if (diffDays === 0) {
    return "Hoje";
  } else if (diffDays === 1) {
    return "1 dia";
  } else {
    return `${diffDays} dias`;
  }
}

// Formatar moeda (R$ 200,00)
export function formatarMoeda(valor) {
  if (valor === null || valor === undefined) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Traduzir status para português
export function traduzirStatus(status) {
  const statusMap = {
    AGUARDANDO_CONFIRMACAO_PROFISSIONAL: "Aguardando confirmação do profissional",
    AGUARDANDO_CONFIRMACAO_CLIENTE: "Aguardando confirmação do cliente",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDO: "Concluído",
    CANCELADO: "Cancelado",
  };
  return statusMap[status] || status;
}

// Obter cor do badge baseado no status
export function getStatusColor(status) {
  const colorMap = {
    AGUARDANDO_CONFIRMACAO_PROFISSIONAL: "bg-yellow-100 text-yellow-800 border-yellow-300",
    AGUARDANDO_CONFIRMACAO_CLIENTE: "bg-blue-100 text-blue-800 border-blue-300",
    EM_ANDAMENTO: "bg-green-100 text-green-800 border-green-300",
    CONCLUIDO: "bg-gray-100 text-gray-800 border-gray-300",
    CANCELADO: "bg-red-100 text-red-800 border-red-300",
  };
  return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-300";
}

// Determinar ações disponíveis baseado em status e role
export function getAcoesDisponiveis(status, role) {
  const isCliente = role === "CLIENTE" || role === "Cliente";
  const isProfissional = role === "PROFISSIONAL" || role === "Profissional";

  const acoes = {
    AGUARDANDO_CONFIRMACAO_PROFISSIONAL: {
      cliente: ["cancelar"],
      profissional: ["aceitar", "contraOferta", "recusar"],
    },
    AGUARDANDO_CONFIRMACAO_CLIENTE: {
      cliente: ["aceitar", "recusar"],
      profissional: ["cancelar"],
    },
    EM_ANDAMENTO: {
      cliente: ["cancelar"],
      profissional: ["concluir", "cancelar"],
    },
    CONCLUIDO: {
      cliente: [],
      profissional: [],
    },
    CANCELADO: {
      cliente: [],
      profissional: [],
    },
  };

  if (isCliente) {
    return acoes[status]?.cliente || [];
  } else if (isProfissional) {
    return acoes[status]?.profissional || [];
  }

  return [];
}
