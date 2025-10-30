# Guia de Integração JWT - Teu Serviço

Este documento detalha o passo a passo exato da implementação da autenticação JWT no projeto.

## 📋 Resumo da Implementação

A integração JWT foi realizada para substituir o sistema de autenticação mock anterior, conectando-se ao backend real através dos endpoints:

- `POST /credenciais/login` - Autenticação de usuários existentes
- `POST /cliente/criar` - Criação de novos clientes

## 🔧 Configuração Inicial

### 1. Variável de Ambiente

**Arquivo:** `.env` (criar na raiz do projeto)

```env
VITE_API_BASE_URL=http://localhost:8080
```

**Nota:** Ajuste a URL conforme o ambiente (desenvolvimento/produção).

## 📝 Passo a Passo da Implementação

### Passo 1: Atualização do Serviço API (`src/services/api.js`)

**Objetivo:** Substituir mocks por cliente HTTP real com suporte a JWT.

**Mudanças realizadas:**

1. **Removido:** Sistema de mocks com `delay()` e switch cases
2. **Adicionado:**
   - Função `getStoredAuth()` para ler token do localStorage
   - Função `buildHeaders()` que adiciona automaticamente `Authorization: Bearer <token>`
   - Função `request()` genérica para todas as requisições HTTP
   - Tratamento de erro 401 que remove sessão automaticamente
   - Base URL configurável via `VITE_API_BASE_URL`

**Código implementado:**

```javascript
const BASE_URL = (
  import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");

function getStoredAuth() {
  try {
    const stored = localStorage.getItem("ts_auth");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function buildHeaders(extra = {}) {
  const { token } = getStoredAuth();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  return { "Content-Type": "application/json", ...authHeader, ...extra };
}

async function request(method, path, { params, body, headers } = {}) {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (params && typeof params === "object") {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }

  const response = await fetch(url, {
    method,
    headers: buildHeaders(headers),
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    try {
      localStorage.removeItem("ts_auth");
    } catch {}
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Erro ${response.status}: ${text || response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

export const api = {
  get: (path, params) => request("GET", path, { params }),
  post: (path, body) => request("POST", path, { body }),
};

export async function buscarOfertasPorTipo({
  nome,
  pagina = 1,
  qtdMaximoElementos = 10,
}) {
  return api.get("/ofertarservico/buscar/tiposervico/nome", {
    pagina,
    qtdMaximoElementos,
    nome,
  });
}
```

**Pontos importantes:**

- O token é injetado automaticamente em todas as requisições via `buildHeaders()`
- Erro 401 limpa a sessão e força novo login
- Suporte a GET (com query params) e POST (com body JSON)

---

### Passo 2: Extensão do AuthContext (`src/context/AuthContext.jsx`)

**Objetivo:** Adicionar gerenciamento de token JWT, role e expiração.

**Mudanças realizadas:**

1. **Adicionados estados:**

   - `token` - Token JWT retornado pela API
   - `role` - Papel do usuário (ex: PROFISSIONAL, CLIENTE)
   - `expiresAt` - Timestamp de expiração do token

2. **Nova função:** `isTokenValid()` - Valida se o token ainda é válido

3. **Função `login()` atualizada:**

   - Recebe: `{ user, token, role, expiresAt }`
   - Persiste todos os dados no localStorage na chave `ts_auth`
   - Estrutura completa: `{ isLoggedIn: true, user: {...}, token: "...", role: "...", expiresAt: 1234567890 }`

4. **Função `logout()` atualizada:**

   - Limpa todos os estados (token, role, expiresAt)
   - Remove item do localStorage

5. **Hidratação inicial:**
   - `useEffect` carrega dados do localStorage na inicialização
   - Restaura `token`, `role` e `expiresAt` junto com `isLoggedIn` e `user`

**Estrutura do localStorage (`ts_auth`):**

```json
{
  "isLoggedIn": true,
  "user": { "name": "Nome do Usuário" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "PROFISSIONAL",
  "expiresAt": 1735660000000
}
```

---

### Passo 3: Integração da Página de Login (`src/pages/Auth/Login/Login.jsx`)

**Objetivo:** Conectar formulário de login ao endpoint real.

**Mudanças realizadas:**

