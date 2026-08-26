"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Career = {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  skills: string[];
  tools: string[];
  projects: string[];
  day: string[];
  difficulty: number;
  creativity: number;
  growth: number;
};

const careers: Career[] = [
  {
    id: "software",
    title: "Software Development",
    shortTitle: "Software Dev",
    tagline: "Build things people actually use.",
    description:
      "Create websites, applications and digital products. A great path if you enjoy solving problems and turning ideas into working software.",
    skills: ["Programming", "DSA", "Frontend", "Backend"],
    tools: ["JavaScript", "React", "Node.js", "Git"],
    projects: [
      "Student resource platform",
      "Real-time chat application",
      "Full-stack e-commerce app",
    ],
    day: ["Write code", "Solve problems", "Build features", "Debug"],
    difficulty: 75,
    creativity: 70,
    growth: 95,
  },
  {
    id: "data-ai",
    title: "Data & AI",
    shortTitle: "Data & AI",
    tagline: "Turn data into intelligence.",
    description:
      "Work with data, patterns and machine learning to build systems that can analyse, predict and automate decisions.",
    skills: ["Python", "Statistics", "Machine Learning", "SQL"],
    tools: ["Python", "Pandas", "TensorFlow", "SQL"],
    projects: [
      "Student performance predictor",
      "AI recommendation system",
      "Image classification model",
    ],
    day: ["Analyse data", "Train models", "Find patterns", "Test results"],
    difficulty: 85,
    creativity: 75,
    growth: 98,
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    tagline: "Think like an attacker. Protect like a defender.",
    description:
      "Understand systems, networks and vulnerabilities to protect applications and digital infrastructure.",
    skills: ["Networking", "Linux", "Web Security", "Ethical Hacking"],
    tools: ["Linux", "Wireshark", "Burp Suite", "Nmap"],
    projects: [
      "Network vulnerability scanner",
      "Secure login system",
      "Website security audit",
    ],
    day: [
      "Test systems",
      "Find vulnerabilities",
      "Analyse traffic",
      "Secure apps",
    ],
    difficulty: 88,
    creativity: 80,
    growth: 92,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    tagline: "Build once. Deploy everywhere.",
    description:
      "Manage infrastructure, automate deployments and help applications scale reliably.",
    skills: ["Linux", "Cloud", "Docker", "Automation"],
    tools: ["AWS", "Docker", "GitHub Actions", "Kubernetes"],
    projects: [
      "Deploy a full-stack application",
      "Automated CI/CD pipeline",
      "Containerized microservice",
    ],
    day: [
      "Deploy apps",
      "Automate workflows",
      "Monitor systems",
      "Scale services",
    ],
    difficulty: 80,
    creativity: 65,
    growth: 96,
  },
  {
    id: "design",
    title: "UI / UX Design",
    shortTitle: "UI / UX",
    tagline: "Make technology feel simple.",
    description:
      "Research users, design interfaces and create digital experiences that are useful and enjoyable.",
    skills: ["Visual Design", "UX Research", "Wireframing", "Prototyping"],
    tools: ["Figma", "FigJam", "Framer", "Notion"],
    projects: [
      "Redesign a college portal",
      "Mobile app prototype",
      "Complete product case study",
    ],
    day: ["Research users", "Design screens", "Test ideas", "Improve flows"],
    difficulty: 65,
    creativity: 98,
    growth: 88,
  },
  {
    id: "product",
    title: "Product Management",
    shortTitle: "Product",
    tagline: "Turn ideas into products.",
    description:
      "Understand users, identify problems and guide teams towards building useful products.",
    skills: ["Research", "Strategy", "Communication", "Analytics"],
    tools: ["Notion", "Figma", "Jira", "Analytics"],
    projects: [
      "Product case study",
      "Campus app improvement plan",
      "Feature launch strategy",
    ],
    day: ["Talk to users", "Plan features", "Analyse metrics", "Guide teams"],
    difficulty: 72,
    creativity: 90,
    growth: 94,
  },
];

