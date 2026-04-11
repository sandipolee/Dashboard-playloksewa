

export default function Login() {
  return (
    <>
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-tertiary/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Login Card */}
        <div className="w-full max-w-md relative">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
            {/* Brand Anchor */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
              </div>
              <h1 className="font-headline text-2xl font-black tracking-tight text-on-surface mb-1 uppercase tracking-widest">
                Play loksewa
              </h1>
              <p className="font-body text-on-surface-variant text-sm font-medium">Editorial Authority Suite</p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold tracking-widest text-on-surface-variant uppercase ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                  </div>
                  <input
                    className="w-full bg-surface-container-highest border-b-2 border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-low transition-all py-3 pl-10 pr-4 font-body text-sm"
                    id="email"
                    name="email"
                    placeholder="admin@loksewa.edu"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-label text-xs font-semibold tracking-widest text-on-surface-variant uppercase ml-1" htmlFor="password">
                    Password
                  </label>
                  <a className="text-[11px] font-bold text-primary hover:text-primary-container transition-colors tracking-wide" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="w-full bg-surface-container-highest border-b-2 border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-low transition-all py-3 pl-10 pr-12 font-body text-sm"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type="password"
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Footer Context */}
            <div className="mt-10 pt-6 border-t border-outline-variant/10">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Encrypted Access</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant/40"></div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Cloud Authority</span>
                </div>
              </div>
            </div>
          </div>

          {/* Branding Footer outside card */}
          <p className="text-center mt-8 font-label text-[10px] text-outline uppercase tracking-[0.2em]">
            © 2024 Play loksewa. Internal Access Only.
          </p>
        </div>
      </main>

      <footer className="mt-auto w-full flex justify-between items-center px-8 py-4 border-t border-outline-variant/20">
        <div className="hidden md:block">
          <span className="text-[11px] font-inter text-on-surface-variant uppercase tracking-widest">
            © 2024 Play loksewa. Editorial Authority Suite.
          </span>
        </div>
        <div className="flex gap-6 mx-auto md:mx-0">
          <a className="text-[11px] font-inter text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-[11px] font-inter text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-[11px] font-inter text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">
            System Status
          </a>
        </div>
      </footer>
    </>
  );
}