1. **Importações adicionadas:**

   ```javascript
   import { api } from "../../../services/api";
   ```

2. **Estados adicionados:**

   - `loading` - Controla estado de carregamento
   - `error` - Armazena mensagens de erro

3. **Função `onSubmit()` refatorada:**
   - Tornada `async`
   - Chama `api.post('/credenciais/login', { email, senha: password })`
   - Processa resposta: `{ acessToken, expiresIn, role }`
   - Calcula `expiresAt = Date.now() + expiresIn * 1000`
   - Chama `login()` do contexto com todos os dados
   - Tratamento de erros com mensagens amigáveis

**Código implementado:**

```javascript
const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const response = await api.post("/credenciais/login", {
      email,
      senha: password,
    });
    const { acessToken, expiresIn, role } = response || {};
    if (!acessToken || !expiresIn) {
      throw new Error("Resposta inválida do servidor");
    }
    const expiresAt = Date.now() + Number(expiresIn) * 1000;
    const displayName =
      email && email.includes("@") ? email.split("@")[0] : "Usuário";
    login({ user: { name: displayName }, token: acessToken, role, expiresAt });
  } catch (err) {
    setError(err?.message || "Falha no login");
  } finally {
    setLoading(false);
  }
};
```

4. **UI atualizada:**
   - Botão mostra "Entrando..." durante carregamento
   - Botão desabilitado durante requisição
   - Exibição de mensagens de erro abaixo do formulário

---

### Passo 4: Atualização do ProtectedRoute (`src/components/ProtectedRoute.jsx`)

**Objetivo:** Validar token e expiração antes de permitir acesso.

**Mudanças realizadas:**

1. **Validação melhorada:**

   - Usa `isTokenValid()` do contexto quando disponível
   - Fallback para localStorage se contexto ainda não estiver hidratado
   - Evita race condition entre setState e navegação

2. **Lógica implementada:**

   ```javascript
   let valid = false;
   if (isLoggedIn) {
     if (typeof isTokenValid === "function") {
       valid = isTokenValid();
     } else {
       // Fallback para localStorage
       const stored = JSON.parse(localStorage.getItem("ts_auth") || "{}");
       const t = token ?? stored.token;
       const exp = expiresAt ?? stored.expiresAt;
       valid = Boolean(t) && Boolean(exp) && Date.now() < Number(exp);
     }
   }
   ```

3. **Comportamento:**
   - Se válido: renderiza `children`
   - Se inválido: redireciona para `/login` com state preservando rota de origem

---

### Passo 5: Integração da Página de Criação de Conta (`src/pages/Auth/CreateAccount/CreateAccount.jsx`)

**Objetivo:** Criar conta completa com todos os campos obrigatórios e integrar com endpoint.

**Mudanças realizadas:**

1. **Campos adicionados:**

   - Nome Completo
   - Email
   - Senha
   - Telefone (com máscara)
   - CPF (com máscara e validação)
   - Endereço completo:
     - Rua
     - Número
     - Complemento (opcional)
     - Bairro
     - Cidade
     - Estado (UF)
     - CEP (com máscara)

2. **Máscaras implementadas:**

   - Telefone: `(11) 99999-9999` ou `(11) 9999-9999`
   - CPF: `000.000.000-00`
   - CEP: `00000-000`

3. **Validações:**

   - Telefone: 10-11 dígitos
   - CPF: Algoritmo de validação completo
   - CEP: 8 dígitos exatos
   - Endereço: Campos obrigatórios verificados

4. **Responsividade:**

   - Aside oculto em telas ≤ 900px
   - Formulário adapta-se a mobile
   - Grid de 2 colunas em desktop, 1 coluna em mobile

5. **Integração com API:**

   ```javascript
   const body = {
     credenciaisUsuarioRequestDTO: {
       email,
       senha: password,
     },
     clienteRequestDTO: {
       nomeCompleto: name,
       telefone: digitsPhone,
       cpf: digitsCpf,
       endereco: {
         rua,
         numero,
         complemento,
         bairro,
         cidade,
         estado: estadoUF,
         cep: digitsCep,
       },
     },
   };
   ```

6. **Pós-criação:**
   - Processa resposta: `{ acessToken, expiresIn, role }`
   - Faz login automático após cadastro bem-sucedido
   - Redireciona para `/home`

