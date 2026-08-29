"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
};

type Resource = {
  id: string;
  title: string;
  type: "pyq" | "notes" | "syllabus";
  branch: string;
  semester: number;
  subject: string;
  year: number | null;
  file_url: string | null;
  direct_link: string | null;
  status: string;
  uploaded_by: string | null;
  category: string | null;
  profiles: Profile | null;
};

type Step = "branch" | "semester" | "subject" | "papers";
type ResourceType = "pyq" | "notes" | "syllabus";

const PRIORITY_BRANCHES = [
  "First Year Common",
  "CSE",
  "CSE AI & IoT",
  "CSIT",
  "EEE",
];

const CATEGORY_ORDER: Record<ResourceType, string[]> = {
  pyq: [
    "University Paper",
    "Sessional Paper",
    "Pre-University Paper",
  ],
  notes: [
    "Cheat Sheet",
    "Unit 1 Notes",
    "Unit 2 Notes",
    "Unit 3 Notes",
    "Unit 4 Notes",
    "Unit 5 Notes",
    "Important Questions",
  ],
  syllabus: [
    "Syllabus",
  ],
};

export default function ResourcesPage() {
  const [all, setAll] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const [resourceType, setResourceType] =
    useState<ResourceType>("pyq");

  const [showNotesPopup, setShowNotesPopup] = useState(false);

  const [step, setStep] = useState<Step>("branch");

  const [branch, setBranch] = useState<string | null>(null);
  const [semester, setSemester] = useState<number | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState("");

  useEffect(() => {
    async function loadResources() {
      setLoading(true);

      const { data, error } = await supabase
        .from("resources")
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq("status", "approved")
        .in("type", ["pyq", "notes", "syllabus"]);

      if (!error && data) {
        setAll(data as Resource[]);
      } else if (error) {
        console.error("Error loading resources:", error);
      }

      setLoading(false);
    }

    loadResources();
  }, []);

  /* --------------------------------
     TYPE FILTER
  -------------------------------- */

  const filtered = all.filter(
    (resource) => resource.type === resourceType
  );

  /* --------------------------------
     BRANCHES
  -------------------------------- */

  const branches = Array.from(
    new Set([
      "First Year Common",
      ...filtered.map((resource) => resource.branch),
    ])
  ).sort((a, b) => {
    if (a === "First Year Common") return -1;
    if (b === "First Year Common") return 1;

    const aPriority = PRIORITY_BRANCHES.indexOf(a);
    const bPriority = PRIORITY_BRANCHES.indexOf(b);

    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }

    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return a.localeCompare(b);
  });

  /* --------------------------------
     SEMESTERS
  -------------------------------- */

  const semesters = branch
    ? branch === "First Year Common"
      ? [1, 2]
      : Array.from(
          new Set(
            filtered
              .filter((resource) => resource.branch === branch)
              .map((resource) => resource.semester)
          )
        ).sort((a, b) => a - b)
    : [];

  /* --------------------------------
     SUBJECTS
  -------------------------------- */

  const subjects =
    branch && semester
      ? Array.from(
          new Set(
            filtered
              .filter(
                (resource) =>
                  resource.branch === branch &&
                  resource.semester === semester
              )
              .map((resource) => resource.subject)
          )
        ).sort()
      : [];

  /* --------------------------------
     RESOURCES FOR SUBJECT
  -------------------------------- */

  const resources =
    branch && semester && subject
      ? filtered
          .filter(
            (resource) =>
              resource.branch === branch &&
              resource.semester === semester &&
              resource.subject === subject
          )
          .sort((a, b) => {
            const aCategory = a.category || a.title;
            const bCategory = b.category || b.title;

            const order = CATEGORY_ORDER[resourceType];

            const aIndex = order.indexOf(aCategory);
            const bIndex = order.indexOf(bCategory);

            if (aIndex !== -1 && bIndex !== -1) {
              return aIndex - bIndex;
            }

            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            return (b.year || 0) - (a.year || 0);
          })
      : [];

  /* --------------------------------
     GROUP BY CATEGORY
  -------------------------------- */

  const groupedResources = resources.reduce(
    (groups, resource) => {
      const category =
        resource.category?.trim() || resource.title;

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(resource);

      return groups;
    },
    {} as Record<string, Resource[]>
  );

  const categoryGroups = Object.entries(groupedResources);

  /* --------------------------------
     SWITCH TYPE
  -------------------------------- */

  function switchType(type: ResourceType) {
    setResourceType(type);

    setBranch(null);
    setSemester(null);
    setSubject(null);
    setStep("branch");

    if (type === "notes") {
      const hasSeenPopup =
        sessionStorage.getItem("notes-popup-seen");

      if (!hasSeenPopup) {
        setShowNotesPopup(true);

        sessionStorage.setItem(
          "notes-popup-seen",
          "true"
        );
      }
    }
  }

  function selectBranch(selectedBranch: string) {
    setBranch(selectedBranch);
    setSemester(null);
    setSubject(null);
    setStep("semester");
  }

  function selectSemester(selectedSemester: number) {
    setSemester(selectedSemester);
    setSubject(null);
    setStep("subject");
  }

  function selectSubject(selectedSubject: string) {
    setSubject(selectedSubject);
    setStep("papers");
  }

  function goBack() {
    if (step === "semester") {
      setBranch(null);
      setSemester(null);
      setSubject(null);
      setStep("branch");
    }

    if (step === "subject") {
      setSemester(null);
      setSubject(null);
      setStep("semester");
    }

    if (step === "papers") {
      setSubject(null);
      setStep("subject");
    }
  }

  function openResource(resource: Resource) {
    const url =
      resource.file_url ||
      resource.direct_link;

    if (!url) return;

    setViewerUrl(url);
    setViewerTitle(resource.title);
  }

  const resourceName =
    resourceType === "pyq"
      ? "PYQs"
      : resourceType === "notes"
      ? "Notes"
      : "Syllabus";

  const title =
    step === "branch"
      ? `Browse ${resourceName}.`
      : step === "semester"
      ? `${branch}.`
      : step === "subject"
      ? `Semester ${semester}.`
      : subject || "Resources.";

  const subtitle =
    step === "branch"
      ? resourceType === "notes"
        ? "Community notes, built by students for students."
        : `Select your branch to browse ${resourceName.toLowerCase()}.`
      : step === "semester"
      ? branch === "First Year Common"
        ? "Choose Semester 1 or Semester 2."
        : "Choose your semester."
      : step === "subject"
      ? "Select a subject to view available resources."
      : `Open the ${resourceName.toLowerCase()} you need.`;

  return (
    <main className="min-h-screen bg-[#f3eee1]">
      <section className="relative overflow-hidden px-6 pb-16 pt-10 md:px-10">
        {/* GRID */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #c8c1b3 1px, transparent 1px),
              linear-gradient(to bottom, #c8c1b3 1px, transparent 1px)
            `,
            backgroundSize: "55px 55px",
          }}
        />

        <div className="relative mx-auto max-w-[1450px]">
          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-6 border-b border-[#d8d0c0] pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 text-[11px] font-bold tracking-[0.25em] text-[#d6613f]"
              >
                DRONAHUB / RESOURCES
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f] md:text-6xl"
              >
                {title}
              </motion.h1>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#74695c]">
              {subtitle}
            </p>
          </div>

          {/* TOP CONTROLS */}
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* PYQ / NOTES / SYLLABUS FILTER */}
            <div className="inline-flex w-fit flex-wrap rounded-full border border-[#d8d0c0] bg-white/70 p-1">
              <button
                onClick={() => switchType("pyq")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  resourceType === "pyq"
                    ? "bg-[#14110f] text-white shadow-md"
                    : "text-[#74695c] hover:text-[#14110f]"
                }`}
              >
                PYQs
              </button>

              <button
                onClick={() => switchType("notes")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  resourceType === "notes"
                    ? "bg-[#14110f] text-white shadow-md"
                    : "text-[#74695c] hover:text-[#14110f]"
                }`}
              >
                Notes
              </button>

              <button
                onClick={() => switchType("syllabus")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  resourceType === "syllabus"
                    ? "bg-[#14110f] text-white shadow-md"
                    : "text-[#74695c] hover:text-[#14110f]"
                }`}
              >
                Syllabus
              </button>
            </div>

            {/* BREADCRUMB */}
            {step !== "branch" && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-[#74695c]">
                <button
                  onClick={() => {
                    setBranch(null);
                    setSemester(null);
                    setSubject(null);
                    setStep("branch");
                  }}
                  className="hover:text-[#d6613f]"
                >
                  BRANCH
                </button>

                {branch && (
                  <>
                    <span>/</span>

                    <button
                      onClick={() => {
                        setSemester(null);
                        setSubject(null);
                        setStep("semester");
                      }}
                      className="hover:text-[#d6613f]"
                    >
                      {branch}
                    </button>
                  </>
                )}

                {semester && (
                  <>
                    <span>/</span>

                    <button
                      onClick={() => {
                        setSubject(null);
                        setStep("subject");
                      }}
                      className="hover:text-[#d6613f]"
                    >
                      SEM {semester}
                    </button>
                  </>
                )}

                {subject && (
                  <>
                    <span>/</span>

                    <span className="max-w-[180px] truncate text-[#14110f]">
                      {subject}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* BACK */}
          {step !== "branch" && (
            <button
              onClick={goBack}
              className="mb-5 text-sm font-semibold text-[#74695c] transition hover:text-[#d6613f]"
            >
              ← Back
            </button>
          )}

          {/* CONTENT */}
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#d6613f] border-t-transparent" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* BRANCHES */}
              {step === "branch" && (
                <motion.div
                  key="branches"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {branches.map((item, index) => {
                    const isFirstYear =
                      item === "First Year Common";

                    return (
                      <motion.button
                        key={item}
                        onClick={() =>
                          selectBranch(item)
                        }
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative min-h-[180px] overflow-hidden rounded-[24px] border p-6 text-left shadow-sm transition ${
                          isFirstYear
                            ? "border-[#d6613f]/60 bg-[#fff4ef] hover:border-[#d6613f]"
                            : "border-[#ded6c8] bg-[#fbf8f1] hover:border-[#d6613f]"
                        }`}
                      >
                        <span className="absolute right-5 top-4 text-6xl font-bold text-[#14110f]/[0.04]">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div className="flex h-full flex-col justify-between">
                          <span className="text-xs font-bold tracking-[0.2em] text-[#d6613f]">
                            {isFirstYear
                              ? "COMMON YEAR"
                              : "BRANCH"}
                          </span>

                          <div>
                            <h2 className="font-[var(--font-manrope)] text-2xl font-bold text-[#14110f]">
                              {item}
                            </h2>

                            {isFirstYear && (
                              <p className="mt-2 text-xs text-[#74695c]">
                                Semester 1 & Semester 2
                              </p>
                            )}

                            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#74695c] transition group-hover:text-[#d6613f]">
                              Explore
                              <span className="transition-transform group-hover:translate-x-2">
                                →
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {/* SEMESTERS */}
              {step === "semester" && (
                <motion.div
                  key="semesters"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                >
                  {semesters.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() =>
                        selectSemester(item)
                      }
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group rounded-[22px] border border-[#ded6c8] bg-white p-6 text-left transition hover:border-[#d6613f]"
                    >
                      <p className="text-xs font-bold tracking-[0.2em] text-[#d6613f]">
                        SEMESTER
                      </p>

                      <div className="mt-5 flex items-end justify-between">
                        <h2 className="font-[var(--font-manrope)] text-4xl font-bold text-[#14110f]">
                          {String(item).padStart(
                            2,
                            "0"
                          )}
                        </h2>

                        <span className="text-xl text-[#74695c] transition group-hover:translate-x-1 group-hover:text-[#d6613f]">
                          →
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* SUBJECTS */}
              {step === "subject" && (
                <motion.div
                  key="subjects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 gap-3 md:grid-cols-2"
                >
                  {subjects.map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() =>
                        selectSubject(item)
                      }
                      whileHover={{ x: 4 }}
                      className="group flex items-center justify-between rounded-[18px] border border-[#ded6c8] bg-white px-6 py-5 text-left transition hover:border-[#d6613f]"
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-sm font-bold text-[#d6613f]">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <h2 className="font-[var(--font-manrope)] text-lg font-bold text-[#14110f]">
                          {item}
                        </h2>
                      </div>

                      <span className="text-xl text-[#74695c] transition group-hover:translate-x-2 group-hover:text-[#d6613f]">
                        →
                      </span>
                    </motion.button>
                  ))}

                  {subjects.length === 0 && (
                    <EmptyState text="No subjects available for this semester yet." />
                  )}
                </motion.div>
              )}

              {/* CATEGORY + RESOURCES */}
              {step === "papers" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="overflow-hidden rounded-[24px] border border-[#ded6c8] bg-white"
                >
                  {categoryGroups.map(
                    ([category, categoryResources]) => (
                      <div
                        key={category}
                        className="border-b border-[#ece6da] last:border-b-0"
                      >
                        {/* CATEGORY HEADER */}
                        <div className="flex items-center justify-between bg-[#fbf8f1] px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#d6613f]" />

                            <h3 className="font-[var(--font-manrope)] text-sm font-bold text-[#14110f]">
                              {category}
                            </h3>
                          </div>

                          <span className="text-[10px] font-bold tracking-[0.16em] text-[#a89d8e]">
                            {categoryResources.length}{" "}
                            RESOURCE
                            {categoryResources.length !==
                            1
                              ? "S"
                              : ""}
                          </span>
                        </div>

                        {/* RESOURCE ROWS */}
                        {categoryResources.map(
                          (resource, index) => (
                            <motion.div
                              key={resource.id}
                              initial={{
                                opacity: 0,
                                y: 8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                delay:
                                  index * 0.04,
                              }}
                              className="group flex flex-col gap-4 border-t border-[#f0ebe2] px-6 py-5 md:flex-row md:items-center md:justify-between"
                            >
                              <div className="flex items-center gap-5">
                                <span className="min-w-[50px] text-sm font-bold text-[#d6613f]">
                                  {resource.year ||
                                    "—"}
                                </span>

                                <div>
                                  <h3 className="font-[var(--font-manrope)] text-base font-bold text-[#14110f] md:text-lg">
                                    {resource.title}
                                  </h3>

                                  <p className="mt-1 text-xs text-[#74695c]">
                                    {resourceType ===
                                    "pyq"
                                      ? category
                                      : resourceType ===
                                        "notes"
                                      ? category
                                      : "Syllabus Document"}
                                  </p>

                                  {resource.profiles
                                    ?.full_name && (
                                    <p className="mt-2 text-[11px] font-medium text-[#a89d8e]">
                                      Uploaded by{" "}
                                      <span className="font-semibold text-[#74695c]">
                                        {
                                          resource
                                            .profiles
                                            .full_name
                                        }
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={() =>
                                  openResource(
                                    resource
                                  )
                                }
                                disabled={
                                  !resource.file_url &&
                                  !resource.direct_link
                                }
                                className="w-fit rounded-full border border-[#d8d0c0] px-5 py-2.5 text-xs font-bold tracking-wide text-[#14110f] transition hover:border-[#14110f] hover:bg-[#14110f] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                VIEW →
                              </button>
                            </motion.div>
                          )
                        )}
                      </div>
                    )
                  )}

                  {categoryGroups.length === 0 && (
                    <EmptyState
                      text={
                        resourceType === "notes"
                          ? "Notes for this subject are not available yet."
                          : `No ${resourceName} available yet.`
                      }
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* NOTES POPUP */}
      <AnimatePresence>
        {showNotesPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#14110f]/40 px-5 backdrop-blur-md"
          >
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -25, 0],
                rotate: [0, 20, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[8%] top-[15%] h-24 w-24 rounded-full bg-[#d6613f]/30 blur-xl"
            />

            <motion.div
              animate={{
                x: [0, -35, 0],
                y: [0, 30, 0],
                rotate: [0, -25, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[12%] right-[10%] h-32 w-32 rounded-[35px] bg-[#f1b866]/25 blur-xl"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/60 bg-[#fbf8f1] shadow-[0_30px_100px_rgba(20,17,15,0.25)]"
            >
              <div className="border-b border-[#e8dfd0] bg-[#f3eee1] px-7 pb-6 pt-7">
                <p className="text-[10px] font-bold tracking-[0.28em] text-[#d6613f]">
                  DRONAHUB / NOTES
                </p>

                <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-bold tracking-tight text-[#14110f] md:text-4xl">
                  Notes are growing.
                </h2>
              </div>

              <div className="px-7 py-7">
                <p className="max-w-md text-sm leading-7 text-[#74695c]">
                  Our notes collection is still growing.
                  Upload your notes and help make DronaHub
                  more useful for every student.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    [
                      "01",
                      "Upload your notes",
                      "Share useful study material.",
                    ],
                    [
                      "02",
                      "We review it",
                      "Every resource is checked first.",
                    ],
                    [
                      "03",
                      "Students benefit",
                      "Your contribution helps others.",
                    ],
                  ].map(
                    ([number, heading, text], index) => (
                      <motion.div
                        key={number}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.2 + index * 0.12,
                        }}
                        className="flex items-center gap-4 rounded-2xl border border-[#e8dfd0] bg-white px-4 py-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fdf1eb] text-xs font-bold text-[#d6613f]">
                          {number}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#14110f]">
                            {heading}
                          </p>

                          <p className="mt-1 text-xs text-[#74695c]">
                            {text}
                          </p>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() =>
                      setShowNotesPopup(false)
                    }
                    className="rounded-full bg-[#d6613f] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#bf5133]"
                  >
                    Got it, let&apos;s explore →
                  </button>

                  <button
                    onClick={() =>
                      setShowNotesPopup(false)
                    }
                    className="px-4 py-3 text-xs font-semibold text-[#74695c] transition hover:text-[#14110f]"
                  >
                    Maybe later
                  </button>
                </div>
              </div>

              <div className="h-1 bg-[#d6613f]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF VIEWER */}
      <AnimatePresence>
        {viewerUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewerUrl(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-white"
            >
              <div className="flex items-center justify-between border-b border-[#e6dfd0] bg-[#f3eee1] px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#d6613f]">
                    DRONAHUB VIEWER
                  </p>

                  <p className="mt-1 max-w-[70vw] truncate text-sm font-bold text-[#14110f]">
                    {viewerTitle}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setViewerUrl(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14110f] text-lg text-white transition hover:bg-[#d6613f]"
                >
                  ×
                </button>
              </div>

              <iframe
                src={viewerUrl}
                title={viewerTitle}
                className="h-full w-full flex-1"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="col-span-full flex min-h-[200px] items-center justify-center rounded-[24px] border border-dashed border-[#cfc6b7] bg-white/40 px-6 text-center">
      <p className="text-sm font-medium text-[#74695c]">
        {text}
      </p>
    </div>
  );
}