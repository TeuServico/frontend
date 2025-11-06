/**
 * Função para processar mensagens de erro e torná-las amigáveis ao usuário
 * @param {Error} error - Objeto de erro
 * @param {string} defaultMessage - Mensagem padrão caso não seja possível extrair uma mensagem amigável
 * @returns {string} - Mensagem amigável ao usuário
 */
export function getFriendlyErrorMessage(error, defaultMessage = 'Não foi possível processar sua solicitação. Tente novamente.') {
  if (!error) return defaultMessage;

  const errorMessage = error.message || '';
  const status = error.status || 0;

  // Mensagens específicas por status code
  if (status === 401 || errorMessage.includes('401') || errorMessage.includes('credenciais') || errorMessage.includes('Credenciais inválidas')) {
    return 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.';
  }

  if (status === 409 || errorMessage.includes('409') || errorMessage.includes('Senha inválida') || errorMessage.toLowerCase().includes('senha')) {
    return 'Senha inválida. Verifique sua senha e tente novamente.';
  }

  if (status === 400 || errorMessage.includes('400') || errorMessage.includes('Dados inválidos')) {
    return 'Dados inválidos. Verifique as informações fornecidas e tente novamente.';
  }

  if (status === 403) {
    return 'Você não tem permissão para realizar esta ação.';
  }

  if (status === 404) {
    return 'Recurso não encontrado.';
  }

  if (status >= 500) {
    return 'Erro no servidor. Tente novamente mais tarde.';
  }

  // Se a mensagem já é amigável (não contém JSON ou códigos técnicos), retorna ela
  if (errorMessage && !errorMessage.includes('{') && !errorMessage.includes('timestamp') && !errorMessage.includes('statusCode')) {
    return errorMessage;
  }

  // Se ainda não encontrou uma mensagem amigável, retorna a padrão
  return defaultMessage;
}
