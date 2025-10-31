import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export const ProfessionalInfoPlaceholder = () => {
  const [skills, setSkills] = useState([
    "Java",
    "Design",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Tag",
    "Criação",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [experiences, setExperiences] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
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

      {/* Seção: Habilidades */}
      <div className="flex flex-col gap-2">
        <label
          className="text-base font-semibold text-[#002C57]"
          style={{ fontFamily: "Inter", lineHeight: "22.4px" }}
        >
          Habilidades
        </label>
        <div className="w-full rounded-lg border border-[#F69027] bg-white p-4 min-h-[163px] flex flex-col gap-4">
          {/* Grid de tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="flex items-center justify-center gap-1 rounded-lg border border-[#002C57] bg-[#F69027] px-3 py-2 text-base font-semibold text-white transition hover:bg-[#d96c15]"
                style={{ fontFamily: "Inter" }}
              >
                {skill}
                <FaTimes className="text-xs" />
              </button>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center justify-center gap-1 rounded-lg border border-[#002C57] bg-white px-3 py-2 text-base font-semibold text-[#F69027] transition hover:bg-[#fff2e4]"
              style={{ fontFamily: "Inter" }}
            >
              +mais
            </button>
          </div>
          {/* Input para adicionar habilidades */}
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite uma nova habilidade e pressione Enter..."
            className="w-full rounded-lg border border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none focus:border-[#002C57]"
            style={{ fontFamily: "Inter" }}
          />
        </div>
      </div>

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
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minima veniam, quis nostrum......"
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none min-h-[163px] resize-y"
            style={{ fontFamily: "Inter", padding: "12px 16px" }}
          />
        </div>
      </div>

      {/* Seção: Experiências */}
      <div className="flex flex-col gap-2">
        <label
          className="text-base font-semibold text-[#002C57]"
          style={{ fontFamily: "Inter", lineHeight: "22.4px" }}
        >
          Experiências
        </label>
        <div className="w-full rounded-lg border border-[#F69027] bg-white">
          <textarea
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minima veniam, quis nostrum......."
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-base font-normal text-[#002C57] focus:outline-none min-h-[163px] resize-y"
            style={{ fontFamily: "Inter", padding: "12px 16px" }}
          />
        </div>
      </div>

      {/* Botão de salvar (opcional) */}
      <button
        type="button"
        onClick={() => {
          console.log("Dados salvos:", { skills, aboutMe, experiences });
          // Aqui você pode adicionar a lógica para salvar no backend
        }}
        className="self-center rounded-full bg-[#F69027] px-10 py-3 text-lg font-semibold text-white shadow-md transition hover:brightness-110"
      >
        Salvar alterações
      </button>
    </div>
  );
};
