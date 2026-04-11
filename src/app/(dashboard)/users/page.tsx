"use client";

export default function UserManagement() {
  return (
    <div className="p-8 flex-1 overflow-y-auto custom-scrollbar pb-12">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-on-surface mb-1 font-headline">Student Directory</h2>
          <p className="text-sm font-inter text-on-surface-variant uppercase tracking-widest">Managing 1,284 Active Scholarly Curators</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold tracking-wide hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Status: All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold tracking-wide hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Bento-style Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-b-2 border-primary/20">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Total Students</p>
          <h3 className="text-2xl font-bold font-headline">12,482</h3>
          <div className="mt-2 flex items-center gap-1 text-primary text-xs">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>12% from last month</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Active Premium</p>
          <h3 className="text-2xl font-bold font-headline text-tertiary">3,120</h3>
          <div className="mt-2 flex items-center gap-1 text-on-surface-variant text-xs">
            <span>25% conversion rate</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Daily Active</p>
          <h3 className="text-2xl font-bold font-headline">842</h3>
          <div className="mt-2 flex items-center gap-1 text-slate-500 text-xs">
            <span>Avg. 45 mins session</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Exam Completion</p>
          <h3 className="text-2xl font-bold font-headline">94.2%</h3>
          <div className="mt-2 flex items-center gap-1 text-primary text-xs">
            <span>High retention focus</span>
          </div>
        </div>
      </div>

      {/* Main Data Table Area */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[11px] font-inter text-on-surface-variant uppercase tracking-widest font-semibold">Student Name</th>
                <th className="px-6 py-4 text-[11px] font-inter text-on-surface-variant uppercase tracking-widest font-semibold">Joined Date</th>
                <th className="px-6 py-4 text-[11px] font-inter text-on-surface-variant uppercase tracking-widest font-semibold">Subscription</th>
                <th className="px-6 py-4 text-[11px] font-inter text-on-surface-variant uppercase tracking-widest font-semibold">Status</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <tr className="group hover:bg-surface-container-low transition-colors cursor-pointer">
                <td className="px-6 py-4 items-center whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 min-w-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold overflow-hidden">
                      <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCydaRAOIf20vTCbMjA2rlHGO3he0f5qdjPqz9AsUGCGREy7uJP_w2bZDF4UEx_LzWTVJzCdGTs2b0Y29o7-zXInT_ZW_17dC83kFXhx8t9HB_hc_4nkcQLu_757j-BO93ZIscu-zMzdvrpLu7pU5EwrVE-oMKSCmT6W3umZMm3CHsX8_yL5ILVNAWc1USOD288IflP44tUYfuLo58M7fA8Q_-TMylH0hidt25ncbRVkpOwi8Gq48v348UPuZOrQt3ha-uNxw52qYY" />
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Arjun Sharma</p>
                      <p className="text-xs text-on-surface-variant">arjun.sh@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-on-surface-variant">Oct 12, 2023</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container/20 text-tertiary">Premium</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-sm">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="group bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer border-l-2 border-primary">
                <td className="px-6 py-4 items-center whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 min-w-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden">
                      <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn7zVftQ8qtQ3kzzfARlZXEv8i3uAm76-PZrD988wwsG2J7j2n41d908adzFSk_X_g_jn4BWsqJ8epYJxgNlaXdf_HYy731a68biA-2UFCWt6BP2jacmmlp0RzKb5lSJxnMRTe5hkjNidKj0kAt00sWYmtMhE-ivMpsUxi2Ki53gHoFf6BM3HPCluLjWCN5pgCP16xUuJ5FB5ScwYQnAFNlyXOSdJKb9u6rEOAKdztKhxtvTCpV3LdSWceaADrPqnjipqXk-FG32c" />
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Priya Karki</p>
                      <p className="text-xs text-on-surface-variant">priya.karki@outlook.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-on-surface-variant">Jan 05, 2024</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">Free Tier</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-sm">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button className="p-2 text-primary transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </td>
              </tr>
              <tr className="group hover:bg-surface-container-low transition-colors cursor-pointer">
                <td className="px-6 py-4 items-center whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 min-w-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold overflow-hidden">
                      <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAln596HBNigJefERK4A55DcNQ4KHailcKWsHY9F16GZillpRn4XdxuasNiXPnm1QxIDVA1fuvU3LeL8-zJFr-OgGYe2VnJn_qIrRripc0yTispS7uqsydI7wapifS4yF7cc-XaaKzkrpkydhAkuyM33xG8R0pCjxFhC5VtDiCDo-KAaQWYnji0l_xnboILap5glJs42mmjXsppiu3EYZR8jabdk4wwtHD7wFrwEXx_6Nb6g5NrfkbLi-xmF1Cz8FHe0lJVJ5MXF9k" />
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Ramesh Thapa</p>
                      <p className="text-xs text-on-surface-variant">ramesh_thapa@edu.np</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-on-surface-variant">Feb 18, 2024</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container/20 text-tertiary">Premium</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                    <span className="text-sm text-on-surface-variant">Inactive</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-outline-variant/10 flex justify-between items-center bg-surface-dim">
          <p className="text-[11px] font-inter text-on-surface-variant uppercase tracking-widest">Showing 1-10 of 1,284 students</p>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">keyboard_arrow_left</span>
            </button>
            <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">keyboard_arrow_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
