"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function IconMail() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[#f3eee1] text-[#1c1917]">
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(120, 100, 75, 0.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(120, 100, 75, 0.10) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "54px 54px",
        }}
      />

      {/* SOFT GLOW */}
      <div className="pointer-events-none absolute left-[8%] top-[20%] h-[330px] w-[330px] rounded-full bg-[#e9b28c]/20 blur-[90px]" />

      {/* DECORATIVE LINE */}
      <div className="pointer-events-none absolute left-[43%] top-0 h-[50%] w-px bg-[#e2a17c]/45" />

      <div className="pointer-events-none absolute left-[41.6%] top-[36%] h-8 w-8 rounded-full bg-[#ef895d] shadow-[0_0_25px_rgba(239,137,93,0.4)]" />

      {/* MAIN LAYOUT */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1550px] items-center gap-8 px-7 py-4 lg:px-12">
        {/* LEFT SIDE */}
        <section className="flex h-full w-[46%] flex-col justify-center">
          {/* LOGO */}
          <a
            href="/"
            className="mb-[clamp(20px,3vh,40px)] inline-block w-fit"
          >
            <img
              src="/dronahub-background.png"
              alt="DronaHub"
              className="h-auto w-[305px] max-w-full object-contain"
            />
          </a>

          {/* TEXT */}
          <div>
            <h1
              className="
                font-[var(--font-manrope)]
                text-[clamp(34px,3.5vw,54px)]
                font-bold
                leading-[0.98]
                tracking-[-0.05em]
                text-[#1c1917]
              "
            >
              Pick up where
              <br />
              your learning
              <br />
              left off.
              <br />

              <span className="font-['Instrument_Serif'] text-[clamp(42px,4vw,60px)] font-normal italic tracking-[-0.03em] text-[#cf603d]">
                Keep moving forward.
              </span>
            </h1>

            <p className="mt-4 max-w-[390px] text-[clamp(14px,1vw,16px)] leading-[1.5] text-[#625c55]">
              Your notes, resources and learning
              <br />
              journey are waiting for you.
            </p>
          </div>

          {/* ILLUSTRATION */}
          <div className="mt-auto hidden h-[28vh] pt-4 lg:block">
            <img
              src="/signup-illustration.png"
              alt="Student resources"
              className="h-full w-auto max-w-[560px] object-contain object-left-bottom"
            />
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex h-full w-[54%] items-center justify-center">
          <div className="w-full max-w-[610px] rounded-[28px] border border-[#d8d0c5] bg-[#f7f5f1]/90 px-9 py-6 shadow-[0_20px_70px_rgba(70,50,30,0.08)] backdrop-blur-xl lg:px-14">
            {/* HEADER */}
            <div className="mb-4">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.34em] text-[#c75f3d]">
                Welcome back
              </p>

              <h2 className="text-[clamp(20px,2.8vw,46px)] font-bold leading-none tracking-[-0.04em] text-[#1c1917]">
                Sign in.
              </h2>

              <p className="mt-2.5 text-[clamp(13px,1vw,16px)] text-[#706860]">
                Continue your journey with DronaHub.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-3">
              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#716a63]">
                  Email
                </label>

                <div className="flex h-[52px] items-center gap-3.5 rounded-[15px] border border-[#d8d0c5] bg-white/35 px-4.5 text-[#77716a] transition focus-within:border-[#df7956] focus-within:ring-4 focus-within:ring-[#df7956]/10">
                  <IconMail />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-full w-full bg-transparent text-[15px] text-[#1c1917] outline-none placeholder:text-[#8b857d]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#716a63]">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[10px] font-semibold text-[#cf603d] transition hover:text-[#a94729]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex h-[52px] items-center gap-3.5 rounded-[15px] border border-[#d8d0c5] bg-white/35 px-4.5 text-[#77716a] transition focus-within:border-[#df7956] focus-within:ring-4 focus-within:ring-[#df7956]/10">
                  <IconLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-full w-full bg-transparent text-[15px] text-[#1c1917] outline-none placeholder:text-[#8b857d]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#716a63] transition hover:text-[#cf603d]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-xs text-red-500">
                  {error}
                </p>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-[52px] w-full items-center justify-center rounded-[15px] bg-[#ff744f] px-6 text-[15px] font-semibold text-white shadow-[0_12px_25px_rgba(213,97,63,0.2)] transition hover:-translate-y-0.5 hover:bg-[#f16643] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {loading ? "Signing in..." : "Sign In"}
                </span>

                <span className="absolute right-6 text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-3.5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ddd6cc]" />

              <span className="text-[12px] text-[#827b73]">
                or
              </span>

              <div className="h-px flex-1 bg-[#ddd6cc]" />
            </div>

            {/* SIGNUP LINK */}
            <p className="text-center text-[14px] text-[#6f6861]">
              New to DronaHub?{" "}
              <a
                href="/signup"
                className="font-semibold text-[#cf603d] transition hover:text-[#a94729]"
              >
                Create an account →
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}