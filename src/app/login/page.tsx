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
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12 bg-[#0c0e14] text-white">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#534AB7]/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#0d9488]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Login Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#141722]/90 border border-white/[0.08] rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Brand */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-[#534AB7] to-[#7c75ff] flex items-center justify-center mb-4 shadow-xl shadow-[#534AB7]/30">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mb-1">
              Play Loksewa
            </h1>
            <p className="text-[12px] text-[#9ca3af] font-medium tracking-wide">
              Administrator & Editorial Console
            </p>
          </div>

          {/* Alert Message */}
          {message && (
            <div
              className={`mb-6 p-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 border ${
                message.type === "success"
                  ? "bg-[#0d9488]/20 border-[#0d9488] text-[#5eead4]"
                  : "bg-[#ef4444]/20 border-[#ef4444] text-[#fca5a5]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {message.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280] text-[18px]">
                  alternate_email
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@playloksewa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/80 focus:ring-1 focus:ring-[#534AB7]/40 text-white placeholder:text-[#4b5262] focus:outline-none transition-all py-3 pl-11 pr-4 text-sm rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280] text-[18px]">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#10131a] border border-white/[0.08] focus:border-[#534AB7]/80 focus:ring-1 focus:ring-[#534AB7]/40 text-white placeholder:text-[#4b5262] focus:outline-none transition-all py-3 pl-11 pr-4 text-sm rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-[#534AB7] to-[#6358d4] hover:from-[#6358d4] hover:to-[#756cf0] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#534AB7]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-sm uppercase tracking-wider"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{isSignUp ? "Create Admin Account" : "Sign In to Dashboard"}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
                className="text-xs text-[#a78bfa] hover:text-white transition-colors"
              >
                {isSignUp ? "Already have credentials? Sign In" : "Need an account? Register here"}
              </button>
            </div>
          </form>

          {/* Footer Security Badges */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-4 text-[10px] uppercase tracking-wider text-[#6b7280] font-bold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#4ade80]">verified_user</span>
              Supabase Auth
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#5eead4]">database</span>
              PostgreSQL
            </span>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] text-[#4b5262] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Play Loksewa. All rights reserved.
        </p>
      </div>
    </main>
  );
}
