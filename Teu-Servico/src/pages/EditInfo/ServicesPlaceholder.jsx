import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";

const FILTERS = [
    { key: "todos", label: "Todos" },
    { key: "andamento", label: "Andamento" },
    { key: "concluidos", label: "Concluidos" },
    { key: "negociando", label: "Negociando" },
    { key: "cancelado", label: "Cancelado" },
];

const MOCK_PROPOSALS = [
    { id: 1, title: "Instalacao eletrica", description: "Revisao completa no escritorio", status: "andamento" },
    { id: 2, title: "Pintura residencial", description: "Casa terrea 120m2", status: "concluidos" },
    { id: 3, title: "Manutencao de ar-condicionado", description: "Lote com 6 aparelhos", status: "negociando" },
    { id: 4, title: "Reparo hidraulico", description: "Conserto em banheiro social", status: "cancelado" },
];

const ButtonFilter = ({ isActive, label, onClick }) => (
    <li>
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 border border-[#F69027] px-4 py-2 text-sm font-semibold transition-colors ${
                isActive ? "bg-[#F69027] text-white" : "bg-white text-[#F69027] hover:bg-[#fff2e4]"
            }`}
        >
            {isActive && <FaCheck className="text-xs" />}
            <span>{label}</span>
        </button>
    </li>
);

export const ServicesPlaceholder = () => {
    const [activeFilter, setActiveFilter] = useState("todos");

    const filteredProposals = useMemo(() => {
        if (activeFilter === "todos") {
            return MOCK_PROPOSALS;
        }
        return MOCK_PROPOSALS.filter((proposal) => proposal.status === activeFilter);
    }, [activeFilter]);

    return (
        <section className="mt-6">
            <h2 className="text-center text-lg font-semibold text-[#002C57] md:text-xl">
                Consulte e gerencie seus servicos
            </h2>

            <ul className="mt-6 flex flex-wrap items-center gap-3 justify-center">
                {FILTERS.map((filter) => (
                    <ButtonFilter
                        key={filter.key}
                        label={filter.label}
                        isActive={activeFilter === filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                    />
                ))}
            </ul>

            <div className="mt-8 grid gap-4">
                {filteredProposals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#ccd9e6] bg-[#fef8f1] p-6 text-center text-sm text-[#4b5a6a]">
                        Nenhuma proposta neste filtro por enquanto.
                    </div>
                ) : (
                    filteredProposals.map((proposal) => (
                        <article
                            key={proposal.id}
                            className="rounded-2xl border border-[#ccd9e6] bg-white p-5 shadow-sm"
                        >
                            <header className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-base font-semibold text-[#002C57]">
                                    {proposal.title}
                                </h3>
                                <span className="rounded-full border border-[#F69027] px-4 py-1 text-xs font-semibold uppercase text-[#F69027]">
                                    {FILTERS.find((filter) => filter.key === proposal.status)?.label ?? proposal.status}
                                </span>
                            </header>
                            <p className="mt-3 text-sm text-[#4b5a6a]">{proposal.description}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
