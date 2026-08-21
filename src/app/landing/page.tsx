import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span
                className="material-symbols-outlined text-white text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">
              Play Loksewa
            </span>
          </div>
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors text-white"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-16">
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Nepal&apos;s #1 Loksewa Prep Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6">
          Ace Your{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Loksewa
          </span>{" "}
          Exam
        </h1>

        {/* Sub */}
        <p className="max-w-xl text-[#8b8fa8] text-base sm:text-lg leading-relaxed mb-10">
          Practice thousands of curated model sets, track your progress, and
          master every subject — all in one place. Built for PSC aspirants.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Get Started Free
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-[#a0a3b1] hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              play_circle
            </span>
            See how it works
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/5 pt-10">
          {[
            { value: "10,000+", label: "Questions" },
            { value: "500+", label: "Model Sets" },
            { value: "50,000+", label: "Students" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                {s.value}
              </div>
              <div className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-violet-400 font-semibold uppercase tracking-[0.2em] mb-3">
              Why Play Loksewa?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Everything you need to succeed
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "quiz",
                title: "Model Sets",
                desc: "Curated full-length exams modeled on real PSC papers — with timer, scoring, and instant results.",
                color: "violet",
              },
              {
                icon: "trending_up",
                title: "Progress Tracking",
                desc: "Visualize your improvement over time. Know exactly which topics to focus on.",
                color: "indigo",
              },
              {
                icon: "translate",
                title: "Bilingual Content",
                desc: "Questions available in both Nepali and English to match exam format.",
                color: "purple",
              },
              {
                icon: "timer",
                title: "Timed Practice",
                desc: "Simulate real exam pressure with countdown timers and anti-cheat mode.",
                color: "violet",
              },
              {
                icon: "grade",
                title: "Marking Logic",
                desc: "Positive and negative marking just like PSC. Learn to strategize your answers.",
                color: "indigo",
              },
              {
                icon: "devices",
                title: "Any Device",
                desc: "Fully responsive — study on your phone, tablet, or desktop, anywhere, anytime.",
                color: "purple",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-${f.color}-500/15 text-${f.color}-400`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-[#8b8fa8] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-3xl blur-xl" />
          <div className="relative border border-violet-500/20 rounded-3xl p-10 sm:p-16 bg-white/[0.02]">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
              Ready to start practising?
            </h2>
            <p className="text-[#8b8fa8] mb-8 max-w-md mx-auto">
              Join thousands of PSC aspirants and take your first mock exam today — completely free.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-violet-500/20 hover:shadow-violet-500/35 hover:scale-[1.02] transition-all"
            >
              Start for Free
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#6b7280]">
            <span
              className="material-symbols-outlined text-[16px] text-violet-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest">
              Play Loksewa
            </span>
          </div>
          <p className="text-[10px] text-[#4b5563] uppercase tracking-[0.2em]">
            © 2024 Play Loksewa. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
