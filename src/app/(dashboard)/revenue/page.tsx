"use client";

export default function Revenue() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="h-10 border-b border-white/[0.06] bg-[#0f1117] flex items-center justify-between px-5 shrink-0">
        <div className="relative w-[200px]">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3f4451] text-[14px]">search</span>
          <input className="w-full bg-[#1e222d] border border-white/[0.06] rounded-md pl-8 pr-3 py-[4px] text-[11px] text-[#9ca3af] placeholder:text-[#3f4451] focus:outline-none focus:border-[#534AB7]/40 transition-all" placeholder="Search..." type="text" />
        </div>
        <button className="p-1 text-[#6b7280] hover:text-white rounded hover:bg-white/5"><span className="material-symbols-outlined text-[17px]">notifications</span></button>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[16px] font-bold text-white mb-0.5">Revenue & Subscriptions</h1>
            <p className="text-[11px] text-[#6b7280]">Financial overview and active subscription metrics.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-[#1e222d] rounded-md p-0.5 border border-white/[0.06]">
              <button className="px-2.5 py-[3px] text-[9px] font-bold text-[#6b7280] rounded hover:text-white">7D</button>
              <button className="px-2.5 py-[3px] text-[9px] font-bold text-white bg-[#534AB7] rounded shadow-sm">30D</button>
              <button className="px-2.5 py-[3px] text-[9px] font-bold text-[#6b7280] rounded hover:text-white">1Y</button>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-[5px] bg-[#534AB7] text-white text-[10px] font-bold rounded-md shadow-md shadow-[#534AB7]/20 hover:bg-[#6358d4] transition-all">
              <span className="material-symbols-outlined text-[13px]">download</span>Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "TOTAL REVENUE (30D)", value: "Rs 1.24M", change: "+12.4%", sparkline: true },
            { label: "ACTIVE SUBS", value: "4,821", change: "+5.2%", sub: "Basic: 65%    Pro: 35%" },
            { label: "AVG REV PER USER", value: "Rs 257", change: "+1.1%" },
            { label: "CHURN RATE (30D)", value: "2.4%", change: "+0.3%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#161922] border border-white/[0.04] rounded-lg p-3.5">
              <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[20px] font-bold text-white font-headline">{stat.value}</span>
                <span className="text-[9px] font-bold text-[#22c55e]">{stat.change}</span>
              </div>
              {stat.sparkline && (
                <div className="flex items-end gap-[1.5px] h-[16px] mt-1">
                  {[3,4,2,5,3,6,4,7,5,8,6,9,7,8,6,9].map((h,i) => (
                    <div key={i} className="flex-1 bg-[#22c55e]/30 rounded-t" style={{ height: `${h*10}%` }}></div>
                  ))}
                </div>
              )}
              {stat.sub && <p className="text-[9px] text-[#6b7280] mt-0.5">{stat.sub}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="col-span-2 bg-[#161922] border border-white/[0.04] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-bold text-white">Revenue Growth</h3>
              <button className="text-[#3f4451] hover:text-[#9ca3af]"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
            </div>
            <div className="flex gap-2 h-[190px]">
              <div className="flex flex-col justify-between text-[8px] text-[#3f4451] font-medium py-1">
                <span>Rs 50k</span><span>Rs 40k</span><span>Rs 30k</span><span>Rs 20k</span><span>Rs 10k</span><span>0</span>
              </div>
              <div className="flex-1 flex items-end justify-around gap-2 border-l border-b border-white/[0.04] px-2 pb-4 relative">
                {[55,65,45,70,80,90,75].map((h,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0">
                    <div className="w-full max-w-[32px] bg-[#534AB7]/30 hover:bg-[#534AB7]/50 rounded-t transition-colors" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-2 -mb-4">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <span key={d} className="text-[8px] text-[#6b7280]">{d}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161922] border border-white/[0.04] rounded-lg p-4">
            <h3 className="text-[12px] font-bold text-white mb-4">Plan Distribution</h3>
            <div className="flex flex-col gap-4">
              {[
                { icon: "shield", iconBg: "bg-[#534AB7]/15 text-[#a78bfa]", name: "Pro Annual", pct: "42%", barW: "42%", barColor: "bg-[#534AB7]" },
                { icon: "star", iconBg: "bg-[#d97706]/15 text-[#fbbf24]", name: "Pro Monthly", pct: "35%", barW: "35%", barColor: "bg-[#3b82f6]" },
                { icon: "person", iconBg: "bg-[#6b7280]/15 text-[#9ca3af]", name: "Basic", pct: "23%", barW: "23%", barColor: "bg-[#6b7280]" },
              ].map((plan) => (
                <div key={plan.name} className="flex items-center gap-2.5">
                  <div className={`size-7 rounded-lg ${plan.iconBg} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>{plan.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-white">{plan.name}</span>
                      <span className="text-[11px] font-bold text-white">{plan.pct}</span>
                    </div>
                    <div className="w-full h-[3px] bg-[#1e222d] rounded-full overflow-hidden">
                      <div className={`h-full ${plan.barColor} rounded-full`} style={{ width: plan.barW }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#161922] border border-white/[0.04] rounded-lg overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.04]">
            <h3 className="text-[12px] font-bold text-white">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <div className="relative w-[150px]">
                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#3f4451] text-[12px]">search</span>
                <input className="w-full bg-[#1e222d] border border-white/[0.06] rounded pl-7 pr-2 py-1 text-[9px] text-[#9ca3af] placeholder:text-[#3f4451] focus:outline-none" placeholder="Filter..." type="text" />
              </div>
              <button className="flex items-center gap-1 px-2 py-1 border border-white/[0.06] rounded text-[9px] font-semibold text-[#9ca3af] hover:bg-white/[0.04]">
                <span className="material-symbols-outlined text-[12px]">tune</span>Filter
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Transaction ID</th>
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">User</th>
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Plan</th>
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Amount</th>
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Date</th>
                <th className="px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                { id: "TRX-8921-A", name: "Ramesh Poudel", initial: "R", color: "bg-[#ef4444]", plan: "Pro Annual", planColor: "bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/20", amount: "Rs 4,999", date: "Oct 24, 14:32", status: "Success", statusColor: "text-[#22c55e]" },
                { id: "TRX-8920-B", name: "Sita Sharma", initial: "S", color: "bg-[#3b82f6]", plan: "Basic", planColor: "bg-[#6b7280]/15 text-[#9ca3af] border border-[#6b7280]/20", amount: "Rs 499", date: "Oct 24, 12:15", status: "Success", statusColor: "text-[#22c55e]" },
                { id: "TRX-8919-C", name: "Kamal Thapa", initial: "K", color: "bg-[#22c55e]", plan: "Pro Monthly", planColor: "bg-[#3b82f6]/15 text-[#93c5fd] border border-[#3b82f6]/20", amount: "Rs 999", date: "Oct 24, 09:45", status: "Failed", statusColor: "text-[#ef4444]" },
                { id: "TRX-8918-D", name: "Nita Gurung", initial: "N", color: "bg-[#d97706]", plan: "Pro Annual", planColor: "bg-[#534AB7]/15 text-[#a78bfa] border border-[#534AB7]/20", amount: "Rs 4,999", date: "Oct 23, 18:20", status: "Success", statusColor: "text-[#22c55e]" },
              ].map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-[10px] font-semibold text-[#6b7280]">{txn.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`size-5 rounded-full ${txn.color} flex items-center justify-center text-[8px] font-bold text-white`}>{txn.initial}</div>
                      <span className="text-[11px] font-medium text-white">{txn.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5"><span className={`px-1.5 py-px rounded text-[8px] font-bold ${txn.planColor}`}>{txn.plan}</span></td>
                  <td className="px-4 py-2.5 text-[11px] font-bold text-white">{txn.amount}</td>
                  <td className="px-4 py-2.5 text-[10px] text-[#6b7280]">{txn.date}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className={`size-1.5 rounded-full ${txn.statusColor.replace("text-","bg-")}`}></span>
                      <span className={`text-[10px] font-medium ${txn.statusColor}`}>{txn.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[9px] text-[#6b7280]">Showing 1 to 4 of 248 entries</span>
            <div className="flex items-center gap-0.5">
              <button className="p-0.5 text-[#3f4451] hover:text-white rounded"><span className="material-symbols-outlined text-[14px]">chevron_left</span></button>
              <button className="size-5 rounded bg-[#534AB7] text-white text-[9px] font-bold">1</button>
              <button className="size-5 rounded text-[#6b7280] hover:text-white text-[9px] font-bold hover:bg-white/[0.04]">2</button>
              <button className="size-5 rounded text-[#6b7280] hover:text-white text-[9px] font-bold hover:bg-white/[0.04]">3</button>
              <button className="p-0.5 text-[#6b7280] hover:text-white rounded"><span className="material-symbols-outlined text-[14px]">chevron_right</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
