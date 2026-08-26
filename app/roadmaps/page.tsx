"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type RoadmapItem = {
  title: string;
  description: string;
};

type Roadmap = {
  id: string;
  title: string;
  category: string;
  items: RoadmapItem[];
};

const roadmapStyles = [
  {
    number: "01",
    label: "START",
    accent: "#d6613f",
  },
  {
    number: "02",
    label: "BUILD",
    accent: "#14110f",
  },
  {
    number: "03",
    label: "GROW",
    accent: "#74695c",
  },
];

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [active, setActive] = useState<Roadmap | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoadmaps() {
      setLoading(true);

      const { data, error } = await supabase
        .from("roadmaps")
        .select("*");

      if (!error && data) {
        const loadedRoadmaps = data as Roadmap[];

        setRoadmaps(loadedRoadmaps);

        if (loadedRoadmaps.length > 0) {
          setActive(loadedRoadmaps[0]);
        }
      }

      setLoading(false);
    }

    loadRoadmaps();
  }, []);

  function toggle(index: number) {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  function changeRoadmap(roadmap: Roadmap) {
    setActive(roadmap);
    setChecked({});
  }

  const doneCount = active
    ? Object.values(checked).filter(Boolean).length
    : 0;

  const total = active?.items?.length || 0;

  const percentage =
    total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3eee1]">
      {/* BACKGROUND GRID */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c8c1b3 1px, transparent 1px),
            linear-gradient(to bottom, #c8c1b3 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <section className="relative px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1450px]">

          {/* HEADER */}
          <div className="mb-10 border-b border-[#d8d0c0] pb-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold tracking-[0.28em] text-[#d6613f]"
            >
              DRONAHUB / ROADMAPS
            </motion.p>

            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                <h1 className="font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f] md:text-6xl">
                  Learn with a{" "}
                  <span className="font-['Instrument_Serif'] italic font-normal text-[#d6613f]">
                    direction
                  </span>
                  .
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="max-w-md text-sm leading-6 text-[#74695c]"
              >
                No random topics. No guessing what comes next.
                Follow a structured path and track your progress as you learn.
              </motion.p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d6613f] border-t-transparent" />
            </div>
          ) : roadmaps.length === 0 ? (
            <div className="flex min-h-[350px] items-center justify-center rounded-[32px] border border-dashed border-[#cfc6b7] bg-white/40">
              <p className="text-sm font-medium text-[#74695c]">
                No roadmaps available yet.
              </p>
            </div>
          ) : (
            <>
              {/* ROADMAP SELECTOR */}
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {roadmaps.map((roadmap, index) => {
                  const style =
                    roadmapStyles[index % roadmapStyles.length];

                  const isActive = active?.id === roadmap.id;

                  return (
                    <motion.button
                      key={roadmap.id}
                      onClick={() => changeRoadmap(roadmap)}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-[28px] border p-6 text-left transition-all ${
                        isActive
                          ? "border-[#14110f] bg-white shadow-lg"
                          : "border-[#ded6c8] bg-[#fbf8f1] hover:border-[#d6613f]"
                      }`}
                    >
                      {/* BIG BACKGROUND NUMBER */}
                      <span className="absolute right-4 top-1 font-[var(--font-manrope)] text-7xl font-bold text-[#14110f]/[0.04]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* ACTIVE LINE */}
                      <motion.div
                        initial={false}
                        animate={{
                          width: isActive ? "100%" : "0%",
                        }}
                        className="absolute bottom-0 left-0 h-1 bg-[#d6613f]"
                      />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-bold tracking-[0.22em]"
                            style={{ color: style.accent }}
                          >
                            {style.label}
                          </span>

                          {isActive && (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14110f] text-xs text-white">
                              ✓
                            </span>
                          )}
                        </div>

                        <h2 className="mt-8 font-[var(--font-manrope)] text-2xl font-bold text-[#14110f]">
                          {roadmap.title}
                        </h2>

                        <p className="mt-2 text-sm text-[#74695c]">
                          {roadmap.category || "Structured learning path"}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#74695c]">
                          <span>
                            {roadmap.items?.length || 0} STEPS
                          </span>

                          <span className="text-[#d8d0c0]">/</span>

                          <span
                            className={
                              isActive
                                ? "text-[#d6613f]"
                                : ""
                            }
                          >
                            EXPLORE →
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* ACTIVE ROADMAP */}
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35 }}
                    className="grid gap-6 lg:grid-cols-[0.72fr_1.6fr]"
                  >
                    {/* LEFT PROGRESS CARD */}
                    <div className="relative overflow-hidden rounded-[30px] border border-[#ded6c8] bg-[#fbf8f1] p-7 lg:sticky lg:top-8 lg:h-fit">
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#d6613f]/20" />
                      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#d6613f]/30" />

                      <div className="relative">
                        <p className="text-[10px] font-bold tracking-[0.24em] text-[#d6613f]">
                          YOUR PROGRESS
                        </p>

                        <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-bold text-[#14110f]">
                          {active.title}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#74695c]">
                          Complete each step as you move through the roadmap.
                          Your progress resets when you switch roadmaps.
                        </p>

                        {/* PROGRESS CIRCLE */}
                        <div className="mt-8 flex items-center gap-5">
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-[#e5ded1]">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center"
                            >
                              <p className="font-[var(--font-manrope)] text-2xl font-bold text-[#14110f]">
                                {percentage}%
                              </p>

                              <p className="text-[9px] font-bold tracking-wider text-[#74695c]">
                                DONE
                              </p>
                            </motion.div>
                          </div>

                          <div>
                            <p className="font-[var(--font-manrope)] text-2xl font-bold text-[#14110f]">
                              {doneCount}
                              <span className="text-[#b8afa1]">
                                /{total}
                              </span>
                            </p>

                            <p className="mt-1 text-xs text-[#74695c]">
                              steps completed
                            </p>
                          </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mt-8">
                          <div className="mb-2 flex justify-between text-[10px] font-bold tracking-wider text-[#74695c]">
                            <span>START</span>
                            <span>FINISH</span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-[#e4ddd0]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{
                                duration: 0.6,
                                ease: "easeOut",
                              }}
                              className="h-full rounded-full bg-[#d6613f]"
                            />
                          </div>
                        </div>

                        <div className="mt-8 border-t border-[#ddd5c8] pt-6">
                          <p className="text-xs leading-5 text-[#74695c]">
                            Small progress still counts. Finish one step,
                            then move to the next.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="overflow-hidden rounded-[30px] border border-[#ded6c8] bg-white">
                      <div className="flex flex-col gap-4 border-b border-[#ece6da] bg-[#fcfaf6] p-7 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.22em] text-[#d6613f]">
                            LEARNING PATH
                          </p>

                          <h2 className="mt-2 font-[var(--font-manrope)] text-2xl font-bold text-[#14110f]">
                            Follow the steps.
                          </h2>
                        </div>

                        <div className="rounded-full bg-[#f3eee1] px-4 py-2 text-[10px] font-bold tracking-wider text-[#74695c]">
                          {total} TOTAL STEPS
                        </div>
                      </div>

                      <div className="relative p-5 md:p-7">
                        {/* VERTICAL LINE */}
                        <div className="absolute left-[38px] top-10 bottom-10 w-px bg-[#e6dfd0] md:left-[48px]" />

                        <div className="relative space-y-4">
                          {active.items?.map((item, index) => {
                            const isDone = checked[index];

                            return (
                              <motion.button
                                key={index}
                                onClick={() => toggle(index)}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                }}
                                whileHover={{ x: 5 }}
                                className={`group relative flex w-full items-start gap-5 rounded-[22px] border p-5 text-left transition-all ${
                                  isDone
                                    ? "border-[#d6613f]/40 bg-[#fff7f2]"
                                    : "border-[#ece6da] bg-white hover:border-[#d6613f]"
                                }`}
                              >
                                {/* STEP NUMBER */}
                                <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border bg-white text-xs font-bold">
                                  {isDone ? (
                                    <span className="text-[#d6613f]">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="text-[#14110f]">
                                      {String(index + 1).padStart(2, "0")}
                                    </span>
                                  )}
                                </div>

                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <h3
                                        className={`font-[var(--font-manrope)] text-base font-bold transition ${
                                          isDone
                                            ? "text-[#74695c] line-through"
                                            : "text-[#14110f]"
                                        }`}
                                      >
                                        {item.title}
                                      </h3>

                                      <p className="mt-2 text-sm leading-6 text-[#74695c]">
                                        {item.description}
                                      </p>
                                    </div>

                                    <span
                                      className={`text-lg transition ${
                                        isDone
                                          ? "text-[#d6613f]"
                                          : "text-[#b8afa1] group-hover:translate-x-1 group-hover:text-[#d6613f]"
                                      }`}
                                    >
                                      {isDone ? "✓" : "→"}
                                    </span>
                                  </div>

                                  <div className="mt-4 flex items-center gap-2">
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isDone
                                          ? "bg-[#d6613f]"
                                          : "bg-[#d8d0c0]"
                                      }`}
                                    />

                                    <span className="text-[9px] font-bold tracking-[0.18em] text-[#9a9185]">
                                      {isDone
                                        ? "COMPLETED"
                                        : "CLICK WHEN COMPLETE"}
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </main>
  );
}