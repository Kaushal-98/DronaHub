"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const slides = [
  {
    number: "01",
    tag: "RESOURCES",
    title: "DISCOVER",
    description:
      "Find notes, PYQs and study material based on your branch, semester and subjects.",
  },
  {
    number: "02",
    tag: "LEARNING",
    title: "LEARN",
    description:
      "Access organized academic resources without searching through multiple groups.",
  },
  {
    number: "03",
    tag: "PRACTICE",
    title: "PREPARE",
    description:
      "Use previous year questions and useful material to prepare smarter for exams.",
  },
  {
    number: "04",
    tag: "ROADMAPS",
    title: "FOLLOW",
    description:
      "Explore structured roadmaps and understand exactly what to learn next.",
  },
  {
    number: "05",
    tag: "COMMUNITY",
    title: "SHARE",
    description:
      "Upload useful notes and resources to help students across your campus.",
  },
];

export default function Quotes() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const ctx = gsap.context(() => {
      // Wait for layout/images/fonts to settle
      const setupAnimation = () => {
        const totalWidth = track.scrollWidth;

        // Since slides are duplicated exactly twice,
        // move exactly one complete set width.
        const singleSetWidth = totalWidth / 2;

        const sliderTween = gsap.fromTo(
          track,
          {
            x: 0,
          },
          {
            x: -singleSetWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize((x) => {
                const value = parseFloat(x);

                return value % singleSetWidth;
              }),
            },
          }
        );

        const handleMouseEnter = () => {
          sliderTween.pause();
        };

        const handleMouseLeave = () => {
          sliderTween.play();
        };

        track.addEventListener("mouseenter", handleMouseEnter);
        track.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          sliderTween.kill();

          track.removeEventListener("mouseenter", handleMouseEnter);
          track.removeEventListener("mouseleave", handleMouseLeave);
        };
      };

      const cleanup = setupAnimation();

      return cleanup;
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative my-24 overflow-hidden border-t border-[#d8d0c0] pt-10">
      {/* HEADER */}
      <div className="mx-auto mb-12 max-w-[1500px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.4em] text-[#d6613f]">
              THE STUDENT JOURNEY
            </p>

            <h2 className="font-[var(--font-manrope)] text-4xl font-bold leading-[0.95] text-[#14110f] md:text-6xl">
              FROM SEARCHING
              <br />

              <span className="font-['Instrument_Serif'] font-normal italic text-[#d6613f]">
                TO SHARING.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#74695c] md:text-base">
            DronaHub brings resources, preparation and student collaboration
            together in one simple flow.
          </p>
        </div>
      </div>

      {/* MOVING SLIDER */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f3eee1] to-transparent md:w-28" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f3eee1] to-transparent md:w-28" />

        <div
          ref={trackRef}
          className="flex w-max gap-6 will-change-transform md:gap-8"
        >
          {/* FIRST SET */}
          {slides.map((slide) => (
            <SlideCard
              key={`first-${slide.number}`}
              slide={slide}
            />
          ))}

          {/* DUPLICATE SET FOR SEAMLESS LOOP */}
          {slides.map((slide) => (
            <SlideCard
              key={`second-${slide.number}`}
              slide={slide}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="mx-auto mt-10 max-w-[1500px] px-6 md:px-10">
        <div className="flex flex-col gap-4 border-t border-[#d8d0c0] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.3em] text-[#74695c]">
            DISCOVER — LEARN — PREPARE — FOLLOW — SHARE
          </p>

          <p className="text-[10px] font-semibold tracking-[0.35em] text-[#d6613f]">
            DRONAHUB FLOW
          </p>
        </div>
      </div>
    </section>
  );
}

function SlideCard({
  slide,
}: {
  slide: {
    number: string;
    tag: string;
    title: string;
    description: string;
  };
}) {
  return (
    <div className="campus-slide group relative flex h-[400px] w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-[#d8d0c0] bg-[#f8f5ee] p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl md:w-[400px] md:p-10">
      {/* LARGE BACKGROUND NUMBER */}
      <div className="pointer-events-none absolute -right-4 -top-8 select-none text-[170px] font-black leading-none tracking-[-0.1em] text-[#eee7da] transition-transform duration-700 group-hover:scale-110 group-hover:text-[#e8dfd0]">
        {slide.number}
      </div>

      {/* TOP */}
      <div className="relative z-10">
        <div
          className="text-7xl font-bold leading-none text-[#f8f5ee]"
          style={{
            WebkitTextStroke: "1.5px #24211e",
          }}
        >
          {slide.number}
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-[#74695c]">
          {slide.tag}
        </p>

        <h3 className="mb-4 font-[var(--font-manrope)] text-3xl font-bold tracking-tight text-[#24211e]">
          {slide.title}
        </h3>

        <p className="max-w-sm text-sm leading-7 text-[#74695c]">
          {slide.description}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 border-t border-[#d8d0c0] pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-[#d6613f]">
            DRONAHUB FLOW
          </p>

          <span className="text-lg text-[#d6613f] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="mt-3 h-px w-full overflow-hidden bg-[#d8d0c0]">
          <div className="h-full w-1/3 bg-[#d6613f] transition-all duration-500 group-hover:w-full" />
        </div>
      </div>

      {/* HOVER BOTTOM LINE */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#d6613f] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}