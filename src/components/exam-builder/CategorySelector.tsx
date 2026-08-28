"use client";

import { useState, useRef, useEffect } from "react";

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
  categories: string[];
  loading?: boolean;
}

export default function CategorySelector({
  value,
  onChange,
  categories,
  loading = false,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase().trim())
  );

  const isExactMatch = categories.some(
    (cat) => cat.toLowerCase() === search.toLowerCase().trim()
  );

  const handleSelect = (category: string) => {
    onChange(category);
    setSearch("");
    setIsOpen(false);
  };

  const handleCreateNew = () => {
    if (search.trim()) {
      onChange(search.trim());
      setSearch("");
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#a78bfa]">category</span>
          Subject / Category <span className="text-[#ef4444]">*</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[9.5px] font-semibold text-[#6b7280] hover:text-[#ef4444] transition-colors flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-[12px]">close</span>
            Clear selection
          </button>
        )}
      </div>

      {/* Main Trigger Box */}
      <div className="relative">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className={`w-full bg-[#10131a] border rounded-xl px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all ${
            isOpen
              ? "border-[#534AB7] ring-2 ring-[#534AB7]/20 shadow-[0_0_15px_rgba(83,74,183,0.15)]"
              : "border-white/[0.08] hover:border-white/[0.16] hover:bg-[#131620]"
          }`}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {value ? (
              <div className="flex items-center gap-2 min-w-0">
                <span className="size-2 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] shrink-0"></span>
                <span className="text-[13px] font-semibold text-white truncate">{value}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd] shrink-0">
                  {categories.includes(value) ? "DB Category" : "Custom Category"}
                </span>
              </div>
            ) : (
              <span className="text-[13px] text-[#4b5262] font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#4b5262]">search</span>
                {loading ? "Loading categories from database..." : "Select existing or type new category..."}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span
              className={`material-symbols-outlined text-[18px] text-[#6b7280] transition-transform duration-200 ${
                isOpen ? "rotate-180 text-[#a78bfa]" : ""
              }`}
            >
              expand_more
            </span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#141722] border border-white/[0.1] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
            {/* Search / Create Input */}
            <div className="p-3 border-b border-white/[0.06] bg-[#10131a]">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[16px] text-[#6b7280]">
                  search
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (filteredCategories.length > 0) {
                        handleSelect(filteredCategories[0]);
                      } else if (search.trim()) {
                        handleCreateNew();
                      }
                    }
                  }}
                  placeholder="Search existing or type custom category..."
                  className="w-full bg-[#161a26] border border-white/[0.08] focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]/30 rounded-lg pl-9 pr-3 py-2 text-[12.5px] text-white placeholder:text-[#4b5262] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Dropdown Options List */}
            <div className="max-h-56 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
              {/* Create Custom Category Option if user typed something new */}
              {search.trim() && !isExactMatch && (
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#534AB7]/15 hover:bg-[#534AB7]/30 border border-[#534AB7]/40 text-left transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-md bg-[#534AB7] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#534AB7]/40">
                      <span className="material-symbols-outlined text-[15px]">add</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-white block">
                        Create "{search.trim()}"
                      </span>
                      <span className="text-[10px] text-[#a78bfa]">Use as new subject category</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#a78bfa] bg-[#534AB7]/30 px-2 py-0.5 rounded">
                    Press Enter
                  </span>
                </button>
              )}

              {/* Existing Database Categories */}
              {filteredCategories.length > 0 ? (
                <div>
                  <div className="px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#6b7280]">
                    Database Categories ({filteredCategories.length})
                  </div>
                  {filteredCategories.map((cat) => {
                    const isSelected = value === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleSelect(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                          isSelected
                            ? "bg-[#534AB7] text-white font-semibold shadow-md shadow-[#534AB7]/30"
                            : "hover:bg-white/[0.05] text-[#d1d5db] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[16px] ${
                              isSelected ? "text-white" : "text-[#6b7280]"
                            }`}
                          >
                            folder
                          </span>
                          <span className="text-[12.5px]">{cat}</span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] text-white">check</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                !search.trim() && (
                  <div className="py-6 px-4 text-center">
                    <span className="material-symbols-outlined text-[24px] text-[#4b5262] mb-1">
                      category
                    </span>
                    <p className="text-[11px] text-[#6b7280]">No categories in database yet.</p>
                    <p className="text-[10px] text-[#4b5262] mt-0.5">Type above to create your first category.</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Select Pill Badges from DB */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6b7280] mr-1">
            Quick Select:
          </span>
          {categories.map((cat) => {
            const isSelected = value === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                  isSelected
                    ? "bg-[#534AB7] border-[#6358d4] text-white shadow-sm shadow-[#534AB7]/30 font-semibold"
                    : "bg-[#10131a] border-white/[0.06] text-[#9ca3af] hover:text-white hover:border-white/[0.15] hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
