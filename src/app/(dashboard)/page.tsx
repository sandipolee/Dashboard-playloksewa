"use client";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-11 border-b border-white/[0.06] bg-[#0f1117] flex items-center justify-between px-5 shrink-0">
        <h2 className="text-[12px] font-bold text-white">Dashboard Overview</h2>
        <div className="flex items-center gap-2.5">
          <div className="relative w-[200px]">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3f4451] text-[14px]">search</span>
            <input className="w-full bg-[#1e222d] border border-white/[0.06] rounded-md pl-8 pr-3 py-[4px] text-[11px] text-[#9ca3af] placeholder:text-[#3f4451] focus:outline-none focus:border-[#534AB7]/40 transition-all" placeholder="Search resources..." type="text" />
          </div>
          <button className="p-1 text-[#6b7280] hover:text-white rounded hover:bg-white/5 relative transition-colors">
            <span className="material-symbols-outlined text-[17px]">notifications</span>
            <span className="absolute top-0.5 right-0.5 size-1.5 bg-[#ef4444] rounded-full border border-[#0f1117]"></span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 pb-10">
        {/* Greeting */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-bold text-white mb-0.5">Good Morning, Admin.</h1>
            <p className="text-[11px] text-[#6b7280]">Here is the system overview for today.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-[5px] bg-[#1e222d] border border-white/[0.06] text-[10px] font-semibold text-[#9ca3af] rounded-md hover:bg-[#282d3d] transition-all">
              <span className="material-symbols-outlined text-[13px]">download</span>
              Export Report
            </button>
            <button className="flex items-center gap-1.5 px-3 py-[5px] bg-[#534AB7] text-white text-[10px] font-bold rounded-md shadow-md shadow-[#534AB7]/20 hover:bg-[#6358d4] transition-all">
              <span className="material-symbols-outlined text-[13px]">add</span>
              New Exam Set
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "ACTIVE USERS", value: "12,450", change: "+8.2%", changeColor: "text-[#22c55e]", icon: "group", iconBg: "bg-[#22c55e]/10 text-[#22c55e]" },
            { label: "EXAM COMPLETIONS", value: "8,211", change: "+12.4%", changeColor: "text-[#22c55e]", icon: "task_alt", iconBg: "bg-[#0d9488]/10 text-[#0d9488]" },
            { label: "NEW SUBSCRIPTIONS", value: "342", change: "-2.1%", changeColor: "text-[#ef4444]", icon: "card_membership", iconBg: "bg-[#534AB7]/10 text-[#a78bfa]" },
            { label: "SYSTEM HEALTH", value: "99.9%", sub: "Stable", icon: "dns", iconBg: "bg-[#22c55e]/10 text-[#22c55e]" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1.5">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[18px] font-bold text-white font-headline">{stat.value}</span>
                  {stat.change && <span className={`text-[9px] font-bold ${stat.changeColor}`}>{stat.change}</span>}
                  {stat.sub && <span className="text-[9px] font-medium text-[#6b7280]">{stat.sub}</span>}
                </div>
              </div>
              <div className={`size-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-[16px]">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Activity + Recent Alerts */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="col-span-2 bg-[#161922] border border-white/[0.04] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-bold text-white">Platform Activity</h3>
              <div className="flex items-center gap-0.5 bg-[#1e222d] rounded-md p-0.5">
                <button className="px-2 py-[3px] text-[9px] font-bold text-[#6b7280] rounded hover:text-white">7D</button>
                <button className="px-2 py-[3px] text-[9px] font-bold text-white bg-white/[0.06] rounded">30D</button>
                <button className="px-2 py-[3px] text-[9px] font-bold text-[#6b7280] rounded hover:text-white">1Y</button>
              </div>
            </div>
            <div className="h-[200px] flex items-end gap-[2px] px-3">
              {[40,55,35,65,50,70,45,80,60,90,75,85,50,65,70,55,80,95,60,75,85,70,90,65,50,75,85,95,80,70].map((h,i) => (
                <div key={i} className="flex-1 bg-[#534AB7]/20 hover:bg-[#534AB7]/40 rounded-t transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-4">
            <h3 className="text-[12px] font-bold text-white mb-3.5">Recent Alerts</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: "check_circle", iconColor: "text-[#22c55e]", title: "Database Backup Complete", desc: "Automated daily snapshot successful.", time: "10 MINS AGO" },
                { icon: "info", iconColor: "text-[#3b82f6]", title: "New Exam Set Published", desc: '"Section Officer Model Set 4" is now live.', time: "1 HOUR AGO", highlight: true },
                { icon: "warning", iconColor: "text-[#d97706]", title: "High Server Load Detected", desc: "Node-02 CPU utilization exceeded 85%.", time: "3 HOURS AGO" },
                { icon: "group_add", iconColor: "text-[#a78bfa]", title: "Bulk User Import", desc: "250 new student profiles created.", time: "5 HOURS AGO" },
              ].map((alert, i) => (
                <div key={i} className={`flex gap-2.5 p-2 rounded-md ${alert.highlight ? "bg-[#1e222d] border border-white/[0.04]" : ""}`}>
                  <span className={`material-symbols-outlined text-[14px] mt-0.5 shrink-0 ${alert.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{alert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-bold text-white mb-0.5">{alert.title}</p>
                    <p className="text-[9.5px] text-[#6b7280] leading-relaxed">{alert.desc}</p>
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#3f4451] mt-0.5 block">{alert.time}</span>
                  </div>
                </div>
              ))}
              <button className="text-[10px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] text-center mt-1 transition-colors">View All Logs</button>
            </div>
          </div>
        </div>

        {/* Recent Exam Submissions */}
        <div className="bg-[#161922] border border-white/[0.04] rounded-lg overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.04]">
            <h3 className="text-[12px] font-bold text-white">Recent Exam Submissions</h3>
            <button className="text-[#3f4451] hover:text-[#9ca3af]"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">User ID</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Exam Name</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Score</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Status</th>
                <th className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                { uid: "USR-9281", exam: "Kharidar General Knowledge", score: "85/100", status: "Passed", statusColor: "text-[#22c55e]", time: "12:45 PM" },
                { uid: "USR-4420", exam: "Nayab Subba Model 2", score: "42/100", status: "Failed", statusColor: "text-[#ef4444]", time: "11:30 AM" },
                { uid: "USR-7731", exam: "Section Officer IQ Test", score: "-", status: "In Progress", statusColor: "text-[#d97706]", time: "11:15 AM" },
                { uid: "USR-1198", exam: "Kharidar General Knowledge", score: "92/100", status: "Passed", statusColor: "text-[#22c55e]", time: "10:05 AM" },
              ].map((row) => (
                <tr key={row.uid} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-[10px] font-semibold text-[#6b7280]">{row.uid}</td>
                  <td className="px-4 py-2.5 text-[11px] font-medium text-white">{row.exam}</td>
                  <td className="px-4 py-2.5 text-[11px] font-bold text-white">{row.score}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <span className={`size-1.5 rounded-full ${row.statusColor.replace("text-","bg-")}`}></span>
                      <span className={`text-[10px] font-medium ${row.statusColor}`}>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10px] text-[#6b7280]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
