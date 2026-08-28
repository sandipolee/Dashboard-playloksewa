"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";

function MainContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        isCollapsed ? "ml-[68px]" : "ml-[230px]"
      }`}
    >
      {children}
    </main>
  );
}

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0f1117] text-[#e1e3e9]">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
