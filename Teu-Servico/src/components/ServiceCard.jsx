import React, { useState } from "react";

export default function ServiceCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const sobreMim = item?.profissionalSobreMim || "";
  const resumoSobreMim =
    sobreMim.length > 140 && !expanded
      ? sobreMim.slice(0, 140) + "..."
      : sobreMim;

  return (
    <div className="w-full border border-[#E6EDF5] rounded-lg p-4 bg-white shadow-sm">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-16 h-16 bg-[#F2F6FB] rounded-md" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[#002C57] font-semibold text-lg">
              {item?.tipoServico?.nome || "Tipo de serviço"}
            </h3>
            <span className="text-xs text-[#73839D]">
              {item?.tipoServico?.categoria
                ? `• ${item.tipoServico.categoria}`
                : null}
            </span>
          </div>
          <p className="text-sm text-[#002C57] mt-1">
            {item?.profissionalNome}
          </p>
          <p className="text-sm text-[#4B5D7E] mt-2">{item?.descricao}</p>

          {sobreMim && (
            <div className="text-sm text-[#4B5D7E] mt-2">
              <span>{resumoSobreMim}</span>
              {sobreMim.length > 140 && (
                <button
                  className="ml-2 text-[#F69027] hover:underline"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? "mostrar menos" : "mostrar mais"}
                </button>
              )}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {/* tags ilustrativas (placeholder) */}
            <span className="text-xs px-2 py-1 bg-[#F2F6FB] text-[#002C57] rounded">
              Tag
            </span>
            <span className="text-xs px-2 py-1 bg-[#F2F6FB] text-[#002C57] rounded">
              Tag
            </span>
            <span className="text-xs px-2 py-1 bg-[#F2F6FB] text-[#002C57] rounded">
              Tag
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="bg-[#F69027] text-[#002C57] text-sm px-3 py-2 rounded-md">
            Iniciar conversa
          </button>
        </div>
      </div>
    </div>
  );
}
