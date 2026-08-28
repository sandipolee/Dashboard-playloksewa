"use client";

import { useState, useEffect, useMemo } from "react";
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
  premium?: boolean;
}

export default function PracticeHomePage() {
  const [dbSets, setDbSets] = useState<ModelSetItem[]>([]);
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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

  const defaultCategories = [
    { name: "General Knowledge", icon: "public", count: "2.4k Qs", color: "from-[#3b82f6] to-[#60a5fa]" },
    { name: "IQ & Logical Reasoning", icon: "psychology", count: "1.8k Qs", color: "from-[#8b5cf6] to-[#a78bfa]" },
    { name: "Constitution & Law", icon: "gavel", count: "1.2k Qs", color: "from-[#0d9488] to-[#2dd4bf]" },
    { name: "Geography & Environment", icon: "terrain", count: "1.1k Qs", color: "from-[#22c55e] to-[#4ade80]" },
    { name: "History & Culture", icon: "temple_hindu", count: "950 Qs", color: "from-[#d97706] to-[#fbbf24]" },
    { name: "Economics & Planning", icon: "trending_up", count: "890 Qs", color: "from-[#ec4899] to-[#f472b6]" },
    { name: "Public Administration", icon: "account_balance", count: "780 Qs", color: "from-[#534AB7] to-[#7c75ff]" },
    { name: "Science & IT", icon: "devices", count: "650 Qs", color: "from-[#0284c7] to-[#38bdf8]" },
  ];

  const allCategoryPills = useMemo(() => {
    const names = new Set(defaultCategories.map((c) => c.name));
    dbCategories.forEach((cat) => names.add(cat));
    return ["All", ...Array.from(names)];
  }, [dbCategories]);

  // Filter Practice Sets (excluding Level 4 and 5)
  const filteredPracticeSets = useMemo(() => {
    return dbSets.filter((s) => {
      const isLevelSet =
        s.category.toLowerCase().includes("level 4") ||
        s.category.toLowerCase().includes("level 5") ||
        s.category.toLowerCase().includes("खरिदार") ||
        s.category.toLowerCase().includes("सुब्बा") ||
        s.title.toLowerCase().includes("खरिदार") ||
        s.title.toLowerCase().includes("सुब्बा");

      if (isLevelSet) return false;

      const matchesSearch =
        search === "" ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase()) ||
        s.setId.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        s.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [dbSets, search, selectedCategory]);

  // Level 4 Sets
  const level4Sets = useMemo(() => {
    const fromDb = dbSets.filter(
      (s) =>
        s.category.toLowerCase().includes("4") ||
        s.category.toLowerCase().includes("kharidar") ||
        s.title.toLowerCase().includes("खरिदार") ||
        s.title.toLowerCase().includes("kharidar") ||
        s.title.toLowerCase().includes("level 4")
    );
    if (fromDb.length > 0) return fromDb;

    return [
      {
        id: "l4-01",
        setId: "SET-401",
        title: "खरिदार प्रथम पत्र नमुना सेट ०१ (Kharidar Full Model Test)",
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
        title: "खरिदार सामान्य ज्ञान तथा आधारभूत बौद्धिक परीक्षण सेट ०२",
        category: "Level 4 (खरिदार)",
        duration: 45,
        questionsCount: 50,
        positiveMark: 2.0,
        negativeMark: 0.4,
        status: "Published",
      },
      {
        id: "l4-03",
        setId: "SET-403",
        title: "खरिदार नयाँ पाठ्यक्रम विशेष ग्रान्ड मोडल टेस्ट - सेट ०३",
        category: "Level 4 (खरिदार)",
        duration: 45,
        questionsCount: 50,
        positiveMark: 2.0,
        negativeMark: 0.4,
        status: "Published",
      },
    ];
  }, [dbSets]);

  // Level 5 Sets
  const level5Sets = useMemo(() => {
    const fromDb = dbSets.filter(
      (s) =>
        s.category.toLowerCase().includes("5") ||
        s.category.toLowerCase().includes("subba") ||
        s.title.toLowerCase().includes("सुब्बा") ||
        s.title.toLowerCase().includes("subba") ||
        s.title.toLowerCase().includes("level 5")
    );
    if (fromDb.length > 0) return fromDb;

    return [
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
        title: "नायब सुब्बा सामान्य सचेतना तथा बौद्धिक परीक्षण सेट ०२",
        category: "Level 5 (नायब सुब्बा)",
        duration: 45,
        questionsCount: 50,
        positiveMark: 2.0,
        negativeMark: 0.4,
        status: "Published",
      },
      {
        id: "l5-03",
        setId: "SET-503",
        title: "नायब सुब्बा कम्प्रिहेन्सिभ मोडल एक्जाम - सेट ०३",
        category: "Level 5 (नायब सुब्बा)",
        duration: 45,
        questionsCount: 50,
        positiveMark: 2.0,
        negativeMark: 0.4,
        status: "Published",
      },
    ];
  }, [dbSets]);

  const totalAvailableSets = dbSets.length;
  const totalQuestionsInDb = dbSets.reduce((sum, s) => sum + (s.questionsCount || 0), 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[17px]">sports_esports</span>
          </div>
          <div>
            <h1 className="text-[13px] font-bold text-white tracking-wide">Practice & Mock Test Arena</h1>
            <p className="text-[9.5px] text-[#6b7280]">Loksewa PSC Interactive Drills & Examinations</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/quiz?category=General%20Knowledge&mode=practice"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[10.5px] font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#534AB7]/20 transition-all transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            Instant 10-Q Drill
          </Link>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-20 space-y-9">
        {/* Compact Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#181c28] via-[#141722] to-[#10131a] border border-white/[0.06] p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd] text-[9.5px] font-bold uppercase tracking-wider mb-2">
                <span className="size-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                Official Loksewa Syllabus Format
              </div>
              <h2 className="text-lg font-bold text-white font-headline">
                तयारी र नमुना परीक्षा केन्द्र (Examination Hub)
              </h2>
              <p className="text-[11.5px] text-[#9ca3af] mt-0.5 font-[Mukta]">
                विषयगत अभ्यास मार्फत कमजोर क्षेत्रमा सुधार गर्नुहोस् वा तह ४ र ५ का समयसीमा सहितका नमुना परीक्षा दिनुहोस्।
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="bg-[#10131a] px-3.5 py-2 rounded-xl border border-white/[0.04] text-center">
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Exam Sets</span>
                <span className="text-[14px] font-bold text-white font-headline">{totalAvailableSets || 6} Sets</span>
              </div>
              <div className="bg-[#10131a] px-3.5 py-2 rounded-xl border border-white/[0.04] text-center">
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Total Questions</span>
                <span className="text-[14px] font-bold text-[#c4b5fd] font-headline">{totalQuestionsInDb || "1,200+"}</span>
              </div>
              <div className="bg-[#10131a] px-3.5 py-2 rounded-xl border border-white/[0.04] text-center">
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Marking</span>
                <span className="text-[14px] font-bold text-[#4ade80] font-headline">+2.0 / -0.4</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Practice by Subject / Category (EXCEPT Level 4 & 5) */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-[#60a5fa]">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white font-headline">
                  Section 1: विषयगत अभ्यास (Subject-wise Practice)
                </h3>
                <p className="text-[10.5px] text-[#6b7280]">
                  Targeted practice categories from database (excluding Level 4 & 5).
                </p>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full sm:w-[220px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-[15px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search topic or set..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#10131a] border border-white/[0.08] rounded-xl pl-8.5 pr-3 py-1 text-[11px] text-white placeholder:text-[#4b5262] focus:outline-none focus:border-[#534AB7]/70 transition-all"
              />
            </div>
          </div>

          {/* Minimal Filter Pills: All first, then all DB categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {allCategoryPills.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-[10.5px] font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? "bg-[#534AB7] border-[#7c75ff] text-white shadow-sm shadow-[#534AB7]/30"
                      : "bg-[#141721] border-white/[0.06] text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat === "All" ? "All Categories (सबै)" : cat}
                </button>
              );
            })}
          </div>

          {/* Practice Sets List (If DB sets exist) */}
          {loading ? (
            <div className="p-10 text-center bg-[#141721] rounded-2xl border border-white/[0.06]">
              <span className="material-symbols-outlined text-[26px] text-[#534AB7] animate-spin mb-2">
                progress_activity
              </span>
              <p className="text-[11px] text-[#6b7280]">Loading practice sets from database...</p>
            </div>
          ) : filteredPracticeSets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredPracticeSets.map((set) => (
                <div
                  key={set.id}
                  className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/50 rounded-2xl p-4 flex flex-col justify-between transition-all group hover:bg-[#161a26] shadow-sm hover:shadow-lg hover:shadow-[#534AB7]/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[9.5px] font-bold text-[#c4b5fd]">
                        {set.setId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#534AB7]/15 border border-[#534AB7]/30 text-[#a78bfa]">
                        {set.category || "Practice"}
                      </span>
                    </div>

                    <h4 className="text-[13px] font-bold text-white font-[Mukta] leading-snug group-hover:text-[#a78bfa] transition-colors mb-2.5">
                      {set.title}
                    </h4>

                    <div className="flex items-center gap-3 text-[10.5px] text-[#6b7280] mb-3">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#a78bfa]">quiz</span>
                        {set.questionsCount || 10} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#a78bfa]">schedule</span>
                        {set.duration || 15} Mins
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/quiz?setId=${encodeURIComponent(set.id)}&title=${encodeURIComponent(set.title)}&mode=practice`}
                    className="w-full py-2 bg-white/[0.04] hover:bg-[#534AB7] border border-white/[0.06] hover:border-[#534AB7] text-[#d1d5db] hover:text-white rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-[#534AB7]/20"
                  >
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    Start Practice Quiz
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Visual Subject Topic Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {defaultCategories
                .filter((cat) => selectedCategory === "All" || cat.name.toLowerCase() === selectedCategory.toLowerCase())
                .map((cat) => (
                  <div
                    key={cat.name}
                    className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/50 rounded-2xl p-4 flex flex-col justify-between transition-all group hover:bg-[#161a26] shadow-sm hover:shadow-lg hover:shadow-[#534AB7]/10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`size-9 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-sm`}>
                          <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-white/[0.04] border border-white/[0.06] text-[#c4b5fd]">
                          {cat.count}
                        </span>
                      </div>

                      <h4 className="text-[13px] font-bold text-white group-hover:text-[#a78bfa] transition-colors leading-snug mb-1">
                        {cat.name}
                      </h4>
                      <p className="text-[10px] text-[#6b7280]">
                        Standard 10-Question Timed Practice
                      </p>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-white/[0.04]">
                      <Link
                        href={`/quiz?category=${encodeURIComponent(cat.name)}&mode=practice`}
                        className="w-full py-1.5 bg-white/[0.04] hover:bg-[#534AB7] border border-white/[0.06] hover:border-[#534AB7] text-[#d1d5db] hover:text-white rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                        Practice Topic
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* SECTION 2: Timed Mock Tests (Part A: Level 4 | Part B: Level 5) */}
        <section className="space-y-4 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#534AB7]/20 border border-[#534AB7]/40 flex items-center justify-center text-[#c4b5fd]">
                <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white font-headline">
                  Section 2: तहगत नमुना परीक्षा (Full Mock Test Sets)
                </h3>
                <p className="text-[10.5px] text-[#6b7280]">
                  Full 50-question mock exams with real exam rules and negative mark calculation.
                </p>
              </div>
            </div>

            {/* Level 4 vs Level 5 Segment Switcher */}
            <div className="flex bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setMockTab("level4")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold tracking-wide uppercase transition-all ${
                  mockTab === "level4"
                    ? "bg-[#534AB7] text-white shadow-sm shadow-[#534AB7]/30"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">school</span>
                Part A: तह ४ (खरिदार)
              </button>
              <button
                type="button"
                onClick={() => setMockTab("level5")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold tracking-wide uppercase transition-all ${
                  mockTab === "level5"
                    ? "bg-[#534AB7] text-white shadow-sm shadow-[#534AB7]/30"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                Part B: तह ५ (नायब सुब्बा)
              </button>
            </div>
          </div>

          {/* Active Level 4 or Level 5 Mock Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(mockTab === "level4" ? level4Sets : level5Sets).map((set) => (
              <div
                key={set.id}
                className="bg-[#141721] border border-white/[0.06] hover:border-[#534AB7]/60 rounded-2xl p-4.5 flex flex-col justify-between transition-all group hover:bg-[#161a26] shadow-sm hover:shadow-xl hover:shadow-[#534AB7]/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[9.5px] font-bold bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd]">
                      {set.setId || "SET"}
                    </span>
                    <span className="text-[9.5px] font-bold text-[#4ade80] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded">
                      +{set.positiveMark || 2.0} / -{set.negativeMark || 0.4} Mark
                    </span>
                  </div>

                  <h4 className="text-[13.5px] font-bold text-white font-[Mukta] leading-snug group-hover:text-[#a78bfa] transition-colors mb-3">
                    {set.title}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 bg-[#10131a] p-2.5 rounded-xl border border-white/[0.04] mb-3 text-[10.5px]">
                    <div>
                      <span className="text-[#6b7280] block text-[9px] uppercase font-bold">Total Items</span>
                      <span className="font-bold text-white">{set.questionsCount || 50} Questions</span>
                    </div>
                    <div>
                      <span className="text-[#6b7280] block text-[9px] uppercase font-bold">Time Limit</span>
                      <span className="font-bold text-white">{set.duration || 45} Minutes</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/quiz?setId=${encodeURIComponent(set.id)}&title=${encodeURIComponent(set.title)}&level=${mockTab === "level4" ? "4" : "5"}`}
                  className="w-full py-2.5 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#534AB7]/20 transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">play_circle</span>
                  Start {mockTab === "level4" ? "Level 4" : "Level 5"} Examination
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
