"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Find notes, PYQs, study material and useful academic resources in one organized place.",
    tag: "EXPLORE",
  },
  {
    number: "02",
    title: "LEARN",
    description:
      "Access structured study material and focus on learning instead of searching everywhere.",
    tag: "STUDY",
  },
  {
    number: "03",
    title: "PRACTICE",
    description:
      "Use previous year questions to understand exam patterns and prepare with confidence.",
    tag: "PYQs",
  },
  {
    number: "04",
    title: "FOLLOW",
    description:
      "Use roadmaps to understand what to learn next and move through your preparation clearly.",
    tag: "ROADMAP",
  },
  {
    number: "05",
    title: "SHARE",
    description:
      "Upload useful notes and resources so your knowledge can help other students too.",
    tag: "UPLOAD",
  },
  {
    number: "06",
    title: "GROW",
    description:
      "Build a stronger student community where resources and knowledge move forward together.",
    tag: "COMMUNITY",
  },
];

export default function CampusFlow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      // Start track from exact beginning
      gsap.set(track, {
        x: 0,
        opacity: 1,
      });

      // Horizontal scroll
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Refresh after layout calculation
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#f3eee1]"
    >
      {/* TOP BORDER */}
      <div className="absolute left-0 top-0 h-px w-full bg-[#d8d0c0]" />

      {/* HEADER */}
      <div className="absolute left-0 top-0 z-20 flex w-full items-end justify-between px-6 pt-8 md:px-14 md:pt-10">
        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-[0.5em] text-[#d6613f]">
            HOW DRONAHUB WORKS
          </p>

          <h2 className="font-[var(--font-manrope)] text-4xl font-black tracking-[-0.05em] text-[#171412] md:text-6xl lg:text-7xl">
            THE CAMPUS FLOW
          </h2>
        </div>

        <div className="hidden pb-2 text-right md:block">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#74695c]">
            SCROLL TO EXPLORE
          </p>

          <p className="mt-2 text-sm font-medium text-[#171412]">
            DISCOVER → LEARN → PRACTICE → FOLLOW → SHARE → GROW
          </p>
        </div>
      </div>

      {/* HEADER DIVIDER */}
      <div className="absolute left-0 top-[145px] z-20 h-px w-full bg-[#d8d0c0] md:top-[175px]" />

      {/* HORIZONTAL TRACK */}
      <div
        ref={trackRef}
        className="absolute left-0 top-1/2 flex w-max -translate-y-[40%] gap-6 px-[5vw] pr-[10vw] md:gap-8"
      >
        {steps.map((step, index) => (
          <article
            key={step.number}
            className="campus-flow-card group relative flex h-[400px] w-[78vw] max-w-[500px] flex-col justify-between overflow-hidden rounded-[32px] border border-[#d8d0c0] bg-[#f8f5ee] p-8 shadow-[0_20px_60px_rgba(20,17,15,0.06)] transition-all duration-500 hover:-translate-y-3 hover:border-[#d6613f] md:h-[480px] md:w-[430px] md:p-10"
          >
            {/* BACKGROUND NUMBER */}
            <span className="pointer-events-none absolute -right-5 -top-10 select-none font-[var(--font-manrope)] text-[180px] font-black leading-none tracking-[-0.1em] text-[#e8e1d4] md:text-[220px]">
              {step.number}
            </span>

            {/* TOP */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.3em] text-[#d6613f]">
                  STEP {step.number}
                </span>

                <span className="rounded-full border border-[#d8d0c0] bg-white/50 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-[#74695c]">
                  {step.tag}
                </span>
              </div>

              <div className="mt-16">
                <h3 className="font-[var(--font-manrope)] text-4xl font-black tracking-[-0.04em] text-[#171412] md:text-5xl">
                  {step.title}
                </h3>

                <div className="mt-5 h-[2px] w-16 bg-[#d6613f] transition-all duration-500 group-hover:w-32" />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="relative z-10">
              <p className="max-w-[330px] text-base leading-relaxed text-[#74695c] md:text-lg">
                {step.description}
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="text-sm font-bold text-[#171412]">
                  {index === steps.length - 1
                    ? "KEEP GROWING"
                    : "NEXT STEP"}
                </span>

                <span className="text-xl text-[#d6613f] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>

            {/* BOTTOM HOVER LINE */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#d6613f] transition-all duration-500 group-hover:w-full" />
          </article>
        ))}

        {/* FINAL CARD */}
        <article className="flex h-[400px] w-[78vw] max-w-[430px] shrink-0 items-center justify-center rounded-[32px] bg-[#171412] p-10 shadow-[0_20px_60px_rgba(20,17,15,0.18)] md:h-[480px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.4em] text-[#d6613f]">
              DRONAHUB
            </p>

            <h3 className="mt-6 font-[var(--font-manrope)] text-4xl font-black tracking-tight text-[#f3eee1]">
              YOUR CAMPUS.
              <br />
              ORGANIZED.
            </h3>

            <p className="mt-6 leading-relaxed text-[#a9a095]">
              Everything you need to learn, practice, share and grow.
            </p>

            <button className="mt-10 rounded-full bg-[#f3eee1] px-6 py-3 text-sm font-bold text-[#171412] transition-all duration-300 hover:scale-105 hover:bg-white">
              EXPLORE NOW →
            </button>
          </div>
        </article>
      </div>

      {/* BOTTOM TEXT */}
      <div className="absolute bottom-8 left-0 z-20 flex w-full items-center justify-between px-6 md:px-14">
        <p className="text-[10px] font-semibold tracking-[0.35em] text-[#74695c]">
          DISCOVER — LEARN — PRACTICE — FOLLOW — SHARE — GROW
        </p>

        <p className="hidden text-[10px] font-semibold tracking-[0.25em] text-[#d6613f] md:block">
          DRONAHUB FLOW
        </p>
      </div>
    </section>
  );
}