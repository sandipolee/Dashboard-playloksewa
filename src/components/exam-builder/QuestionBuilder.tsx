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

  return (
    <div className="p-6 rounded-xl bg-surface border-2 border-outline-variant/10 hover:border-primary/20 transition-all group/card relative shadow-sm">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="size-6 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant flex items-center justify-center border border-outline-variant/20">
            {index + 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-[#9ca3af] hover:text-white hover:bg-white/5 border border-white/[0.06] transition-all"
            title="Close Editor"
          >
            <span className="material-symbols-outlined text-[13px] pointer-events-none">close</span>
            Close
          </button>
          <button
            onClick={deleteQuestion}
            className="size-8 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity"
            title="Delete Question"
          >
            <span className="material-symbols-outlined text-[18px]">delete_outline</span>
          </button>
        </div>
      </div>

      {/* Bilingual Inputs */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Question Text (English)
            </label>
            <textarea
              className="input-editorial min-h-[80px] text-sm-plus font-medium leading-relaxed resize-none"
              placeholder="Enter question in English..."
              value={question.textEn}
              onChange={(e) => handleUpdate("textEn", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 font-nepali">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-sans">
              प्रश्न पाठ (नेपाली)
            </label>
            <textarea
              className="input-editorial min-h-[80px] text-sm-plus font-nepali leading-loose resize-none text-[15px]"
              placeholder="नेपालीमा प्रश्न प्रविष्ट गर्नुहोस्..."
              value={question.textNp}
              onChange={(e) => handleUpdate("textNp", e.target.value)}
            />
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 bg-surface-container/30 p-5 rounded-lg border border-outline-variant/10">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Answer Options & Correct Key
          </label>
          <div className="flex flex-col gap-3">
            {question.options.map((opt) => (
              <div key={opt.id} className="flex gap-4 items-start">
                <button
                  onClick={() => handleUpdate("correctOptionId", opt.id)}
                  className={`size-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm transition-all border-2 ${
                    question.correctOptionId === opt.id
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-surface border-outline-variant/30 text-on-surface-variant hover:border-primary/50"
                  }`}
                >
                  {opt.id}
                </button>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className="input-editorial text-sm font-medium bg-surface/50"
                    placeholder={`Option ${opt.id} (En)`}
                    value={opt.textEn}
                    onChange={(e) => updateOption(opt.id, "En", e.target.value)}
                  />
                  <input
                    type="text"
                    className="input-editorial text-sm font-nepali bg-surface/50 text-[14px]"
                    placeholder={`विकल्प ${opt.id} (Np)`}
                    value={opt.textNp}
                    onChange={(e) => updateOption(opt.id, "Np", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
