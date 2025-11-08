import React, { useEffect, useState } from "react";
import {
  atualizarPerfilProfissional,
  getProfissionalPerfil,
} from "../../services/api";
import { getFriendlyErrorMessage } from "../../utils/errorMessages";

export const ProfessionalInfoPlaceholder = () => {
  const [aboutMe, setAboutMe] = useState("");
  const [originalAboutMe, setOriginalAboutMe] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [perfilData, setPerfilData] = useState(null);

  // Verifica se houve mudanças
  const hasChanges = aboutMe.trim() !== originalAboutMe.trim();

  useEffect(() => {
    async function fetchPerfil() {
      setLoading(true);
      setError("");
      try {
        const data = await getProfissionalPerfil();
        setPerfilData(data);

        // Carregar sobre mim
        if (data?.sobreMim) {
          setAboutMe(data.sobreMim);
          setOriginalAboutMe(data.sobreMim);
        }
      } catch (err) {
        setError(
          err?.message ||
            "Erro ao carregar informações do perfil. Tente novamente."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchPerfil();
  }, []);

  const handleSave = async () => {
    if (!perfilData) {
      setError("Dados do perfil não carregados. Recarregue a página.");
      return;
    }

    if (!hasChanges) {
      return; // Não faz nada se não houve mudanças
    }

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      // Montar o payload com todos os dados do perfil, atualizando apenas o sobreMim
      // Removendo CPF para evitar erro de "já cadastrado"
      const profissionalRequestDTO = {
        nomeCompleto: perfilData.nomeCompleto,
        telefone: perfilData.telefone,
        // cpf: perfilData.cpf, // Removido para evitar erro de duplicação
        endereco: perfilData.endereco,
        sobreMim: aboutMe.trim(),
        profissao: perfilData.profissao,
      };

      await atualizarPerfilProfissional(profissionalRequestDTO);
      setSuccess(true);
      setOriginalAboutMe(aboutMe.trim()); // Atualiza o original após salvar
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-8">
      {/* Título */}
      <h2
        className="text-center text-xl font-bold text-[#002C57] mb-2"
        style={{ fontFamily: "Inter", lineHeight: "1em" }}
      >
        Gerencie seu perfil profissional
      </h2>

      {loading && (
        <div className="text-center text-[#002C57] py-8">
          Carregando informações...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Seção: Sobre mim */}
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#002C57]"
              style={{ fontFamily: "Inter", lineHeight: "22.4px" }}
            >
              Sobre mim
            </label>
            <div className="w-full rounded-lg border border-[#F69027] bg-white">
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Conte um pouco sobre você, suas experiências e habilidades..."
                className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none min-h-[163px] resize-y"
                style={{ fontFamily: "Inter", padding: "12px 16px" }}
              />
            </div>
          </div>

          {/* Mensagens de erro e sucesso */}
          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-700">
              Informações salvas com sucesso!
            </div>
          )}

          {/* Botão de salvar */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="self-center rounded-full bg-[#F69027] px-10 py-3 text-lg font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </>
      )}
    </div>
  );
};