---

### Passo 6: Atualização do README (`README.md`)

**Adicionada seção sobre JWT:**

```markdown
### 🔐 Login via JWT

- Endpoint de login: `POST /credenciais/login` com `{ email, senha }`.
- Resposta esperada: `{ acessToken, expiresIn, role }`.
- O token é salvo em `localStorage` na chave `ts_auth` e enviado automaticamente no header `Authorization: Bearer <token>`.
```

---

## 🔐 Fluxo de Autenticação Completo

### Fluxo de Login

1. Usuário preenche email e senha
2. Frontend chama `POST /credenciais/login`
3. Backend valida credenciais e retorna `{ acessToken, expiresIn, role }`
4. Frontend calcula `expiresAt = Date.now() + expiresIn * 1000`
5. Dados são salvos no `localStorage` (chave `ts_auth`)
6. Estados do `AuthContext` são atualizados
7. Redirecionamento automático para `/home`

### Fluxo de Criação de Conta

1. Usuário preenche todos os campos obrigatórios
2. Frontend valida formatos (CPF, telefone, CEP)
3. Frontend chama `POST /cliente/criar` com payload completo
4. Backend cria cliente e retorna `{ acessToken, expiresIn, role }`
5. Frontend faz login automático (mesmo processo acima)
6. Redirecionamento para `/home`

### Fluxo de Proteção de Rotas

1. Usuário tenta acessar rota protegida
2. `ProtectedRoute` verifica:
   - `isLoggedIn === true`
   - Token existe e não está expirado
3. Se válido: renderiza conteúdo
4. Se inválido: redireciona para `/login`

### Fluxo de Requisições Autenticadas

1. Qualquer chamada via `api.get()` ou `api.post()`
2. `buildHeaders()` lê token do localStorage
3. Adiciona header: `Authorization: Bearer <token>`
4. Se resposta 401: limpa sessão e lança erro
5. Se sucesso: retorna dados normalmente

---

## 🛠️ Arquivos Modificados

1. `src/services/api.js` - Cliente HTTP com JWT
2. `src/context/AuthContext.jsx` - Gerenciamento de token e sessão
3. `src/pages/Auth/Login/Login.jsx` - Integração com endpoint de login
4. `src/pages/Auth/CreateAccount/CreateAccount.jsx` - Integração com endpoint de criação
5. `src/components/ProtectedRoute.jsx` - Validação de token
6. `README.md` - Documentação atualizada

---

## ✅ Checklist de Implementação

- [x] Configuração de variável de ambiente `VITE_API_BASE_URL`
- [x] Substituição de mocks por cliente HTTP real
- [x] Injeção automática de token em requisições
- [x] Tratamento de erro 401 (sessão expirada)
- [x] Extensão do AuthContext com token, role e expiresAt
- [x] Persistência completa no localStorage
- [x] Função de validação de token
- [x] Integração do formulário de login
- [x] Integração do formulário de criação de conta
- [x] Validação de campos obrigatórios
- [x] Máscaras de input (telefone, CPF, CEP)
- [x] Validação algorítmica de CPF
- [x] Responsividade da página de criação
- [x] ProtectedRoute com validação de expiração
- [x] Fallback para localStorage em ProtectedRoute
- [x] Documentação no README

---

## 🐛 Problemas Resolvidos

### Problema 1: Redirecionamento após login

**Causa:** Race condition entre setState e navegação
**Solução:** Fallback para localStorage no ProtectedRoute durante hidratação inicial

### Problema 2: CEP não aceitava último caractere

**Causa:** `maxLength={8}` conflitando com máscara (formato com hífen)
**Solução:** Removido `maxLength`, mantendo apenas limitação na função `formatCep()`

---

## 📚 Referências

- Endpoint de Login: `POST /credenciais/login`

  - Body: `{ email, senha }`
  - Response: `{ acessToken, expiresIn, role }`

- Endpoint de Criação: `POST /cliente/criar`
  - Body: `{ credenciaisUsuarioRequestDTO: { email, senha }, clienteRequestDTO: { nomeCompleto, telefone, cpf, endereco: {...} } }`
  - Response: `{ acessToken, expiresIn, role }`

---

**Data de Implementação:** 30 de outubro de 2025
**Versão:** 1.0
