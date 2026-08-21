"use client";

export default function QuestionsPage() {
  const questions = [
    { id: "Q-8842", stem: "Which of the following is the highest peak in the world?", category: "Geography", catColor: "bg-[#0d9488]/15 text-[#5eead4] border border-[#0d9488]/20", difficulty: "Easy", diffColor: "text-[#22c55e]", status: "Verified", statusIcon: "check_circle", statusColor: "text-[#22c55e]" },
    { id: "Q-8843", stem: "In which year was the first constitution of Nepal promulgated?", category: "History", catColor: "bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/20", difficulty: "Medium", diffColor: "text-[#d97706]", status: "Draft", statusIcon: "circle", statusColor: "text-[#d97706]" },
    { id: "Q-8844", stem: "What is the primary function of the National Planning Commi...", category: "Economics", catColor: "bg-[#3b82f6]/15 text-[#93c5fd] border border-[#3b82f6]/20", difficulty: "Hard", diffColor: "text-[#ef4444]", status: "Verified", statusIcon: "check_circle", statusColor: "text-[#22c55e]" },
    { id: "Q-8845", stem: 'Who is known as the "Light of Asia"?', category: "Culture", catColor: "bg-[#d97706]/15 text-[#fbbf24] border border-[#d97706]/20", difficulty: "Easy", diffColor: "text-[#22c55e]", status: "Needs Review", statusIcon: "error", statusColor: "text-[#ef4444]" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="px-5 pt-5 pb-0 shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-[15px] font-bold text-white mb-0.5">Question Bank Manager</h1>
            <p className="text-[11px] text-[#6b7280]">Manage, categorize, and verify loksewa questions.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-[5px] bg-[#1e222d] border border-white/[0.06] text-[10px] font-semibold text-[#9ca3af] rounded-md hover:bg-[#282d3d] hover:text-white transition-all">
              <span className="material-symbols-outlined text-[13px]">tune</span>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-[5px] bg-[#534AB7] text-white text-[10px] font-bold rounded-md shadow-md shadow-[#534AB7]/20 hover:bg-[#6358d4] transition-all">
              <span className="material-symbols-outlined text-[13px]">add</span>
              New Question
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[320px]">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3f4451] text-[14px]">search</span>
            <input className="w-full bg-[#1e222d] border border-white/[0.06] rounded-md pl-8 pr-3 py-[5px] text-[11px] text-[#9ca3af] placeholder:text-[#3f4451] focus:outline-none focus:border-[#534AB7]/50 transition-all" placeholder="Search by ID, keyword, or category..." type="text" />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold">
            <span className="text-[#6b7280]">View:</span>
            <button className="px-2.5 py-1 rounded text-white bg-white/[0.06]">Detailed</button>
            <button className="px-2.5 py-1 rounded text-[#6b7280] hover:text-white transition-colors">Compact</button>
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 pb-5 overflow-auto">
        <div className="bg-[#161922] rounded-lg border border-white/[0.04] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-2.5 w-8"><input type="checkbox" className="rounded border-[#3f4451] bg-transparent size-3" /></th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">ID</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Question Stem</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Category</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Difficulty</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded border-[#3f4451] bg-transparent size-3" /></td>
                  <td className="px-4 py-3 text-[10px] font-semibold text-[#6b7280]">{q.id}</td>
                  <td className="px-4 py-3 text-[11px] font-medium text-white max-w-[380px]">{q.stem}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[9px] font-bold ${q.catColor}`}>{q.category}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className={`size-1.5 rounded-full ${q.diffColor.replace("text-","bg-")}`}></span>
                      <span className={`text-[10px] font-medium ${q.diffColor}`}>{q.difficulty}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className={`material-symbols-outlined text-[13px] ${q.statusColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{q.statusIcon}</span>
                      <span className={`text-[10px] font-medium ${q.statusColor}`}>{q.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[9px] text-[#6b7280]">Showing 1 to 4 of 2,492 questions</span>
            <div className="flex items-center gap-0.5">
              <button className="p-0.5 text-[#3f4451] hover:text-white rounded"><span className="material-symbols-outlined text-[14px]">chevron_left</span></button>
              <button className="size-5 rounded bg-[#534AB7] text-white text-[9px] font-bold">1</button>
              <button className="size-5 rounded text-[#6b7280] hover:text-white text-[9px] font-bold hover:bg-white/[0.04]">2</button>
              <button className="size-5 rounded text-[#6b7280] hover:text-white text-[9px] font-bold hover:bg-white/[0.04]">3</button>
              <span className="text-[#3f4451] text-[9px] px-0.5">...</span>
              <button className="size-5 rounded text-[#6b7280] hover:text-white text-[9px] font-bold hover:bg-white/[0.04]">24</button>
              <button className="p-0.5 text-[#6b7280] hover:text-white rounded"><span className="material-symbols-outlined text-[14px]">chevron_right</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
