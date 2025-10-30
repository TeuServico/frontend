import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Aside from "../../../components/AsideLogin";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../services/api";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post('/credenciais/login', { email, senha: password });
      const { acessToken, expiresIn, role } = response || {};
      if (!acessToken || !expiresIn) {
        throw new Error('Resposta inválida do servidor');
      }
      const expiresAt = Date.now() + Number(expiresIn) * 1000;
      const displayName = email && email.includes("@") ? email.split("@")[0] : "Usuário";
      login({ user: { name: displayName }, token: acessToken, role, expiresAt });
    } catch (err) {
      setError(err?.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Aside />

      <main
        style={{
          width: "68vw",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "32vw",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "38px",
            color: "#002C57",
            letterSpacing: "1px",
            lineHeight: "38px",
            marginBottom: "30px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Entre
        </h2>

        <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "300px" }}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px 0",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              marginBottom: "24px",
              borderBottom: "2px solid #002C57",
              color: "#002C57",
              backgroundColor: "transparent",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px 0",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              marginBottom: "24px",
              borderBottom: "2px solid #002C57",
              color: "#002C57",
              backgroundColor: "transparent",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#F69027",
              color: "#002C57",
              width: "100%",
              padding: "14px 0",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              border: "none",
              marginTop: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Login'}
          </button>
        </form>

        {error && (
          <p style={{ color: '#c00', marginTop: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            {error}
          </p>
        )}

        <p
          style={{
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            marginTop: "20px",
            color: "#002C57",
            textAlign: "center",
          }}
        >
          Não tem uma conta?{" "}
          <Link
            to="/create-account"
            style={{ color: "#F69027", textDecoration: "none" }}
          >
            Criar aqui
          </Link>
        </p>
      </main>
    </div>
  );
}
