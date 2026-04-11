"use client";

export default function Revenue() {
  return (
    <div className="p-8 flex-1 space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold font-manrope text-on-surface tracking-tight">Revenue Dashboard</h2>
        <p className="text-sm text-on-surface-variant tracking-wider uppercase font-semibold text-[11px]">Financial Health & Transactions</p>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-12 gap-6">
        {/* Primary Stats */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high transition-colors group">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-4 block">Monthly Recurring Revenue</span>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-manrope">रू 8,42,500</span>
              <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span>12% vs last month</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">Total Revenue</span>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-manrope">रू 4.2M</span>
              <p className="text-xs text-on-surface-variant">Lifetime earnings</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-widest text-error mb-4 block">Churn Rate</span>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-manrope">2.4%</span>
              <div className="flex items-center gap-1 text-error text-xs font-semibold">
                <span className="material-symbols-outlined text-xs">trending_down</span>
                <span>0.8% decrease</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donut Chart Card */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-manrope font-bold text-lg">Gateway Distribution</h3>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_horiz</span>
          </div>
          <div className="relative flex justify-center items-center py-4">
            {/* Custom SVG Donut */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" fill="transparent" r="70" stroke="#1d2b3d" strokeWidth="14"></circle>
              <circle cx="80" cy="80" fill="transparent" r="70" stroke="#adc6ff" strokeDasharray="440" strokeDashoffset="132" strokeWidth="14"></circle> {/* 70% eSewa */}
              <circle cx="80" cy="80" fill="transparent" r="70" stroke="#ffb786" strokeDasharray="440" strokeDashoffset="352" strokeWidth="14" transform="rotate(252 80 80)"></circle> {/* 20% Khalti */}
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-manrope">रू 2.1M</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Current Period</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">eSewa</span>
              </div>
              <span className="text-sm font-bold">70%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <span className="text-sm font-medium">Khalti</span>
              </div>
              <span className="text-sm font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                <span className="text-sm font-medium">Other</span>
              </div>
              <span className="text-sm font-bold">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table Section */}
      <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm pt-4">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <div>
            <h3 className="font-manrope font-bold text-lg">Recent Transactions</h3>
            <p className="text-xs text-on-surface-variant">Real-time subscription logs</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-surface-container-highest rounded-lg hover:bg-surface-bright transition-colors">Export CSV</button>
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-surface-container-highest rounded-lg hover:bg-surface-bright transition-colors">Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">User Name</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Gateway</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-6 py-4 text-sm whitespace-nowrap">Oct 24, 2023</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs uppercase">RA</div>
                  <span className="text-sm font-semibold">Rohan Adhikari</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center px-2 py-1 bg-green-900/20 text-green-400 rounded-md gap-1">
                    <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                    <span className="text-[10px] font-bold uppercase">eSewa</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold whitespace-nowrap">रू 499.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-container/20 text-primary">Success</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-6 py-4 text-sm whitespace-nowrap">Oct 23, 2023</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold text-xs uppercase">SP</div>
                  <span className="text-sm font-semibold">Sunita Pandey</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center px-2 py-1 bg-purple-900/20 text-purple-400 rounded-md gap-1">
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span className="text-[10px] font-bold uppercase">Khalti</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold whitespace-nowrap">रू 1,299.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-container/20 text-primary">Success</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-6 py-4 text-sm whitespace-nowrap">Oct 23, 2023</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">BK</div>
                  <span className="text-sm font-semibold">Bikash Karki</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center px-2 py-1 bg-green-900/20 text-green-400 rounded-md gap-1">
                    <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                    <span className="text-[10px] font-bold uppercase">eSewa</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold whitespace-nowrap">रू 499.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container/20 text-error">Failed</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-container-high/20 flex justify-between items-center">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest">Showing 3 of 1,240 results</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded bg-surface-container hover:bg-surface-bright"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <span className="text-sm px-2 font-bold">1</span>
            <button className="p-1 rounded bg-surface-container hover:bg-surface-bright"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
