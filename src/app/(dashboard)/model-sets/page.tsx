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
}

export default function ModelSets() {
  const [sets, setSets] = useState<ModelSetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft">("All");
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
    if (!confirm(`Delete "${title}"? This will also remove all linked questions.`)) return;
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
        showToast(`"${set.title}" → ${newStatus}`, "success");
      } else {
        showToast("Failed to update status", "error");
      }
    } catch {
      showToast("Network error while updating", "error");
    }
  };

  const handleTogglePremium = async (set: ModelSetItem) => {
    const newPremium = !set.premium;
    try {
      const res = await fetch(`/api/model-sets/${set.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ premium: newPremium }),
      });
      if (res.ok) {
        setSets((prev) =>
          prev.map((s) => (s.id === set.id ? { ...s, premium: newPremium } : s))
        );
        showToast(`"${set.title}" → ${newPremium ? "PRO" : "FREE"}`, "success");
      } else {
        showToast("Failed to update type", "error");
      }
    } catch {
      showToast("Network error while updating", "error");
    }
  };

  const handleViewQuestions = async (set: ModelSetItem) => {
    setViewingSet(set);
    setLoadingQuestions(true);
    setViewQuestions([]);
    try {
      const res = await fetch(`/api/model-sets/${set.id}`);
      const json = await res.json();
      if (res.ok && json.data?.questions) {
        setViewQuestions(json.data.questions);
      }
    } catch {
      showToast("Failed to load questions", "error");
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Filtering & Search
  const filteredSets = sets.filter((s) => {
    const matchesSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.setId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = sets.filter((s) => s.status === "Published").length;
  const draftCount = sets.filter((s) => s.status === "Draft").length;
  const totalQuestions = sets.reduce((sum, s) => sum + s.questionsCount, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden select-none">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg border shadow-xl flex items-center gap-2 max-w-md text-xs font-semibold ${
            toast.type === "success"
              ? "bg-[#0d9488]/20 border-[#0d9488] text-white"
              : "bg-[#ef4444]/20 border-[#ef4444] text-white"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="h-12 border-b border-white/[0.06] bg-[#0f1117] flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[10px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[10px]">/</span>
          <span className="text-[10px] font-bold text-white">Exam Sets</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1 text-[#6b7280] hover:text-white rounded hover:bg-white/5 relative">
            <span className="material-symbols-outlined text-[16px]">notifications</span>
            <span className="absolute top-0.5 right-0.5 size-1.5 bg-[#ef4444] rounded-full border border-[#0f1117]"></span>
          </button>
          <div className="size-5 rounded-full bg-[#534AB7]/30 border border-[#534AB7]/50 ml-0.5"></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 pb-10">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[16px] font-bold text-white mb-0.5">Model Sets Management</h1>
            <p className="text-[11px] text-[#6b7280]">
              Configure, preview, and publish examination bundles.
              {!loading && <span className="text-[#22c55e] ml-1">● Supabase Connected</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSets}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-[6px] bg-[#1e222d] border border-white/[0.06] text-[10px] font-semibold text-[#9ca3af] rounded-md hover:bg-[#282d3d] transition-all disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[13px] ${loading ? "animate-spin" : ""}`}>refresh</span>
              Refresh
            </button>
            <Link
              href="/model-sets/create"
              className="flex items-center gap-1.5 px-4 py-[6px] bg-gradient-to-r from-[#534AB7] to-[#6C63FF] text-white text-[10px] font-bold rounded-md shadow-md shadow-[#534AB7]/20 hover:shadow-[#534AB7]/40 transition-all transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[13px]">add</span>
              Create New Set
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">Total Sets</p>
            <p className="text-[22px] font-bold text-white font-headline">{sets.length}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">Published</p>
            <p className="text-[22px] font-bold text-[#22c55e] font-headline">{publishedCount}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">Drafts</p>
            <p className="text-[22px] font-bold text-[#d97706] font-headline">{draftCount}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">Total Questions</p>
            <p className="text-[22px] font-bold text-[#a78bfa] font-headline">{totalQuestions}</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined text-[16px] text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <input
              type="text"
              placeholder="Search by title, category, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-[6px] bg-[#1e222d] border border-white/[0.06] rounded-md text-[11px] text-white placeholder:text-[#6b7280] focus:outline-none focus:border-[#534AB7]/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1">
            {(["All", "Published", "Draft"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-[5px] rounded-md text-[10px] font-semibold transition-all ${
                  filterStatus === f
                    ? "bg-[#534AB7]/20 text-[#a78bfa] border border-[#534AB7]/30"
                    : "text-[#6b7280] hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#161922] border border-white/[0.04] rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Set ID</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Title</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Category</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-center">Questions</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-center">Type</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[24px] text-[#534AB7] animate-spin">progress_activity</span>
                      <span className="text-xs text-[#6b7280]">Loading from Supabase...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredSets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[28px] text-[#3f4451]">inbox</span>
                      <span className="text-xs text-[#6b7280]">
                        {search || filterStatus !== "All"
                          ? "No model sets match your filters."
                          : "No model sets yet. Click \"Create New Set\" to get started!"}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSets.map((set) => {
                  const isPublished = set.status === "Published";
                  return (
                    <tr key={set.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 py-3 text-[10px] font-mono font-semibold text-[#6b7280]">{set.setId}</td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-semibold text-white">{set.title}</span>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-[#9ca3af]">{set.category}</td>
                      <td className="px-4 py-3 text-center text-[11px] font-bold text-white">{set.questionsCount}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleTogglePremium(set)}
                          className={`px-2 py-px rounded text-[8px] font-bold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 ${
                            set.premium
                              ? "bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/20 hover:bg-[#534AB7]/25"
                              : "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/20 hover:bg-[#22c55e]/25"
                          }`}
                          title="Click to toggle PRO / FREE"
                        >
                          {set.premium ? "PRO" : "FREE"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleStatus(set)}
                          className="flex items-center gap-1 cursor-pointer group/status"
                          title="Click to toggle status"
                        >
                          <span className={`size-1.5 rounded-full transition-colors ${isPublished ? "bg-[#22c55e]" : "bg-[#d97706]"}`}></span>
                          <span className={`text-[10px] font-medium transition-colors group-hover/status:underline ${isPublished ? "text-[#22c55e]" : "text-[#d97706]"}`}>
                            {set.status}
                          </span>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => handleViewQuestions(set)}
                            className="p-1 text-[#6b7280] hover:text-[#a78bfa] rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
                            title="View Questions"
                          >
                            <span className="material-symbols-outlined text-[15px]">visibility</span>
                          </button>
                          <Link
                            href={`/model-sets/create?id=${set.id}`}
                            className="p-1 text-[#6b7280] hover:text-[#3b82f6] rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
                            title="Edit Model Set"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(set.id, set.title)}
                            className="p-1 text-[#6b7280] hover:text-[#ef4444] rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Model Set"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Questions Modal */}
      {viewingSet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setViewingSet(null)}>
          <div
            className="w-full max-w-2xl max-h-[80vh] bg-[#161922] border border-white/[0.08] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] shrink-0">
              <div>
                <h2 className="text-[13px] font-bold text-white">{viewingSet.title}</h2>
                <p className="text-[10px] text-[#6b7280]">
                  {viewingSet.setId} · {viewingSet.category} · {viewingSet.questionsCount} questions
                </p>
              </div>
              <button
                onClick={() => setViewingSet(null)}
                className="p-1.5 rounded-md text-[#6b7280] hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
              {loadingQuestions ? (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined text-[24px] text-[#534AB7] animate-spin">progress_activity</span>
                </div>
              ) : viewQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <span className="material-symbols-outlined text-[28px] text-[#3f4451]">quiz</span>
                  <span className="text-xs text-[#6b7280]">No questions found for this model set.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {viewQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-[#1e222d] rounded-lg p-4 border border-white/[0.04]">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-[10px] font-bold text-[#534AB7] bg-[#534AB7]/10 px-2 py-0.5 rounded-full shrink-0">
                          Q{(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <p className="text-[12px] font-semibold text-white leading-relaxed font-[Mukta]">
                            {q.text_np || <span className="text-[#3f4451] italic">No Nepali text</span>}
                          </p>
                          {q.text_en && (
                            <p className="text-[10px] text-[#9ca3af] italic mt-0.5">{q.text_en}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 ml-9">
                        {(q.options || []).map((opt) => {
                          const isCorrect = q.correct_option_id === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-[10px] ${
                                isCorrect
                                  ? "bg-[#0d9488]/10 border-[#0d9488]/30 text-[#5eead4]"
                                  : "bg-[#161922] border-white/[0.04] text-[#9ca3af]"
                              }`}
                            >
                              <span className="font-bold text-[9px]">{opt.id}</span>
                              <span className="font-[Mukta] text-[10px]">{opt.textNp || opt.textEn || "..."}</span>
                              {isCorrect && <span className="material-symbols-outlined text-[12px] text-[#0d9488] ml-auto">check</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
