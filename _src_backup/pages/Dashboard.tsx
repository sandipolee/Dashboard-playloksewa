

export default function Dashboard() {
  return (
    <div className="p-8 flex-1 flex flex-col gap-8 min-w-0 pb-12">
      {/* Profile Header */}
      <section className="flex flex-col @container p-6 bg-surface-container-low rounded-xl relative overflow-hidden">
        {/* Subtle decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-end z-10">
          <div className="flex gap-6 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-2 border-surface-container-highest shadow-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBj1CRuyDtOhjjNu6_phxtP2FonMLNNrdlVWWsEisB4dMhMkqwbQv08dLH3PV-ee73lG9n7vmFJIDaoeq-UBftgPzTFLDEJEepJRaNwhS4NoQzwlaudQEyDn8LICUEs-3D-OG-hqZoica7dtwyl5bFSWbpB0jv3Sf5wUWAgh_JshAJZJAYeOHSu9wG2kHuvtZJKdSHl5jtE4GidcOZZ_dyjhqSqn7zoazBj4Sv2YNVEohsDe_Fo1fStEIvBWmw6ibXPc6wGcu1sgdw")'
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <h2 className="text-on-surface font-headline text-3xl font-extrabold leading-tight tracking-tight mb-1">
                Arjun Sharma
              </h2>
              <p className="text-primary font-body text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">school</span>
                Performance Analytics
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-gradient-to-r from-[#0058be] to-[#2170e4] text-white font-body text-sm font-bold shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background gap-2 w-full max-w-xs @[520px]:w-auto">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Report</span>
          </button>
        </div>
      </section>

      {/* Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center justify-between">
            <h3 className="text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">
              Avg. Score
            </h3>
            <span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              timeline
            </span>
          </div>
          <p className="text-on-surface font-headline text-4xl font-extrabold leading-none tracking-tight">
            82<span className="text-xl text-on-surface-variant font-bold ml-1">%</span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-primary text-[14px]">arrow_upward</span>
            <span className="text-primary font-body text-xs font-semibold">+4% vs last month</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center justify-between">
            <h3 className="text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">
              Total Tests
            </h3>
            <span className="material-symbols-outlined text-tertiary opacity-50 group-hover:opacity-100 transition-opacity">
              quiz
            </span>
          </div>
          <p className="text-on-surface font-headline text-4xl font-extrabold leading-none tracking-tight">45</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-on-surface-variant font-body text-xs">Across 6 subjects</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center justify-between">
            <h3 className="text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">
              Global Rank
            </h3>
            <span className="material-symbols-outlined text-secondary opacity-50 group-hover:opacity-100 transition-opacity">
              public
            </span>
          </div>
          <p className="text-on-surface font-headline text-4xl font-extrabold leading-none tracking-tight">#452</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-on-surface-variant font-body text-xs">Top 5% of students</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
          <div className="flex items-center justify-between">
            <h3 className="text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">
              Accuracy
            </h3>
            <span className="material-symbols-outlined text-[#0bda5e] opacity-50 group-hover:opacity-100 transition-opacity">
              check_circle
            </span>
          </div>
          <p className="text-on-surface font-headline text-4xl font-extrabold leading-none tracking-tight">
            94<span className="text-xl text-on-surface-variant font-bold ml-1">%</span>
          </p>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2">
            <div className="bg-[#0bda5e] h-1.5 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </section>

      {/* Charts & Proficiency Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart */}
        <section className="xl:col-span-2 flex flex-col gap-6 p-6 rounded-xl bg-surface-container-low relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 z-10">
            <div>
              <h3 className="text-on-surface font-headline text-xl font-bold mb-1">Score History</h3>
              <p className="text-on-surface-variant font-body text-sm">Performance over the last 12 months</p>
            </div>
            <div className="flex bg-surface-container-highest rounded-lg p-1 w-fit">
              <button className="px-3 py-1.5 text-xs font-label font-medium uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">
                3M
              </button>
              <button className="px-3 py-1.5 text-xs font-label font-medium uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">
                6M
              </button>
              <button className="px-3 py-1.5 text-xs font-label font-medium uppercase tracking-wider rounded bg-surface-container-lowest text-primary shadow">
                1Y
              </button>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[250px] relative z-10 mt-4 flex flex-col">
            {/* Simplified Chart Visual */}
            <div className="relative flex-1 w-full">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-on-surface-variant font-label text-[10px] items-end pr-2">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              {/* Grid Lines */}
              <div className="absolute left-8 right-0 top-2 bottom-8 flex flex-col justify-between">
                <div className="w-full border-t border-outline-variant/20"></div>
                <div className="w-full border-t border-outline-variant/20"></div>
                <div className="w-full border-t border-outline-variant/20"></div>
                <div className="w-full border-t border-outline-variant/20"></div>
                <div className="w-full border-t border-outline-variant/20"></div>
              </div>
              {/* SVG Line & Gradient Fill */}
              <svg
                className="absolute left-8 right-0 top-2 bottom-8 h-full w-[calc(100%-2rem)] overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#adc6ff" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 L100,10 L100,100 L0,100 Z" fill="url(#lineGradient)"></path>
                <path
                  d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 L100,10"
                  fill="none"
                  stroke="#adc6ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                {/* Data Points */}
                <circle cx="30" cy="65" fill="#010f20" r="3" stroke="#adc6ff" strokeWidth="1.5"></circle>
                <circle cx="60" cy="35" fill="#010f20" r="3" stroke="#adc6ff" strokeWidth="1.5"></circle>
                <circle cx="90" cy="20" fill="#010f20" r="3" stroke="#adc6ff" strokeWidth="1.5"></circle>
                <circle cx="100" cy="10" fill="#adc6ff" r="3"></circle>
              </svg>
            </div>
            {/* X-Axis Labels */}
            <div className="h-8 flex justify-between ml-8 pt-2 border-t border-outline-variant/40">
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Jan</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Mar</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">May</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Jul</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Sep</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Nov</span>
            </div>
          </div>
        </section>

        {/* Subject Proficiency Sidebar */}
        <aside className="flex flex-col gap-6 p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/15">
          <div>
            <h3 className="text-on-surface font-headline text-lg font-bold mb-1">Subject Proficiency</h3>
            <p className="text-on-surface-variant font-body text-xs">Based on recent diagnostic tests</p>
          </div>
          <div className="flex flex-col gap-5 mt-2">
            {/* Subject Item */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-body text-sm font-medium">General Knowledge</span>
                <span className="text-on-surface-variant font-body text-sm font-bold">92%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            {/* Subject Item */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-body text-sm font-medium">Quantitative Aptitude</span>
                <span className="text-on-surface-variant font-body text-sm font-bold">85%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            {/* Subject Item */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-body text-sm font-medium">Constitutional Law</span>
                <span className="text-on-surface-variant font-body text-sm font-bold">78%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div className="bg-secondary h-1.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            {/* Subject Item */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-body text-sm font-medium">Current Affairs</span>
                <span className="text-on-surface-variant font-body text-sm font-bold">64%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            {/* Subject Item */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-body text-sm font-medium">Logical Reasoning</span>
                <span className="text-on-surface-variant font-body text-sm font-bold">96%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div className="bg-[#0bda5e] h-1.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Exam History Table Section */}
      <section className="flex flex-col gap-4">
        <h3 className="text-on-surface font-headline text-xl font-bold px-2">Recent Exam History</h3>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low/50">
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">Exam Name</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider text-right">Score</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider text-right">Percentile</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-high/30 transition-colors">
                <td className="py-4 px-6 text-on-surface-variant">Oct 12, 2023</td>
                <td className="py-4 px-6 text-on-surface font-medium">Loksewa Mock Test #42</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                    Full Syllabus
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-headline font-bold text-on-surface">88/100</td>
                <td className="py-4 px-6 text-right text-on-surface-variant">94th</td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1 text-[#0bda5e] text-xs font-bold uppercase tracking-wider">
                    <span className="size-2 rounded-full bg-[#0bda5e]"></span> Passed
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <a className="text-primary hover:text-primary-container font-semibold transition-colors" href="#">Review</a>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/30 transition-colors">
                <td className="py-4 px-6 text-on-surface-variant">Oct 05, 2023</td>
                <td className="py-4 px-6 text-on-surface font-medium">Current Affairs Weekly</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                    Sectional
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-headline font-bold text-on-surface">62/100</td>
                <td className="py-4 px-6 text-right text-on-surface-variant">45th</td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1 text-tertiary text-xs font-bold uppercase tracking-wider">
                    <span className="size-2 rounded-full bg-tertiary"></span> Needs Review
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <a className="text-primary hover:text-primary-container font-semibold transition-colors" href="#">Review</a>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/30 transition-colors">
                <td className="py-4 px-6 text-on-surface-variant">Sep 28, 2023</td>
                <td className="py-4 px-6 text-on-surface font-medium">Aptitude Diagnostic</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                    Diagnostic
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-headline font-bold text-on-surface">95/100</td>
                <td className="py-4 px-6 text-right text-on-surface-variant">98th</td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1 text-[#0bda5e] text-xs font-bold uppercase tracking-wider">
                    <span className="size-2 rounded-full bg-[#0bda5e]"></span> Passed
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <a className="text-primary hover:text-primary-container font-semibold transition-colors" href="#">Review</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
