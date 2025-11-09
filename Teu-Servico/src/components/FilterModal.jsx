import React, { useEffect, useState } from "react";
import { buscarTiposServico } from "../services/api";

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  categoriasSelecionadas = [],
  tagsSelecionadas = [],
}) => {
  const [selectedCategorias, setSelectedCategorias] = useState(
    categoriasSelecionadas
  );
  const [selectedTags, setSelectedTags] = useState(tagsSelecionadas);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  // Sincronizar categorias selecionadas quando mudarem externamente
  useEffect(() => {
    setSelectedCategorias(categoriasSelecionadas);
  }, [categoriasSelecionadas]);

  // Buscar categorias disponíveis ao abrir o modal
  useEffect(() => {
    if (isOpen && categorias.length === 0) {
      async function fetchCategorias() {
        setLoadingCategorias(true);
        try {
          // Buscar todos os tipos de serviço para extrair categorias únicas
          const data = await buscarTiposServico({
            pagina: 1,
            qtdMaximaElementos: 1000, // Buscar muitos para pegar todas as categorias
          });
          const conteudo = Array.isArray(data?.conteudo) ? data.conteudo : [];

          // Extrair categorias únicas
          const categoriasUnicas = [
            ...new Set(conteudo.map((item) => item.categoria).filter(Boolean)),
          ];
          setCategorias(categoriasUnicas.sort());
        } catch (err) {
          console.error("Erro ao buscar categorias:", err);
          // Fallback para categorias padrão se der erro
          setCategorias([
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
          ]);
        } finally {
          setLoadingCategorias(false);
        }
      }
      fetchCategorias();
    }
  }, [isOpen, categorias.length]);

  const tags = [
    "Java",
    "Spring",
    "React",
    "PostgreSQL",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
  ];

  if (!isOpen) return null;

  const handleCategoriaToggle = (categoria) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = () => {
    onApply(selectedCategorias, selectedTags);
    onClose();
  };

  const Checkbox = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between h-6">
      <button
        type="button"
        onClick={onChange}
        className="relative flex items-center justify-center p-1"
      >
        <div
          className={`w-[18px] h-[18px] border rounded-sm flex items-center justify-center transition-colors ${
            checked
              ? "bg-[#F69027] border-[#002C57]"
              : "bg-white border-[#002C57]"
          }`}
        >
          {checked && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              className="text-[#002C57]"
            >
              <path
                d="M1 4.5L4.5 8L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>
      <span
        className="text-[#002C57] text-base font-bold leading-[1.4] cursor-pointer flex-1 ml-2"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        onClick={onChange}
      >
        {label}
      </span>
    </div>
  );

  const FilterSection = ({ title, items, selectedItems, onToggle }) => (
    <div className="bg-white border border-[#002C57] rounded-lg p-4 relative">
      {/* Título centralizado */}
      <div className="text-center mb-6 relative">
        <h3
          className="text-[#002C57] text-base font-bold leading-[1.4] inline-block"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {title}
        </h3>
        {/* Linha abaixo do título */}
        <div className="absolute left-0 right-0 top-[26px] h-px bg-[#002C57]" />
      </div>

      {/* Grid de checkboxes em 3 colunas */}
      <div className="grid grid-cols-3 gap-y-0 mb-4">
        {items.map((item, index) => (
          <div key={index} className="mb-0">
            <Checkbox
              checked={selectedItems.includes(item)}
              onChange={() => onToggle(item)}
              label={item}
            />
          </div>
        ))}
      </div>

      {/* Botão Veja mais */}
      <div className="flex items-center justify-center gap-1 text-[#002C57] text-xs font-bold leading-[1.4] cursor-pointer hover:opacity-70">
        <span style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          Veja mais
        </span>
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          className="text-[#F69027]"
        >
          <path
            d="M3.12 2.92L7.5 7.5L11.87 2.92"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#002C57] px-6 py-4 flex items-center gap-4 z-10">
          <button
            onClick={onClose}
            className="text-[#002C57] hover:opacity-70 transition-opacity flex-shrink-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2
            className="text-[#002C57] text-2xl font-bold flex-1 text-center"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Filtros
          </h2>
          <div className="w-6 flex-shrink-0" /> {/* Spacer para centralizar */}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Seção Categorias */}
          {loadingCategorias ? (
            <div className="bg-white border border-[#002C57] rounded-lg p-4 text-center text-[#002C57]">
              Carregando categorias...
            </div>
          ) : (
            <FilterSection
              title="Categorias"
              items={categorias}
              selectedItems={selectedCategorias}
              onToggle={handleCategoriaToggle}
            />
          )}

          {/* Seção Tags */}
          <FilterSection
            title="Tags"
            items={tags}
            selectedItems={selectedTags}
            onToggle={handleTagToggle}
          />
        </div>

        {/* Footer com botão Aplicar */}
        <div className="sticky bottom-0 bg-white border-t border-[#002C57] px-6 py-4">
          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-[#F69027] to-[#F69027] text-white rounded-lg py-3 px-6 text-base font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
