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
  const [isSaving, setIsSaving] = useState(false);
  
  // Bulk Importer tab & pasted text
  const [importTab, setImportTab] = useState<"file" | "paste">("paste");
  const [pastedText, setPastedText] = useState("");
  
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
    title: "",
    category: "",
    duration: 45,
    marking: {
      positive: 2.0,
      negative: 0.4,
    },
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string>("");
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
            category: set.category || "",
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
              note: q.note || q.note_np || q.noteNp || "",
            }));
            setQuestions(mappedQuestions);
            setActiveQuestion(mappedQuestions[0].id);
          } else {
            setQuestions([]);
            setActiveQuestion("");
          }
          showToast(`Loaded "${set.title || "Model Set"}" for editing`, "success");
        }
      } catch (err) {
        console.error("Failed to load model set:", err);
        showToast("Failed to load model set details", "error");
      }
    };
    loadModelSet();
  }, [setId]);

  const handleAppendQuestion = () => {
    const maxId = questions.reduce((max, q) => Math.max(max, parseInt(q.id) || 0), 0);
    const nextNum = (maxId + 1).toString();
    const newQ: Question = {
      id: nextNum,
      difficulty: "Easy",
      subject: (metadata.category || "GENERAL").toUpperCase(),
      textNp: "",
      textEn: "",
      options: [
        { id: "A", textEn: "", textNp: "" },
        { id: "B", textEn: "", textNp: "" },
        { id: "C", textEn: "", textNp: "" },
        { id: "D", textEn: "", textNp: "" },
      ],
      correctOptionId: "A",
      note: "",
    };
    const updated = [...questions, newQ];
    setQuestions(updated);
    setActiveQuestion(newQ.id);
    setEditingQuestion(newQ.id);
    showToast(`Added Question Q${nextNum.padStart(2, "0")}`, "success");
  };

  const handleDeleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    if (activeQuestion === id) {
      setActiveQuestion(updated.length > 0 ? updated[0].id : "");
    }
    if (editingQuestion === id) {
      setEditingQuestion(null);
    }
    showToast("Question removed", "success");
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
        subject: (row.subject || metadata.category || "GENERAL").toUpperCase(),
        textEn: row.texten || row.text || "",
        textNp: row.textnp || "",
        options,
        correctOptionId: ["A", "B", "C", "D"].includes(correctOptionId) ? correctOptionId : "A",
        note: row.note || row.explanation || row.notenp || row.noteen || "",
      });
    }

    return parsedQuestions;
  };

  // JSON parsing logic
  const parseJSON = (text: string): Question[] => {
    const data = JSON.parse(text);
    const list = Array.isArray(data) ? data : [data];

    return list.map((item: any, idx: number) => {
      const options = [
        { id: "A", textEn: "", textNp: "" },
        { id: "B", textEn: "", textNp: "" },
        { id: "C", textEn: "", textNp: "" },
        { id: "D", textEn: "", textNp: "" },
      ];

      if (Array.isArray(item.options)) {
        item.options.forEach((opt: any, oIdx: number) => {
          if (oIdx < 4) {
            options[oIdx].textEn = opt.textEn || opt.text_en || "";
            options[oIdx].textNp = opt.textNp || opt.text_np || "";
          }
        });
      } else {
        options[0].textEn = item.optionA_En || item.optiona_en || item.optionA || "";
        options[0].textNp = item.optionA_Np || item.optiona_np || "";
        options[1].textEn = item.optionB_En || item.optionb_en || item.optionB || "";
        options[1].textNp = item.optionB_Np || item.optionb_np || "";
        options[2].textEn = item.optionC_En || item.optionc_en || item.optionC || "";
        options[2].textNp = item.optionC_Np || item.optionc_np || "";
        options[3].textEn = item.optionD_En || item.optiond_en || item.optionD || "";
        options[3].textNp = item.optionD_Np || item.optiond_np || "";
      }

      const difficulty = item.difficulty || "Easy";
      const correctOptionId = (item.correctOptionId || item.correct_option_id || item.correctOption || item.answer || "A").toString().trim().toUpperCase();

      return {
        id: `temp-${Date.now()}-${idx}`,
        difficulty: ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : "Easy",
        subject: (item.subject || metadata.category || "GENERAL").toUpperCase(),
        textEn: item.textEn || item.text_en || item.text || "",
        textNp: item.textNp || item.text_np || "",
        options,
        correctOptionId: ["A", "B", "C", "D"].includes(correctOptionId) ? correctOptionId : "A",
        note: item.note || item.explanation || item.noteNp || item.noteEn || "",
      };
    });
  };

  // Plain Text / Multi-format parser for pasted text
  const parseRawTextQuestions = (text: string): Question[] => {
    const trimmed = text.trim();
    if (!trimmed) return [];

    // 1. Try JSON
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const parsed = parseJSON(trimmed.startsWith("{") ? `[${trimmed}]` : trimmed);
        if (parsed.length > 0) return parsed;
      } catch {}
    }

    // 2. Try CSV if comma separated or contains standard CSV header
    const firstLine = trimmed.split(/\r?\n/)[0].toLowerCase();
    if (
      firstLine.includes("optiona") || 
      firstLine.includes("texten") || 
      firstLine.includes("textnp") || 
      (firstLine.includes(",") && firstLine.split(",").length >= 4)
    ) {
      try {
        const parsed = parseCSV(trimmed);
        if (parsed.length > 0) return parsed;
      } catch {}
    }

    // 3. Parse formatted text blocks (Loksewa questions format)
    const lines = trimmed.split(/\r?\n/);
    const blocks: string[][] = [];
    let currentBlock: string[] = [];

    const isQuestionStart = (line: string) => {
      return /^(\d+[\.\)]|Q\s*\d+[\.\:\)]|प्रश्न\s*\d+[\.\:\)]|\#\s*\d+)/i.test(line.trim());
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        if (currentBlock.length > 0) {
          blocks.push(currentBlock);
          currentBlock = [];
        }
        continue;
      }
      if (isQuestionStart(line) && currentBlock.length > 0) {
        blocks.push(currentBlock);
        currentBlock = [line];
      } else {
        currentBlock.push(line);
      }
    }
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }

    const parsedQuestions: Question[] = [];

    const optMap: Record<string, string> = {
      "a": "A", "1": "A", "क": "A",
      "b": "B", "2": "B", "ख": "B",
      "c": "C", "3": "C", "ग": "C",
      "d": "D", "4": "D", "घ": "D",
    };

    const optRegex = /^(\(?([A-Da-dक-घ1-4])[\.\)\:\-]\s*|\b([A-Da-d])\s*[\:\.\)]\s*)(.*)$/;
    const ansRegex = /^(Ans(?:wer)?|Correct(?:\s*Option)?|उत्तर|Correct)[\:\=\s]+([A-Da-dक-घ1-4])/i;
    const noteRegex = /^(Note|Explanation|व्याख्या|टिपोट|द्रष्टव्य)[\:\=\s]+(.*)/i;

    blocks.forEach((block, idx) => {
      let questionText = "";
      const options: { id: string; textEn: string; textNp: string }[] = [
        { id: "A", textEn: "", textNp: "" },
        { id: "B", textEn: "", textNp: "" },
        { id: "C", textEn: "", textNp: "" },
        { id: "D", textEn: "", textNp: "" },
      ];
      let correctOptionId = "A";
      let note = "";

      block.forEach((line) => {
        const cleanLine = line.trim();
        if (!cleanLine) return;

        const ansMatch = cleanLine.match(ansRegex);
        if (ansMatch) {
          const rawAns = ansMatch[2].toLowerCase();
          correctOptionId = optMap[rawAns] || rawAns.toUpperCase() || "A";
          return;
        }

        const noteMatch = cleanLine.match(noteRegex);
        if (noteMatch) {
          note = (noteMatch[2] || "").trim();
          return;
        }

        const optMatch = cleanLine.match(optRegex);
        if (optMatch) {
          const rawLetter = (optMatch[2] || optMatch[3] || "").toLowerCase();
          const letter = optMap[rawLetter] || rawLetter.toUpperCase();
          const content = (optMatch[4] || "").trim();
          const targetOpt = options.find((o) => o.id === letter);
          if (targetOpt) {
            const isNepali = /[\u0900-\u097F]/.test(content);
            if (isNepali) {
              targetOpt.textNp = content;
            } else {
              targetOpt.textEn = content;
            }
          }
          return;
        }

        // Stem text line
        const cleanStem = cleanLine.replace(/^(\d+[\.\)]|Q\s*\d+[\.\:\)]|प्रश्न\s*\d+[\.\:\)]|\#\s*\d+)\s*/i, "");
        if (questionText) {
          questionText += "\n" + cleanStem;
        } else {
          questionText = cleanStem;
        }
      });

      if (questionText.trim()) {
        const isNepaliStem = /[\u0900-\u097F]/.test(questionText);
        parsedQuestions.push({
          id: `temp-${Date.now()}-${idx}`,
          difficulty: "Easy",
          subject: (metadata.category || "GENERAL").toUpperCase(),
          textNp: isNepaliStem ? questionText : "",
          textEn: isNepaliStem ? "" : questionText,
          options,
          correctOptionId: ["A", "B", "C", "D"].includes(correctOptionId) ? correctOptionId : "A",
          note: note.trim(),
        });
      }
    });

    return parsedQuestions;
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
          imported = parseRawTextQuestions(text);
        }

        if (imported.length === 0) {
          showToast("No valid questions found in file.", "error");
          return;
        }

        let maxId = questions.reduce((max, q) => Math.max(max, parseInt(q.id) || 0), 0);
        const mapped = imported.map((q) => {
          maxId++;
          return {
            ...q,
            id: maxId.toString(),
          };
        });

        setQuestions([...questions, ...mapped]);
        setActiveQuestion(mapped[0].id);
        showToast(`Successfully imported ${mapped.length} questions from file!`, "success");
      } catch (err: any) {
        showToast(`Parsing error: ${err.message || err}`, "error");
      }
    };
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (!pastedText.trim()) {
      showToast("Please paste question JSON or text before importing.", "error");
      return;
    }
    try {
      const imported = parseRawTextQuestions(pastedText);
      if (imported.length === 0) {
        showToast("Could not parse questions. Please check the JSON format.", "error");
        return;
      }

      let maxId = questions.reduce((max, q) => Math.max(max, parseInt(q.id) || 0), 0);
      const mapped = imported.map((q) => {
        maxId++;
        return {
          ...q,
          id: maxId.toString(),
        };
      });

      setQuestions([...questions, ...mapped]);
      setActiveQuestion(mapped[0].id);
      setPastedText("");
      showToast(`Successfully imported ${mapped.length} questions!`, "success");
    } catch (err: any) {
      showToast(`Parsing error: ${err.message || err}`, "error");
    }
  };

  // Sample JSON format matching Loksewa
  const sampleJsonData = [
    {
      subject: metadata.category || "GENERAL",
      difficulty: "Easy",
      textNp: "नेपालको संविधान कहिले जारी भएको हो?",
      textEn: "When was the Constitution of Nepal promulgated?",
      options: [
        { id: "A", textNp: "२०७२ असोज ३", textEn: "2072 Ashoj 3" },
        { id: "B", textNp: "२०७२ असोज ४", textEn: "2072 Ashoj 4" },
        { id: "C", textNp: "२०७२ असोज ५", textEn: "2072 Ashoj 5" },
        { id: "D", textNp: "२०७२ असोज ६", textEn: "2072 Ashoj 6" }
      ],
      correctOptionId: "A",
      note: "नेपालको संविधान २०७२ साल असोज ३ गते राष्ट्रपति डा. रामवरण यादवद्वारा जारी गरिएको हो। यसमा ३५ भाग, ३०८ धारा र ९ अनुसूचीहरू रहेका छन्।"
    },
    {
      subject: metadata.category || "GENERAL",
      difficulty: "Medium",
      textNp: "नेपालको सबैभन्दा ठूलो ताल कुन हो?",
      textEn: "Which is the largest lake in Nepal?",
      options: [
        { id: "A", textNp: "रारा ताल", textEn: "Rara Lake" },
        { id: "B", textNp: "फेवा ताल", textEn: "Phewa Lake" },
        { id: "C", textNp: "से-फोक्सुण्डो ताल", textEn: "Shey-Phoksundo Lake" },
        { id: "D", textNp: "बेग्नास ताल", textEn: "Begnas Lake" }
      ],
      correctOptionId: "A",
      note: "रारा ताल नेपालको सबैभन्दा ठूलो ताल हो। यो मुगु जिल्लामा अवस्थित छ। यसको लम्बाई करिब ५.१ कि.मी. र चौडाई २.७ कि.मी. रहेको छ।"
    }
  ];

  const loadSampleJson = () => {
    setPastedText(JSON.stringify(sampleJsonData, null, 2));
    showToast("Sample JSON loaded into editor", "success");
  };

  const handleFormatJson = () => {
    if (!pastedText.trim()) return;
    try {
      const parsed = JSON.parse(pastedText);
      setPastedText(JSON.stringify(parsed, null, 2));
      showToast("JSON formatted cleanly", "success");
    } catch {
      showToast("Invalid JSON syntax. Cannot format.", "error");
    }
  };

  const downloadJSONTemplate = () => {
    const blob = new Blob([JSON.stringify(sampleJsonData, null, 2)], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "loksewa_questions_template.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSVTemplate = () => {
    const headers = "Subject,Difficulty,TextNp,TextEn,OptionA_En,OptionA_Np,OptionB_En,OptionB_Np,OptionC_En,OptionC_Np,OptionD_En,OptionD_Np,CorrectOptionId,Note\n";
    const row = "GENERAL,Easy,नेपालको संविधान कहिले जारी भएको हो?,When was the Constitution of Nepal promulgated?,2072 Ashoj 3,२०७२ असोज ३,2072 Ashoj 4,२०७२ असोज ४,2072 Ashoj 5,२०७२ असोज ५,2072 Ashoj 6,२०७२ असोज ६,A,नेपालको संविधान २०७२ असोज ३ गते जारी भएको हो।\n";
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "loksewa_questions_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleValidate = () => {
    if (questions.length === 0) {
      showToast("No questions to validate. Please add or import questions.", "error");
      return;
    }
    const errors: string[] = [];
    questions.forEach((q, idx) => {
      const num = idx + 1;
      if (!q.textNp.trim() && !q.textEn.trim()) {
        errors.push(`Q${num}: Question stem is missing.`);
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
      showToast(`Validation: ${errors[0]}`, "error");
    } else {
      showToast("All validation checks passed successfully!", "success");
    }
  };

  const saveSetToDb = async (status: "Draft" | "Published") => {
    if (!metadata.title.trim()) {
      showToast("Please enter an Exam Title.", "error");
      setIsEditingMetadata(true);
      return;
    }
    if (!metadata.category.trim()) {
      showToast("Please select or enter a Subject Category.", "error");
      setIsEditingMetadata(true);
      return;
    }

    try {
      setIsSaving(true);
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
        setIsSaving(false);
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
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => {
    saveSetToDb("Draft");
  };

  const handlePublish = () => {
    if (questions.length === 0) {
      showToast("Cannot publish an empty model set. Please add questions first.", "error");
      return;
    }
    const invalid = questions.some(
      (q) => (!q.textNp.trim() && !q.textEn.trim()) || q.options.some((o) => !o.textEn.trim() && !o.textNp.trim())
    );
    if (invalid) {
      showToast("Cannot publish. Some questions have empty text or options.", "error");
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
    <div className="flex h-screen overflow-hidden bg-[#0f1117] text-white">
      {/* Toast Alert */}
      {toast.type && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border shadow-2xl flex items-center gap-2 max-w-md text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 ${
          toast.type === "success" 
            ? "bg-[#0d9488]/30 border-[#0d9488] text-[#5eead4]" 
            : "bg-[#ef4444]/30 border-[#ef4444] text-[#fca5a5]"
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Center Pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Link 
              href="/model-sets" 
              className="flex items-center justify-center size-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9ca3af] hover:text-white transition-all transform active:scale-95 border border-white/[0.06]"
              title="Back to Model Sets"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-white tracking-wide truncate max-w-[280px]">
                  {metadata.title || (setId ? "Edit Model Set" : "Create New Model Set")}
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  setId ? "bg-[#534AB7]/20 text-[#a78bfa] border border-[#534AB7]/40" : "bg-[#0d9488]/20 text-[#5eead4] border border-[#0d9488]/40"
                }`}>
                  {setId ? "Edit Mode" : "New Set"}
                </span>
              </div>
              <span className="text-[10px] text-[#6b7280]">
                {metadata.category ? `Subject: ${metadata.category}` : "Define metadata and questions below"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border transform active:scale-95 ${
                showLivePreview 
                  ? "bg-[#534AB7]/25 border-[#534AB7] text-[#c4b5fd] shadow-md shadow-[#534AB7]/20" 
                  : "bg-white/[0.04] border-white/[0.08] text-[#9ca3af] hover:text-white hover:bg-white/[0.08]"
              }`}
              title={showLivePreview ? "Close Mobile Preview" : "Open Mobile Preview"}
            >
              <span className="material-symbols-outlined text-[15px]">smartphone</span>
              Preview
            </button>

            <div className="h-5 w-[1px] bg-white/10 mx-1"></div>

            <Link 
              href="/model-sets" 
              className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
            >
              Cancel
            </Link>

            <button 
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.06] border border-white/[0.1] hover:border-[#534AB7]/50 text-[#d1d5db] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-white/[0.1] transform active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[15px]">save</span>
              {setId ? "Save Changes" : "Save Draft"}
            </button>

            <button 
              type="button"
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#534AB7]/25 hover:shadow-[#534AB7]/45 hover:from-[#6358d4] hover:to-[#756cf0] transition-all transform active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[15px]">rocket_launch</span>
              {setId ? "Update & Publish" : "Publish Set"}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-6xl mx-auto w-full pb-16">
          {/* Metadata Card */}
          <div className="bg-[#141721] rounded-xl p-5 mb-6 border border-white/[0.06] shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#a78bfa]">tune</span>
                <h2 className="text-[14px] font-bold text-white">Exam Information & Marking Rules</h2>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditingMetadata(!isEditingMetadata)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  isEditingMetadata 
                    ? "bg-[#534AB7] border-[#6358d4] text-white shadow-sm" 
                    : "bg-white/[0.04] border-white/[0.08] text-[#9ca3af] hover:text-white hover:bg-white/[0.08]"
                }`}
                title="Edit Exam Parameters"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isEditingMetadata ? "expand_less" : "edit"}
                </span>
                {isEditingMetadata ? "Collapse" : "Edit Details"}
              </button>
            </div>
            
            {isEditingMetadata ? (
              <div className="border-t border-white/[0.06] pt-4 mt-3 animate-in fade-in duration-150">
                <ExamMetadataForm metadata={metadata} setMetadata={setMetadata} />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-[#10131a] p-3 rounded-lg border border-white/[0.04]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280] block mb-1">Subject Category</span>
                  <span className="text-[12px] font-semibold text-white truncate block">
                    {metadata.category || <span className="text-[#6b7280] italic">Not Selected</span>}
                  </span>
                </div>
                <div className="bg-[#10131a] p-3 rounded-lg border border-white/[0.04]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280] block mb-1">Duration</span>
                  <span className="text-[12px] font-semibold text-white block">
                    {metadata.duration} Minutes
                  </span>
                </div>
                <div className="bg-[#10131a] p-3 rounded-lg border border-white/[0.04]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280] block mb-1">Marking (Correct)</span>
                  <span className="text-[12px] font-bold text-[#4ade80] block">
                    +{metadata.marking.positive} marks
                  </span>
                </div>
                <div className="bg-[#10131a] p-3 rounded-lg border border-white/[0.04]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280] block mb-1">Marking (Negative)</span>
                  <span className="text-[12px] font-bold text-[#f87171] block">
                    -{metadata.marking.negative} marks
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Question Pipeline Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#a78bfa]">format_list_numbered</span>
                <h2 className="text-[14px] font-bold text-white">Question Pipeline</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1e222d] text-[10px] font-bold text-[#a78bfa] border border-white/[0.08]">
                  {questions.length} {questions.length === 1 ? "Question" : "Questions"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handleAppendQuestion}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-[#534AB7]/20 hover:bg-[#534AB7]/35 border border-[#534AB7]/40 text-[#c4b5fd] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  Add Question
                </button>
              </div>
            </div>

            {questions.length === 0 ? (
              <div className="bg-[#141721] border-2 border-dashed border-white/[0.08] rounded-xl p-10 flex flex-col items-center justify-center text-center">
                <div className="size-14 rounded-2xl bg-[#534AB7]/10 border border-[#534AB7]/20 flex items-center justify-center text-[#a78bfa] mb-4">
                  <span className="material-symbols-outlined text-[28px]">quiz</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">No Questions in Pipeline</h3>
                <p className="text-[12px] text-[#9ca3af] max-w-md mb-6 leading-relaxed">
                  Start building your model set by creating a question or importing your question bank using JSON below.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAppendQuestion}
                    className="flex items-center gap-2 px-4 py-2 bg-[#534AB7] hover:bg-[#6358d4] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#534AB7]/20"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    Create Single Question
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImportTab("paste");
                      loadSampleJson();
                      const element = document.getElementById("importer-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-[#d1d5db] hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">data_object</span>
                    Load JSON Sample
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {questions.map((q, index) => {
                  const isEditing = editingQuestion === q.id;
                  const isActive = activeQuestion === q.id;
                  const diffColor =
                    q.difficulty === "Easy"
                      ? "text-[#4ade80] bg-[#22c55e]/10 border-[#22c55e]/30"
                      : q.difficulty === "Medium"
                      ? "text-[#fbbf24] bg-[#d97706]/10 border-[#d97706]/30"
                      : "text-[#f87171] bg-[#ef4444]/10 border-[#ef4444]/30";

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
                        <div className="rounded-xl overflow-hidden shadow-2xl">
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
                          className={`bg-[#141721] rounded-xl p-4 border cursor-pointer transition-all group ${
                            isActive 
                              ? "border-[#534AB7]/70 shadow-[0_0_16px_rgba(83,74,183,0.15)] ring-1 ring-[#534AB7]/40" 
                              : "border-white/[0.05] hover:border-white/[0.12] hover:bg-[#161a26]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              {/* Drag handle */}
                              <span 
                                className="material-symbols-outlined text-[#3f4451] group-hover:text-[#a78bfa] cursor-grab active:cursor-grabbing text-[18px] mt-1 select-none transition-colors"
                                title="Drag to reorder"
                              >
                                drag_indicator
                              </span>

                              {/* Q Number */}
                              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[11px] font-bold text-[#a78bfa] shrink-0 mt-0.5">
                                Q{(index + 1).toString().padStart(2, "0")}
                              </span>

                              {/* Question Content */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${diffColor}`}>
                                    {q.difficulty || "Easy"}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/[0.04] text-[#9ca3af] border border-white/[0.06]">
                                    {q.subject || "GENERAL"}
                                  </span>
                                  <span className="text-[10px] text-[#6b7280]">
                                    Ans: <span className="text-[#a78bfa] font-bold">{q.correctOptionId}</span>
                                  </span>
                                </div>

                                <p className="text-[13.5px] font-semibold text-white leading-relaxed mb-1 font-[Mukta]">
                                  {q.textNp || <span className="text-[#3f4451] italic text-[11px]">नेपालीमा प्रश्न थपिएको छैन</span>}
                                </p>
                                {q.textEn && (
                                  <p className="text-[11px] text-[#9ca3af] leading-relaxed italic mb-2">
                                    {q.textEn}
                                  </p>
                                )}

                                {/* Option Badges */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
                                  {q.options.map((opt) => {
                                    const isCorrect = q.correctOptionId === opt.id;
                                    return (
                                      <div
                                        key={opt.id}
                                        className={`px-2.5 py-1 rounded text-[11px] truncate flex items-center gap-1.5 border ${
                                          isCorrect
                                            ? "bg-[#534AB7]/20 border-[#534AB7]/60 text-[#c4b5fd] font-medium"
                                            : "bg-[#10131a] border-white/[0.04] text-[#9ca3af]"
                                        }`}
                                      >
                                        <span className={`font-bold text-[10px] ${isCorrect ? "text-[#a78bfa]" : "text-[#6b7280]"}`}>
                                          {opt.id}.
                                        </span>
                                        <span className="truncate font-[Mukta] text-[12px]">
                                          {opt.textNp || opt.textEn || "..."}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Answer Note Badge */}
                                {q.note && (
                                  <div className="mt-2.5 flex items-start gap-1.5 px-2.5 py-1.5 bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded-lg">
                                    <span className="material-symbols-outlined text-[12px] text-[#fbbf24] shrink-0 mt-0.5">lightbulb</span>
                                    <p className="text-[10.5px] text-[#fcd34d] font-[Mukta] leading-relaxed line-clamp-2">{q.note}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveQuestion(q.id);
                                  setEditingQuestion(q.id);
                                }}
                                className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-all"
                                title="Edit Question"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteQuestion(q.id);
                                }}
                                className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                                title="Delete Question"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bulk Question Importer Section */}
          <div id="importer-section" className="bg-[#141721] rounded-xl p-5 border border-white/[0.06] shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px] text-[#a78bfa]">data_object</span>
                  <h3 className="text-[14px] font-bold text-white">Bulk Question Importer</h3>
                </div>
                <p className="text-[11px] text-[#9ca3af]">Import entire question sets instantly using JSON format or CSV.</p>
              </div>

              {/* Importer Segmented Tabs */}
              <div className="flex bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setImportTab("paste")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all ${
                    importTab === "paste"
                      ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                      : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">code</span>
                  Paste JSON / Text
                </button>
                <button
                  type="button"
                  onClick={() => setImportTab("file")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all ${
                    importTab === "file"
                      ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                      : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">upload_file</span>
                  Upload File
                </button>
              </div>
            </div>

            {importTab === "paste" ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-[#9ca3af] font-medium">
                    Paste your JSON array of questions below:
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={loadSampleJson}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd] hover:text-white hover:bg-[#534AB7]/30 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                      Load JSON Sample
                    </button>
                    <button
                      type="button"
                      onClick={handleFormatJson}
                      disabled={!pastedText.trim()}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] hover:text-white disabled:opacity-40 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">format_align_left</span>
                      Beautify
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={`[\n  {\n    "subject": "GENERAL",\n    "difficulty": "Easy",\n    "textNp": "नेपालको संविधान कहिले जारी भएको हो?",\n    "textEn": "When was the Constitution of Nepal promulgated?",\n    "options": [\n      { "id": "A", "textNp": "२०७२ असोज ३", "textEn": "2072 Ashoj 3" },\n      { "id": "B", "textNp": "२०७२ असोज ४", "textEn": "2072 Ashoj 4" },\n      { "id": "C", "textNp": "२०७२ असोज ५", "textEn": "2072 Ashoj 5" },\n      { "id": "D", "textNp": "२०७२ असोज ६", "textEn": "2072 Ashoj 6" }\n    ],\n    "correctOptionId": "A"\n  }\n]`}
                    className="w-full h-52 bg-[#0d0f15] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/40 rounded-xl p-3.5 text-[12px] text-white font-mono leading-relaxed placeholder:text-[#3f4451] focus:outline-none resize-y transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setPastedText("")}
                    disabled={!pastedText}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6b7280] hover:text-white disabled:opacity-30 transition-colors"
                  >
                    Clear Editor
                  </button>
                  
                  <button
                    type="button"
                    onClick={handlePasteImport}
                    className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#534AB7]/25 transform active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px]">input</span>
                    Parse & Import Questions
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]); }}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragging 
                      ? "border-[#534AB7] bg-[#534AB7]/10" 
                      : "border-white/[0.08] hover:border-[#534AB7]/50 hover:bg-white/[0.02]"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json,.csv,.txt"
                    onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }}
                  />
                  <div className="size-12 rounded-xl bg-[#534AB7]/15 flex items-center justify-center text-[#a78bfa] mb-3">
                    <span className="material-symbols-outlined text-[26px]">upload_file</span>
                  </div>
                  <p className="text-[13px] text-white font-semibold mb-1">Click to browse or drag & drop file here</p>
                  <p className="text-[11px] text-[#6b7280]">Accepts JSON, CSV, and formatted Text (up to 10MB)</p>
                </div>
                
                <div className="flex flex-wrap justify-between items-center gap-2 mt-4 pt-3 border-t border-white/[0.04]">
                  <span className="text-[11px] text-[#6b7280]">Download standard templates:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={downloadJSONTemplate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#534AB7]/15 border border-[#534AB7]/30 text-[10px] font-bold text-[#c4b5fd] hover:text-white hover:bg-[#534AB7]/25 transition-all"
                    >
                      <span className="material-symbols-outlined text-[13px]">download</span>
                      JSON Template (Recommended)
                    </button>
                    <button 
                      type="button"
                      onClick={downloadCSVTemplate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      <span className="material-symbols-outlined text-[13px]">download</span>
                      CSV Template
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Pane: Live Preview & Calculations */}
      {showLivePreview && (
        <div className="w-[300px] bg-[#141721] border-l border-white/[0.08] flex flex-col h-full overflow-hidden shrink-0 animate-in fade-in slide-in-from-right duration-200">
          <div className="h-16 border-b border-white/[0.08] px-5 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#a78bfa]">phone_iphone</span>
              <h3 className="text-[12px] font-bold text-white uppercase tracking-wider">Live Preview</h3>
            </div>
            <button 
              type="button"
              onClick={() => setShowLivePreview(false)}
              className="p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Close Preview"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-5">
            {/* Phone Frame Mockup */}
            <div className="bg-[#0d0f15] rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
              <div className="px-3.5 pt-3 pb-2 flex items-center justify-between border-b border-white/[0.04]">
                <span className="text-[10px] font-bold text-[#a78bfa]">
                  Q{activeQIndex !== -1 ? (activeQIndex + 1).toString().padStart(2, "0") : "01"} / {questions.length.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] font-bold text-[#f87171]">{metadata.duration}:00</span>
              </div>

              <div className="p-3.5">
                {activeQ ? (
                  <>
                    <p className="text-[13px] font-semibold text-white leading-relaxed font-[Mukta] mb-1">
                      {activeQ.textNp || <span className="text-[#3f4451] italic">नेपालीमा प्रश्न राखिएको छैन</span>}
                    </p>
                    {activeQ.textEn && (
                      <p className="text-[10px] text-[#9ca3af] leading-relaxed italic mb-3">
                        {activeQ.textEn}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[11px] text-[#6b7280] italic py-4 text-center">No question added yet.</p>
                )}

                <div className="flex flex-col gap-1.5 mt-2">
                  {(activeQ?.options || []).map((opt) => {
                    const isCorrect = activeQ.correctOptionId === opt.id;
                    return (
                      <div 
                        key={opt.id} 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] font-medium transition-all ${
                          isCorrect 
                            ? "bg-[#534AB7]/25 border-[#534AB7] text-[#c4b5fd] shadow-sm" 
                            : "bg-[#141721] border-white/[0.06] text-[#9ca3af]"
                        }`}
                      >
                        <span className="font-bold text-[10px]">{opt.id}</span>
                        <div className="flex-1 flex flex-col">
                          <span className="font-[Mukta] text-[12px]">{opt.textNp || "..."}</span>
                          {opt.textEn && <span className="text-[9px] opacity-75">{opt.textEn}</span>}
                        </div>
                        {isCorrect && (
                          <span className="material-symbols-outlined text-[14px] text-[#a78bfa]">check</span>
                        )}
                      </div>
                    );
                  })}

                  {/* Answer Note in Live Preview */}
                  {activeQ?.note && (
                    <div className="mt-2 flex items-start gap-1.5 p-2.5 bg-[#fbbf24]/8 border border-[#fbbf24]/25 rounded-lg">
                      <span className="material-symbols-outlined text-[13px] text-[#fbbf24] shrink-0 mt-0.5">lightbulb</span>
                      <p className="text-[10px] text-[#fcd34d] font-[Mukta] leading-relaxed">{activeQ.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calculations Card */}
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-2.5">Score Estimates</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#0d9488]/10 border border-[#0d9488]/25 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#4ade80] mb-0.5">Max Score</span>
                  <span className="text-[18px] font-bold text-[#4ade80]">+{maxScore.toFixed(1)}</span>
                </div>
                <div className="bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#f87171] mb-0.5">Min Score</span>
                  <span className="text-[18px] font-bold text-[#f87171]">-{Math.abs(minScore).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Configurations */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-white/[0.06]">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Exam Features</h4>
              <div className="flex flex-col gap-2 bg-[#10131a] p-3 rounded-xl border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#d1d5db] font-medium">Option Shuffling</span>
                  <div 
                    onClick={() => setOptionShuffling(!optionShuffling)}
                    className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${optionShuffling ? "bg-[#534AB7]" : "bg-white/[0.1]"}`}
                  >
                    <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${optionShuffling ? "right-0.5" : "left-0.5"}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#d1d5db] font-medium">Anti-Cheat Mode</span>
                  <div 
                    onClick={() => setAntiCheat(!antiCheat)}
                    className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${antiCheat ? "bg-[#534AB7]" : "bg-white/[0.1]"}`}
                  >
                    <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${antiCheat ? "right-0.5" : "left-0.5"}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#d1d5db] font-medium">Immediate Results</span>
                  <div 
                    onClick={() => setImmediateResults(!immediateResults)}
                    className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${immediateResults ? "bg-[#534AB7]" : "bg-white/[0.1]"}`}
                  >
                    <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${immediateResults ? "right-0.5" : "left-0.5"}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleValidate}
              className="w-full py-2.5 bg-[#10131a] hover:bg-[#181c26] border border-white/[0.08] text-[10px] font-bold uppercase tracking-[0.1em] text-[#9ca3af] hover:text-white rounded-xl transition-all mt-auto"
            >
              Validate All Questions
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
