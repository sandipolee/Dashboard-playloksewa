"use client";

import { Question, MarkingLogic } from "@/types/exam";

interface ExamPreviewProps {
  questions: Question[];
  metadata: {
    title: string;
    category: string;
    marking: MarkingLogic;
  };
}

export default function ExamPreview({ questions, metadata }: ExamPreviewProps) {
  const maxScore = questions.length * metadata.marking.positive;
  const minScore = questions.length * -metadata.marking.negative;

  return (
    <div className="flex flex-col gap-10">
      {/* Stats Board */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Live Calculations
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Max Score</p>
            <p className="text-2xl font-bold font-headline text-success leading-none">
              +{maxScore.toFixed(1)}
            </p>
          </div>
          <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Min Score</p>
            <p className="text-2xl font-bold font-headline text-error/80 leading-none">
              {minScore.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Frame Simulation */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Mobile View Mockup
        </label>
        <div className="relative mx-auto w-[280px] h-[580px] bg-background rounded-[40px] border-8 border-surface-container-highest shadow-2xl overflow-hidden flex flex-col">
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-surface-container-highest rounded-b-2xl z-20"></div>

          {/* App Header */}
          <div className="pt-8 px-4 pb-4 bg-primary text-white">
            <div className="flex justify-between items-center mb-4 mt-2">
              <span className="material-symbols-outlined text-lg">menu</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Mock Exam</span>
              <span className="material-symbols-outlined text-lg">timer</span>
            </div>
            <h4 className="text-sm font-bold truncate leading-tight">
              {metadata.title || "Loading Title..."}
            </h4>
          </div>

          {/* App Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
            {questions.map((q, i) => (
              <div key={q.id} className="flex flex-col gap-4 border-b border-outline-variant/10 pb-6 last:border-0">
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-primary shrink-0 mt-0.5">Q.{i + 1}</span>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold text-on-surface leading-snug">
                      {q.textEn || <span className="text-outline uppercase text-[9px] font-normal italic">No English text entered</span>}
                    </p>
                    <p className="text-[13px] font-medium font-nepali text-on-surface/90 leading-relaxed border-t border-outline-variant/5 pt-1 mt-1">
                      {q.textNp || <span className="text-outline uppercase text-[10px] font-sans font-normal italic">नेपालीमा पाठ छैन</span>}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-lg border-2 text-[11px] font-medium transition-all ${
                        q.correctOptionId === opt.id
                          ? "bg-primary/5 border-primary text-primary"
                          : "bg-surface-container/50 border-outline-variant/10 text-on-surface-variant"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold opacity-70 shrink-0">{opt.id}.</span>
                        <div className="flex flex-col gap-0.5">
                          <span>{opt.textEn || "..."}</span>
                          <span className="font-nepali text-[12px] opacity-80">{opt.textNp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {questions.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 mt-20">
                <span className="material-symbols-outlined text-4xl mb-2">quiz</span>
                <p className="text-xs font-bold uppercase tracking-widest">Add questions to see preview</p>
              </div>
            )}
          </div>
          
          {/* App Footer */}
          <div className="p-4 border-t border-outline-variant/10 bg-surface flex gap-2">
            <button className="flex-1 py-2 bg-surface-container-high text-[10px] font-bold rounded-lg uppercase tracking-wider text-on-surface-variant underline decoration-primary decoration-2 underline-offset-4">Skip</button>
            <button className="flex-1 py-2 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-lg shadow-primary/20">Next</button>
          </div>
        </div>
      </div>

      {/* Advanced Settings Toggles */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Global Configurations
        </label>
        <div className="flex flex-col gap-4 bg-surface-container/30 px-5 py-6 rounded-xl border border-outline-variant/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface">Option Shuffling</span>
              <span className="text-[10px] text-on-surface-variant">Randomize A/B/C/D per student</span>
            </div>
            <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
              <div className="absolute top-1/2 left-1 -translate-y-1/2 size-2 bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between opacity-50">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface">Anti-Cheat Mode</span>
              <span className="text-[10px] text-on-surface-variant">Restrict tab switching</span>
            </div>
            <div className="w-8 h-4 bg-surface-container-highest rounded-full relative cursor-pointer">
              <div className="absolute top-1/2 left-1 -translate-y-1/2 size-2 bg-on-surface-variant/50 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface">Immediate Results</span>
              <span className="text-[10px] text-on-surface-variant">Show score right after submission</span>
            </div>
            <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
              <div className="absolute top-1/2 right-1 -translate-y-1/2 size-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
