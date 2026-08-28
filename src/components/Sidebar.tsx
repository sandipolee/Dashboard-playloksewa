"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setUserEmail(data.user.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const sections = [
    {
      title: "LEARN & PLAY",
      items: [
        { name: "Practice & Mock Tests", icon: "sports_esports", path: "/practice" },
      ],
    },
    {
      title: "ADMIN CONTENT",
      items: [
        { name: "Overview", icon: "grid_view", path: "/" },
        { name: "Exam Sets", icon: "assignment", path: "/model-sets" },
        { name: "Question Bank", icon: "quiz", path: "/questions" },
      ],
    },
    {
      title: "PEOPLE & REVENUE",
      items: [
        { name: "Candidates", icon: "group", path: "/users" },
        { name: "Subscriptions", icon: "credit_card", path: "/revenue" },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Settings", icon: "settings", path: "/settings" },
      ],
    },
  ];

  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "A";
  const userDisplayName = userEmail ? userEmail.split("@")[0] : "Admin";

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#11141d] border-r border-white/[0.08] flex flex-col z-40 select-none transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[68px]" : "w-[230px]"
      }`}
    >
      {/* Header / Brand */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-white/[0.06] shrink-0">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] flex items-center justify-center shadow-md shadow-[#534AB7]/30 shrink-0">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              rocket_launch
            </span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h1 className="text-[13px] font-bold text-white leading-tight tracking-tight truncate">
                Play Loksewa
              </h1>
              <p className="text-[9.5px] text-[#6b7280] font-medium tracking-wide">
                Practice & Exam Arena
              </p>
            </div>
          )}
        </Link>

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className={`size-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9ca3af] hover:text-white flex items-center justify-center transition-all border border-white/[0.06] shrink-0 ${
            isCollapsed ? "mx-auto" : ""
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-2.5 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            {!isCollapsed ? (
              <h3 className="px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#6b7280]/60 mb-1">
                {section.title}
              </h3>
            ) : (
              <div className="h-[1px] bg-white/[0.04] my-1 mx-2" />
            )}

            {section.items.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#534AB7]/20 text-[#c4b5fd] shadow-sm shadow-[#534AB7]/10 border border-[#534AB7]/40"
                      : "text-[#9ca3af] hover:text-white hover:bg-white/[0.05]"
                  } ${isCollapsed ? "justify-center px-0" : ""}`}
                >
                  {/* Left Accent indicator when active */}
                  {isActive && !isCollapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#7c75ff] rounded-r-full"></span>
                  )}

                  <span
                    className={`material-symbols-outlined text-[19px] shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#a78bfa]" : "text-[#8c909f] group-hover:text-white"
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed && <span className="truncate">{item.name}</span>}

                  {/* Tooltip in Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1e2b] text-white text-[11px] font-semibold rounded-lg shadow-xl border border-white/[0.1] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-white/[0.06] bg-[#0d0f15] shrink-0">
        <div className={`flex items-center gap-2.5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
              {userInitial}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white truncate leading-tight">
                  {userDisplayName}
                </p>
                <p className="text-[9px] text-[#6b7280] truncate mt-0.5">
                  {userEmail || "Active Session"}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors shrink-0"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden group-hover:flex"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ef4444]">logout</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
