"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const thoughts = [
  {
    title: "Looking for notes?",
    subtitle: "Semester-wise notes, all in one place.",
  },
  {
    title: "Need PYQs?",
    subtitle: "Find previous year questions quickly.",
  },
  {
    title: "Searching roadmaps?",
    subtitle: "Know exactly what to study next.",
  },
  {
    title: "We got you.",
    subtitle: "Everything you need, in one hub.",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const boyRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const browseRef = useRef<HTMLAnchorElement>(null);
  const uploadRef = useRef<HTMLAnchorElement>(null);

  const [thoughtIndex, setThoughtIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      if (
        !boyRef.current ||
        !cloudRef.current ||
        !welcomeRef.current ||
        !contentRef.current ||
        !browseRef.current ||
        !uploadRef.current
      ) {
        return;
      }

      gsap.set(boyRef.current, {
        opacity: 0,
        x: 100,
        y: 30,
        scale: 0.92,
      });

      gsap.set(welcomeRef.current, {
        opacity: 0,
        y: 15,
      });

      gsap.set(cloudRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 20,
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(browseRef.current, {
        opacity: 0,
        y: 15,
      });

      gsap.set(uploadRef.current, {
        opacity: 0,
        y: 15,
      });

      tl.to(boyRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
      });

      tl.to(
        welcomeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

      tl.to({}, { duration: 1.1 });

      tl.to(welcomeRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.4,
      });

      tl.to(
        cloudRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: "back.out(1.5)",
        },
        "-=0.1"
      );

      tl.call(() => setThoughtIndex(0));
      tl.to({}, { duration: 1.3 });

      tl.call(() => setThoughtIndex(1));
      tl.to({}, { duration: 1.3 });

      tl.call(() => setThoughtIndex(2));
      tl.to({}, { duration: 1.3 });

      tl.call(() => setThoughtIndex(3));
      tl.to({}, { duration: 1.2 });

      tl.to(cloudRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -15,
        duration: 0.4,
      });

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
        },
        "-=0.1"
      );

      tl.to(
        browseRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.35"
      );

      tl.to(
        uploadRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.3"
      );

      gsap.to(boyRef.current, {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const currentThought = thoughts[thoughtIndex];

  return (
    <section
      ref={heroRef}
      className="relative left-1/2 right-1/2 -mx-[50vw] min-h-[720px] w-screen overflow-hidden bg-[#f3eee1]"
    >
      <div className="absolute inset-0">
        <img
          src="/college/hero-building.jpg"
          alt="College campus"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee1]/95 via-[#f3eee1]/55 to-transparent md:via-[#f3eee1]/20" />

        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f3eee1]/45 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[720px] w-full max-w-[1500px] items-center px-8 py-16 md:px-14 lg:px-20">
        <div className="relative z-30 w-full max-w-[650px]">
          <div
            ref={welcomeRef}
            className="pointer-events-none absolute left-0 top-0"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#d6613f]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#74695c]">
                Welcome to
              </p>
            </div>

            <h2 className="mt-3 font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f] md:text-5xl">
              DRONAHUB
              <span className="text-[#d6613f]">.</span>
            </h2>
          </div>

          <div ref={contentRef}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fbe4d8] px-4 py-2 text-xs font-semibold text-[#d6613f] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6613f]" />
              Built by seniors. Kept alive for you.
            </span>

            <h1 className="mb-6 max-w-[620px] font-[var(--font-manrope)] text-5xl font-bold leading-[0.98] tracking-tight text-[#14110f] md:text-6xl lg:text-7xl">
              We find your{" "}
              <span className="font-['Instrument_Serif'] font-normal italic text-[#d6613f]">
                notes
              </span>
              <br />
              before your exam
              <br />
              does
              <span className="text-[#d6613f]">.</span>
            </h1>

            <p className="mb-8 max-w-[520px] text-base leading-relaxed text-[#5f574e] md:text-[17px]">
              DronaHub is a student-run library of PYQs, notes, roadmaps and
              useful resources — built by seniors and kept alive by students.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              ref={browseRef}
              href="/resources"
              className="group flex items-center gap-3 rounded-full bg-[#14110f] py-2.5 pl-6 pr-2 text-[15px] font-semibold text-white shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <span>Browse Resources</span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6613f] text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              ref={uploadRef}
              href="/upload"
              className="group flex items-center gap-3 rounded-full border-[1.5px] border-[#14110f] bg-[#f3eee1]/75 py-2.5 pl-6 pr-2 text-[15px] font-semibold text-[#14110f] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#14110f] hover:text-white"
            >
              <span>Upload Yours</span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-current text-xl transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f574e]">
            <span>PYQs</span>
            <span className="h-1 w-1 rounded-full bg-[#d6613f]" />

            <span>Notes</span>
            <span className="h-1 w-1 rounded-full bg-[#d6613f]" />

            <span>Roadmaps</span>
            <span className="h-1 w-1 rounded-full bg-[#d6613f]" />

            <span>Study Tools</span>
          </div>
        </div>

        <div
          ref={boyRef}
          className="pointer-events-none absolute bottom-0 right-[2%] z-20 flex w-[38%] min-w-[360px] items-end justify-end md:w-[40%] lg:w-[42%]"
        >
          <div className="relative w-full">
            <div
              ref={cloudRef}
              className="absolute right-[32%] top-[5%] z-30 w-[250px] md:w-[290px]"
            >
              <div className="relative rounded-[28px] border-2 border-[#8b735f] bg-[#f8f5ee]/95 px-6 py-5 shadow-xl shadow-black/15 backdrop-blur-sm">
                <p className="font-[var(--font-manrope)] text-lg font-bold leading-tight text-[#14110f] md:text-xl">
                  {currentThought.title}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-[#74695c]">
                  {currentThought.subtitle}
                </p>

                <div className="mt-4 flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6613f]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6613f]/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6613f]/40" />
                </div>

                <div className="absolute -bottom-4 right-12 h-8 w-8 rotate-45 border-b-2 border-r-2 border-[#8b735f] bg-[#f8f5ee]" />
              </div>
            </div>

            <img
              src="/college/dronahub-boy.png"
              alt="DronaHub student"
              className="relative z-20 ml-auto h-auto w-full max-w-[540px] object-contain object-bottom drop-shadow-2xl"
            />

            <div className="absolute bottom-[16%] right-[5%] -z-10 h-28 w-28 rounded-full border border-[#d6613f]/30 md:h-36 md:w-36" />

            <div className="absolute bottom-[25%] right-[25%] -z-10 h-3 w-3 rounded-full bg-[#d6613f]" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 border-t border-[#14110f]/10" />
    </section>
  );
}