"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    number: "01",
    tag: "ACADEMIC · RESOURCES",
    title: "Everything You Need\nTo Study",
    description:
      "Access semester-wise notes, syllabus and PYQs from one centralized platform with direct PDF and Drive links.",
    year: "DRONA HUB",
  },
  {
    number: "02",
    tag: "CAREER · GROWTH",
    title: "Build Your\nCareer Path",
    description:
      "Explore structured career roadmaps, coding resources and learning paths for different technology domains.",
    year: "DRONA HUB",
  },
  {
    number: "03",
    tag: "SMART · TOOLS",
    title: "More Than\nJust Notes",
    description:
      "Calculate CGPA, interact with the AI chatbot and access useful tools designed to make student life easier.",
    year: "DRONA HUB",
  },
];

export default function BlogPreview() {
  const container = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const path = pathRef.current;
      const timeline = timelineRef.current;
      const c1 = circle1Ref.current;
      const c2 = circle2Ref.current;
      const c3 = circle3Ref.current;

      if (!svg || !path || !timeline || !c1 || !c2 || !c3) return;

      const getCenter = (el: HTMLElement) => {
        const elRect = el.getBoundingClientRect();
        const contRect = timeline.getBoundingClientRect();
        return {
          x: elRect.left - contRect.left + elRect.width / 2,
          y: elRect.top - contRect.top + elRect.height / 2,
        };
      };

      let scrollTween: gsap.core.Tween | null = null;

      const buildPath = () => {
        const contRect = timeline.getBoundingClientRect();
        const w = contRect.width;

        const p1 = getCenter(c1);
        const p2 = getCenter(c2);
        const p3 = getCenter(c3);

        // height stops right after the last circle — no dangling grid below
        const h = p3.y + 160;

        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        svg.setAttribute("width", String(w));
        svg.setAttribute("height", String(h));
        timeline.style.minHeight = `${h}px`;

        const mid12 = (p1.y + p2.y) / 2;
        const mid23 = (p2.y + p3.y) / 2;

        const d = `
          M ${p1.x} ${p1.y}
          L ${p1.x} ${mid12}
          L ${p2.x} ${mid12}
          L ${p2.x} ${p2.y}
          L ${p2.x} ${mid23}
          L ${p3.x} ${mid23}
          L ${p3.x} ${p3.y}
        `;

        path.setAttribute("d", d);

        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        scrollTween?.kill();
        scrollTween = gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
      };

      buildPath();

      const handleResize = () => {
        buildPath();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      gsap.utils.toArray<HTMLElement>(".project-circle").forEach((circle) => {
        gsap.from(circle, {
          scale: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: circle, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-content").forEach((content) => {
        gsap.from(content, {
          opacity: 0,
          y: 35,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: content, start: "top 85%" },
        });
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-[#e9e4d8]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c8c1b3 1px, transparent 1px),
            linear-gradient(to bottom, #c8c1b3 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <div
        ref={timelineRef}
        className="projects-timeline relative mx-auto max-w-[1300px] px-6 pt-24 pb-4 md:px-12 md:pt-36 md:pb-4"
      >
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 z-0"
        >
          <path ref={pathRef} fill="none" stroke="#292722" strokeWidth="2" />
        </svg>

        {/* PROJECT 01 */}
        <div className="relative z-10 min-h-[420px] md:min-h-[480px]">
          <div
            ref={circle1Ref}
            className="project-circle absolute left-0 top-0 z-10 flex h-40 w-40 items-center justify-center rounded-full bg-[#ff4b24] md:h-52 md:w-52"
          >
            <span className="font-mono text-lg tracking-[0.4em] text-white">
              {posts[0].number}
            </span>
          </div>

          <div className="project-content absolute left-[38%] top-[20px] max-w-lg md:top-[30px]">
            <p className="mb-4 font-mono text-xs tracking-[0.35em] text-[#6f6a61]">
              {posts[0].tag}
            </p>
            <h3 className="whitespace-pre-line text-3xl font-semibold leading-[1.05] tracking-tight text-[#252421] md:text-5xl">
              {posts[0].title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#625e56]">
              {posts[0].description}
            </p>
            <p className="mt-4 font-mono text-xs text-[#817b70]">{posts[0].year}</p>
          </div>
        </div>

        {/* PROJECT 02 */}
        <div className="relative z-10 min-h-[420px] md:min-h-[480px]">
          <div className="project-content absolute left-[44%] top-[20px] max-w-lg">
            <p className="mb-4 font-mono text-xs tracking-[0.35em] text-[#6f6a61]">
              {posts[1].tag}
            </p>
            <h3 className="whitespace-pre-line text-3xl font-semibold leading-[1.05] tracking-tight text-[#252421] md:text-5xl">
              {posts[1].title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#625e56]">
              {posts[1].description}
            </p>
            <p className="mt-4 font-mono text-xs text-[#817b70]">{posts[1].year}</p>
          </div>

          <div
            ref={circle2Ref}
            className="project-circle absolute right-[5%] top-0 z-10 flex h-40 w-40 items-center justify-center rounded-full bg-[#ff4b24] md:h-52 md:w-52"
          >
            <span className="font-mono text-lg tracking-[0.4em] text-white">
              {posts[1].number}
            </span>
          </div>
        </div>

        {/* PROJECT 03 */}
        <div className="relative z-10 min-h-[260px] md:min-h-[320px]">
          <div
            ref={circle3Ref}
            className="project-circle absolute left-[12%] top-[60px] z-10 flex h-40 w-40 items-center justify-center rounded-full bg-[#ff4b24] md:h-52 md:w-52"
          >
            <span className="font-mono text-lg tracking-[0.4em] text-white">
              {posts[2].number}
            </span>
          </div>

          <div className="project-content absolute left-[38%] top-[20px] max-w-lg">
            <p className="mb-4 font-mono text-xs tracking-[0.35em] text-[#6f6a61]">
              {posts[2].tag}
            </p>
            <h3 className="whitespace-pre-line text-3xl font-semibold leading-[1.05] tracking-tight text-[#252421] md:text-5xl">
              {posts[2].title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#625e56]">
              {posts[2].description}
            </p>
            <p className="mt-4 font-mono text-xs text-[#817b70]">{posts[2].year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}