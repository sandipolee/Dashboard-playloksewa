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
  positiveMark?: number;
  negativeMark?: number;
  status: string;
}

export default function PracticeHomePage() {
  const [dbSets, setDbSets] = useState<ModelSetItem[]>([]);
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPracticeCategory, setSelectedPracticeCategory] = useState<string>("All");
  const [mockTab, setMockTab] = useState<"level4" | "level5">("level4");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [setsRes, catsRes] = await Promise.all([
          fetch("/api/model-sets"),
          fetch("/api/categories"),
        ]);

        const setsJson = await setsRes.json();
        const catsJson = await catsRes.json();

        if (setsRes.ok && Array.isArray(setsJson.data)) {
          setDbSets(setsJson.data);
        }
        if (catsRes.ok && Array.isArray(catsJson.data)) {
          // Filter out level 4 and level 5 from practice categories list
          const filtered = catsJson.data.filter(
            (c: string) =>
              !c.toLowerCase().includes("level 4") &&
              !c.toLowerCase().includes("level 5") &&
              !c.toLowerCase().includes("खरिदार") &&
              !c.toLowerCase().includes("सुब्बा")
          );
          setDbCategories(filtered);
        }
      } catch (err) {
        console.error("Failed to load practice data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Standard Loksewa default practice categories (fallback if DB has few)
  const defaultCategories = [
    "General Knowledge",
    "IQ & Reasoning",
    "Constitution & Law",
    "Geography",
    "History & Culture",
    "Economics & Planning",
    "Public Administration",
    "Science & IT",
  ];

  // Merge distinct categories (All first, then DB categories)
  const allPracticeCategories = [
    "All",
    ...Array.from(new Set([...dbCategories, ...defaultCategories])),
  ];

  // Filter Practice Sets (excluding Level 4 and Level 5)
  const practiceSets = dbSets.filter(
    (s) =>
      !s.category.toLowerCase().includes("level 4") &&
      !s.category.toLowerCase().includes("level 5") &&
      !s.category.toLowerCase().includes("खरिदार") &&
      !s.category.toLowerCase().includes("सुब्बा") &&
      (selectedPracticeCategory === "All" ||
        s.category.toLowerCase() === selectedPracticeCategory.toLowerCase() ||
        s.title.toLowerCase().includes(selectedPracticeCategory.toLowerCase()))
  );

  // Level 4 Sets from DB (or fallback presets)
  const level4DbSets = dbSets.filter(
    (s) =>
      s.category.toLowerCase().includes("4") ||
      s.category.toLowerCase().includes("kharidar") ||
      s.title.toLowerCase().includes("खरिदार") ||
      s.title.toLowerCase().includes("kharidar") ||
      s.title.toLowerCase().includes("level 4")
  );

  // Level 5 Sets from DB (or fallback presets)
  const level5DbSets = dbSets.filter(
    (s) =>
      s.category.toLowerCase().includes("5") ||
      s.category.toLowerCase().includes("subba") ||
      s.title.toLowerCase().includes("सुब्बा") ||
      s.title.toLowerCase().includes("subba") ||
      s.title.toLowerCase().includes("level 5")
  );

  const fallbackLevel4Sets: ModelSetItem[] = [
    {
      id: "l4-01",
      setId: "SET-401",
      title: "खरिदार प्रथम पत्र नमुना सेट ०१ (Kharidar Full Model)",
      category: "Level 4 (खरिदार)",
      duration: 45,
      questionsCount: 50,
      positiveMark: 2.0,
      negativeMark: 0.4,
      status: "Published",
    },
    {
      id: "l4-02",
      setId: "SET-402",
      title: "खरिदार सामान्य ज्ञान तथा बौद्धिक परीक्षण सेट ०२",
      category: "Level 4 (खरिदार)",
      duration: 45,
      questionsCount: 50,
      positiveMark: 2.0,
      negativeMark: 0.4,
      status: "Published",
    },
  ];

  const fallbackLevel5Sets: ModelSetItem[] = [
    {
      id: "l5-01",
      setId: "SET-501",
      title: "नायब सुब्बा प्रथम पत्र संयुक्त नमुना परीक्षा सेट ०१",
      category: "Level 5 (नायब सुब्बा)",
      duration: 45,
      questionsCount: 50,
      positiveMark: 2.0,
      negativeMark: 0.4,
      status: "Published",
    },
    {
      id: "l5-02",
      setId: "SET-502",
      title: "नायब सुब्बा सामान्य सचेतना ग्रान्ड मोडल सेट ०२",
      category: "Level 5 (नायब सुब्बा)",
      duration: 45,
      questionsCount: 50,
      positiveMark: 2.0,
      negativeMark: 0.4,
      status: "Published",
    },
  ];

  const activeLevel4 = level4DbSets.length > 0 ? level4DbSets : fallbackLevel4Sets;
  const activeLevel5 = level5DbSets.length > 0 ? level5DbSets : fallbackLevel5Sets;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Minimal Top Bar */}
      <header className="h-14 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">Practice & Mock Test Arena</h2>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/quiz?category=General%20Knowledge&mode=practice"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#534AB7] hover:bg-[#6358d4] text-white text-[10.5px] font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">play_arrow</span>
            Quick Drill
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16 space-y-8">
        {/* Minimal Section Caption */}
        <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[#534AB7]/20 border border-[#534AB7]/40 flex items-center justify-center text-[#c4b5fd]">
              <span className="material-symbols-outlined text-[14px]">sports_esports</span>
            </div>
            <h1 className="text-[14px] font-bold text-white tracking-tight font-headline">
              Practice & Examination Portal
            </h1>
          </div>
          <span className="text-[11px] text-[#8c909f]">
            {dbSets.length} Sets Available in Database
          </span>
        </div>

        {/* SECTION 1: Practice Categories (Except Level 4 & Level 5) */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[13.5px] font-bold text-white font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#60a5fa]">category</span>
                Section 1: विषयगत अभ्यास (Practice Sets by Category)
              </h2>
              <p className="text-[10.5px] text-[#6b7280]">
                Curated subject-wise question sets from the database (excluding Level 4 and Level 5).
              </p>
            </div>
          </div>

          {/* Minimal Category Filter Pills: First "All", then DB Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {allPracticeCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedPracticeCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[10.5px] font-semibold tracking-wide whitespace-nowrap transition-all border ${
                  selectedPracticeCategory === cat
                    ? "bg-[#534AB7] border-[#7c75ff] text-white shadow-sm"
                    : "bg-[#141721] border-white/[0.06] text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Practice Sets List (Loaded from DB) */}
          {loading ? (
            <div className="p-8 text-center bg-[#141721] rounded-xl border border-white/[0.06]">
              <span className="material-symbols-outlined text-[24px] text-[#534AB7] animate-spin mb-1.5">
                progress_activity
              </span>
              <p className="text-[11px] text-[#6b7280]">Loading practice sets from database...</p>
            </div>
          ) : practiceSets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {practiceSets.map((set) => (
                <div
                  key={set.id}
                  className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all group hover:bg-[#161a26]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[9.5px] font-bold text-[#c4b5fd]">
                        {set.setId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#534AB7]/15 border border-[#534AB7]/30 text-[#a78bfa]">
                        {set.category || "Practice"}
                      </span>
                    </div>

                    <h3 className="text-[12.5px] font-bold text-white font-[Mukta] leading-snug group-hover:text-[#a78bfa] transition-colors mb-2">
                      {set.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[10.5px] text-[#6b7280] mb-3">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">quiz</span>
                        {set.questionsCount || 10} Qs
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {set.duration || 15} Mins
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/quiz?setId=${encodeURIComponent(set.id)}&title=${encodeURIComponent(set.title)}&mode=practice`}
                    className="w-full py-1.5 bg-white/[0.04] hover:bg-[#534AB7] border border-white/[0.06] hover:border-[#534AB7] text-[#d1d5db] hover:text-white rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    Start Practice
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback Category Launcher card if DB has no specific non-level sets */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(selectedPracticeCategory === "All" ? defaultCategories : [selectedPracticeCategory]).map((catName) => (
                <div
                  key={catName}
                  className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all group hover:bg-[#161a26]"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#60a5fa] inline-block mb-2">
                      Topic Drill
                    </span>
                    <h3 className="text-[12.5px] font-bold text-white group-hover:text-[#a78bfa] transition-colors leading-snug mb-1">
                      {catName}
                    </h3>
                    <p className="text-[10px] text-[#6b7280]">
                      10 Questions · 15 Minutes Practice
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/[0.04]">
                    <Link
                      href={`/quiz?category=${encodeURIComponent(catName)}&mode=practice`}
                      className="w-full py-1.5 bg-white/[0.04] hover:bg-[#534AB7] border border-white/[0.06] hover:border-[#534AB7] text-[#d1d5db] hover:text-white rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                      Practice Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: Mock Tests (Level 4 and Level 5) */}
        <section className="space-y-3.5 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[13.5px] font-bold text-white font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#c4b5fd]">timer</span>
                Section 2: नमुना परीक्षा (Full Mock Test Sets)
              </h2>
              <p className="text-[10.5px] text-[#6b7280]">
                Full 50-question examination bundles with official negative marking (-20%).
              </p>
            </div>

            {/* Minimal Part A / Part B Tabs */}
            <div className="flex bg-[#10131a] p-1 rounded-lg border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setMockTab("level4")}
                className={`px-3 py-1 rounded-md text-[10.5px] font-bold tracking-wide uppercase transition-all ${
                  mockTab === "level4"
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                Part A: Level 4 (खरिदार)
              </button>
              <button
                type="button"
                onClick={() => setMockTab("level5")}
                className={`px-3 py-1 rounded-md text-[10.5px] font-bold tracking-wide uppercase transition-all ${
                  mockTab === "level5"
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                Part B: Level 5 (नायब सुब्बा)
              </button>
            </div>
          </div>

          {/* Active Level 4 or Level 5 Mock Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(mockTab === "level4" ? activeLevel4 : activeLevel5).map((set) => (
              <div
                key={set.id}
                className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/60 rounded-xl p-4 flex flex-col justify-between transition-all group hover:bg-[#161a26]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[9.5px] font-bold bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd]">
                      {set.setId || "SET"}
                    </span>
                    <span className="text-[9.5px] font-bold text-[#4ade80] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded">
                      +2.0 / -0.4 Mark
                    </span>
                  </div>

                  <h3 className="text-[13px] font-bold text-white font-[Mukta] leading-snug group-hover:text-[#a78bfa] transition-colors mb-2.5">
                    {set.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 bg-[#10131a] p-2.5 rounded-lg border border-white/[0.04] mb-3 text-[10.5px]">
                    <div>
                      <span className="text-[#6b7280] block text-[9px] uppercase font-bold">Questions</span>
                      <span className="font-bold text-white">{set.questionsCount || 50} Qs</span>
                    </div>
                    <div>
                      <span className="text-[#6b7280] block text-[9px] uppercase font-bold">Time Limit</span>
                      <span className="font-bold text-white">{set.duration || 45} Mins</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/quiz?setId=${encodeURIComponent(set.id)}&title=${encodeURIComponent(set.title)}&level=${mockTab === "level4" ? "4" : "5"}`}
                  className="w-full py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#534AB7]/20 transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">play_circle</span>
                  Start {mockTab === "level4" ? "Level 4" : "Level 5"} Exam
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
