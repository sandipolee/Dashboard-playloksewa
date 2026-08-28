"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Question } from "@/types/exam";

// Comprehensive sample Loksewa question pool for Practice & Mock Tests
const LOKSEWA_MASTER_QUESTIONS: Question[] = [
  {
    id: "1",
    difficulty: "Easy",
    subject: "CONSTITUTION",
    textNp: "नेपालको संविधान २०७२ मा कति भाग, धारा र अनुसूचीहरू रहेका छन्?",
    textEn: "How many parts, articles, and schedules are there in the Constitution of Nepal 2072?",
    options: [
      { id: "A", textNp: "३५ भाग, ३०८ धारा र ९ अनुसूची", textEn: "35 Parts, 308 Articles and 9 Schedules" },
      { id: "B", textNp: "३२ भाग, ३०५ धारा र ८ अनुसूची", textEn: "32 Parts, 305 Articles and 8 Schedules" },
      { id: "C", textNp: "३० भाग, २५० धारा र ७ अनुसूची", textEn: "30 Parts, 250 Articles and 7 Schedules" },
      { id: "D", textNp: "३६ भाग, ३१० धारा र १० अनुसूची", textEn: "36 Parts, 310 Articles and 10 Schedules" },
    ],
    correctOptionId: "A",
  },
  {
    id: "2",
    difficulty: "Medium",
    subject: "GEOGRAPHY",
    textNp: "नेपालको नयाँ आधिकारिक क्षेत्रफल कति वर्ग किलोमिटर कायम गरिएको छ?",
    textEn: "What is the officially declared total area of Nepal in square kilometers?",
    options: [
      { id: "A", textNp: "१,४७,१८१ वर्ग कि.मि.", textEn: "147,181 sq km" },
      { id: "B", textNp: "१,४७,५१६ वर्ग कि.मि.", textEn: "147,516 sq km" },
      { id: "C", textNp: "१,४८,००० वर्ग कि.मि.", textEn: "148,000 sq km" },
      { id: "D", textNp: "१,४६,९०० वर्ग कि.मि.", textEn: "146,900 sq km" },
    ],
    correctOptionId: "A",
  },
  {
    id: "3",
    difficulty: "Hard",
    subject: "ECONOMY",
    textNp: "नेपालको १५औं योजनाको अन्त्यसम्ममा प्रतिव्यक्ति कुल राष्ट्रिय आय (GNI per capita) कति पुर्‍याउने लक्ष्य छ?",
    textEn: "What is the per capita GNI target by the end of Nepal's 15th Five Year Plan?",
    options: [
      { id: "A", textNp: "१,४०० अमेरिकी डलर", textEn: "USD 1,400" },
      { id: "B", textNp: "१,५९५ अमेरिकी डलर", textEn: "USD 1,595" },
      { id: "C", textNp: "१,७०० अमेरिकी डलर", textEn: "USD 1,700" },
      { id: "D", textNp: "१,८५० अमेरिकी डलर", textEn: "USD 1,850" },
    ],
    correctOptionId: "B",
  },
  {
    id: "4",
    difficulty: "Easy",
    subject: "HISTORY",
    textNp: "नेपाल एकीकरणको क्रममा कीर्तिपुरमाथि कुन युद्धमा विजय हासिल भएको थियो?",
    textEn: "In which attempt/battle was Kirtipur finally conquered during the unification of Nepal?",
    options: [
      { id: "A", textNp: "पहिलो आक्रमणमा", textEn: "First Attack" },
      { id: "B", textNp: "दोस्रो आक्रमणमा", textEn: "Second Attack" },
      { id: "C", textNp: "तेस्रो आक्रमणमा (वि.सं. १८२२)", textEn: "Third Attack (1822 BS)" },
      { id: "D", textNp: "चौथो आक्रमणमा", textEn: "Fourth Attack" },
    ],
    correctOptionId: "C",
  },
  {
    id: "5",
    difficulty: "Medium",
    subject: "IQ",
    textNp: "अनुक्रम पूरा गर्नुहोस्: २, ६, १२, २०, ३०, ?",
    textEn: "Complete the sequence: 2, 6, 12, 20, 30, ?",
    options: [
      { id: "A", textNp: "४०", textEn: "40" },
      { id: "B", textNp: "४२", textEn: "42" },
      { id: "C", textNp: "४४", textEn: "44" },
      { id: "D", textNp: "४८", textEn: "48" },
    ],
    correctOptionId: "B",
  },
  {
    id: "6",
    difficulty: "Easy",
    subject: "GOVERNANCE",
    textNp: "नेपालको निजामती सेवा ऐन, २०४९ अनुसार निजामती कर्मचारीले अवकाश पाउने उमेर कति वर्ष हो?",
    textEn: "According to the Civil Service Act 2049, what is the retirement age for civil servants?",
    options: [
      { id: "A", textNp: "५८ वर्ष", textEn: "58 Years" },
      { id: "B", textNp: "६० वर्ष", textEn: "60 Years" },
      { id: "C", textNp: "६२ वर्ष", textEn: "62 Years" },
      { id: "D", textNp: "६५ वर्ष", textEn: "65 Years" },
    ],
    correctOptionId: "A",
  },
  {
    id: "7",
    difficulty: "Hard",
    subject: "ENVIRONMENT",
    textNp: "जैविक विविधता महासन्धि (CBD) नेपालले कहिले अनुमोदन गरेको हो?",
    textEn: "When did Nepal officially ratify the Convention on Biological Diversity (CBD)?",
    options: [
      { id: "A", textNp: "१९९२ नोभेम्बर २३", textEn: "23 November 1992" },
      { id: "B", textNp: "१९९३ नोभेम्बर २३", textEn: "23 November 1993" },
      { id: "C", textNp: "१९९४ फेब्रुअरी २१", textEn: "21 February 1994" },
      { id: "D", textNp: "१९९५ मार्च १५", textEn: "15 March 1995" },
    ],
    correctOptionId: "C",
  },
  {
    id: "8",
    difficulty: "Easy",
    subject: "SCIENCE",
    textNp: "सूर्यको प्रकाश पृथ्वीसम्म आइपुग्न कति समय लाग्छ?",
    textEn: "How long does sunlight take to reach the Earth?",
    options: [
      { id: "A", textNp: "करिब ८ मिनेट २० सेकेन्ड", textEn: "Approx. 8 minutes 20 seconds" },
      { id: "B", textNp: "करिब ५ मिनेट १० सेकेन्ड", textEn: "Approx. 5 minutes 10 seconds" },
      { id: "C", textNp: "करिब १० मिनेट ३० सेकेन्ड", textEn: "Approx. 10 minutes 30 seconds" },
      { id: "D", textNp: "करिब १२ मिनेट", textEn: "Approx. 12 minutes" },
    ],
    correctOptionId: "A",
  },
  {
    id: "9",
    difficulty: "Medium",
    subject: "IQ",
    textNp: "यदि DOG = 26 भए, CAT = ?",
    textEn: "If DOG = 26 (4+15+7), then CAT = ?",
    options: [
      { id: "A", textNp: "२४ (3+1+20)", textEn: "24 (3+1+20)" },
      { id: "B", textNp: "२६", textEn: "26" },
      { id: "C", textNp: "२२", textEn: "22" },
      { id: "D", textNp: "२८", textEn: "28" },
    ],
    correctOptionId: "A",
  },
  {
    id: "10",
    difficulty: "Medium",
    subject: "GENERAL",
    textNp: "सार्क (SAARC) को वडापत्रमा कतिवटा धाराहरू रहेका छन्?",
    textEn: "How many articles are there in the SAARC Charter?",
    options: [
      { id: "A", textNp: "८ धारा", textEn: "8 Articles" },
      { id: "B", textNp: "१० धारा", textEn: "10 Articles" },
      { id: "C", textNp: "१२ धारा", textEn: "12 Articles" },
      { id: "D", textNp: "१५ धारा", textEn: "15 Articles" },
    ],
    correctOptionId: "B",
  },
];

function QuizPlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setId = searchParams.get("setId");
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const mode = searchParams.get("mode") || "exam";

  const [examTitle, setExamTitle] = useState("लोकसेवा नमुना परीक्षा (Loksewa Mock Exam)");
  const [questions, setQuestions] = useState<Question[]>(LOKSEWA_MASTER_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User responses
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Timer & States
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState(true);

  // Review Mode filters
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "SKIPPED">("ALL");

  // Load Exam Data from Database if setId is provided
  useEffect(() => {
    const loadExam = async () => {
      if (setId) {
        try {
          const res = await fetch(`/api/model-sets/${setId}`);
          const json = await res.json();
          if (res.ok && json.data) {
            const set = json.data;
            if (set.title) setExamTitle(set.title);
            if (set.duration) {
              setDurationMinutes(set.duration);
              setSecondsRemaining(set.duration * 60);
            }
            if (Array.isArray(set.questions) && set.questions.length > 0) {
              const mapped = set.questions.map((q: any, idx: number) => ({
                id: (idx + 1).toString(),
                difficulty: q.difficulty || "Easy",
                subject: q.subject || set.category || "GENERAL",
                textNp: q.text_np || q.textNp || "",
                textEn: q.text_en || q.textEn || "",
                options: q.options || [],
                correctOptionId: q.correct_option_id || q.correctOptionId || "A",
              }));
              setQuestions(mapped);
            }
          }
        } catch (err) {
          console.warn("Using master question bank:", err);
        }
      } else if (category) {
        setExamTitle(`${category} - विषयगत अभ्यास`);
        setDurationMinutes(15);
        setSecondsRemaining(15 * 60);
      } else if (level) {
        setExamTitle(`तह ${level} - Loksewa Full Mock Exam`);
      }
    };
    loadExam();
  }, [setId, category, level]);

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Answer selection handler
  const handleSelectOption = (optionId: string) => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleClearChoice = () => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[qId];
      return updated;
    });
  };

  const handleToggleFlag = () => {
    const qId = questions[currentIndex].id;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setSecondsRemaining(durationMinutes * 60);
    setIsSubmitted(false);
  };

  // Format Time
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isTimeCritical = secondsRemaining <= 300; // < 5 mins

  // Evaluation & Results Calculation
  const totalQuestionsCount = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (!ans) {
      skippedCount++;
    } else if (ans.toUpperCase() === q.correctOptionId.toUpperCase()) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const positiveMarksEarned = correctCount * 2.0;
  const negativeMarksDeducted = incorrectCount * 0.4;
  const finalScore = Math.max(0, positiveMarksEarned - negativeMarksDeducted);
  const maxPossibleScore = totalQuestionsCount * 2.0;
  const percentage = maxPossibleScore > 0 ? (finalScore / maxPossibleScore) * 100 : 0;
  const isPassed = percentage >= 40.0;

  const currentQ = questions[currentIndex];

  // -------------------------------------------------------------
  // RESULT SCREEN
  // -------------------------------------------------------------
  if (isSubmitted) {
    const filteredReviewQuestions = questions.filter((q) => {
      const ans = userAnswers[q.id];
      if (reviewFilter === "CORRECT") return ans && ans.toUpperCase() === q.correctOptionId.toUpperCase();
      if (reviewFilter === "INCORRECT") return ans && ans.toUpperCase() !== q.correctOptionId.toUpperCase();
      if (reviewFilter === "SKIPPED") return !ans;
      return true;
    });

    return (
      <div className="min-h-screen bg-[#0f1117] text-white flex flex-col">
        {/* Top Result Header */}
        <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#9ca3af] hover:text-white text-[11px] font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Practice Arena
            </Link>
            <h1 className="text-[13px] font-bold text-white tracking-wide truncate max-w-md">{examTitle}</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRetake}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Retake Quiz
            </button>
            <Link
              href="/practice"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/25 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Return Home
            </Link>
          </div>
        </header>

        {/* Result Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-5xl mx-auto w-full pb-20 space-y-8">
          {/* Main Scorecard Banner */}
          <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center ${
            isPassed
              ? "bg-gradient-to-b from-[#141d24] via-[#10191e] to-[#0f1117] border-[#22c55e]/30 shadow-[#22c55e]/10"
              : "bg-gradient-to-b from-[#24141a] via-[#1e1014] to-[#0f1117] border-[#ef4444]/30 shadow-[#ef4444]/10"
          }`}>
            <div className={`size-16 rounded-2xl flex items-center justify-center mb-3 text-3xl shadow-xl ${
              isPassed ? "bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40" : "bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/40"
            }`}>
              <span className="material-symbols-outlined text-[36px]">
                {isPassed ? "emoji_events" : "sentiment_dissatisfied"}
              </span>
            </div>

            <span className={`px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-2 border ${
              isPassed ? "bg-[#22c55e]/20 border-[#22c55e]/40 text-[#4ade80]" : "bg-[#ef4444]/20 border-[#ef4444]/40 text-[#f87171]"
            }`}>
              {isPassed ? "PASSED (उत्तीर्ण)" : "NEEDS IMPROVEMENT (अनुत्तीर्ण)"}
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white font-headline my-1">
              {finalScore.toFixed(2)}{" "}
              <span className="text-xl sm:text-2xl text-[#6b7280] font-normal">/ {maxPossibleScore.toFixed(1)} Marks</span>
            </h2>

            <p className="text-[12px] text-[#9ca3af] max-w-md mt-1">
              {isPassed
                ? "उत्कृष्ट प्रदर्शन! तपाईंले निर्धारित उत्तीर्ण अंक प्राप्त गर्नुभएको छ।"
                : "पुनः अभ्यास गर्नुहोस्। कमजोर विषयहरूमा थप ध्यान दिनुहोस्।"}
            </p>

            {/* Quick Breakdown Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-8 pt-6 border-t border-white/[0.06]">
              <div className="bg-[#10131a] p-3.5 rounded-xl border border-white/[0.04]">
                <span className="text-[9.5px] font-bold uppercase text-[#6b7280] block mb-1">Correct (+2.0)</span>
                <span className="text-[20px] font-bold text-[#4ade80]">{correctCount} Qs</span>
              </div>
              <div className="bg-[#10131a] p-3.5 rounded-xl border border-white/[0.04]">
                <span className="text-[9.5px] font-bold uppercase text-[#6b7280] block mb-1">Wrong (-0.4)</span>
                <span className="text-[20px] font-bold text-[#f87171]">{incorrectCount} Qs</span>
              </div>
              <div className="bg-[#10131a] p-3.5 rounded-xl border border-white/[0.04]">
                <span className="text-[9.5px] font-bold uppercase text-[#6b7280] block mb-1">Skipped</span>
                <span className="text-[20px] font-bold text-[#9ca3af]">{skippedCount} Qs</span>
              </div>
              <div className="bg-[#10131a] p-3.5 rounded-xl border border-white/[0.04]">
                <span className="text-[9.5px] font-bold uppercase text-[#6b7280] block mb-1">Accuracy</span>
                <span className="text-[20px] font-bold text-[#c4b5fd]">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* DETAILED QUESTION REVIEW SECTION */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#a78bfa]">fact_check</span>
                <h3 className="text-[16px] font-bold text-white font-headline">Question-by-Question Review (उत्तर समीक्षा)</h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-[#141721] p-1 rounded-xl border border-white/[0.08]">
                {(["ALL", "CORRECT", "INCORRECT", "SKIPPED"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      reviewFilter === f
                        ? "bg-[#534AB7] text-white shadow-sm"
                        : "text-[#6b7280] hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-3.5">
              {filteredReviewQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice && userChoice.toUpperCase() === q.correctOptionId.toUpperCase();
                const isSkipped = !userChoice;

                return (
                  <div
                    key={q.id}
                    className={`bg-[#141721] p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? "border-[#22c55e]/30"
                        : isSkipped
                        ? "border-white/[0.08]"
                        : "border-[#ef4444]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-[#c4b5fd]">
                          Q{(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/[0.04] text-[#9ca3af]">
                          {q.subject || "GENERAL"}
                        </span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isCorrect
                          ? "bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30"
                          : isSkipped
                          ? "bg-white/[0.06] text-[#9ca3af]"
                          : "bg-[#ef4444]/15 text-[#f87171] border border-[#ef4444]/30"
                      }`}>
                        {isCorrect ? "✓ Correct (+2.0)" : isSkipped ? "⚪ Skipped (0.0)" : "✗ Incorrect (-0.4)"}
                      </span>
                    </div>

                    <h4 className="text-[14px] font-bold text-white font-[Mukta] leading-relaxed mb-1">
                      {q.textNp}
                    </h4>
                    {q.textEn && <p className="text-[11px] text-[#9ca3af] italic mb-3">{q.textEn}</p>}

                    {/* Option Choices */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt) => {
                        const isThisCorrect = q.correctOptionId.toUpperCase() === opt.id.toUpperCase();
                        const isThisUserChoice = userChoice && userChoice.toUpperCase() === opt.id.toUpperCase();

                        let optStyle = "bg-[#10131a] border-white/[0.04] text-[#9ca3af]";
                        if (isThisCorrect) {
                          optStyle = "bg-[#22c55e]/15 border-[#22c55e]/60 text-[#4ade80] font-bold";
                        } else if (isThisUserChoice && !isCorrect) {
                          optStyle = "bg-[#ef4444]/15 border-[#ef4444]/60 text-[#f87171] font-bold line-through";
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border text-[12px] flex items-center justify-between ${optStyle}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{opt.id}.</span>
                              <span className="font-[Mukta]">{opt.textNp || opt.textEn}</span>
                            </div>
                            {isThisCorrect && (
                              <span className="text-[10px] uppercase font-bold text-[#4ade80]">Correct Key</span>
                            )}
                            {isThisUserChoice && !isThisCorrect && (
                              <span className="text-[10px] uppercase font-bold text-[#f87171]">Your Choice</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIVE QUIZ INTERFACE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex flex-col select-none">
      {/* Top Header with Live Timer & Early Submit */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/practice"
            className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9ca3af] hover:text-white transition-all border border-white/[0.06]"
            title="Exit Exam"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </Link>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-white tracking-wide truncate max-w-sm">{examTitle}</span>
            <span className="text-[10px] text-[#6b7280]">
              Question {currentIndex + 1} of {totalQuestionsCount}
            </span>
          </div>
        </div>

        {/* Center Live Timer */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${
          isTimeCritical
            ? "bg-[#ef4444]/20 border-[#ef4444] text-[#f87171] animate-pulse shadow-lg shadow-[#ef4444]/20"
            : "bg-[#10131a] border-white/[0.1] text-white"
        }`}>
          <span className="material-symbols-outlined text-[16px] text-[#ef4444]">timer</span>
          <span className="text-[14px] font-mono font-bold tracking-wider">
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPaletteDrawer(!showPaletteDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#d1d5db] text-[11px] font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            Palette
          </button>

          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/25 transition-all transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Question Pane */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 flex flex-col justify-between max-w-4xl mx-auto w-full">
          {/* Question Card */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-[#534AB7]/20 border border-[#534AB7]/40 text-xs font-bold text-[#c4b5fd]">
                  Q{(currentIndex + 1).toString().padStart(2, "0")}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] text-[#9ca3af] border border-white/[0.06]">
                  {currentQ?.subject || "GENERAL"}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#22c55e]/10 text-[#4ade80] border border-[#22c55e]/30">
                  {currentQ?.difficulty || "Easy"}
                </span>
              </div>

              <div className="text-[11px] font-bold text-[#6b7280]">
                +2.0 Marks / -0.4 Penalty
              </div>
            </div>

            {/* Stems */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[Mukta] leading-relaxed mb-1.5">
                {currentQ?.textNp}
              </h2>
              {currentQ?.textEn && (
                <p className="text-[13px] text-[#9ca3af] font-sans leading-relaxed italic">
                  {currentQ?.textEn}
                </p>
              )}
            </div>

            {/* Answer Choices */}
            <div className="flex flex-col gap-3 pt-2">
              {(currentQ?.options || []).map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#534AB7]/25 border-[#7c75ff] text-white shadow-lg shadow-[#534AB7]/20 ring-1 ring-[#7c75ff]"
                        : "bg-[#141721] border-white/[0.06] hover:border-white/[0.15] text-[#d1d5db] hover:bg-[#181c28]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1">
                      <div
                        className={`size-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all border ${
                          isSelected
                            ? "bg-[#534AB7] border-[#7c75ff] text-white"
                            : "bg-[#10131a] border-white/[0.08] text-[#9ca3af] group-hover:text-white"
                        }`}
                      >
                        {opt.id}
                      </div>

                      <div className="flex-1">
                        <span className="text-[14.5px] font-[Mukta] block leading-snug">
                          {opt.textNp}
                        </span>
                        {opt.textEn && (
                          <span className="text-[11px] text-[#9ca3af] block mt-0.5">
                            {opt.textEn}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`size-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "border-[#7c75ff] bg-[#7c75ff]" : "border-white/[0.2]"
                      }`}
                    >
                      {isSelected && <span className="size-2 rounded-full bg-white"></span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-8 mt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  flaggedQuestions[currentQ?.id]
                    ? "bg-[#d97706]/20 border-[#d97706] text-[#fbbf24]"
                    : "bg-white/[0.04] border-white/[0.08] text-[#9ca3af] hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {flaggedQuestions[currentQ?.id] ? "bookmark" : "bookmark_border"}
                </span>
                {flaggedQuestions[currentQ?.id] ? "Flagged" : "Flag for Review"}
              </button>

              {userAnswers[currentQ?.id] && (
                <button
                  type="button"
                  onClick={handleClearChoice}
                  className="px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-[#6b7280] hover:text-[#ef4444] transition-colors"
                >
                  Clear Choice
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Previous
              </button>

              {currentIndex < totalQuestionsCount - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestionsCount - 1, prev + 1))}
                  className="flex items-center gap-1 px-5 py-2 bg-[#534AB7] hover:bg-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#534AB7]/25 transition-all transform active:scale-95"
                >
                  Next
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-black font-black text-[11px] uppercase tracking-wider rounded-xl shadow-lg shadow-[#22c55e]/25 transition-all transform active:scale-95"
                >
                  Finish & Submit
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Question Palette Drawer */}
        {showPaletteDrawer && (
          <div className="w-[300px] bg-[#141721] border-l border-white/[0.08] p-5 flex flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">Question Grid</h3>
                <span className="text-[11px] text-[#a78bfa] font-bold">
                  {Object.keys(userAnswers).length} / {totalQuestionsCount} Answered
                </span>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#9ca3af] bg-[#10131a] p-3 rounded-xl border border-white/[0.04] mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#22c55e]"></span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#d97706]"></span>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#534AB7]"></span>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/[0.1]"></span>
                  <span>Unanswered</span>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                {questions.map((q, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isAnswered = !!userAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];

                  let btnStyle = "bg-[#10131a] border-white/[0.06] text-[#9ca3af] hover:text-white";
                  if (isCurrent) {
                    btnStyle = "bg-[#534AB7] border-[#7c75ff] text-white shadow-md shadow-[#534AB7]/40 ring-1 ring-[#7c75ff]";
                  } else if (isFlagged) {
                    btnStyle = "bg-[#d97706]/20 border-[#d97706] text-[#fbbf24]";
                  } else if (isAnswered) {
                    btnStyle = "bg-[#22c55e]/20 border-[#22c55e]/50 text-[#4ade80]";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl font-mono text-[11px] font-bold border transition-all ${btnStyle}`}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Early Submit Action inside Drawer */}
            <div className="pt-4 border-t border-white/[0.06] mt-4">
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 bg-[#10131a] hover:bg-[#534AB7] border border-white/[0.08] hover:border-[#534AB7] text-[#d1d5db] hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">upload</span>
                Early Submission (चाँडै बुझाउनुहोस्)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#141721] border border-white/[0.1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white font-headline">Submit Examination?</h3>
                <p className="text-[11px] text-[#6b7280]">Review your answered question tally before final submission.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#10131a] p-3 rounded-xl border border-white/[0.04] text-center">
              <div>
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Answered</span>
                <span className="text-[16px] font-bold text-[#4ade80]">{Object.keys(userAnswers).length}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Unanswered</span>
                <span className="text-[16px] font-bold text-[#f87171]">
                  {totalQuestionsCount - Object.keys(userAnswers).length}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-[#6b7280] block">Flagged</span>
                <span className="text-[16px] font-bold text-[#fbbf24]">
                  {Object.values(flaggedQuestions).filter(Boolean).length}
                </span>
              </div>
            </div>

            <p className="text-[12px] text-[#9ca3af] leading-relaxed">
              Are you sure you want to end this exam? Once submitted, your score and evaluation will be calculated immediately.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#534AB7] to-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/30 transition-all"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
          <span className="material-symbols-outlined text-[36px] text-[#534AB7] animate-spin">
            progress_activity
          </span>
        </div>
      }
    >
      <QuizPlayerContent />
    </Suspense>
  );
}
