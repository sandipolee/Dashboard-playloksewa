"use client";

import { useState } from "react";
import Link from "next/link";

export default function Revenue() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "1Y">("30D");

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f1117]">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#141721] flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-[12px] font-semibold text-[#6b7280] hover:text-white transition-colors">
            Dashboard
          </Link>
          <span className="text-[#3f4451] text-[12px]">/</span>
          <h2 className="text-[13px] font-bold text-white tracking-wide">Revenue & Subscriptions</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#10131a] p-1 rounded-xl border border-white/[0.06]">
            {(["7D", "30D", "1Y"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                  timeframe === t
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#534AB7]/25 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Statement
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-w-7xl mx-auto w-full pb-16">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "MONTHLY GROSS REVENUE", value: "Rs 1.84M", change: "+14.8%", icon: "account_balance", color: "from-[#22c55e] to-[#4ade80]" },
            { label: "ACTIVE SUBSCRIBERS", value: "4,820", change: "+6.2%", icon: "card_membership", color: "from-[#534AB7] to-[#7c75ff]" },
            { label: "AVERAGE REV PER USER", value: "Rs 382", change: "+2.4%", icon: "payments", color: "from-[#3b82f6] to-[#60a5fa]" },
            { label: "RENEWAL CHURN RATE", value: "1.8%", sub: "Healthy (<2.5%)", icon: "sync_alt", color: "from-[#0d9488] to-[#2dd4bf]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141721] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[22px] font-bold text-white font-headline leading-tight">{stat.value}</span>
                  {stat.change && (
                    <span className="text-[10px] font-bold text-[#4ade80]">{stat.change}</span>
                  )}
                </div>
                {stat.sub && <p className="text-[9.5px] text-[#4ade80] mt-0.5">{stat.sub}</p>}
              </div>
              <div className={`size-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-[#141721] border border-white/[0.06] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-white mb-0.5">Revenue Growth Trend</h3>
                <p className="text-[11px] text-[#6b7280]">Daily revenue volume generated from subscriptions & mock packs.</p>
              </div>
              <span className="text-[12px] font-bold text-[#4ade80] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2.5 py-1 rounded-lg">
                +14.8% vs last month
              </span>
            </div>

            <div className="h-[200px] flex items-end gap-[4px] px-2 pt-4">
              {[35, 45, 40, 55, 60, 50, 65, 75, 70, 85, 80, 95, 60, 75, 85, 70, 90, 100, 80, 90, 85, 95, 90, 100, 85, 90, 95, 100, 90, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar relative">
                  <div
                    className="w-full bg-[#0d9488]/30 hover:bg-[#2dd4bf] rounded-t transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-7 px-1.5 py-0.5 rounded bg-[#1a1e2b] text-[9px] font-bold text-white border border-white/[0.1] opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    Day {i + 1}: Rs {(h * 1200).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions by Plan */}
          <div className="bg-[#141721] border border-white/[0.06] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="text-[14px] font-bold text-white mb-3">Subscription Tier Share</h3>

            <div className="flex flex-col gap-3.5">
              {[
                { plan: "Kharidar Exam Pass", price: "Rs 499", share: "45%", count: "2,169 users", color: "bg-[#534AB7]" },
                { plan: "Nayab Subba Complete", price: "Rs 799", share: "35%", count: "1,687 users", color: "bg-[#0d9488]" },
                { plan: "Officer All-Access VIP", price: "Rs 1,499", share: "20%", count: "964 users", color: "bg-[#d97706]" },
              ].map((item) => (
                <div key={item.plan} className="bg-[#10131a] p-3 rounded-xl border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-bold text-white">{item.plan}</span>
                    <span className="text-[11px] font-bold text-[#c4b5fd]">{item.price}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-1.5">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.share }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6b7280]">
                    <span>{item.count}</span>
                    <span className="font-bold text-white">{item.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#141721] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-white">Recent Payment Transactions</h3>
            <span className="text-[11px] text-[#6b7280]">All transactions synced with Nepali Payment Gateways</span>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#10131a]">
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Transaction ID</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Candidate</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Plan Purchased</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Gateway</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">Amount</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  { tx: "TXN-90218", name: "Suman Shrestha", plan: "Kharidar Exam Pass (6 Months)", method: "eSewa", amount: "Rs 499", status: "Success" },
                  { tx: "TXN-90219", name: "Pooja Adhikari", plan: "Officer All-Access VIP", method: "Khalti", amount: "Rs 1,499", status: "Success" },
                  { tx: "TXN-90220", name: "Aayush Pokharel", plan: "Nayab Subba Complete Pack", method: "ConnectIPS", amount: "Rs 799", status: "Success" },
                  { tx: "TXN-90221", name: "Bikash Thapa", plan: "Kharidar Exam Pass", method: "Fonepay", amount: "Rs 499", status: "Success" },
                ].map((row) => (
                  <tr key={row.tx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[11px] font-bold text-[#c4b5fd]">{row.tx}</td>
                    <td className="px-5 py-3.5 text-[12px] font-semibold text-white">{row.name}</td>
                    <td className="px-5 py-3.5 text-[12px] text-[#9ca3af]">{row.plan}</td>
                    <td className="px-5 py-3.5 text-[12px] font-medium text-white">{row.method}</td>
                    <td className="px-5 py-3.5 text-[12px] font-bold text-[#4ade80]">{row.amount}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#4ade80]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
