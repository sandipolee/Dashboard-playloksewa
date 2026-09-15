"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ModelSetItem {
  id: string;
  setId: string;
  title: string;
  category: string;
  duration: number;
  questionsCount: number;
  positiveMark?: number;
  negativeMark?: number;
  premium: boolean;
  status: string;
  createdAt?: string;
}

interface QuestionDetail {
  id: string;
  order_index: number;
  text_np: string;
  text_en: string;
  difficulty: string;
  subject: string;
  options: { id: string; textEn: string; textNp: string }[];
  correct_option_id: string;
  note?: string;
}

export default function ModelSets() {
  const [sets, setSets] = useState<ModelSetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft">("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // View Questions Modal
  const [viewingSet, setViewingSet] = useState<ModelSetItem | null>(null);
  const [viewQuestions, setViewQuestions] = useState<QuestionDetail[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/model-sets");
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) {
        setSets(json.data);
      } else {
        setSets([]);
      }
    } catch (err) {
      console.error("Failed to fetch model sets:", err);
      setSets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSets();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This will permanently remove all linked questions.`)) return;
    try {
      const res = await fetch(`/api/model-sets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSets((prev) => prev.filter((s) => s.id !== id));
        showToast(`"${title}" deleted successfully`, "success");
      } else {
        showToast("Failed to delete model set", "error");
      }
    } catch {
      showToast("Network error while deleting", "error");
    }
  };

  const handleToggleStatus = async (set: ModelSetItem) => {
    const newStatus = set.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/model-sets/${set.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSets((prev) =>
          prev.map((s) => (s.id === set.id ? { ...s, status: newStatus } : s))
        );
        showToast(`"${set.title}" status updated to ${newStatus}`, "success");
      } else {
        showToast("Failed to update status", "error");
      }
    } catch {
      showToast("Network error while updating", "error");
    }
  };

  const handleViewQuestions = async (set: ModelSetItem) => {
    setViewingSet(set);
    setLoadingQuestions(true);
    try {
      const res = await fetch(`/api/model-sets/${set.id}`);
      const json = await res.json();
      if (res.ok && json.data?.questions) {
        setViewQuestions(json.data.questions);
      } else {
        setViewQuestions([]);
      }
    } catch {
      setViewQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Distinct categories from loaded sets
  const categoriesList = ["All", ...Array.from(new Set(sets.map((s) => s.category).filter(Boolean)))];

  const filteredSets = sets.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.setId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ? true : s.status.toLowerCase() === filterStatus.toLowerCase();

    const matchesCategory =
      selectedCategory === "All" ? true : s.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const publishedCount = sets.filter((s) => s.status === "Published").length;
  const draftCount = sets.filter((s) => s.status === "Draft").length;
  const totalQuestions = sets.reduce((sum, s) => sum + s.questionsCount, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border shadow-2xl flex items-center gap-2 max-w-md text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === "success"
              ? "bg-[#0d9488]/30 border-[#0d9488] text-[#5eead4]"
              : "bg-[#ef4444]/30 border-[#ef4444] text-[#fca5a5]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">Exam Model Sets</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSets}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#9ca3af] hover:text-white text-[11px] font-semibold transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin text-[#a78bfa]" : ""}`}>
              refresh
            </span>
            Refresh
          </button>
          
          <Link
            href="/model-sets/create"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/25 transition-all transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Create Exam Set
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16">
        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "TOTAL MODEL SETS", value: sets.length, icon: "assignment", color: "from-[#534AB7] to-[#7c75ff]" },
            { label: "PUBLISHED EXAMS", value: publishedCount, icon: "check_circle", color: "from-[#22c55e] to-[#4ade80]" },
            { label: "DRAFTS IN PIPELINE", value: draftCount, icon: "edit_document", color: "from-[#d97706] to-[#fbbf24]" },
            { label: "TOTAL QUESTIONS", value: totalQuestions, icon: "quiz", color: "from-[#3b82f6] to-[#60a5fa]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">{stat.label}</p>
                <p className="text-[24px] font-bold text-white font-headline leading-tight">{stat.value}</p>
              </div>
              <div className={`size-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <span className="material-symbols-outlined text-[18px] text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Search by title, subject category, or Set ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl pl-10 pr-4 py-2 text-[12.5px] text-white placeholder:text-[#4b5262] focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
              {(["All", "Published", "Draft"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filterStatus === s
                      ? "bg-[#534AB7] text-white shadow-sm"
                      : "text-[#6b7280] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Category Filter Dropdown */}
            {categoriesList.length > 2 && (
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#10131a] border border-white/[0.08] text-[11px] font-bold text-[#d1d5db] rounded-xl px-3.5 py-2 pr-8 appearance-none focus:outline-none focus:border-[#534AB7]/70 cursor-pointer"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#161922] text-white">
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[16px] text-[#6b7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  expand_more
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Model Sets Data Table */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-[#534AB7] animate-spin mb-3">
                progress_activity
              </span>
              <p className="text-[12px] text-[#9ca3af] font-medium">Loading examination bundles from database...</p>
            </div>
          ) : filteredSets.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-[#534AB7]/10 flex items-center justify-center text-[#a78bfa] mb-3">
                <span className="material-symbols-outlined text-[28px]">assignment_late</span>
              </div>
              <h3 className="text-[15px] font-bold text-white mb-1">No Model Sets Found</h3>
              <p className="text-[12px] text-[#6b7280] max-w-sm mb-5">
                {search || filterStatus !== "All" || selectedCategory !== "All"
                  ? "No sets match your current filters. Try resetting your search."
                  : "No model sets have been created yet. Create your first exam bundle now."}
              </p>
              <Link
                href="/model-sets/create"
                className="px-4 py-2 bg-[#534AB7] hover:bg-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#534AB7]/20"
              >
                + Create First Set
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-[#10131a]">
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Set ID</th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Exam Title & Category</th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Questions</th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Duration</th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredSets.map((set) => {
                    const isPublished = set.status === "Published";
                    return (
                      <tr key={set.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono font-bold text-[#c4b5fd]">
                            {set.setId}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-[13px] font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                              {set.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/30">
                                {set.category || "General"}
                              </span>
                              {set.premium && (
                                <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-[#d97706]/15 text-[#fbbf24] border border-[#d97706]/30">
                                  PREMIUM
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleViewQuestions(set)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-[#534AB7]/20 border border-white/[0.06] hover:border-[#534AB7]/40 text-[11px] font-semibold text-[#d1d5db] hover:text-white transition-all"
                            title="Inspect Linked Questions"
                          >
                            <span className="material-symbols-outlined text-[14px] text-[#a78bfa]">quiz</span>
                            <span>{set.questionsCount} items</span>
                          </button>
                        </td>
                        <td className="px-5 py-4 text-[12px] text-[#9ca3af] font-medium">
                          {set.duration} Mins
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(set)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                              isPublished
                                ? "bg-[#22c55e]/15 border-[#22c55e]/30 text-[#4ade80] hover:bg-[#22c55e]/25"
                                : "bg-[#d97706]/15 border-[#d97706]/30 text-[#fbbf24] hover:bg-[#d97706]/25"
                            }`}
                            title="Click to toggle status"
                          >
                            {set.status}
                          </button>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/model-sets/create?id=${set.id}`}
                              className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-all"
                              title="Edit Set & Questions"
                            >
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(set.id, set.title)}
                              className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                              title="Delete Model Set"
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
          )}
        </div>
      </div>

      {/* Questions Modal Drawer */}
      {viewingSet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#141721] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#10131a]">
              <div>
                <h3 className="text-[15px] font-bold text-white">{viewingSet.title}</h3>
                <p className="text-[11px] text-[#6b7280]">
                  {viewingSet.setId} · {viewingSet.category} · {viewQuestions.length} Questions
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingSet(null)}
                className="p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
              {loadingQuestions ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-[32px] text-[#534AB7] animate-spin mb-2">
                    progress_activity
                  </span>
                  <p className="text-[11px] text-[#9ca3af]">Loading questions...</p>
                </div>
              ) : viewQuestions.length === 0 ? (
                <div className="py-12 text-center text-[#6b7280]">
                  <p className="text-[12px]">No questions linked to this set.</p>
                </div>
              ) : (
                viewQuestions.map((q, idx) => (
                  <div key={q.id || idx} className="bg-[#10131a] p-4 rounded-xl border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#534AB7]/20 text-[#c4b5fd]">
                        Q{(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/[0.04] text-[#9ca3af]">
                        {q.difficulty || "Easy"}
                      </span>
                      <span className="text-[10px] text-[#6b7280]">
                        Ans: <strong className="text-[#a78bfa]">{q.correct_option_id}</strong>
                      </span>
                    </div>

                    <p className="text-[13px] font-semibold text-white font-[Mukta] leading-relaxed mb-1">
                      {q.text_np}
                    </p>
                    {q.text_en && <p className="text-[11px] text-[#9ca3af] italic mb-3">{q.text_en}</p>}

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {(q.options || []).map((opt) => {
                        const isCorrect = q.correct_option_id === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg text-[11px] border ${
                              isCorrect
                                ? "bg-[#534AB7]/20 border-[#534AB7] text-[#c4b5fd] font-medium"
                                : "bg-[#141721] border-white/[0.04] text-[#9ca3af]"
                            }`}
                          >
                            <span className="font-bold mr-1.5">{opt.id}.</span>
                            <span className="font-[Mukta]">{opt.textNp || opt.textEn}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Answer Note */}
                    {q.note && (
                      <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-[#fbbf24]/8 border border-[#fbbf24]/20 rounded-lg">
                        <span className="material-symbols-outlined text-[14px] text-[#fbbf24] shrink-0 mt-0.5">lightbulb</span>
                        <p className="text-[11.5px] text-[#fcd34d] font-[Mukta] leading-relaxed">{q.note}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#10131a] flex justify-between items-center">
              <Link
                href={`/model-sets/create?id=${viewingSet.id}`}
                className="px-4 py-2 bg-[#534AB7] hover:bg-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#534AB7]/20"
              >
                Edit in Exam Builder
              </Link>
              <button
                type="button"
                onClick={() => setViewingSet(null)}
                className="px-4 py-2 text-[11px] font-semibold text-[#9ca3af] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
