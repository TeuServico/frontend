
const BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

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

    const response = await fetch(url, {
        method,
        headers: buildHeaders(headers),
        body: body != null ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
        try {
            // efetua logout simples
            localStorage.removeItem('ts_auth');
        } catch { }
        throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Erro ${response.status}: ${text || response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
}

export const api = {
    get: (path, params) => request('GET', path, { params }),
    post: (path, body) => request('POST', path, { body }),
};

// Chamada real ao backend para buscar ofertas por nome do tipo de serviço
export async function buscarOfertasPorTipo({ nome, pagina = 1, qtdMaximoElementos = 10 }) {
    return api.get('/ofertarservico/buscar/tiposervico/nome', {
        pagina,
        qtdMaximoElementos,
        nome,
    });
}
