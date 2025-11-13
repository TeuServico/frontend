
const BASE_URL = (
    import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");

function getStoredAuth() {
    try {
        const stored = localStorage.getItem('ts_auth');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function buildHeaders(extra = {}) {
    const { token } = getStoredAuth();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    return { 'Content-Type': 'application/json', ...authHeader, ...extra };
}

async function request(method, path, { params, body, headers } = {}) {
    const url = new URL(`${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`);
    if (params && typeof params === 'object') {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    }

    // Debug: log do body antes de enviar (apenas para desenvolvimento)
    if (body && path.includes('/agendamento/cliente/solicitar')) {
        console.log('Enviando para backend:', JSON.stringify(body, null, 2));
    }

    const response = await fetch(url, {
        method,
        headers: buildHeaders(headers),
        body: body != null ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
        try {
            // efetua logout simples
            localStorage.removeItem('ts_auth');
        } catch {
            // Ignora erros ao remover do localStorage
        }

        // Dispara evento customizado para notificar que a sessão expirou
        // Isso permite que o AuthContext mostre o modal de sessão expirada
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('session-expired'));
        }

        throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        let errorMessage = response.statusText || 'Erro na requisição';

        // Tenta extrair mensagem amigável do JSON
        try {
            if (text) {
                const jsonError = JSON.parse(text);
                // Prioriza mensagens específicas do backend
                if (jsonError.error) {
                    errorMessage = jsonError.error;
                } else if (jsonError.message) {
                    errorMessage = jsonError.message;
                } else if (typeof jsonError === 'string') {
                    errorMessage = jsonError;
                }
            }
        } catch {
            // Se não conseguir parsear, usa a mensagem padrão baseada no status
            if (response.status === 400) {
                errorMessage = 'Dados inválidos';
            } else if (response.status === 401) {
                errorMessage = 'Credenciais inválidas';
            } else if (response.status === 403) {
                errorMessage = 'Acesso negado';
            } else if (response.status === 404) {
                errorMessage = 'Recurso não encontrado';
            } else if (response.status === 409) {
                errorMessage = 'Conflito: este recurso já existe ou está em uso';
            } else if (response.status >= 500) {
                errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
            }
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        error.originalText = text;
        throw error;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
}

export const api = {
    get: (path, params) => request('GET', path, { params }),
    post: (path, body, options = {}) => request('POST', path, { body, ...options }),
    put: (path, body) => request('PUT', path, { body }),
};

// Chamada real ao backend para buscar ofertas por nome do tipo de serviço
export async function buscarOfertasPorTipo({ nome, pagina = 1, qtdMaximoElementos = 10 }) {
    const params = {
        pagina,
        qtdMaximoElementos,
    };

    // Só adicionar nome se não estiver vazio
    if (nome && nome.trim() !== "") {
        params.nome = nome.trim();
    }

    return api.get('/ofertaservico/buscar/tiposervico/nome', params);
}

// Buscar todos os tipos de serviço
export async function buscarTiposServico({ pagina = 1, qtdMaximaElementos = 10 }) {
    return api.get('/tiposervico/buscar/todos', {
        pagina,
        qtdMaximaElementos,
    });
}

// Buscar tipos de serviço por categoria
export async function buscarTiposServicoPorCategoria({ categoria, pagina = 1, qtdMaximaElementos = 10 }) {
    return api.get('/tiposervico/buscar/categoria', {
        categoria,
        pagina,
        qtdMaximaElementos,
    });
}

export async function getClientePerfil() {
    return api.get('/cliente/perfil');
}

export async function getProfissionalPerfil() {
    return api.get('/profissional/perfil');
}

export async function getMinhasOfertas({ pagina = 1, qtdMaximoElementos = 10 }) {
    return api.get('/ofertaservico/minhasofertas', { pagina, qtdMaximoElementos })
}

// Criar tipo de serviço
export async function criarTipoServico({ nome, categoria }) {
    return api.post('/tiposervico/criar', {
        nome,
        categoria,
    });
}

// Criar oferta de serviço
export async function criarOfertaServico({ tipoServicoId, descricao, tags }) {
    return api.post('/ofertaservico/criar', {
        tipoServicoId,
        descricao,
        tags,
    });
}

export async function atualizarPerfilProfissional(profissionalRequestDTO) {
    // Usa o mesmo endpoint de criar, mas para atualizar
    // O backend deve identificar que é uma atualização baseado no token/contexto
    // Não envia credenciais pois é uma atualização (não precisa de senha)
    return api.post('/profissional/criar', {
        profissionalRequestDTO,
    });
}

// ========== AGENDAMENTOS - CLIENTE ==========

export async function solicitarAgendamento({ ofertaServicoId, dataEntrega, observacoes, precoDesejado }) {
    return api.post('/agendamento/cliente/solicitar', {
        ofertaServicoId: Number(ofertaServicoId),
        dataEntrega,
        observacoes: observacoes.trim(),
        precoDesejado: Number(precoDesejado),
    });
}

export async function meusAgendamentosCliente({ pagina = 1, qtdMaximaElementos = 10 }) {
    return api.get('/agendamento/cliente/meusagendamentos', {
        pagina,
        qtdMaximaElementos,
    });
}

export async function aceitarContraOferta(idAgendamento) {
    return api.post('/agendamento/cliente/aceitar/contraoferta', null, {
        params: { idAgendamento: String(idAgendamento) },
    });
}

export async function cancelarAgendamentoCliente(idAgendamento) {
    return api.post('/agendamento/cliente/cancelar', null, {
        params: { idAgendamento: String(idAgendamento) },
    });
}

// ========== AGENDAMENTOS - PROFISSIONAL ==========

export async function meusAgendamentosProfissional({ pagina = 1, qtdMaximaElementos = 10 }) {
    return api.get('/agendamento/profissional/meusagendamentos', {
        pagina,
        qtdMaximaElementos,
    });
}

export async function aceitarAgendamento(idAgendamento) {
    return api.post('/agendamento/profissional/aceitar', null, {
        params: { idAgendamento: String(idAgendamento) },
    });
}

export async function fazerContraOferta({ idDoAgendamento, dataEntrega, precoDesejado }) {
    return api.post('/agendamento/profissional/fazer/contraoferta', {
        idDoAgendamento,
        dataEntrega,
        precoDesejado,
    });
}

export async function cancelarAgendamentoProfissional(idAgendamento) {
    return api.post('/agendamento/profissional/cancelar', null, {
        params: { idAgendamento: String(idAgendamento) },
    });
}

export async function concluirAgendamento(idAgendamento) {
    return api.post('/agendamento/profissional/concluir', null, {
        params: { idAgendamento: String(idAgendamento) },
    });
}
