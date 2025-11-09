import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ServiceCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const { openChat } = useChat();

  // Verificar se é um tipo de serviço (tem nome e categoria) ou uma oferta de serviço
  const isTipoServico =
    item?.nome && item?.categoria && !item?.profissionalNome;

  const nome = isTipoServico
    ? item.nome
    : item?.profissionalNome || "Nome usuario";
  const descricao = isTipoServico
    ? `Categoria: ${item.categoria}`
    : item?.descricao || item?.profissionalSobreMim || "";
  const maxLength = 97; // Baseado no design do Figma
  const descricaoTruncada =
    descricao.length > maxLength && !expanded
      ? descricao.slice(0, maxLength) + "..."
      : descricao;

  // Tags do item (habilidades, tecnologias, etc)
  // Para tipos de serviço, usar categoria como tag
  const tags = isTipoServico
    ? [item.categoria]
    : item?.tags || item?.habilidades || [];
  const maxTagsVisible = 7; // Mostrar até 7 tags antes do botão "+"

  return (
    <div className="w-full relative">
      {/* Linha separadora no topo */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#002C57] opacity-20" />

      <div className="flex flex-row items-center gap-[22px] py-0">
        {/* Imagem do profissional/serviço */}
        <div className="flex-shrink-0 w-40 h-40 bg-[#E3E3E3] rounded-lg overflow-hidden flex items-center justify-center">
          {item?.profissionalFoto || item?.imagem ? (
            <img
              src={item.profissionalFoto || item.imagem}
              alt={item?.profissionalNome || "Serviço"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F69027] to-[#002C57] opacity-20" />
          )}
        </div>

        {/* Body do card */}
        <div className="flex-1 flex flex-col gap-[10px]">
          {/* Header: Nome + Botão */}
          <div className="flex items-center justify-between">
            <h3
              className="text-[#002C57] font-semibold text-2xl leading-[1.2]"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {nome}
            </h3>
            <button
              onClick={() => openChat(item)}
              className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-3 py-2 text-base font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Iniciar conversa
            </button>
          </div>

          {/* Descrição */}
          <div className="relative">
            <p
              className="text-[#002C57] text-base leading-[1.4]"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                maxHeight: expanded ? "none" : "44px",
                overflow: expanded ? "visible" : "hidden",
              }}
            >
              {descricaoTruncada}
            </p>
            {descricao.length > maxLength && (
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-[116px] bg-[#002C57] opacity-20" />
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="text-[#F69027] text-base font-normal hover:underline"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {expanded ? "...mostrar menos" : "...mostrar mais"}
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.slice(0, maxTagsVisible).map((tag, index) => (
              <button
                key={index}
                className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-3 py-2 text-base font-semibold hover:opacity-90 transition-opacity"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  height: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {typeof tag === "string" ? tag : tag.nome || tag}
              </button>
            ))}
            {tags.length > maxTagsVisible && (
              <button
                className="bg-[#002C57] text-[#F69027] border border-[#F69027] rounded-lg px-3 py-2 text-base font-semibold hover:opacity-90 transition-opacity"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  height: "26px",
                  width: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={`Mais ${tags.length - maxTagsVisible} tags`}
              >
                +
              </button>
            )}
            {/* Se não houver tags, mostrar placeholder */}
            {tags.length === 0 && (
              <>
                <button
                  className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-3 py-2 text-base font-normal hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Tag
                </button>
                <button
                  className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-3 py-2 text-base font-normal hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Tag
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
