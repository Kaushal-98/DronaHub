"use client";

export default function AuthVisual() {
  return (
    <div className="relative hidden min-h-full overflow-hidden lg:flex lg:w-[48%]">
      {/* Background */}
      <div className="absolute inset-0 bg-[#d6613f]" />

      {/* Decorative circles */}
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/20" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-white/20" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        {/* Logo */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">
            DRONAHUB
          </p>

          <div className="mt-3 h-[2px] w-12 bg-white/70" />
        </div>

        {/* Animated image */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[#f3eee1]/15 blur-2xl" />

          <div className="relative animate-float">
            <img
              src="/auth/mascot.png"
              alt="Dronahub mascot waving hello"
              className="w-[330px] select-none object-contain xl:w-[420px]"
            />

            {/* Floating hello */}
            <div className="absolute -right-3 top-6 animate-wave rounded-full bg-white px-5 py-2 text-sm font-bold text-[#14110f] shadow-lg">
              Hey! 👋
            </div>
          </div>
        </div>

        {/* Bottom branding */}
        <div>
          <h2 className="max-w-sm text-4xl font-bold leading-[1.05] text-white xl:text-5xl">
            Share.
            <br />
            Learn.
            <br />
            Grow.
          </h2>
        </div>
      </div>
    </div>
  );
}