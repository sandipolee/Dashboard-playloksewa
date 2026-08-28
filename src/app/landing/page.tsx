import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.08] bg-[#0f1117]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] flex items-center justify-center shadow-lg shadow-[#534AB7]/30">
              <span
                className="material-symbols-outlined text-white text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
            </div>
            <span className="font-bold text-sm tracking-wider uppercase text-white">
              Play Loksewa
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white transition-all"
            >
              Practice Arena
            </Link>
            <Link
              href="/login"
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] transition-all text-white shadow-md shadow-[#534AB7]/20"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#534AB7]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#0d9488]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#534AB7]/40 bg-[#534AB7]/15 text-[#c4b5fd] text-xs font-semibold tracking-wider uppercase">
          <span className="size-2 rounded-full bg-[#22c55e] animate-pulse" />
          Nepal&apos;s #1 Loksewa PSC Exam Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl mb-6 font-headline">
          Master Your{" "}
          <span className="bg-gradient-to-r from-[#a78bfa] via-[#c4b5fd] to-[#7c75ff] bg-clip-text text-transparent">
            Loksewa
          </span>{" "}
          Examinations
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-[#9ca3af] text-base sm:text-lg leading-relaxed mb-10 font-[Mukta]">
          खरिदार (तह ४) र नायब सुब्बा (तह ५) का नमुना सेटहरू, विषयगत अभ्यास तथा समयसीमा सहितको पूर्ण परीक्षा सिमुलेटर।
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/practice"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#534AB7] to-[#6358d4] text-white font-bold text-sm shadow-xl shadow-[#534AB7]/30 hover:shadow-[#534AB7]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Start Practice & Mock Tests
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              play_arrow
            </span>
          </Link>
          <Link
            href="/quiz?mode=practice&category=General%20Knowledge"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-[#d1d5db] hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              quiz
            </span>
            Quick 10-Q Quiz
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/[0.06] pt-10">
          {[
            { value: "10,000+", label: "Verified Questions" },
            { value: "500+", label: "Model Sets" },
            { value: "50,000+", label: "Aspirants" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1 font-headline">
                {s.value}
              </div>
              <div className="text-xs text-[#6b7280] uppercase tracking-wider font-bold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-[#a78bfa] font-bold uppercase tracking-[0.2em] mb-2">
              Why Play Loksewa?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-headline">
              Everything you need to top the ranking
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "timer",
                title: "Live Countdown Timer",
                desc: "Real exam simulation with official 45-minute countdown and negative mark deductions.",
              },
              {
                icon: "grid_view",
                title: "Question Grid & Palette",
                desc: "Jump freely between questions, flag doubts for review, and submit early at any time.",
              },
              {
                icon: "translate",
                title: "Bilingual Loksewa Format",
                desc: "Every question crafted in pure Nepali (Mukta) with English translations.",
              },
              {
                icon: "analytics",
                title: "Instant Scoring & Reviews",
                desc: "Automatic score calculation (+2.0 / -0.4) with detailed question-by-question explanations.",
              },
              {
                icon: "school",
                title: "Level 4 & Level 5 Sets",
                desc: "Dedicated bundles tailored specifically for Kharidar and Nayab Subba syllabi.",
              },
              {
                icon: "category",
                title: "Subject-wise Drills",
                desc: "Practice GK, IQ, Constitution, Geography, Economics, History, and IT independently.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-white/[0.06] bg-[#141721] hover:border-[#534AB7]/40 hover:bg-[#161a26] transition-all"
              >
                <div className="size-11 rounded-xl flex items-center justify-center mb-4 bg-[#534AB7]/20 text-[#a78bfa] border border-[#534AB7]/30">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 text-white font-headline">
                  {f.title}
                </h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6 bg-[#0c0e14]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#6b7280]">
            <span className="material-symbols-outlined text-[18px] text-[#a78bfa]">
              rocket_launch
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Play Loksewa
            </span>
          </div>
          <p className="text-[11px] text-[#6b7280] uppercase tracking-wider font-medium">
            © {new Date().getFullYear()} Play Loksewa. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
