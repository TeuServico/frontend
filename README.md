# 🛠️ Teu Serviço

> **Plataforma de conexão entre clientes e profissionais para serviços domésticos**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Sobre o Projeto

O **Teu Serviço** é uma plataforma web que conecta clientes a profissionais qualificados para diversos tipos de serviços domésticos e profissionais. A aplicação facilita a busca, contratação e avaliação de prestadores de serviços, criando um ambiente seguro e confiável para ambas as partes.

### 🎯 Principais Funcionalidades

- **🏠 Página inicial** com apresentação dos serviços mais populares
- **🔐 Sistema de autenticação** completo (login, cadastro, recuperação de senha)
- **👤 Perfil de profissionais** detalhado com avaliações e histórico
- **🔍 Busca inteligente** de profissionais por habilidades e localização
- **⭐ Sistema de avaliações** e depoimentos de clientes
- **📝 Edição de perfil** (informações pessoais, profissionais e serviços)
- **💬 Sistema de comunicação** entre clientes e profissionais

## 🚀 Tecnologias Utilizadas

### Frontend

- **React 19.1.1** - Biblioteca principal para interface
- **Vite 7.1.2** - Build tool e servidor de desenvolvimento
- **React Router DOM 7.8.2** - Roteamento da aplicação
- **Tailwind CSS 4.1.12** - Framework CSS para estilização
- **React Icons 5.5.0** - Ícones para interface
- **Swiper 12.0.2** - Carrossel de serviços
- **Axios 1.11.0** - Cliente HTTP para APIs

### Ferramentas de Desenvolvimento

- **ESLint** - Linting e padronização de código
- **TypeScript** - Tipagem estática (em algumas partes)

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🛠️ Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd Teu-Servico
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponíveis

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento     |
| `npm run build`   | Gera build de produção                   |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint`    | Executa o linter para verificar código   |

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── About.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── MainServices.jsx
│   ├── FindAPro.jsx
│   ├── ClientTestimonials.jsx
│   └── Footer.jsx
├── pages/              # Páginas da aplicação
│   ├── Auth/           # Páginas de autenticação
│   │   ├── Login/
│   │   ├── CreateAccount/
│   │   ├── ForgotPassword/
│   │   └── ResetPassword/
│   ├── EditInfo/       # Páginas de edição de perfil
│   └── ProfessionalProfile/
├── context/           # Contextos React
│   └── AuthContext.jsx
├── routes/            # Configuração de rotas
│   └── AppRoutes.tsx
├── services/          # Serviços e APIs
│   └── api.js
└── assets/           # Recursos estáticos
```

## 🎨 Funcionalidades Principais

### 🏠 Página Inicial

- **Hero Section** com busca de serviços
- **Categorias populares** (Desenvolvedor, Eletricista, Pedreiro, etc.)
- **Carrossel de serviços** principais
- **Depoimentos** de clientes
- **Call-to-action** para encontrar profissionais

### 🔐 Sistema de Autenticação

- **Login** com email e senha
- **Cadastro** de novos usuários
- **Recuperação de senha** por email
- **Reset de senha** com token
- **Proteção de rotas** privadas

### 👤 Perfil de Profissional

- **Informações pessoais** e foto
- **Avaliações** e classificação
- **Habilidades** e especialidades
- **Histórico de serviços** realizados
- **Depoimentos** de clientes
- **Botão de contato** direto

### 📝 Edição de Perfil

- **Informações pessoais** (nome, email, telefone)
- **Informações profissionais** (habilidades, experiência)
- **Configurações de serviços** oferecidos
- **Segurança** (alteração de senha)

## 🛣️ Rotas da Aplicação

| Rota                    | Descrição                | Acesso  |
| ----------------------- | ------------------------ | ------- |
| `/`                     | Página inicial (landing) | Público |
| `/home`                 | Dashboard principal      | Privado |
| `/login`                | Página de login          | Público |
| `/create-account`       | Página de cadastro       | Público |
| `/forgot-password`      | Recuperação de senha     | Público |
| `/reset-password`       | Reset de senha           | Público |
| `/edit-profile`         | Edição de perfil         | Privado |
| `/professional-profile` | Perfil do profissional   | Privado |

## 🔐 Sistema de Autenticação

O projeto utiliza **React Context API** para gerenciamento de estado de autenticação:

- **AuthContext** centraliza o estado de login
- **Persistência** no localStorage
- **Proteção de rotas** com componente `ProtectedRoute`
- **Navegação automática** após login/logout

## 🎯 Serviços Disponíveis

A plataforma conecta clientes e profissionais para:

- **💻 Desenvolvimento Web**
- **📊 Criação de Planilhas Excel**
- **🎨 Pintura de Imóveis**
- **🔧 Montagem de Móveis**
- **🚚 Fretes e Mudanças**
- **🏗️ Reformas em Geral**
- **💻 Consultoria em TI**
- **📚 Aulas Particulares**
- **🎨 Design Gráfico**
- **📈 Marketing Digital**

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Feito com ❤️ para conectar pessoas e profissionais</p>
</div>
