"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split("@")[0],
            },
          },
        });

        setLoading(false);
        if (error) {
          setMessage({ text: error.message, type: "error" });
        } else if (data.session) {
          setMessage({ text: "Account created successfully! Redirecting...", type: "success" });
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        } else {
          setMessage({
            text: "Registration submitted! Check your email to confirm your account.",
            type: "success",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        setLoading(false);
        if (error) {
          // Provide friendlier messages for common errors
          let msg = error.message;
          if (msg.toLowerCase().includes("invalid login credentials")) {
            msg = "Incorrect email or password. Please try again.";
          } else if (msg.toLowerCase().includes("email not confirmed")) {
            msg = "Please confirm your email before signing in.";
          } else if (msg.toLowerCase().includes("too many requests")) {
            msg = "Too many attempts. Please wait a few minutes and try again.";
          }
          setMessage({ text: msg, type: "error" });
        } else {
          setMessage({ text: "Sign in successful! Redirecting...", type: "success" });
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 800);
        }
      }
    } catch (err: unknown) {
      setLoading(false);
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setMessage({ text: message, type: "error" });
    }
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 py-12 min-h-screen bg-[#0f1117]">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-tertiary/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Login Card */}
        <div className="w-full max-w-md relative">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
            {/* Brand Anchor */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
              </div>
              <h1 className="font-headline text-2xl font-black tracking-tight text-on-surface mb-1 uppercase tracking-widest">
                Play Loksewa
              </h1>
              <p className="font-body text-on-surface-variant text-sm font-medium">Editorial Authority Console</p>
            </div>

            {/* Alert Message */}
            {message && (
              <div
                className={`mb-6 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 border ${
                  message.type === "success"
                    ? "bg-[#0d9488]/15 border-[#0d9488]/30 text-[#5eead4]"
                    : "bg-[#ef4444]/15 border-[#ef4444]/30 text-[#f87171]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {message.type === "success" ? "check_circle" : "error"}
                </span>
                <span>{message.text}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full bg-surface-container-highest border-b-2 border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-low transition-all py-3 pl-10 pr-4 font-body text-sm rounded-t-md"
                    id="email"
                    name="email"
                    placeholder="admin@loksewa.edu"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-label text-xs font-semibold tracking-widest text-on-surface-variant uppercase ml-1" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="w-full bg-surface-container-highest border-b-2 border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-low transition-all py-3 pl-10 pr-4 font-body text-sm rounded-t-md"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  type="submit"
                >
                  {loading ? (
                    <span className="text-xs uppercase font-bold tracking-wider">Processing...</span>
                  ) : (
                    <>
                      <span>{isSignUp ? "Create Admin Account" : "Sign In"}</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>

              {/* Toggle Mode */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage(null);
                  }}
                  className="text-xs text-[#a78bfa] hover:underline font-medium"
                >
                  {isSignUp ? "Already have an account? Sign In" : "Need a new account? Register here"}
                </button>
              </div>
            </form>

            {/* Footer Context */}
            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Supabase Auth</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant/40"></div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">PostgreSQL DB</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 font-label text-[10px] text-outline uppercase tracking-[0.2em]">
            © 2024 Play Loksewa. Supabase Connected.
          </p>
        </div>
      </main>
    </>
  );
}
