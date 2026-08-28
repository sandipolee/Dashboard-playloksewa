"use client";

import { useState } from "react";
import Link from "next/link";

export default function GlobalSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [noticeText, setNoticeText] = useState(
    "लोकसेवा आयोगको खरिदार तथा नायब सुब्बाको नयाँ पाठ्यक्रम अनुसारका सम्पूर्ण मोडल सेटहरू उपलब्ध छन्।"
  );
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveNotice = () => {
    setToast("Global announcement notice updated successfully!");
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border border-[#0d9488] bg-[#0d9488]/30 text-[#5eead4] shadow-2xl flex items-center gap-2 max-w-md text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">System & App Configuration</h2>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-6xl mx-auto w-full pb-16 space-y-6">
        {/* Section 1: Mobile App Notice & Maintenance */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="material-symbols-outlined text-[20px] text-[#a78bfa]">campaign</span>
            <div>
              <h3 className="text-[14px] font-bold text-white">Global Mobile App Notice Banner</h3>
              <p className="text-[11px] text-[#6b7280]">Displayed at the top of the mobile app home screen for all students.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <textarea
              rows={3}
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl p-3.5 text-[13px] text-white font-[Mukta] leading-relaxed placeholder:text-[#3f4451] focus:outline-none transition-all"
              placeholder="Enter announcement text in Nepali or English..."
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#6b7280] italic">
                Changes take effect instantly on app reload.
              </span>
              <button
                type="button"
                onClick={handleSaveNotice}
                className="px-5 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#534AB7]/25 transition-all transform active:scale-95"
              >
                Save Announcement
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Service Maintenance & System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#fbbf24]">construction</span>
                  <h3 className="text-[14px] font-bold text-white">Maintenance Mode</h3>
                </div>
                <div
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
                    maintenanceMode ? "bg-[#ef4444]" : "bg-white/[0.1]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 size-5 bg-white rounded-full transition-all shadow-md ${
                      maintenanceMode ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                When enabled, student test submission is temporarily paused for backend updates while admin operations continue.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#6b7280]">Current State</span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                maintenanceMode ? "bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30" : "bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30"
              }`}>
                {maintenanceMode ? "Maintenance Active" : "Operational (Online)"}
              </span>
            </div>
          </div>

          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[20px] text-[#4ade80]">database</span>
                <h3 className="text-[14px] font-bold text-white">Supabase PostgreSQL Connection</h3>
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                Database synchronization is actively managed via Supabase with row-level security enabled.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#6b7280]">Database Status</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0d9488]/20 text-[#5eead4] border border-[#0d9488]/40">
                Connected & Ready
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Admin & Editors Team */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-white">Editorial Team & Role Permissions</h3>
              <p className="text-[11px] text-[#6b7280]">Users authorized to create questions and publish model sets.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {[
              { name: "Admin Lead", email: "admin@playloksewa.com", role: "Super Admin", access: "Full Control" },
              { name: "Kharidar Exam Curator", email: "editor.curator@playloksewa.com", role: "Content Editor", access: "Create / Edit Sets" },
              { name: "Question Reviewer", email: "reviewer.gk@playloksewa.com", role: "Content Reviewer", access: "Question Bank Only" },
            ].map((staff) => (
              <div
                key={staff.email}
                className="flex items-center justify-between p-3 rounded-xl bg-[#10131a] border border-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[#534AB7]/20 border border-[#534AB7]/40 text-[#c4b5fd] font-bold text-xs flex items-center justify-center">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-white">{staff.name}</p>
                    <p className="text-[10px] text-[#6b7280]">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#534AB7]/15 border border-[#534AB7]/30 text-[#c4b5fd]">
                    {staff.role}
                  </span>
                  <span className="text-[11px] text-[#9ca3af] hidden sm:block">
                    {staff.access}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
