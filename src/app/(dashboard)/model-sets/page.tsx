"use client";

import Link from 'next/link';

export default function ModelSets() {
  return (
    <div className="p-8 flex-1 pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight mb-1">Model Sets Library</h2>
          <p className="text-sm font-body text-on-surface-variant">Manage and organize your examination content.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-xl">search</span>
            <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" placeholder="Search sets..." type="text" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-lg hover:bg-surface-container-highest transition-colors text-on-surface font-label text-sm font-semibold">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar">
        <button className="whitespace-nowrap px-5 py-2 rounded-full bg-primary-container text-on-primary-container font-label text-sm font-bold tracking-wide transition-colors">
          All Categories
        </button>
        <button className="whitespace-nowrap px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest font-label text-sm font-bold tracking-wide transition-colors border border-outline-variant/10">
          Section Officer
        </button>
        <button className="whitespace-nowrap px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest font-label text-sm font-bold tracking-wide transition-colors border border-outline-variant/10">
          Nayab Subba
        </button>
        <button className="whitespace-nowrap px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest font-label text-sm font-bold tracking-wide transition-colors border border-outline-variant/10">
          Kharidar
        </button>
        <button className="whitespace-nowrap px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest font-label text-sm font-bold tracking-wide transition-colors border border-outline-variant/10">
          Banking
        </button>
      </nav>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Set Card */}
        <Link href="/model-sets/create" className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-outline-variant/40 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-highest hover:border-primary/50 transition-all min-h-[280px] cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-surface-container-highest group-hover:bg-primary group-hover:scale-110 flex items-center justify-center transition-all duration-300 mb-4 shadow-lg shadow-black/20 group-hover:shadow-primary/20">
            <span className="material-symbols-outlined text-outline group-hover:text-on-primary text-3xl">add</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Create New Set</h3>
          <p className="font-body text-sm text-on-surface-variant text-center px-4">Design a new examination from scratch.</p>
        </Link>

        {/* Card 1 */}
        <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/15 hover:border-outline-variant/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all min-h-[280px] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-2.5 py-1 rounded text-[10px] font-label font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">Premium</span>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface leading-tight mb-2 relative z-10 group-hover:text-primary transition-colors">Section Officer Comp. Mock Test 1</h3>
          <p className="font-body text-xs text-on-surface-variant mb-6 line-clamp-2">Complete syllabus coverage including IQ, General Knowledge, and institutional structures.</p>
          <div className="mt-auto flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between font-body text-sm">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>90 Min</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                <span>100 Qs</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0bda5e] shadow-[0_0_8px_#0bda5e]"></span>
                <span className="font-label text-xs uppercase tracking-wider font-bold text-on-surface">Published</span>
              </div>
              <span className="font-label text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                Edit Set <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/15 hover:border-outline-variant/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all min-h-[280px] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-2.5 py-1 rounded text-[10px] font-label font-bold uppercase tracking-widest bg-surface-container-highest text-on-surface-variant border border-outline-variant/20">Free</span>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface leading-tight mb-2 relative z-10 group-hover:text-secondary transition-colors">Nayab Subba GK Diagnostic v2</h3>
          <p className="font-body text-xs text-on-surface-variant mb-6 line-clamp-2">Focused on Nepal geography, history, and recent current affairs (2080 BS).</p>
          <div className="mt-auto flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between font-body text-sm">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>45 Min</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                <span>50 Qs</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0bda5e] shadow-[0_0_8px_#0bda5e]"></span>
                <span className="font-label text-xs uppercase tracking-wider font-bold text-on-surface">Published</span>
              </div>
              <span className="font-label text-xs font-semibold text-on-surface-variant group-hover:text-secondary transition-colors flex items-center gap-1 cursor-pointer">
                Edit Set <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/15 hover:border-outline-variant/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all min-h-[280px] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-2.5 py-1 rounded text-[10px] font-label font-bold uppercase tracking-widest bg-tertiary/10 text-tertiary border border-tertiary/20">Banking</span>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface leading-tight mb-2 relative z-10 group-hover:text-tertiary transition-colors">RBB Assistant Layer 4 Base</h3>
          <p className="font-body text-xs text-on-surface-variant mb-6 line-clamp-2">First paper covering management, accounting basics, and banking acts.</p>
          <div className="mt-auto flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between font-body text-sm">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>45 Min</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                <span>50 Qs</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-label text-xs uppercase tracking-wider font-bold text-on-surface-variant">Draft</span>
              </div>
              <span className="font-label text-xs font-semibold text-on-surface-variant group-hover:text-tertiary transition-colors flex items-center gap-1 cursor-pointer">
                Continue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