const questions = [
  {
    question: "What sounds most interesting to you?",
    options: [
      { label: "Building apps", career: "software" },
      { label: "Working with AI", career: "data-ai" },
      { label: "Breaking & securing systems", career: "cyber" },
      { label: "Designing experiences", career: "design" },
    ],
  },
  {
    question: "Which type of problem do you enjoy?",
    options: [
      { label: "Logical problems", career: "software" },
      { label: "Finding patterns", career: "data-ai" },
      { label: "Finding vulnerabilities", career: "cyber" },
      { label: "Understanding people", career: "product" },
    ],
  },
  {
    question: "What would you rather create?",
    options: [
      { label: "A web application", career: "software" },
      { label: "An AI model", career: "data-ai" },
      { label: "A secure system", career: "cyber" },
      { label: "A beautiful interface", career: "design" },
    ],
  },
];

export default function CareersPage() {
  const [activeCareer, setActiveCareer] = useState<Career>(careers[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<Career | null>(null);

  function selectCareer(career: Career) {
    setActiveCareer(career);
    setQuizResult(null);

    setTimeout(() => {
      document
        .getElementById("career-details")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  function answerQuestion(careerId: string) {
    const updatedScores = {
      ...scores,
      [careerId]: (scores[careerId] || 0) + 1,
    };

    setScores(updatedScores);

    if (questionIndex === questions.length - 1) {
      const winnerId = Object.entries(updatedScores).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      const winner =
        careers.find((career) => career.id === winnerId) || careers[0];

      setQuizResult(winner);
      setActiveCareer(winner);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  }

  function resetQuiz() {
    setQuestionIndex(0);
    setScores({});
    setQuizResult(null);
    setShowQuiz(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#1b1816]">
      {/* BACKGROUND */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #bfb6a8 1px, transparent 1px),
            linear-gradient(to bottom, #bfb6a8 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <section className="relative mx-auto max-w-[1450px] px-6 py-10 md:px-10 md:py-14">
        {/* HERO */}
        <div className="border-b border-[#ddd4c5] pb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.3em] text-[#c85d3c]"
          >
            DRONAHUB / CAREER EXPLORER
          </motion.p>

          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="max-w-4xl"
            >
              <h1 className="font-[var(--font-manrope)] text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-[#1b1816] md:text-7xl">
                Don&apos;t just pick
                <br />
                a career.
                <br />

                <span className="font-['Instrument_Serif'] font-normal italic tracking-normal text-[#c85d3c]">
                  Explore it first.
                </span>
              </h1>
            </motion.div>

            <button
              onClick={() => {
                setShowQuiz(true);
                setQuestionIndex(0);
                setScores({});
                setQuizResult(null);
              }}
              className="group flex items-center gap-4 rounded-full bg-[#1b1816] py-2 pl-6 pr-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#c85d3c] hover:shadow-lg"
            >
              Find your match

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c85d3c] text-lg transition-all duration-300 group-hover:rotate-12 group-hover:bg-white group-hover:text-[#1b1816]">
                →
              </span>
            </button>
          </div>
        </div>

        {/* CAREER CARDS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, index) => {
            const isActive = activeCareer.id === career.id;

            return (
              <motion.button
                key={career.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => selectCareer(career)}
                className={`group relative min-h-[235px] overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#c85d3c] bg-[#fffaf3] shadow-[0_20px_55px_rgba(200,93,60,0.16)]"
                    : "border-[#e0d8cb] bg-[#fbf8f2] hover:border-[#d9a18e] hover:bg-white hover:shadow-[0_16px_45px_rgba(30,25,20,0.08)]"
                }`}
              >
                {/* NUMBER */}
                <span
                  className={`absolute right-5 top-2 font-[var(--font-manrope)] text-7xl font-extrabold tracking-[-0.06em] ${
                    isActive
                      ? "text-[#c85d3c]/[0.08]"
                      : "text-[#1b1816]/[0.035]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ACTIVE ACCENT */}
                {isActive && (
                  <motion.div
                    layoutId="active-line"
                    className="absolute left-0 top-0 h-full w-[5px] bg-[#c85d3c]"
                  />
                )}

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-[#f6e5dc] px-3 py-1 text-[9px] font-bold tracking-[0.18em] text-[#c85d3c]">
                      {isActive ? "SELECTED PATH" : "CAREER PATH"}
                    </span>

                    <h2 className="mt-5 font-[var(--font-manrope)] text-[26px] font-extrabold tracking-[-0.035em] text-[#1b1816]">
                      {career.title}
                    </h2>

                    <p className="mt-3 max-w-[280px] text-sm leading-6 text-[#766d63]">
                      {career.tagline}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {career.skills.slice(0, 3).map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className={`flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-[9px] font-extrabold ${
                            isActive
                              ? "border-white bg-[#1b1816] text-white"
                              : "border-[#fbf8f2] bg-[#eee8de] text-[#1b1816]"
                          }`}
                          style={{
                            transform: `translateX(${skillIndex * 2}px)`,
                          }}
                        >
                          {skill.slice(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 group-hover:translate-x-1 ${
                        isActive
                          ? "bg-[#c85d3c] text-white"
                          : "bg-[#eee8de] text-[#1b1816] group-hover:bg-[#c85d3c] group-hover:text-white"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* CAREER DETAILS */}
        <AnimatePresence mode="wait">
          <motion.section
            id="career-details"
            key={activeCareer.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="mt-10 scroll-mt-8"
          >
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              {/* MAIN INFO */}
              <div className="rounded-[32px] border border-[#e0d8cb] bg-white p-7 shadow-[0_12px_40px_rgba(30,25,20,0.04)] md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.24em] text-[#c85d3c]">
                      EXPLORE THE ROLE
                    </p>

                    <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-extrabold tracking-[-0.04em] text-[#1b1816] md:text-5xl">
                      {activeCareer.title}
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e6dd] text-2xl text-[#c85d3c]">
                    ↗
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#766d63]">
                  {activeCareer.description}
                </p>

                {/* SKILLS */}
                <div className="mt-9">
                  <p className="text-[10px] font-bold tracking-[0.22em] text-[#766d63]">
                    WHAT YOU&apos;LL LEARN
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeCareer.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{
                          y: -4,
                          rotate: index % 2 === 0 ? -2 : 2,
                        }}
                        className="rounded-full border border-[#e4dbcf] bg-[#faf6ef] px-5 py-3 text-sm font-bold text-[#1b1816]"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DAY IN ROLE */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold tracking-[0.22em] text-[#766d63]">
                      A DAY IN THIS ROLE
                    </p>

                    <span className="text-xs font-bold text-[#c85d3c]">
                      REAL WORK
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {activeCareer.day.map((item, index) => (
                      <motion.div
                        key={item}
                        whileHover={{ y: -5 }}
                        className="rounded-2xl border border-[#e7dfd3] bg-[#fcfaf6] p-4 transition hover:border-[#d9a18e]"
                      >
                        <span className="text-xs font-extrabold text-[#c85d3c]">
                          0{index + 1}
                        </span>

                        <p className="mt-5 text-sm font-bold leading-5 text-[#1b1816]">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CAREER DNA */}
              <div className="rounded-[32px] border border-[#ecd7cb] bg-[#f8e8df] p-7 md:p-9">
                <p className="text-[10px] font-bold tracking-[0.24em] text-[#c85d3c]">
                  CAREER DNA
                </p>

                <h3 className="mt-3 font-[var(--font-manrope)] text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#1b1816]">
                  Is this your kind of challenge?
                </h3>

                <div className="mt-10 space-y-7">
                  <Meter
                    label="Technical Challenge"
                    value={activeCareer.difficulty}
                  />

                  <Meter
                    label="Creative Freedom"
                    value={activeCareer.creativity}
                  />

                  <Meter
                    label="Future Growth"
                    value={activeCareer.growth}
                  />
                </div>

                <div className="mt-10 rounded-[24px] border border-white/70 bg-white/70 p-5">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#766d63]">
                    TOOLS YOU&apos;LL MEET
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeCareer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-[#1b1816] px-3 py-2 text-xs font-semibold text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT IDEAS */}
            <div className="mt-5 rounded-[32px] border border-[#e0d8cb] bg-[#fbf8f2] p-7 md:p-9">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.24em] text-[#c85d3c]">
                    BUILD SOMETHING
                  </p>

                  <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-extrabold tracking-[-0.035em] text-[#1b1816]">
                    Projects worth putting in your portfolio.
                  </h2>
                </div>

                <p className="text-sm text-[#766d63]">
                  Learn by building, not just watching.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {activeCareer.projects.map((project, index) => (
                  <motion.div
                    key={project}
                    whileHover={{ y: -6 }}
                    className="group rounded-[24px] border border-transparent bg-white p-6 transition-all duration-300 hover:border-[#e4b09d] hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wide text-[#c85d3c]">
                        PROJECT 0{index + 1}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3eee6] transition-all group-hover:rotate-45 group-hover:bg-[#c85d3c] group-hover:text-white">
                        ↗
                      </span>
                    </div>

                    <h3 className="mt-10 font-[var(--font-manrope)] text-xl font-extrabold leading-7 tracking-[-0.025em] text-[#1b1816]">
                      {project}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </section>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1b1816]/40 p-5 backdrop-blur-md"
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-[32px] bg-[#f8f4ec] p-7 shadow-2xl md:p-10"
            >
              {!quizResult ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.24em] text-[#c85d3c]">
                        CAREER MATCH
                      </p>

                      <p className="mt-2 text-xs text-[#766d63]">
                        QUESTION {questionIndex + 1} OF {questions.length}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowQuiz(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd4c5] text-xl text-[#1b1816] transition hover:bg-white"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e3dbcf]">
                    <motion.div
                      animate={{
                        width: `${
                          ((questionIndex + 1) / questions.length) * 100
                        }%`,
                      }}
                      className="h-full rounded-full bg-[#c85d3c]"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="mt-10"
                    >
                      <h2 className="font-[var(--font-manrope)] text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#1b1816] md:text-4xl">
                        {questions[questionIndex].question}
                      </h2>

                      <div className="mt-8 grid gap-3 md:grid-cols-2">
                        {questions[questionIndex].options.map((option) => (
                          <button
                            key={option.label}
                            onClick={() => answerQuestion(option.career)}
                            className="rounded-2xl border border-[#e0d8cb] bg-white p-5 text-left text-sm font-bold text-[#1b1816] transition-all duration-300 hover:-translate-y-1 hover:border-[#c85d3c] hover:bg-[#fff8f4] hover:shadow-md"
                          >
                            {option.label}

                            <span className="mt-5 block text-[#c85d3c]">
                              →
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="text-[10px] font-bold tracking-[0.24em] text-[#c85d3c]">
                    YOUR BEST MATCH
                  </p>

                  <h2 className="mt-5 font-[var(--font-manrope)] text-4xl font-extrabold tracking-[-0.04em] text-[#1b1816] md:text-6xl">
                    {quizResult.title}
                  </h2>

                  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#766d63]">
                    Based on your choices, this path seems like a strong
                    starting point for you.
                  </p>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowQuiz(false);

                        setTimeout(() => {
                          document
                            .getElementById("career-details")
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }, 200);
                      }}
                      className="rounded-full bg-[#1b1816] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c85d3c]"
                    >
                      Explore this career →
                    </button>

                    <button
                      onClick={resetQuiz}
                      className="rounded-full border border-[#ddd4c5] bg-white px-6 py-3 text-sm font-bold text-[#1b1816] transition hover:border-[#c85d3c]"
                    >
                      Try again
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Meter({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#1b1816]">
          {label}
        </span>

        <span className="text-sm font-extrabold text-[#c85d3c]">
          {value}%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-[#c85d3c]"
        />
      </div>
    </div>
  );
}