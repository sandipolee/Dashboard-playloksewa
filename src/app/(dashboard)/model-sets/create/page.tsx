"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import QuestionBuilder from "@/components/exam-builder/QuestionBuilder";
import ExamMetadataForm from "@/components/exam-builder/ExamMetadataForm";

import { Option, Question, MarkingLogic } from "@/types/exam";
export type { Option, Question, MarkingLogic };

function CreateModelSetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("id");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag and drop sorting state & handlers
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const reordered = [...questions];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(index, 0, removed);

    setQuestions(reordered);
    setDraggedIndex(null);
  };
  
  // Sidebar config toggles
  const [optionShuffling, setOptionShuffling] = useState(true);
  const [antiCheat, setAntiCheat] = useState(false);
  const [immediateResults, setImmediateResults] = useState(true);

  const [metadata, setMetadata] = useState({
    title: "General Management & Constitution",
    category: "General Knowledge",
    duration: 45,
    marking: {
      positive: 2.0,
      negative: 0.4,
    },
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      difficulty: "Medium",
      subject: "ECONOMY",
      textNp: "नेपालको १५औं योजनाको अन्त्यसम्ममा प्रतिव्यक्ति आय कति पुर्‍याउने लक्ष्य राखिएको छ?",
      textEn: "What is the target per capita income by the end of Nepal's 15th Plan?",
      options: [
        { id: "A", textEn: "USD 1,500", textNp: "१,५०० अमेरिकी डलर" },
        { id: "B", textEn: "USD 1,595", textNp: "१,५९५ अमेरिकी डलर" },
        { id: "C", textEn: "USD 1,600", textNp: "१,६०० अमेरिकी डलर" },
        { id: "D", textEn: "USD 1,800", textNp: "१,८०० अमेरिकी डलर" },
      ],
      correctOptionId: "B",
    },
    {
      id: "2",
      difficulty: "Hard",
      subject: "GEOGRAPHY",
      textNp: "सगरमाथाको नयाँ उचाइ ८८४८.८६ मिटर कहिले सार्वजनिक गरिएको हो?",
      textEn: "When was the new height of Mt. Everest (8848.86m) officially announced?",
      options: [
        { id: "A", textEn: "2077 Mangsir 22", textNp: "२०७७ मंसिर २२" },
        { id: "B", textEn: "2077 Mangsir 23", textNp: "२०७७ मंसिर २३" },
        { id: "C", textEn: "2078 Mangsir 24", textNp: "२०७८ मंसिर २४" },
        { id: "D", textEn: "2079 Mangsir 25", textNp: "२०७९ मंसिर २५" },
      ],
      correctOptionId: "B",
    },
    {
      id: "3",
      difficulty: "Easy",
      subject: "CONSTITUTION",
      textNp: "नेपालको संविधानमा मौलिक हकहरू कुन भागमा व्यवस्था गरिएको छ?",
      textEn: "In which part of the Constitution of Nepal are the fundamental rights provisioned?",
      options: [
        { id: "A", textEn: "Part 2", textNp: "भाग २" },
        { id: "B", textEn: "Part 3", textNp: "भाग ३" },
        { id: "C", textEn: "Part 4", textNp: "भाग ४" },
        { id: "D", textEn: "Part 5", textNp: "भाग ५" },
      ],
      correctOptionId: "B",
    },
  ]);

  const [activeQuestion, setActiveQuestion] = useState<string>("1");
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: null });
    }, 4500);
  };

  // Load existing model set if editing
  useEffect(() => {
    if (!setId) return;
    const loadModelSet = async () => {
      try {
        const res = await fetch(`/api/model-sets/${setId}`);
        const json = await res.json();
        if (res.ok && json.data) {
          const set = json.data;
          setMetadata({
            title: set.title || "",
            category: set.category || "General Knowledge",
            duration: set.duration || 45,
            marking: {
              positive: typeof set.positive_mark === "number" ? set.positive_mark : parseFloat(set.positive_mark) || 2.0,
              negative: typeof set.negative_mark === "number" ? set.negative_mark : parseFloat(set.negative_mark) || 0.4,
            },
          });
          if (typeof set.option_shuffling === "boolean") setOptionShuffling(set.option_shuffling);
          if (typeof set.anti_cheat === "boolean") setAntiCheat(set.anti_cheat);
          if (typeof set.immediate_results === "boolean") setImmediateResults(set.immediate_results);

          if (Array.isArray(set.questions) && set.questions.length > 0) {
            const mappedQuestions = set.questions.map((q: any, idx: number) => ({
              id: (idx + 1).toString(),
              difficulty: q.difficulty || "Easy",
              subject: q.subject || set.category || "GENERAL",
              textNp: q.text_np || q.textNp || "",
              textEn: q.text_en || q.textEn || "",
              options: Array.isArray(q.options) && q.options.length > 0 ? q.options : [
                { id: "A", textEn: "", textNp: "" },
                { id: "B", textEn: "", textNp: "" },
                { id: "C", textEn: "", textNp: "" },
                { id: "D", textEn: "", textNp: "" },
              ],
              correctOptionId: q.correct_option_id || q.correctOptionId || "A",
            }));
            setQuestions(mappedQuestions);
            setActiveQuestion(mappedQuestions[0].id);
          }
          showToast(`Loaded "${set.title}" for editing`, "success");
        }
      } catch (err) {
        console.error("Failed to load model set:", err);
        showToast("Failed to load model set details", "error");
      }
    };
    loadModelSet();
  }, [setId]);

  const handleAppendQuestion = () => {
    const maxId = Math.max(...questions.map((q) => parseInt(q.id) || 0), 0);
    const nextNum = (maxId + 1).toString();
    const newQ: Question = {
      id: nextNum,
      difficulty: "Easy",
      subject: "GENERAL",
      textNp: "",
      textEn: "",
      options: [
        { id: "A", textEn: "", textNp: "" },
        { id: "B", textEn: "", textNp: "" },
        { id: "C", textEn: "", textNp: "" },
        { id: "D", textEn: "", textNp: "" },
      ],
      correctOptionId: "A",
    };
    setQuestions([...questions, newQ]);
    setActiveQuestion(newQ.id);
    setEditingQuestion(newQ.id);
    showToast(`Added Question ${nextNum.padStart(2, "0")} to pipeline`, "success");
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showToast("A model set must contain at least one question.", "error");
      return;
    }
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    if (activeQuestion === id) {
      setActiveQuestion(updated[0].id);
    }
    if (editingQuestion === id) {
      setEditingQuestion(null);
    }
    showToast("Question deleted", "success");
  };

  // CSV parsing logic
  const parseCSV = (text: string): Question[] => {
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
    const parsedQuestions: Question[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim().replace(/^"|"$/g, ""));
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim().replace(/^"|"$/g, ""));

      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        if (values[idx] !== undefined) {
          row[header] = values[idx];
        }
      });

      const options = [
        { id: "A", textEn: row.optiona_en || row.optiona || "", textNp: row.optiona_np || "" },
        { id: "B", textEn: row.optionb_en || row.optionb || "", textNp: row.optionb_np || "" },
        { id: "C", textEn: row.optionc_en || row.optionc || "", textNp: row.optionc_np || "" },
        { id: "D", textEn: row.optiond_en || row.optiond || "", textNp: row.optiond_np || "" },
      ];

      const difficulty = (row.difficulty || "Easy") as "Easy" | "Medium" | "Hard";
      const correctOptionId = (row.correctoptionid || row.correctoption || "A").trim().toUpperCase();

      parsedQuestions.push({
        id: `temp-${Date.now()}-${i}`,
        difficulty: ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : "Easy",
        subject: (row.subject || "GENERAL").toUpperCase(),
        textEn: row.texten || row.text || "",
        textNp: row.textnp || "",
        options,
        correctOptionId: ["A", "B", "C", "D"].includes(correctOptionId) ? correctOptionId : "A",
      });
    }

    return parsedQuestions;
  };

  // JSON parsing logic
  const parseJSON = (text: string): Question[] => {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      throw new Error("JSON data must be an array of questions");
    }

    return data.map((item: any, idx: number) => {
      const options = [
        { id: "A", textEn: "", textNp: "" },
        { id: "B", textEn: "", textNp: "" },
        { id: "C", textEn: "", textNp: "" },
        { id: "D", textEn: "", textNp: "" },
      ];

      if (Array.isArray(item.options)) {
        item.options.forEach((opt: any, oIdx: number) => {
          if (oIdx < 4) {
            options[oIdx].textEn = opt.textEn || "";
            options[oIdx].textNp = opt.textNp || "";
          }
        });
      } else {
        options[0].textEn = item.optionA_En || item.optiona_en || "";
        options[0].textNp = item.optionA_Np || item.optiona_np || "";
        options[1].textEn = item.optionB_En || item.optionb_en || "";
        options[1].textNp = item.optionB_Np || item.optionb_np || "";
        options[2].textEn = item.optionC_En || item.optionc_en || "";
        options[2].textNp = item.optionC_Np || item.optionc_np || "";
        options[3].textEn = item.optionD_En || item.optiond_en || "";
        options[3].textNp = item.optionD_Np || item.optiond_np || "";
      }

      const difficulty = item.difficulty || "Easy";
      const correctOptionId = (item.correctOptionId || item.correctoptionid || "A").trim().toUpperCase();

      return {
        id: `temp-${Date.now()}-${idx}`,
        difficulty: ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : "Easy",
        subject: (item.subject || "GENERAL").toUpperCase(),
        textEn: item.textEn || item.texten || "",
        textNp: item.textNp || item.textnp || "",
        options,
        correctOptionId: ["A", "B", "C", "D"].includes(correctOptionId) ? correctOptionId : "A",
      };
    });
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        let imported: Question[] = [];
        if (file.name.endsWith(".json")) {
          imported = parseJSON(text);
        } else if (file.name.endsWith(".csv")) {
          imported = parseCSV(text);
        } else {
          showToast("Unsupported file type. Upload CSV or JSON.", "error");
          return;
        }

        if (imported.length === 0) {
          showToast("No valid questions found in file.", "error");
          return;
        }

        let maxId = Math.max(...questions.map((q) => parseInt(q.id) || 0), 0);
        const mapped = imported.map((q) => {
          maxId++;
          return {
            ...q,
            id: maxId.toString(),
          };
        });

        setQuestions([...questions, ...mapped]);
        setActiveQuestion(mapped[0].id);
        showToast(`Successfully imported ${mapped.length} questions!`, "success");
      } catch (err: any) {
        showToast(`Parsing error: ${err.message || err}`, "error");
      }
    };
    reader.readAsText(file);
  };

  const downloadCSVTemplate = () => {
    const headers = "Subject,Difficulty,TextNp,TextEn,OptionA_En,OptionA_Np,OptionB_En,OptionB_Np,OptionC_En,OptionC_Np,OptionD_En,OptionD_Np,CorrectOptionId\n";
    const row = "CONSTITUTION,Easy,नेपालको राष्ट्रिय फूल के हो?,What is the national flower of Nepal?,Rhododendron,लालीगुराँस,Lotus,कमल,Rose,गुलाफ,Sunflower,सूर्यमुखी,A\n";
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "questions_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSONTemplate = () => {
    const sample = [
      {
        subject: "CONSTITUTION",
        difficulty: "Easy",
        textNp: "नेपालको राष्ट्रिय फूल के हो?",
        textEn: "What is the national flower of Nepal?",
        options: [
          { id: "A", textEn: "Rhododendron", textNp: "लालीगुराँस" },
          { id: "B", textEn: "Lotus", textNp: "कमल" },
          { id: "C", textEn: "Rose", textNp: "गुलाफ" },
          { id: "D", textEn: "Sunflower", textNp: "सूर्यमुखी" }
        ],
        correctOptionId: "A"
      }
    ];
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "questions_template.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleValidate = () => {
    const errors: string[] = [];
    questions.forEach((q, idx) => {
      const num = idx + 1;
      if (!q.textNp.trim() && !q.textEn.trim()) {
        errors.push(`Q${num}: Question text stem is missing.`);
      }
      const emptyOpts = q.options.filter((o) => !o.textEn.trim() && !o.textNp.trim());
      if (emptyOpts.length > 0) {
        errors.push(`Q${num}: Empty option fields found.`);
      }
      if (!q.correctOptionId) {
        errors.push(`Q${num}: No correct answer selected.`);
      }
    });

    if (errors.length > 0) {
      showToast(`Validation Failed: ${errors[0]}`, "error");
    } else {
      showToast("Success! All validation checks passed.", "success");
    }
  };

  const saveSetToDb = async (status: "Draft" | "Published") => {
    try {
      const url = setId ? `/api/model-sets/${setId}` : "/api/model-sets";
      const method = setId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata,
          questions,
          status,
          optionShuffling,
          antiCheat,
          immediateResults,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        showToast(json.error || "Failed to save model set to DB", "error");
        return;
      }

      showToast(
        setId
          ? `Model Set ${status === "Published" ? "Updated & Published" : "Draft Saved"}!`
          : `Model Set ${status === "Published" ? "Published to Database" : "Saved as Draft"}!`,
        "success"
      );
      setTimeout(() => router.push("/model-sets"), 1200);
    } catch (err: any) {
      showToast("Error saving to database", "error");
    }
  };

  const handleSaveDraft = () => {
    saveSetToDb("Draft");
  };

  const handlePublish = () => {
    const invalid = questions.some(
      (q) => (!q.textNp.trim() && !q.textEn.trim()) || q.options.some((o) => !o.textEn.trim() && !o.textNp.trim())
    );
    if (invalid) {
      showToast("Cannot publish. Some questions fail validation checks.", "error");
      return;
    }
    saveSetToDb("Published");
  };

  // Get active question details
  const activeQ = questions.find((q) => q.id === activeQuestion) || questions[0];
  const activeQIndex = questions.findIndex((q) => q.id === activeQuestion);

  // Dynamic calculations for stats & sidebar
  const maxScore = questions.length * metadata.marking.positive;
  const minScore = questions.length * -metadata.marking.negative;


  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      {/* Toast Alert */}
      {toast.type && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg border shadow-xl flex items-center gap-2 max-w-md text-xs font-semibold ${
          toast.type === "success" 
            ? "bg-[#0d9488]/20 border-[#0d9488] text-white" 
            : "bg-[#ef4444]/20 border-[#ef4444] text-white"
        }`}>
          <span className="material-symbols-outlined text-[16px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Center Pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[#0f1117] flex items-center justify-between px-5 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Link 
              href="/model-sets" 
              className="flex items-center justify-center size-8 rounded-lg hover:bg-white/5 text-[#9ca3af] hover:text-white transition-all transform active:scale-95"
              title="Back to Model Sets"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <div className="h-5 w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-[200px]">
                {metadata.title || (setId ? "Edit Model Set" : "Untitled Model Set")}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">
                {setId ? "Edit Mode" : "Builder"} / {metadata.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.04] rounded-full shrink-0">
              <span className="size-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_#22c55e]"></span>
              <span className="text-[8.5px] font-semibold tracking-wider text-[#6b7280] uppercase">Autosaved</span>
            </div>
            
            <Link 
              href="/model-sets" 
              className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#9ca3af] hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Cancel
            </Link>

            <button 
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-surface-container border border-outline-variant hover:border-[#534AB7]/40 text-[#9ca3af] hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all hover:bg-surface-container-high transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[13px]">save</span>
              {setId ? "Save Changes" : "Save Draft"}
            </button>

            <button 
              onClick={handlePublish}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#534AB7] to-[#6C63FF] text-white text-[9px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#534AB7]/15 hover:shadow-[#534AB7]/35 hover:from-[#6358d4] hover:to-[#7c75ff] transition-all transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
              {setId ? "Update & Publish" : "Publish Set"}
            </button>

            <button 
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border transform active:scale-95 ${
                showLivePreview 
                  ? "bg-[#534AB7]/20 border-[#534AB7] text-[#a78bfa]" 
                  : "bg-surface-container border-outline-variant text-[#9ca3af] hover:text-white"
              }`}
              title={showLivePreview ? "Close Live Preview" : "Open Live Preview"}
            >
              <span className="material-symbols-outlined text-[13px]">visibility</span>
              Live Preview
            </button>

            <div className="h-5 w-[1px] bg-white/10 mx-1"></div>

            <div className="flex items-center gap-0.5">
              <button className="p-1 text-[#6b7280] hover:text-white rounded hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">notifications</span>
              </button>
              <button className="p-1 text-[#6b7280] hover:text-white rounded hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">help_outline</span>
              </button>
              <div className="size-5 rounded-full bg-[#534AB7]/30 border border-[#534AB7]/50 ml-1 flex items-center justify-center text-[8px] font-bold text-white select-none">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-10">
          {/* Metadata Card */}
          <div className="bg-[#161922] rounded-lg p-4 mb-4 border border-white/[0.04]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-[16px] font-bold text-white leading-tight mb-0.5">{metadata.title || "Untitled Model Set"}</h1>
                <p className="text-[11px] text-[#9ca3af]">{metadata.category} - {metadata.duration} Minutes</p>
              </div>
              <button 
                onClick={() => setIsEditingMetadata(!isEditingMetadata)}
                className={`p-1.5 rounded-md transition-colors ${
                  isEditingMetadata 
                    ? "bg-[#534AB7] text-white" 
                    : "text-[#6b7280] hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">edit</span>
              </button>
            </div>
            
            {isEditingMetadata ? (
              <div className="border-t border-white/[0.04] pt-4 mt-2">
                <ExamMetadataForm metadata={metadata} setMetadata={setMetadata} />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                {[
                  { label: "DURATION", icon: "schedule", value: `${metadata.duration} Minutes`, color: "text-white" },
                  { label: "TOTAL MARKS", icon: "verified", value: `${maxScore} Marks`, color: "text-white" },
                  { label: "NEGATIVE MARKING", icon: "warning", value: `${(metadata.marking.negative * 100).toFixed(0)}% (-${metadata.marking.negative})`, color: "text-[#d97706]" },
                  { label: "SUBJECT", icon: "menu_book", value: metadata.category, color: "text-white" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">{f.label}</span>
                    <span className={`material-symbols-outlined text-[13px] ${f.color === "text-[#d97706]" ? "text-[#d97706]" : "text-[#9ca3af]"}`}>{f.icon}</span>
                    <span className={`text-[11px] font-semibold ${f.color}`}>{f.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Question Pipeline */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[13px] font-bold text-white">Question Pipeline</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#1e222d] text-[9px] font-bold text-[#9ca3af] border border-white/[0.06]">
                  {questions.length} / 50 ITEMS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[130px] h-[4px] bg-[#1e222d] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0d9488] to-[#22c55e] rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((questions.length / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-bold text-[#9ca3af]">
                  {Math.min(Math.round((questions.length / 50) * 100), 100)}% CAPACITY
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {questions.map((q, index) => {
                const isEditing = editingQuestion === q.id;
                const isActive = activeQuestion === q.id;
                return (
                  <div 
                    key={q.id}
                    draggable={!isEditing}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`transition-all duration-150 ${draggedIndex === index ? "opacity-30 scale-95" : ""}`}
                  >
                    {isEditing ? (
                      <div className="bg-[#161922] border-2 border-[#534AB7]/40 rounded-lg p-1">
                        <QuestionBuilder
                          index={index}
                          question={q}
                          updateQuestion={(updatedQ) => {
                            const list = questions.map((item) => item.id === q.id ? updatedQ : item);
                            setQuestions(list);
                          }}
                          deleteQuestion={() => handleDeleteQuestion(q.id)}
                          onClose={() => setEditingQuestion(null)}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setActiveQuestion(q.id)}
                        onDoubleClick={() => {
                          setActiveQuestion(q.id);
                          setEditingQuestion(q.id);
                        }}
                        className={`bg-[#161922] rounded-lg p-3.5 border cursor-pointer transition-all group ${
                          isActive 
                            ? "border-[#534AB7]/60 shadow-[0_0_12px_rgba(83,74,183,0.15)]" 
                            : "border-white/[0.04] hover:border-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1">
                            {/* Drag handle icon */}
                            <span 
                              className="material-symbols-outlined text-[#3f4451] group-hover:text-[#a78bfa] cursor-grab active:cursor-grabbing text-[16px] mt-0.5 select-none transition-colors"
                              title="Drag to reorder"
                            >
                              drag_indicator
                            </span>
                            <span className="text-[12px] font-bold text-[#3f4451] mt-0.5 select-none">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                            <div className="flex-1">
                              <p className="text-[12.5px] font-semibold text-white leading-relaxed mb-0.5 font-[Mukta]">
                                {q.textNp || <span className="text-[#3f4451] italic text-[11px]">नेपालीमा प्रश्न थपिएको छैन</span>}
                              </p>
                              <p className="text-[10px] text-[#6b7280] leading-relaxed italic">
                                {q.textEn || <span className="text-[#3f4451] italic">No English text entered</span>}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#6b7280]/60 mr-1 select-none">
                              Double-click to edit
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveQuestion(q.id);
                                setEditingQuestion(q.id);
                              }}
                              className="p-1 rounded text-[#9ca3af] hover:text-white hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"
                              title="Edit Question"
                            >
                              <span className="material-symbols-outlined text-[14px]">edit</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteQuestion(q.id);
                              }}
                              className="p-1 rounded text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 opacity-0 group-hover:opacity-100 transition-all"
                              title="Delete Question"
                            >
                              <span className="material-symbols-outlined text-[14px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button 
              onClick={handleAppendQuestion}
              className="w-full mt-3 py-3 border-2 border-dashed border-[#2a2f3a] rounded-lg flex items-center justify-center gap-1.5 text-[#6b7280] hover:border-[#534AB7]/50 hover:text-[#a78bfa] hover:bg-[#534AB7]/5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.08em]">Append New Question</span>
            </button>
          </div>

          {/* Bulk Question Importer */}
          <div className="mt-8 bg-[#161922] rounded-lg p-5 border border-white/[0.04]">
            <h3 className="text-[13px] font-bold text-white mb-1">Bulk Question Importer</h3>
            <p className="text-[11px] text-[#6b7280] mb-4">Upload questions instantly using CSV or JSON templates.</p>
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]); }}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging 
                  ? "border-[#534AB7] bg-[#534AB7]/5" 
                  : "border-white/[0.06] hover:border-[#534AB7]/30 hover:bg-[#534AB7]/2"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv,.json"
                onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }}
              />
              <span className="material-symbols-outlined text-[28px] text-[#534AB7] mb-2">cloud_upload</span>
              <p className="text-[11px] text-white font-medium mb-1">Drag & Drop file here or click to browse</p>
              <p className="text-[9px] text-[#6b7280]">Supports CSV and JSON formats (max 10MB)</p>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <button 
                onClick={downloadCSVTemplate}
                className="flex items-center gap-1 text-[10px] text-[#a78bfa] hover:underline"
              >
                <span className="material-symbols-outlined text-[12px]">download</span>
                Download CSV Template
              </button>
              <button 
                onClick={downloadJSONTemplate}
                className="flex items-center gap-1 text-[10px] text-[#a78bfa] hover:underline"
              >
                <span className="material-symbols-outlined text-[12px]">download</span>
                Download JSON Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Live Preview & Distribution */}
      {showLivePreview && (
        <div className="w-[280px] bg-[#161922] border-l border-white/[0.06] flex flex-col h-full overflow-hidden shrink-0 animate-in fade-in slide-in-from-right duration-200">
          <div className="h-14 border-b border-white/[0.06] px-4 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#a78bfa]">visibility</span>
              <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Live Preview</h3>
            </div>
            <button 
              onClick={() => setShowLivePreview(false)}
              className="p-1.5 rounded-md text-[#6b7280] hover:text-white hover:bg-white/5 transition-colors"
              title="Close Live Preview"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
          {/* Mobile Frame Simulation */}
          <div className="bg-[#1e222d] rounded-xl border border-white/[0.06] overflow-hidden shadow-xl">
            <div className="px-3 pt-3 pb-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-[#9ca3af]">
                Q. {activeQIndex !== -1 ? (activeQIndex + 1).toString().padStart(2, "0") : "01"}
              </span>
              <span className="text-[9px] font-bold text-[#ef4444]">45:00 REMAINING</span>
            </div>
            <div className="px-3 pb-2">
              <p className="text-[11.5px] font-semibold text-white leading-relaxed font-[Mukta]">
                {activeQ?.textNp || <span className="text-[#3f4451] italic">नेपालीमा प्रश्न राखिएको छैन</span>}
              </p>
              {activeQ?.textEn && (
                <p className="text-[9.5px] text-[#9ca3af] leading-relaxed italic mt-1">
                  {activeQ.textEn}
                </p>
              )}
            </div>
            <div className="mx-3 mb-2 rounded-md overflow-hidden h-[70px] bg-gradient-to-br from-[#1e222d] to-[#161922] border border-white/[0.04] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] text-white/10">image</span>
            </div>
            <div className="px-3 pb-3 flex flex-col gap-1.5">
              {(activeQ?.options || []).map((opt) => {
                const isCorrect = activeQ.correctOptionId === opt.id;
                return (
                  <div 
                    key={opt.id} 
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-[10px] font-medium transition-all ${
                      isCorrect 
                        ? "bg-[#534AB7]/15 border-[#534AB7] text-[#a78bfa]" 
                        : "bg-[#161922] border-white/[0.06] text-[#9ca3af]"
                    }`}
                  >
                    <span className="font-bold text-[9px]">{opt.id}</span>
                    <div className="flex-1 flex flex-col">
                      <span className="font-[Mukta] text-[10.5px]">{opt.textNp || "..."}</span>
                      {opt.textEn && <span className="text-[8.5px] opacity-75">{opt.textEn}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Calculations */}
          <div>
            <h4 className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-2">Live Calculations</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-lg p-2.5 flex flex-col items-center">
                <span className="text-[8px] font-bold uppercase tracking-wider text-[#0d9488] mb-0.5">Max Score</span>
                <span className="text-[16px] font-bold text-[#0d9488] font-headline">+{maxScore.toFixed(1)}</span>
              </div>
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-2.5 flex flex-col items-center">
                <span className="text-[8px] font-bold uppercase tracking-wider text-[#f87171] mb-0.5">Min Score</span>
                <span className="text-[16px] font-bold text-[#f87171] font-headline">-{Math.abs(minScore).toFixed(2)}</span>
              </div>
            </div>
          </div>



          {/* Advanced Configurations */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-white/[0.04]">
            <h4 className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Global Flags</h4>
            <div className="flex flex-col gap-2 bg-[#1e222d]/30 p-2.5 rounded-lg border border-[#white]/[0.04]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-medium">Option Shuffling</span>
                <div 
                  onClick={() => setOptionShuffling(!optionShuffling)}
                  className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${optionShuffling ? "bg-[#534AB7]" : "bg-white/[0.08]"}`}
                >
                  <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${optionShuffling ? "right-0.5" : "left-0.5"}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-medium">Anti-Cheat Mode</span>
                <div 
                  onClick={() => setAntiCheat(!antiCheat)}
                  className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${antiCheat ? "bg-[#534AB7]" : "bg-white/[0.08]"}`}
                >
                  <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${antiCheat ? "right-0.5" : "left-0.5"}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-medium">Immediate Results</span>
                <div 
                  onClick={() => setImmediateResults(!immediateResults)}
                  className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${immediateResults ? "bg-[#534AB7]" : "bg-white/[0.08]"}`}
                >
                  <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${immediateResults ? "right-0.5" : "left-0.5"}`}></div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleValidate}
            className="w-full py-2.5 bg-[#1e222d] border border-white/[0.06] text-[9px] font-bold uppercase tracking-[0.1em] text-[#9ca3af] rounded-lg hover:bg-[#282d3d] hover:text-white transition-all mt-auto"
          >
            Validate Logic & Flags
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default function CreateModelSet() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#0f1117]">
          <span className="material-symbols-outlined text-[32px] text-[#534AB7] animate-spin">
            progress_activity
          </span>
        </div>
      }
    >
      <CreateModelSetForm />
    </Suspense>
  );
}
