"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 400, suffix: "+", label: "RESOURCES SHARED" },
  { num: 6, suffix: "", label: "BRANCHES COVERED" },
  { num: 2026, suffix: "", label: "LAUNCHED" },
];

export default function StatsRow() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      const dividers = gsap.utils.toArray<HTMLElement>(".stat-divider");

      gsap.set(cards, {
        opacity: 0,
        y: 40,
      });

      gsap.set(dividers, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
        .to(
          dividers,
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          numbers,
          {
            opacity: 1,
            duration: 0.2,
          },
          "-=0.5"
        );

      stats.forEach((stat, index) => {
        const element = numbers[index];

        if (!element) return;

        const counter = {
          value: 0,
        };

        gsap.to(counter, {
          value: stat.num,
          duration: stat.num > 1000 ? 2 : 1.6,
          delay: 0.35 + index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            element.textContent = `${Math.floor(
              counter.value
            ).toLocaleString()}${stat.suffix}`;
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden border-y border-[#ddd5c7] bg-[#eee8dc] py-10 md:py-14"
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #cfc6b7 1px, transparent 1px),
            linear-gradient(to bottom, #cfc6b7 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col items-center justify-center md:flex-row">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex w-full items-center justify-center md:w-auto"
          >
            <div className="stat-card group relative min-w-[260px] cursor-default px-8 py-7 text-center md:px-16">
              {/* Number */}
              <div className="overflow-hidden">
                <div
                  className="stat-number font-bold leading-none tracking-tight text-[#d6613f] text-5xl md:text-7xl"
                  style={{ opacity: 0 }}
                >
                  0{stat.suffix}
                </div>
              </div>

              {/* Label */}
              <div className="mt-4 text-[11px] font-bold tracking-[0.28em] text-[#74695c] md:text-xs">
                {stat.label}
              </div>

              {/* Bottom accent */}
              <div className="mx-auto mt-5 h-px w-0 bg-[#d6613f] transition-all duration-500 group-hover:w-16" />
            </div>

            {index < stats.length - 1 && (
              <div className="stat-divider hidden h-20 w-px bg-[#cfc6b7] md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}