import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import filtroIcon from "../../assets/filtro.svg";
import ordenarMenor from "../../assets/ordenarMenorParaMaior.svg";
import FilterModal from "../../components/FilterModal";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import ServiceCard from "../../components/ServiceCard";
import { buscarOfertasPorTipo } from "../../services/api";

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

// Dados mockados para demonstração
const mockData = [
  {
    id: "1",
    profissionalNome: "João Silva",
    descricao:
      "Desenvolvedor Full Stack com mais de 5 anos de experiência em desenvolvimento web. Especializado em React, Node.js e bancos de dados relacionais. Sempre buscando entregar soluções de alta qualidade e performance.",
    tags: [
      "Java",
      "Spring",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    id: "2",
    profissionalNome: "Maria Santos",
    descricao:
      "Designer UX/UI apaixonada por criar experiências digitais incríveis. Trabalho com Figma, Adobe XD e design systems. Tenho experiência em projetos para startups e grandes empresas.",
    tags: ["Figma", "Adobe XD", "UI/UX", "Design Systems", "Prototipagem"],
  },
  {
    id: "3",
    profissionalNome: "Carlos Oliveira",
    descricao:
      "Eletricista profissional com certificação e mais de 10 anos de experiência. Realizo instalações elétricas residenciais e comerciais, manutenção e reparos. Trabalho com garantia e orçamento sem compromisso.",
    tags: ["Instalação Elétrica", "Manutenção", "Residencial", "Comercial"],
  },
  {
    id: "4",
    profissionalNome: "Ana Costa",
    descricao:
      "Nutricionista clínica especializada em emagrecimento e reeducação alimentar. Atendimento presencial e online. Desenvolvimento de planos alimentares personalizados baseados em evidências científicas.",
    tags: ["Nutrição Clínica", "Emagrecimento", "Consultoria", "Online"],
  },
  {
    id: "5",
    profissionalNome: "Pedro Almeida",
    descricao:
      "Pintor profissional com experiência em pintura residencial e comercial. Trabalho com todas as técnicas: textura, esponjado, estêncil e muito mais. Orçamento gratuito e entrega no prazo.",
    tags: ["Pintura", "Residencial", "Textura", "Reformas"],
  },
  {
    id: "6",
    profissionalNome: "Juliana Ferreira",
    descricao:
      "Fotógrafa profissional especializada em eventos, casamentos e ensaios. Trabalho com equipamentos de alta qualidade e edição profissional. Pacotes personalizados para cada ocasião.",
    tags: ["Fotografia", "Casamentos", "Eventos", "Ensaio"],
  },
  {
    id: "7",
    profissionalNome: "Roberto Martins",
    descricao:
      "Personal trainer com certificação internacional. Treinamento funcional, musculação e condicionamento físico. Atendimento em domicílio e na academia. Planos personalizados para seus objetivos.",
    tags: ["Personal Trainer", "Funcional", "Musculação", "Domicílio"],
  },
  {
    id: "8",
    profissionalNome: "Fernanda Lima",
    descricao:
      "Psicóloga clínica com experiência em terapia cognitivo-comportamental. Atendimento para adultos, adolescentes e casais. Problemas de ansiedade, depressão e relacionamentos.",
    tags: ["Psicologia", "TCC", "Ansiedade", "Terapia"],
  },
  {
    id: "9",
    profissionalNome: "Lucas Pereira",
    descricao:
      "Contador especializado em abertura de empresas, consultoria tributária e assessoria contábil. Atendimento para MEI, ME e empresas de todos os portes. Agilidade e confiança.",
    tags: ["Contabilidade", "Abertura de Empresas", "MEI", "Consultoria"],
  },
  {
    id: "10",
    profissionalNome: "Beatriz Souza",
    descricao:
      "Arquiteta com foco em projetos residenciais e comerciais. Desenvolvimento de projetos executivos, 3D e acompanhamento de obra. Mais de 8 anos de experiência no mercado.",
    tags: ["Arquitetura", "Projetos", "3D", "Execução"],
  },
  {
    id: "11",
    profissionalNome: "Rafael Torres",
    descricao:
      "Marceneiro especializado em móveis planejados e móveis sob medida. Trabalho com madeira nobre e MDF. Projetos personalizados para cozinhas, quartos e salas.",
    tags: ["Marcenaria", "Móveis Planejados", "Sob Medida", "Design"],
  },
  {
    id: "12",
    profissionalNome: "Camila Rocha",
    descricao:
      "Cabeleireira e colorista profissional. Corte, coloração, mechas e tratamentos capilares. Atendimento em salão ou domicílio. Produtos de alta qualidade e técnicas modernas.",
    tags: ["Cabeleireira", "Coloração", "Mechas", "Tratamentos"],
  },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ordenacao, setOrdenacao] = useState("Nome");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const filtrosAtivos = categoriasSelecionadas.length + tagsSelecionadas.length;

  const paginaParam = Number(searchParams.get("pagina") || 1);
  const limitParam = Number(searchParams.get("limit") || 10);
  const nomeParam = searchParams.get("nome") || "";

  const [nome, setNome] = useState(nomeParam);
  const [pagina, setPagina] = useState(paginaParam);
  const [limit] = useState(limitParam);

  const debouncedNome = useDebouncedValue(nome, 300);

  const stateToQuery = useMemo(
    () => ({
      nome: debouncedNome,
      pagina: String(pagina),
      limit: String(limit),
    }),
    [debouncedNome, pagina, limit]
  );

  useEffect(() => {
    // sincroniza query string
    const next = new URLSearchParams({
      ...(stateToQuery.nome ? { nome: stateToQuery.nome } : {}),
      pagina: stateToQuery.pagina,
      limit: stateToQuery.limit,
    });
    setSearchParams(next, { replace: true });
  }, [stateToQuery, setSearchParams]);

  useEffect(() => {
    async function fetchData() {
      // Se não há busca, mostrar dados mockados
      if (!debouncedNome) {
        // Simular paginação com dados mockados
        const inicio = (pagina - 1) * limit;
        const fim = inicio + limit;
        const itemsPaginados = mockData.slice(inicio, fim);
        setItems(itemsPaginados);
        setTotalPaginas(Math.ceil(mockData.length / limit));
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await buscarOfertasPorTipo({
          nome: debouncedNome,
          pagina,
          qtdMaximoElementos: limit,
        });
        const conteudo = Array.isArray(data?.conteudo) ? data.conteudo : [];
        setItems(conteudo);

        // Se o backend retornar totalPaginas, usar. Caso contrário, calcular
        if (data?.totalPaginas) {
          setTotalPaginas(data.totalPaginas);
        } else {
          // Se não há dados do backend, usar dados mockados filtrados
          const filtrados = mockData.filter(
            (item) =>
              item.profissionalNome
                .toLowerCase()
                .includes(debouncedNome.toLowerCase()) ||
              item.descricao
                .toLowerCase()
                .includes(debouncedNome.toLowerCase()) ||
              item.tags.some((tag) =>
                tag.toLowerCase().includes(debouncedNome.toLowerCase())
              )
          );
          const inicio = (pagina - 1) * limit;
          const fim = inicio + limit;
          const itemsPaginados = filtrados.slice(inicio, fim);
          setItems(itemsPaginados);
          setTotalPaginas(Math.ceil(filtrados.length / limit));
        }
      } catch {
        // Em caso de erro, usar dados mockados filtrados
        const filtrados = mockData.filter(
          (item) =>
            item.profissionalNome
              .toLowerCase()
              .includes(debouncedNome.toLowerCase()) ||
            item.descricao
              .toLowerCase()
              .includes(debouncedNome.toLowerCase()) ||
            item.tags.some((tag) =>
              tag.toLowerCase().includes(debouncedNome.toLowerCase())
            )
        );
        const inicio = (pagina - 1) * limit;
        const fim = inicio + limit;
        const itemsPaginados = filtrados.slice(inicio, fim);
        setItems(itemsPaginados);
        setTotalPaginas(Math.ceil(filtrados.length / limit));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [debouncedNome, pagina, limit]);

  const goToPage = (next) => {
    if (next < 1) return;
    setPagina(next);
  };

  const clearSearch = () => {
    setNome("");
    setPagina(1);
  };

  const handleApplyFilters = (categorias, tags) => {
    setCategoriasSelecionadas(categorias);
    setTagsSelecionadas(tags);
    setPagina(1); // Resetar para primeira página ao aplicar filtros
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Campo de busca principal (estilo Figma) */}
        <div className="w-full mb-4">
          <div className="bg-[#F69027] rounded-full px-[11px] py-[11px] flex items-center gap-2">
            {/* Ícone de busca */}
            <div className="flex items-center gap-2 flex-1">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                className="text-[#002C57]"
              >
                <path
                  d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 11.5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="flex-1 bg-transparent text-[#002C57] placeholder:text-[#002C57] outline-none text-[17px] leading-[1.294]"
                style={{ fontFamily: "SF Pro, system-ui, sans-serif" }}
                placeholder="Digite uma palavra chave"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setPagina(1);
                }}
              />
            </div>
            {/* Botão X para limpar */}
            {nome && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-[#002C57] hover:opacity-70 transition-opacity"
                title="Limpar busca"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  className="text-[#002C57]"
                >
                  <path
                    d="M12.5 4.5L4.5 12.5M4.5 4.5L12.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Área de Filtragem (estilo Figma) */}
        <div className="w-full mb-6 flex items-center gap-4">
          {/* Ordenação */}
          <div className="flex items-center gap-2">
            {/* Select de ordenação */}
            <div className="relative">
              <select
                className="bg-[#F69027] text-[#002C57] border border-[#002C57] rounded-lg px-4 py-3 pr-10 appearance-none text-base font-semibold"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="Nome">Nome</option>
                <option value="Preco">Preço</option>
                <option value="Avaliacao">Avaliação</option>
              </select>
              {/* Chevron down */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Botão de ordenar */}
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Ordenar"
            >
              <img src={ordenarMenor} alt="Ordenar" className="w-full h-full" />
            </button>
          </div>

          {/* Botão de filtro com badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="w-14 h-14 flex items-center justify-center hover:opacity-80 transition-opacity relative"
              title="Filtro"
            >
              <img src={filtroIcon} alt="Filtrar" className="w-12 h-12" />
              {/* Badge numérico */}
              {filtrosAtivos > 0 && (
                <div className="absolute top-0 right-0 bg-[#F69027] rounded-full w-[14px] h-[14px] flex items-center justify-center">
                  <span className="text-[8px] font-semibold text-white">
                    {filtrosAtivos > 8 ? "8+" : filtrosAtivos}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Modal de Filtros */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          categoriasSelecionadas={categoriasSelecionadas}
          tagsSelecionadas={tagsSelecionadas}
        />

        {/* Estados */}
        {loading && (
          <div className="text-center text-[#002C57] py-8">Carregando...</div>
        )}
        {!loading && error && (
          <div className="text-center text-red-600 py-8">{error}</div>
        )}
        {!loading && !error && debouncedNome && items.length === 0 && (
          <div className="text-center text-[#002C57] py-8">
            Nenhum resultado encontrado
          </div>
        )}

        {/* Lista + Paginação ancorada no final */}
        <div className="flex-1 flex flex-col">
          {items.length > 0 && (
            <div className="flex flex-col gap-0">
              {items.map((it) => (
                <div key={it.id} className="py-4">
                  <ServiceCard item={it} />
                </div>
              ))}
            </div>
          )}

          {/* Paginação melhorada */}
          {items.length > 0 && (
            <div className="mt-auto pt-6 flex justify-center items-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
                onClick={() => goToPage(pagina - 1)}
                disabled={pagina <= 1}
              >
                Anterior
              </button>
              <span className="text-[#002C57] text-sm font-medium">
                Página {pagina} de {totalPaginas > 0 ? totalPaginas : 1}
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-[#E6EDF5] text-[#002C57] hover:bg-[#F69027] hover:text-white hover:border-[#F69027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#002C57] disabled:hover:border-[#E6EDF5]"
                onClick={() => goToPage(pagina + 1)}
                disabled={pagina >= totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
