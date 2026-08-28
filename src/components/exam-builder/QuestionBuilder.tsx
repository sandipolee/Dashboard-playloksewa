"use client";

import { Question } from "@/types/exam";

interface QuestionBuilderProps {
  index: number;
  question: Question;
  updateQuestion: (question: Question) => void;
  deleteQuestion: () => void;
  onClose: () => void;
}

export default function QuestionBuilder({
  index,
  question,
  updateQuestion,
  deleteQuestion,
  onClose,
}: QuestionBuilderProps) {
  const handleUpdate = (field: keyof Question, value: any) => {
    updateQuestion({ ...question, [field]: value });
  };

  const updateOption = (optId: string, lang: "En" | "Np", text: string) => {
    const newOptions = question.options.map((opt) =>
      opt.id === optId
        ? { ...opt, [`text${lang}`]: text }
        : opt
    );
    handleUpdate("options", newOptions);
  };

  const difficulties: Array<"Easy" | "Medium" | "Hard"> = ["Easy", "Medium", "Hard"];

  return (
    <div className="p-5 rounded-xl bg-[#181c26] border border-[#534AB7]/30 shadow-xl relative transition-all">
      {/* Question Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-[#534AB7]/20 border border-[#534AB7]/40 text-xs font-bold text-[#a78bfa]">
            Q{(index + 1).toString().padStart(2, "0")}
          </span>

          {/* Difficulty Selector */}
          <div className="flex items-center bg-[#10131a] p-0.5 rounded-lg border border-white/[0.06]">
            {difficulties.map((diff) => {
              const isSelected = (question.difficulty || "Easy") === diff;
              const colorClasses =
                diff === "Easy"
                  ? isSelected ? "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/40" : "text-[#6b7280] hover:text-[#4ade80]"
                  : diff === "Medium"
                  ? isSelected ? "bg-[#d97706]/20 text-[#fbbf24] border-[#d97706]/40" : "text-[#6b7280] hover:text-[#fbbf24]"
                  : isSelected ? "bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40" : "text-[#6b7280] hover:text-[#f87171]";

              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => handleUpdate("difficulty", diff)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    isSelected ? colorClasses : "border-transparent"
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>

          {/* Subject tag input */}
          <div className="flex items-center bg-[#10131a] px-2.5 py-1 rounded-lg border border-white/[0.06]">
            <span className="text-[9px] font-bold text-[#6b7280] uppercase tracking-wider mr-1.5">Subject:</span>
            <input
              type="text"
              value={question.subject || ""}
              onChange={(e) => handleUpdate("subject", e.target.value.toUpperCase())}
              placeholder="GENERAL"
              className="bg-transparent text-[11px] font-bold text-white uppercase focus:outline-none w-24 placeholder:text-[#3f4451]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={deleteQuestion}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#ef4444] hover:bg-[#ef4444]/10 border border-[#ef4444]/20 transition-all"
            title="Delete this question"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#534AB7] hover:bg-[#6358d4] text-white shadow-md shadow-[#534AB7]/20 transition-all"
            title="Save and close question editor"
          >
            <span className="material-symbols-outlined text-[14px]">check</span>
            Done
          </button>
        </div>
      </div>

      {/* Bilingual Question Stems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
              Question Stem (नेपाली) <span className="text-error">*</span>
            </label>
            <span className="text-[9px] text-[#6b7280]">Primary Language</span>
          </div>
          <textarea
            className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/60 focus:ring-1 focus:ring-[#534AB7]/30 rounded-lg p-3 text-[14px] text-white font-[Mukta] leading-relaxed resize-y min-h-[85px] placeholder:text-[#3f4451] focus:outline-none transition-all"
            placeholder="नेपालीमा प्रश्न यहाँ लेख्नुहोस्..."
            value={question.textNp}
            onChange={(e) => handleUpdate("textNp", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
              Question Stem (English)
            </label>
            <span className="text-[9px] text-[#6b7280]">Secondary / Translation</span>
          </div>
          <textarea
            className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/60 focus:ring-1 focus:ring-[#534AB7]/30 rounded-lg p-3 text-[12.5px] text-white font-sans leading-relaxed resize-y min-h-[85px] placeholder:text-[#3f4451] focus:outline-none transition-all"
            placeholder="Enter question in English (optional)..."
            value={question.textEn}
            onChange={(e) => handleUpdate("textEn", e.target.value)}
          />
        </div>
      </div>

      {/* Answer Options */}
      <div className="bg-[#12151e] p-4 rounded-lg border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
            Answer Options (A / B / C / D)
          </label>
          <span className="text-[9.5px] text-[#a78bfa] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">check_circle</span>
            Click letter button to set correct answer
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {question.options.map((opt) => {
            const isCorrect = question.correctOptionId === opt.id;
            return (
              <div
                key={opt.id}
                className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                  isCorrect
                    ? "bg-[#534AB7]/10 border-[#534AB7]/50 shadow-[0_0_10px_rgba(83,74,183,0.1)]"
                    : "bg-[#181c26] border-white/[0.04] hover:border-white/[0.08]"
                }`}
              >
                {/* Option Letter / Correct Selector */}
                <button
                  type="button"
                  onClick={() => handleUpdate("correctOptionId", opt.id)}
                  className={`size-9 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs transition-all border ${
                    isCorrect
                      ? "bg-[#534AB7] border-[#6358d4] text-white shadow-md shadow-[#534AB7]/30"
                      : "bg-[#10131a] border-white/[0.08] text-[#9ca3af] hover:text-white hover:border-white/20"
                  }`}
                  title={isCorrect ? "Correct Answer" : `Click to set ${opt.id} as correct answer`}
                >
                  {isCorrect ? (
                    <span className="flex items-center gap-0.5">
                      {opt.id}
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    </span>
                  ) : (
                    opt.id
                  )}
                </button>

                {/* Option Inputs */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    className="w-full bg-[#10131a] border border-white/[0.06] focus:border-[#534AB7]/60 focus:ring-1 focus:ring-[#534AB7]/20 rounded-md px-3 py-1.5 text-[13px] font-[Mukta] text-white placeholder:text-[#3f4451] focus:outline-none transition-all"
                    placeholder={`विकल्प ${opt.id} (नेपाली)...`}
                    value={opt.textNp}
                    onChange={(e) => updateOption(opt.id, "Np", e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full bg-[#10131a] border border-white/[0.06] focus:border-[#534AB7]/60 focus:ring-1 focus:ring-[#534AB7]/20 rounded-md px-3 py-1.5 text-[11.5px] font-sans text-white placeholder:text-[#3f4451] focus:outline-none transition-all"
                    placeholder={`Option ${opt.id} (English)...`}
                    value={opt.textEn}
                    onChange={(e) => updateOption(opt.id, "En", e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
