"use client";

import { useState } from "react";
import { MarkingLogic } from "@/types/exam";

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
  const PRESET_CATEGORIES = [
    "General Knowledge",
    "IQ & Logical Reasoning",
    "Nepali Language",
    "English Language",
    "Constitution & Law",
    "Public Administration",
    "Banking & Finance",
    "Computer & IT",
    "Health & Medicine",
    "Engineering & Tech",
  ];

  const isCustomCategory =
    Boolean(metadata.category) && !PRESET_CATEGORIES.includes(metadata.category);

  const [customMode, setCustomMode] = useState<boolean>(isCustomCategory);

  const handleChange = (field: string, value: any) => {
    setMetadata({ ...metadata, [field]: value });
  };

  const handleCategorySelect = (value: string) => {
    if (value === "__custom__") {
      setCustomMode(true);
      handleChange("category", "");
    } else {
      setCustomMode(false);
      handleChange("category", value);
    }
  };

  const handleMarkingChange = (field: keyof MarkingLogic, value: string) => {
    setMetadata({
      ...metadata,
      marking: { ...metadata.marking, [field]: parseFloat(value) || 0 },
    });
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-on-surface font-headline">
          Exam Information
        </h2>
        <p className="text-on-surface-variant text-sm font-body">
          Define the core parameters and marking logic for this set.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6 rounded-xl bg-surface border border-outline-variant/10 shadow-sm">
        {/* Title */}
        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Exam Title
          </label>
          <input
            type="text"
            className="input-editorial text-sm-plus font-medium"
            placeholder="e.g. Kharidar Mock Test 2024 - Set A"
            value={metadata.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Subject Category
            </label>
            <button
              type="button"
              onClick={() => {
                setCustomMode(!customMode);
                if (!customMode) {
                  handleChange("category", "");
                } else {
                  handleChange("category", PRESET_CATEGORIES[0]);
                }
              }}
              className="text-[9px] font-bold text-[#a78bfa] hover:text-white transition-colors"
            >
              {customMode ? "← Choose from presets" : "+ Custom Category"}
            </button>
          </div>

          {customMode ? (
            <div className="relative">
              <input
                type="text"
                className="input-editorial w-full text-sm-plus font-medium"
                placeholder="Enter custom category name (e.g. Nayab Subba, Forestry, etc.)..."
                value={metadata.category}
                onChange={(e) => handleChange("category", e.target.value)}
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase text-[#a78bfa] bg-[#534AB7]/10 px-2 py-0.5 rounded">
                Custom
              </span>
            </div>
          ) : (
            <div className="relative">
              <select
                className="input-editorial text-sm-plus font-medium appearance-none bg-transparent w-full"
                value={metadata.category}
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value="">Select subject...</option>
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__custom__">+ Add Custom Category...</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none opacity-50">
                unfold_more
              </span>
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Duration (Minutes)
          </label>
          <div className="relative">
            <input
              type="number"
              className="input-editorial w-full text-sm-plus font-medium"
              placeholder="60"
              value={metadata.duration}
              onChange={(e) => handleChange("duration", parseInt(e.target.value) || 0)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant uppercase">
              Min
            </span>
          </div>
        </div>

        {/* Marking Logic */}
        <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Marks per Correct Answer
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.25"
                className="input-editorial flex-1 text-sm-plus font-medium border-success/30 focus:border-success/50 focus:ring-success/10"
                placeholder="+2.0"
                value={metadata.marking.positive}
                onChange={(e) => handleMarkingChange("positive", e.target.value)}
              />
              <span className="size-8 rounded-lg bg-success/10 text-success flex items-center justify-center">
                <span className="material-symbols-outlined text-base">add</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Negative Mark Penalty
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.05"
                className="input-editorial flex-1 text-sm-plus font-medium border-error/30 focus:border-error/50 focus:ring-error/10"
                placeholder="-0.25"
                value={metadata.marking.negative}
                onChange={(e) => handleMarkingChange("negative", e.target.value)}
              />
              <span className="size-8 rounded-lg bg-error/10 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-base">remove</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
