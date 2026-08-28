"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";

function MainContent({ children }: { children: ReactNode }) {
  const { isCollapsed, isMobileOpen, toggleMobileSidebar, closeMobileSidebar } = useSidebar();
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full min-w-0">
      {/* Mobile Top App Bar (Visible on screens < md) */}
      <header className="md:hidden h-14 bg-[#141721] border-b border-white/[0.08] flex items-center justify-between px-4 sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white bg-white/[0.04] border border-white/[0.06] transition-colors"
            title="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMobileOpen ? "close" : "menu"}
            </span>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </div>
            <span className="text-[13px] font-bold text-white tracking-tight">Play Loksewa</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white bg-white/[0.04] border border-white/[0.06]"
            title="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[16px]">
              {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <Link
            href="/practice"
            className="px-2.5 py-1 rounded-lg bg-[#534AB7] text-white text-[10.5px] font-bold uppercase tracking-wider"
          >
            Quiz
          </Link>
        </div>
      </header>

      {/* Main Page Area */}
      <main
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:ml-[68px]" : "md:ml-[230px]"
        }`}
      >
        {children}
      </main>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 md:hidden transition-opacity animate-in fade-in"
        />
      )}
    </div>
  );
}

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0f1117] text-[#e1e3e9] w-full overflow-x-hidden">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
