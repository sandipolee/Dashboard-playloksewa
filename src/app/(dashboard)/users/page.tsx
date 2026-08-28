"use client";

import { useState } from "react";
import Link from "next/link";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Premium" | "Editor" | "Admin";
  examsTaken: number;
  avgScore: string;
  status: "Active" | "Inactive" | "Suspended";
  joinedAt: string;
}

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const sampleUsers: UserItem[] = [
    { id: "USR-101", name: "Aayush Pokharel", email: "aayush.pokharel@gmail.com", role: "Premium", examsTaken: 34, avgScore: "84.2%", status: "Active", joinedAt: "Jan 12, 2024" },
    { id: "USR-102", name: "Suman Shrestha", email: "suman.shrestha@outlook.com", role: "Student", examsTaken: 12, avgScore: "62.5%", status: "Active", joinedAt: "Feb 04, 2024" },
    { id: "USR-103", name: "Pooja Adhikari", email: "pooja.adhikari@yahoo.com", role: "Premium", examsTaken: 48, avgScore: "91.0%", status: "Active", joinedAt: "Dec 18, 2023" },
    { id: "USR-104", name: "Bikash Thapa", email: "bikash.thapa@gmail.com", role: "Student", examsTaken: 8, avgScore: "55.0%", status: "Inactive", joinedAt: "Mar 01, 2024" },
    { id: "USR-105", name: "Kritika Neupane", email: "kritika.neupane@gmail.com", role: "Editor", examsTaken: 22, avgScore: "88.4%", status: "Active", joinedAt: "Nov 15, 2023" },
    { id: "USR-106", name: "Rabin Karki", email: "rabin.karki@hotmail.com", role: "Student", examsTaken: 5, avgScore: "49.0%", status: "Active", joinedAt: "Apr 10, 2024" },
  ];

  const filteredUsers = sampleUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" ? true : u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">Candidate & User Management</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#9ca3af] hover:text-white text-[11px] font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16">
        {/* Bento Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "TOTAL CANDIDATES", value: "14,820", icon: "group", color: "from-[#534AB7] to-[#7c75ff]" },
            { label: "PREMIUM SUBSCRIBERS", value: "3,410", icon: "workspace_premium", color: "from-[#d97706] to-[#fbbf24]" },
            { label: "DAILY ACTIVE USERS", value: "1,240", icon: "person_check", color: "from-[#22c55e] to-[#4ade80]" },
            { label: "AVG PASS RATE", value: "78.4%", icon: "trending_up", color: "from-[#3b82f6] to-[#60a5fa]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">{stat.label}</p>
                <p className="text-[24px] font-bold text-white font-headline leading-tight">{stat.value}</p>
              </div>
              <div className={`size-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <span className="material-symbols-outlined text-[18px] text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Search candidate by name, email, or user ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/70 focus:ring-1 focus:ring-[#534AB7]/30 rounded-xl pl-10 pr-4 py-2 text-[12.5px] text-white placeholder:text-[#4b5262] focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
            {(["All", "Premium", "Student", "Editor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  roleFilter === r
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#10131a]">
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Candidate</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Membership</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Exams Taken</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Avg Score</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Joined Date</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredUsers.map((user) => {
                  const roleColor =
                    user.role === "Premium"
                      ? "text-[#fbbf24] bg-[#d97706]/15 border-[#d97706]/30"
                      : user.role === "Editor"
                      ? "text-[#c4b5fd] bg-[#534AB7]/15 border-[#534AB7]/30"
                      : "text-[#9ca3af] bg-white/[0.04] border-white/[0.06]";

                  return (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-white leading-tight">{user.name}</p>
                            <p className="text-[11px] text-[#6b7280] mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${roleColor}`}>
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-[12px] font-semibold text-white">
                        {user.examsTaken} tests
                      </td>

                      <td className="px-5 py-4 text-[12px] font-bold text-[#4ade80]">
                        {user.avgScore}
                      </td>

                      <td className="px-5 py-4 text-[11px] text-[#6b7280]">
                        {user.joinedAt}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-all"
                          title="View Profile"
                        >
                          <span className="material-symbols-outlined text-[17px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
