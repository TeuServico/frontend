import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aside from "../../../components/AsideLogin";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../services/api";

export default function CreateAccount() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const handler = (e) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const onlyDigits = (value) => (value || "").replace(/\D+/g, "");
  const formatPhone = (value) => {
    const v = onlyDigits(value).slice(0, 11);
    if (v.length <= 10) {
      return v
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  };
  const formatCpf = (value) => {
    const v = onlyDigits(value).slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };
  const formatCep = (value) => {
    const v = onlyDigits(value).slice(0, 8);
    return v.replace(/(\d{5})(\d)/, "$1-$2");
  };
  const isValidCpf = (value) => {
    const v = onlyDigits(value);
    if (v.length !== 11 || /^([0-9])\1+$/.test(v)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(v.charAt(i)) * (10 - i);
    let check = 11 - (sum % 11);
    if (check > 9) check = 0;
    if (check !== parseInt(v.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(v.charAt(i)) * (11 - i);
    check = 11 - (sum % 11);
    if (check > 9) check = 0;
    return check === parseInt(v.charAt(10));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // validações mínimas
      const digitsPhone = onlyDigits(phone);
      const digitsCpf = onlyDigits(cpf);
      const digitsCep = onlyDigits(cep);
      const estadoUF = (estado || "").trim().toUpperCase();

      if (!digitsPhone || digitsPhone.length < 10 || digitsPhone.length > 11) {
        throw new Error("Telefone inválido");
      }
      if (!isValidCpf(digitsCpf)) {
        throw new Error("CPF inválido");
      }
      if (digitsCep.length !== 8) {
        throw new Error("CEP inválido");
      }
      if (!rua || !numero || !bairro || !cidade || !estadoUF) {
        throw new Error("Preencha todos os campos de endereço obrigatórios");
      }

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

      const res = await api.post("/cliente/criar", body);
      const { acessToken, expiresIn, role } = res || {};
      if (!acessToken || !expiresIn) {
        throw new Error("Resposta inválida do servidor");
      }
      const expiresAt = Date.now() + Number(expiresIn) * 1000;
      const displayName =
        name ||
        (email && email.includes("@") ? email.split("@")[0] : "Usuário");
      login({
        user: { name: displayName },
        token: acessToken,
        role,
        expiresAt,
      });
    } catch (err) {
      setError(err?.message || "Falha ao criar conta");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", height: "auto" }}>
      {!isMobile && <Aside />}

      <main
        style={{
          width: isMobile ? "100vw" : "68vw",
          marginLeft: isMobile ? 0 : "32vw",
          padding: isMobile ? "24px" : "0 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontFamily: "Inter, sans-serif",
          color: "#002C57",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            letterSpacing: "1px",
            marginBottom: "30px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Criar uma Conta
        </h2>

        <button
          type="button"
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            cursor: "pointer",
            width: "54px",
            height: "54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/google-logo.png"
            alt="Google"
            style={{ width: "38px", height: "38px" }}
          />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "300px",
            margin: "24px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#F69027",
              opacity: 0.5,
            }}
          />
          <span
            style={{
              margin: "0 12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#002C57",
            }}
          >
            Ou
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#F69027",
              opacity: 0.5,
            }}
          />
        </div>
        {/* Formulário */}
        <form
          onSubmit={onSubmit}
          style={{
            width: isMobile ? "100%" : "300px",
            maxWidth: "520px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Nome Completo"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Telefone"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />

          <input
            type="text"
            placeholder="CPF"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Rua"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Complemento"
            style={{
              padding: "10px 0",
              border: "none",
              borderBottom: "2px solid #002C57",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "transparent",
              color: "#002C57",
              fontFamily: "Inter, sans-serif",
            }}
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Bairro"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cidade"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Estado (UF)"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              maxLength={2}
            />
            <input
              type="text"
              placeholder="CEP"
              style={{
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid #002C57",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "transparent",
                color: "#002C57",
                fontFamily: "Inter, sans-serif",
              }}
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#002C57",
              color: "#F69027",
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
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        {error && (
          <p
            style={{
              color: "#c00",
              marginTop: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        {/* Link para login */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#002C57",
            textAlign: "center",
          }}
        >
          Já tem uma conta?{" "}
          <Link
            style={{
              color: "#F69027",
              textDecoration: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
            to="/login"
          >
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
