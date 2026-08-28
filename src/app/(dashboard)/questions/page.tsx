"use client";

import { useState } from "react";
import Link from "next/link";

interface QuestionRow {
  id: string;
  stemNp: string;
  stemEn: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Verified" | "Draft" | "Needs Review";
  correctOption: string;
}

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const sampleQuestions: QuestionRow[] = [
    {
      id: "Q-8842",
      stemNp: "विश्वको सर्वोच्च शिखर सगरमाथा कुन हिमश्रृंखलामा पर्दछ?",
      stemEn: "In which mountain range is Mount Everest, the world's highest peak, located?",
      category: "Geography",
      difficulty: "Easy",
      status: "Verified",
      correctOption: "Mahalangur (A)",
    },
    {
      id: "Q-8843",
      stemNp: "नेपालको पहिलो लिखित संविधान कुन सालमा जारी भएको थियो?",
      stemEn: "In which year was the first written constitution of Nepal promulgated?",
      category: "Constitution & Law",
      difficulty: "Medium",
      status: "Draft",
      correctOption: "2004 BS (B)",
    },
    {
      id: "Q-8844",
      stemNp: "नेपालको १५औं योजनाको दीर्घकालीन लक्ष्य वि.सं. २१०० सम्ममा प्रतिव्यक्ति आय कति पुर्‍याउने हो?",
      stemEn: "What is the long-term target per capita income by 2100 BS according to Nepal's 15th Plan?",
      category: "Economics",
      difficulty: "Hard",
      status: "Verified",
      correctOption: "USD 12,100 (C)",
    },
    {
      id: "Q-8845",
      stemNp: "एसियाको प्रकाश (Light of Asia) भनेर कसलाई चिनिन्छ?",
      stemEn: 'Who is widely known as the "Light of Asia"?',
      category: "Culture & History",
      difficulty: "Easy",
      status: "Needs Review",
      correctOption: "Gautam Buddha (A)",
    },
    {
      id: "Q-8846",
      stemNp: "नेपालमा सर्वप्रथम कागजी नोटको निष्काशन कहिले भएको थियो?",
      stemEn: "When were paper banknotes first issued in Nepal?",
      category: "Banking & Finance",
      difficulty: "Medium",
      status: "Verified",
      correctOption: "2002 Ashoj 1 (A)",
    },
  ];

  const filteredQuestions = sampleQuestions.filter((q) => {
    const matchesSearch =
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.stemNp.toLowerCase().includes(search.toLowerCase()) ||
      q.stemEn.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase());

    const matchesDiff =
      selectedDifficulty === "All" ? true : q.difficulty === selectedDifficulty;

    return matchesSearch && matchesDiff;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">Question Bank Repository</h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/model-sets/create"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/25 transition-all transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Add to Model Set
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16">
        {/* Search & Action Bar */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <span className="material-symbols-outlined text-[18px] text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Search by ID, Nepali text, English keyword, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl pl-10 pr-4 py-2 text-[12.5px] text-white placeholder:text-[#4b5262] focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
            {(["All", "Easy", "Medium", "Hard"] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedDifficulty === diff
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#10131a]">
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">ID</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Question Content</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Category</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Difficulty</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredQuestions.map((q) => {
                  const diffColor =
                    q.difficulty === "Easy"
                      ? "text-[#4ade80] bg-[#22c55e]/15 border-[#22c55e]/30"
                      : q.difficulty === "Medium"
                      ? "text-[#fbbf24] bg-[#d97706]/15 border-[#d97706]/30"
                      : "text-[#f87171] bg-[#ef4444]/15 border-[#ef4444]/30";

                  const statusColor =
                    q.status === "Verified"
                      ? "text-[#4ade80] bg-[#22c55e]/10 border-[#22c55e]/30"
                      : q.status === "Draft"
                      ? "text-[#fbbf24] bg-[#d97706]/10 border-[#d97706]/30"
                      : "text-[#f87171] bg-[#ef4444]/10 border-[#ef4444]/30";

                  return (
                    <tr key={q.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono font-bold text-[#c4b5fd]">
                          {q.id}
                        </span>
                      </td>

                      <td className="px-5 py-4 max-w-lg">
                        <p className="text-[13px] font-semibold text-white font-[Mukta] leading-relaxed mb-0.5">
                          {q.stemNp}
                        </p>
                        <p className="text-[10.5px] text-[#9ca3af] italic leading-relaxed">
                          {q.stemEn}
                        </p>
                        <p className="text-[10px] text-[#6b7280] mt-1">
                          Correct: <span className="text-[#a78bfa] font-bold">{q.correctOption}</span>
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#534AB7]/15 border border-[#534AB7]/30 text-[#c4b5fd]">
                          {q.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${diffColor}`}>
                          {q.difficulty}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                          {q.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-all"
                            title="Edit Question"
                          >
                            <span className="material-symbols-outlined text-[17px]">edit</span>
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[17px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
