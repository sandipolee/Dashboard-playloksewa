"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
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
      title: "CONTENT",
      items: [
        { name: "Overview", icon: "grid_view", path: "/" },
        { name: "Exam Sets", icon: "description", path: "/model-sets" },
        { name: "Questions", icon: "quiz", path: "/questions" },
      ],
    },
    {
      title: "USERS",
      items: [
        { name: "Users", icon: "group", path: "/users" },
        { name: "Subscriptions", icon: "credit_card", path: "/revenue" },
      ],
    },
    {
      title: "MONITOR",
      items: [
        { name: "Live Sessions", icon: "sensors", path: "/live" },
        { name: "Analytics", icon: "insights", path: "/analytics" },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Settings", icon: "settings", path: "/settings" },
      ],
    },
  ];

  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "AU";
  const userDisplayName = userEmail ? userEmail.split("@")[0] : "Admin User";

  return (
    <aside className="fixed left-0 top-0 h-full w-[190px] bg-[#161922] flex flex-col py-4 px-2.5 border-r border-white/[0.06] z-40 select-none">
      {/* Brand */}
      <div className="flex items-center gap-2 px-2.5 mb-6">
        <div className="size-7 rounded-md bg-gradient-to-br from-[#534AB7] to-[#6C63FF] flex items-center justify-center shadow-md shadow-[#534AB7]/20">
          <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            rocket_launch
          </span>
        </div>
        <div>
          <h1 className="text-[12px] font-bold text-white leading-tight tracking-tight">Play Loksewa</h1>
          <p className="text-[9px] text-[#6b7280] font-medium">Admin Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-5">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-px">
            <h3 className="px-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]/50 mb-1">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const isActive =
                item.path !== "#" &&
                (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 px-2.5 py-[5px] rounded-md text-[11.5px] font-medium transition-all ${
                    isActive
                      ? "bg-[#534AB7]/10 text-[#a78bfa] border-l-[2.5px] border-[#534AB7] pl-[8px]"
                      : "text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile & Sign Out */}
      <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between px-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="size-6 rounded-full bg-[#534AB7] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
            {userInitial}
          </div>
          <div className="truncate">
            <p className="text-[10.5px] font-semibold text-white leading-tight truncate">{userDisplayName}</p>
            <p className="text-[8.5px] text-[#6b7280] truncate">{userEmail || "Active Session"}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="p-1 text-[#6b7280] hover:text-[#ef4444] rounded hover:bg-white/5 transition-colors shrink-0"
          title="Sign Out"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
        </button>
      </div>
    </aside>
  );
}
