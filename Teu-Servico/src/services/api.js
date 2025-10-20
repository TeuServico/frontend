
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function post(path, body) {
    await delay(300);
    switch (path) {
        case '/auth/login': {
            const name = body?.email ? String(body.email).split('@')[0] : 'Lázaro Kauã';
            return { token: 'mock-token', user: { name } };
        }
        default:
            throw new Error(`POST ${path} não implementado`);
    }
}

export async function get(path, params) {
    await delay(300);
    switch (path) {
        case '/users/me': {
            return { name: 'Lázaro Kauã', email: 'lazaro@example.com' };
        }
        case '/professionals/search': {
            const q = params?.q?.toLowerCase?.() ?? '';
            const all = [
                { id: 1, name: 'Ana Silva', skill: 'Design', rating: 4.7 },
                { id: 2, name: 'Bruno Souza', skill: 'Marketing', rating: 4.5 },
                { id: 3, name: 'Carlos Lima', skill: 'TI', rating: 4.8 },
                { id: 4, name: 'Daniela Alves', skill: 'Excel', rating: 4.2 },
            ];
            const items = q ? all.filter((p) => (p.name + p.skill).toLowerCase().includes(q)) : all;
            return { items };
        }
        default:
            throw new Error(`GET ${path} não implementado`);
    }
}

export function withErrorHandling(fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (err) {
            console.error('API error:', err);
            throw err;
        }
    };
}

export const api = {
    post: withErrorHandling(post),
    get: withErrorHandling(get),
};
