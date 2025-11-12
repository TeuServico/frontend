import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { criarOfertaServico, criarTipoServico } from "../../services/api";
import { getFriendlyErrorMessage } from "../../utils/errorMessages";

// Categorias disponíveis para tipos de serviço
const CATEGORIAS = [
  "PROGRAMAÇÃO",
  "DESIGN",
  "REFORMA",
  "ELÉTRICA",
  "HIDRÁULICA",
  "PINTURA",
  "MARCENARIA",
  "FRETE",
  "EDUCAÇÃO",
  "MARKETING",
  "CONSULTORIA",
  "OUTROS",
];

export default function CreateServiceOffer() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!nome || nome.trim() === "") {
      setError("O nome do serviço é obrigatório");
      return;
    }

    if (!categoria || categoria.trim() === "") {
      setError("A categoria é obrigatória");
      return;
    }

    if (!descricao || descricao.trim() === "") {
      setError("A descrição é obrigatória");
      return;
    }

    if (tags.length === 0) {
      setError("Adicione pelo menos uma tag");
      return;
    }

    setLoading(true);
    try {
      // 1. Criar tipo de serviço primeiro
      const tipoServico = await criarTipoServico({
        nome: nome.trim(),
        categoria: categoria.trim(),
      });

      // 2. Criar oferta usando o ID do tipo de serviço
      await criarOfertaServico({
        tipoServicoId: tipoServico.id,
        descricao: descricao.trim(),
        tags: tags,
      });

      navigate("/buscar");
    } catch (err) {
      const errorMsg = err?.originalText
        ? typeof err.originalText === "string"
          ? err.originalText
          : JSON.parse(err.originalText)?.message || err.message
        : err?.message || getFriendlyErrorMessage(err);
      setError(errorMsg);
      console.error("Erro ao criar oferta:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-3xl border border-[#ccd9e6] shadow-sm p-6 md:p-10">
          <h1
            className="text-center text-2xl md:text-3xl font-semibold text-[#002C57] mb-8"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Criar Nova Oferta de Serviço
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Campo: Nome */}
            <div className="flex flex-col gap-2">
              <label
                className="text-base font-semibold text-[#002C57]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Nome *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: desenvolver página web"
                className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                required
              />
              <p className="text-sm text-[#002C57] opacity-70">
                Digite o nome do serviço que você está oferecendo
              </p>
            </div>

            {/* Campo: Categoria */}
            <div className="flex flex-col gap-2">
              <label
                className="text-base font-semibold text-[#002C57]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Categoria *
              </label>
              <div className="relative">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 pr-10 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none appearance-none"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Ícone de seta */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#002C57"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[#002C57] opacity-70">
                Selecione a categoria do serviço (usado para filtros)
              </p>
            </div>

            {/* Campo: Descrição */}
            <div className="flex flex-col gap-2">
              <label
                className="text-base font-semibold text-[#002C57]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Descrição *
              </label>
              <div className="w-full rounded-lg border border-[#F69027] bg-white">
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva detalhadamente o serviço que você está oferecendo..."
                  className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none min-h-[163px] resize-y"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  required
                />
              </div>
            </div>

            {/* Campo: Tags */}
            <div className="flex flex-col gap-2">
              <label
                className="text-base font-semibold text-[#002C57]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Tags *
              </label>
              <div className="w-full rounded-lg border border-[#F69027] bg-white p-4 min-h-[163px] flex flex-col gap-4">
                {/* Grid de tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="flex items-center justify-center gap-1 rounded-lg border border-[#002C57] bg-[#F69027] px-3 py-2 text-base font-semibold text-white transition hover:bg-[#d96c15]"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        {tag}
                        <FaTimes className="text-xs" />
                      </button>
                    ))}
                  </div>
                )}
                {/* Input para adicionar tags */}
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite uma tag e pressione Enter..."
                  className="w-full rounded-lg border border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none focus:border-[#002C57]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="self-start flex items-center justify-center gap-1 rounded-lg border border-[#002C57] bg-white px-3 py-2 text-base font-semibold text-[#F69027] transition hover:bg-[#fff2e4]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  + Adicionar tag
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border-2 border-[#F69027] bg-white px-10 py-3 text-lg font-semibold text-[#F69027] shadow-md transition hover:bg-[#fff2e4]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#F69027] px-10 py-3 text-lg font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar Oferta"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
