"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ModelSetItem {
  id: string;
  setId: string;
  title: string;
  category: string;
  duration: number;
  questionsCount: number;
  status: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [sets, setSets] = useState<ModelSetItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "1Y">("30D");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [setsRes, catsRes] = await Promise.all([
          fetch("/api/model-sets"),
          fetch("/api/categories"),
        ]);

        const setsJson = await setsRes.json();
        const catsJson = await catsRes.json();

        if (setsRes.ok && Array.isArray(setsJson.data)) {
          setSets(setsJson.data);
        }
        if (catsRes.ok && Array.isArray(catsJson.data)) {
          setCategories(catsJson.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalSets = sets.length;
  const publishedSets = sets.filter((s) => s.status === "Published").length;
  const draftSets = sets.filter((s) => s.status === "Draft").length;
  const totalQuestions = sets.reduce((sum, s) => sum + (s.questionsCount || 0), 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <h2 className="text-[13px] font-bold text-white tracking-wide">Overview Dashboard</h2>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[9.5px] font-bold text-[#4ade80] uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
            Supabase Live
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/practice"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#534AB7]/20 hover:bg-[#534AB7]/30 border border-[#534AB7]/40 text-[#c4b5fd] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">sports_esports</span>
            Play Quiz
          </Link>
          <Link
            href="/model-sets/create"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#534AB7]/20 transition-all transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            New Set
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16 space-y-6">
        {/* Minimal Greeting Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-white/[0.04]">
          <div>
            <h1 className="text-lg font-bold text-white font-headline">
              Loksewa Management Console
            </h1>
            <p className="text-[11px] text-[#8c909f]">
              Live database metrics, model examinations pipeline, and student activity summary.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/model-sets"
              className="flex items-center gap-1 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#d1d5db] text-[10.5px] font-semibold rounded-lg transition-all"
            >
              Exam Sets ({totalSets})
            </Link>
            <Link
              href="/questions"
              className="flex items-center gap-1 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#d1d5db] text-[10.5px] font-semibold rounded-lg transition-all"
            >
              Questions Bank
            </Link>
          </div>
        </div>

        {/* Live Database Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">
                Total Model Sets
              </p>
              <p className="text-[22px] font-bold text-white font-headline leading-tight">
                {loading ? "..." : totalSets}
              </p>
              <span className="text-[9.5px] text-[#4ade80] font-semibold mt-0.5 block">
                {publishedSets} Active in Arena
              </span>
            </div>
            <div className="size-10 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[19px]">assignment</span>
            </div>
          </div>

          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">
                Total Questions
              </p>
              <p className="text-[22px] font-bold text-[#c4b5fd] font-headline leading-tight">
                {loading ? "..." : totalQuestions}
              </p>
              <span className="text-[9.5px] text-[#6b7280] font-semibold mt-0.5 block">
                Across all bundles
              </span>
            </div>
            <div className="size-10 rounded-xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[19px]">quiz</span>
            </div>
          </div>

          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">
                Subject Categories
              </p>
              <p className="text-[22px] font-bold text-[#4ade80] font-headline leading-tight">
                {loading ? "..." : Math.max(categories.length, 1)}
              </p>
              <span className="text-[9.5px] text-[#6b7280] font-semibold mt-0.5 block">
                In Database
              </span>
            </div>
            <div className="size-10 rounded-xl bg-gradient-to-tr from-[#22c55e] to-[#4ade80] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[19px]">category</span>
            </div>
          </div>

          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">
                Drafts In Pipeline
              </p>
              <p className="text-[22px] font-bold text-[#fbbf24] font-headline leading-tight">
                {loading ? "..." : draftSets}
              </p>
              <span className="text-[9.5px] text-[#6b7280] font-semibold mt-0.5 block">
                Pending publish
              </span>
            </div>
            <div className="size-10 rounded-xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[19px]">edit_document</span>
            </div>
          </div>
        </div>

        {/* Real Sets Table from Database */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 flex items-center justify-between border-b border-white/[0.06]">
            <div>
              <h3 className="text-[13px] font-bold text-white">Database Model Sets & Practice Bundles</h3>
              <p className="text-[10.5px] text-[#6b7280]">Real examination sets configured in the system.</p>
            </div>
            <Link
              href="/model-sets"
              className="text-[11px] font-bold text-[#a78bfa] hover:text-white transition-colors"
            >
              View Full List →
            </Link>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <span className="material-symbols-outlined text-[28px] text-[#534AB7] animate-spin mb-2">
                progress_activity
              </span>
              <p className="text-[11px] text-[#6b7280]">Loading live data from Supabase...</p>
            </div>
          ) : sets.length === 0 ? (
            <div className="p-10 text-center text-[#6b7280]">
              <p className="text-[12px]">No model sets found in database. Create your first set now.</p>
              <Link
                href="/model-sets/create"
                className="inline-block mt-3 px-3 py-1.5 bg-[#534AB7] text-white text-[11px] font-bold rounded-lg"
              >
                + Create Set
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-[#10131a]">
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Set ID</th>
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Title & Category</th>
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Questions</th>
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Duration</th>
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
                    <th className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {sets.slice(0, 5).map((set) => (
                    <tr key={set.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 font-mono text-[11px] font-bold text-[#c4b5fd]">
                        {set.setId}
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-[12.5px] font-semibold text-white">{set.title}</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/30">
                          {set.category || "General"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[12px] font-semibold text-[#d1d5db]">
                        {set.questionsCount || 0} items
                      </td>
                      <td className="px-5 py-3 text-[12px] text-[#9ca3af]">
                        {set.duration || 45} mins
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border ${
                          set.status === "Published"
                            ? "bg-[#22c55e]/15 border-[#22c55e]/30 text-[#4ade80]"
                            : "bg-[#d97706]/15 border-[#d97706]/30 text-[#fbbf24]"
                        }`}>
                          {set.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/quiz?setId=${encodeURIComponent(set.id)}&title=${encodeURIComponent(set.title)}`}
                            className="px-2.5 py-1 rounded-lg bg-[#534AB7]/20 hover:bg-[#534AB7] text-[#c4b5fd] hover:text-white border border-[#534AB7]/40 text-[10.5px] font-bold transition-all"
                          >
                            Play
                          </Link>
                          <Link
                            href={`/model-sets/create?id=${set.id}`}
                            className="p-1 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.06] transition-all"
                            title="Edit Set"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Activity & System Health Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-[#141721] border border-white/[0.06] rounded-xl p-4.5 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-[13px] font-bold text-white mb-0.5">Platform Activity</h3>
                <p className="text-[10.5px] text-[#6b7280]">Daily student tests and practice volume.</p>
              </div>

              <div className="flex items-center bg-[#10131a] p-0.5 rounded-lg border border-white/[0.06]">
                {(["7D", "30D", "1Y"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-0.5 text-[9.5px] font-bold rounded transition-all ${
                      timeframe === t
                        ? "bg-[#534AB7] text-white shadow-sm"
                        : "text-[#6b7280] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[170px] flex items-end gap-[3px] px-1 pt-2">
              {[45, 60, 50, 75, 65, 85, 70, 90, 80, 95, 85, 90, 60, 70, 80, 65, 90, 100, 75, 85, 95, 80, 95, 70, 65, 80, 90, 100, 85, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar relative">
                  <div
                    className="w-full bg-[#534AB7]/25 hover:bg-[#7c75ff] rounded-t transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick System Status */}
          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4.5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-white mb-3">System Node Status</h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#10131a] border border-white/[0.04]">
                  <span className="text-[11px] text-[#9ca3af]">Supabase PostgreSQL</span>
                  <span className="text-[10px] font-bold text-[#4ade80] flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#22c55e]"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#10131a] border border-white/[0.04]">
                  <span className="text-[11px] text-[#9ca3af]">Next.js API Engine</span>
                  <span className="text-[10px] font-bold text-[#4ade80] flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#22c55e]"></span>
                    Fast (Turbopack)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#10131a] border border-white/[0.04]">
                  <span className="text-[11px] text-[#9ca3af]">Auth / Security</span>
                  <span className="text-[10px] font-bold text-[#4ade80] flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#22c55e]"></span>
                    RLS Active
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/practice"
              className="mt-4 w-full py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all text-center shadow-md shadow-[#534AB7]/20"
            >
              Open Practice Arena
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
