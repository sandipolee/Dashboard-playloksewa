"use client";

import { useState, useEffect } from "react";
import { MarkingLogic } from "@/types/exam";
import CategorySelector from "./CategorySelector";

interface ExamMetadataFormProps {
  metadata: {
    title: string;
    category: string;
    duration: number;
    marking: MarkingLogic;
  };
  setMetadata: (metadata: any) => void;
}

export default function ExamMetadataForm({ metadata, setMetadata }: ExamMetadataFormProps) {
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (res.ok && Array.isArray(json.data)) {
          setDbCategories(json.data);
        } else {
          setDbCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setDbCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (field: string, value: any) => {
    setMetadata({ ...metadata, [field]: value });
  };

  const handleMarkingChange = (field: keyof MarkingLogic, value: string) => {
    setMetadata({
      ...metadata,
      marking: { ...metadata.marking, [field]: parseFloat(value) || 0 },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Title */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#a78bfa]">edit_note</span>
          Exam Title <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="text"
          className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white placeholder:text-[#3f4451] focus:outline-none transition-all"
          placeholder="e.g. Kharidar First Paper Mock Test - Set 01"
          value={metadata.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Redesigned Category Selection */}
      <div className="col-span-1 md:col-span-2">
        <CategorySelector
          value={metadata.category}
          onChange={(cat) => handleChange("category", cat)}
          categories={dbCategories}
          loading={loadingCategories}
        />
      </div>

      {/* Duration */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#a78bfa]">schedule</span>
          Duration (Minutes)
        </label>
        <div className="relative">
          <input
            type="number"
            className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl pl-3.5 pr-12 py-2.5 text-[13px] font-medium text-white placeholder:text-[#3f4451] focus:outline-none transition-all"
            placeholder="45"
            value={metadata.duration}
            onChange={(e) => handleChange("duration", parseInt(e.target.value) || 0)}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#6b7280] uppercase">
            Min
          </span>
        </div>
      </div>

      {/* Marking Scheme */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
            Marks / Correct
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.25"
              className="w-full bg-[#10131a] border border-[#0d9488]/30 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/30 rounded-xl pl-3.5 pr-8 py-2.5 text-[13px] font-medium text-white focus:outline-none transition-all"
              placeholder="+2.0"
              value={metadata.marking.positive}
              onChange={(e) => handleMarkingChange("positive", e.target.value)}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 rounded bg-[#0d9488]/20 text-[#0d9488] flex items-center justify-center text-[12px] font-bold">
              +
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
            Negative Penalty
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.05"
              className="w-full bg-[#10131a] border border-[#ef4444]/30 focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]/30 rounded-xl pl-3.5 pr-8 py-2.5 text-[13px] font-medium text-white focus:outline-none transition-all"
              placeholder="-0.4"
              value={metadata.marking.negative}
              onChange={(e) => handleMarkingChange("negative", e.target.value)}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 rounded bg-[#ef4444]/20 text-[#f87171] flex items-center justify-center text-[12px] font-bold">
              -
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
