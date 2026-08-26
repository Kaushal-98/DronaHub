"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const floating: Variants = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f1e7] text-[#1c1a18]">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(#d9d1c3 1px, transparent 1px),
            linear-gradient(90deg, #d9d1c3 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-6 md:px-10 md:py-10">
        <section className="relative overflow-hidden rounded-[32px] border border-[#ded5c6] bg-[#f8f4eb]/80 px-7 py-12 md:px-14 md:py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            variants={fadeUp}
            className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]"
          >
            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.35em] text-[#cf623e]">
                  ABOUT DRONAHUB
                </span>
                <span className="h-[1px] w-10 bg-[#cf623e]" />
              </div>

              <h1 className="max-w-3xl font-[var(--font-manrope)] text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                Built for students.
                <br />
                Built by a{" "}
                <span className="font-serif font-normal italic text-[#cf623e]">
                  student.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-[#70695f] md:text-base">
                DronaHub is a student-first platform to discover, share and
                access academic resources — all in one place.
              </p>

              <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-[#ded5c6] bg-white/60 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-[#1c1a18]">1000+</p>
                  <p className="mt-1 text-xs text-[#70695f]">
                    Students trusting DronaHub
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-[#ded5c6] bg-white/60 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-[#cf623e]">∞</p>
                  <p className="mt-1 text-xs text-[#70695f]">
                    Resources growing every day
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="relative flex min-h-[430px] items-end justify-center md:min-h-[540px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-[8%] h-[390px] w-[390px] rounded-full border border-dashed border-[#cf623e]/60 md:h-[500px] md:w-[500px]"
              />

              <div className="absolute top-[10%] h-[350px] w-[350px] rounded-full bg-[#ead7c8] md:h-[460px] md:w-[460px]" />

              <motion.img
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src="/kaushalsharma.jpeg"
                alt="Kaushal Sharma"
                className="relative z-10 h-[430px] object-contain object-bottom md:h-[560px]"
              />

              <motion.div
                variants={floating}
                animate="animate"
                className="absolute bottom-[8%] left-[5%] z-20 rounded-2xl border border-[#ded5c6] bg-[#fffdf8]/90 px-6 py-5 shadow-xl backdrop-blur md:left-[12%]"
              >
                <p className="text-[10px] font-bold tracking-[0.25em] text-[#cf623e]">
                  KAUSHAL SHARMA
                </p>

                <p className="mt-2 text-sm font-medium text-[#70695f]">
                  Founder & Developer
                </p>

                <div className="mt-3 h-[2px] w-8 bg-[#cf623e]" />
              </motion.div>

              <FloatingCard
                className="left-[2%] top-[15%]"
                icon="📖"
                delay={0}
              />

              <FloatingCard
                className="right-[3%] top-[12%]"
                icon="💻"
                delay={1}
              />

              <FloatingCard
                className="right-[1%] top-[55%]"
                icon="🎓"
                delay={2}
              />
            </div>
          </motion.div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] border border-[#ded5c6] bg-white/70 p-8 md:p-10"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#cf623e]">
              THE IDEA
            </p>

            <h2 className="mt-10 font-[var(--font-manrope)] text-4xl font-bold leading-tight">
              One place.
              <br />
              Less searching.
              <br />
              <span className="text-[#cf623e]">More learning.</span>
            </h2>

            <div className="mt-10 h-[1px] w-full bg-[#ded5c6]" />

            <p className="mt-7 max-w-xs text-sm leading-7 text-[#70695f]">
              DronaHub is designed to make academic resources easier to
              discover, share and access.
            </p>

            <div className="absolute bottom-5 right-7 text-6xl opacity-10">
              📚
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeUp}
            className="rounded-[30px] border border-[#ded5c6] bg-white/70 p-8 md:p-10"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#cf623e]">
              WHY I BUILT IT
            </p>

            <div className="mt-8 space-y-8">
              <Story
                number="01"
                text="During college, finding the right study material often meant searching through WhatsApp groups, asking seniors or checking old drives."
              />

              <Story
                number="02"
                text="I wanted to create one organised place where useful resources could stay available for every student who needs them."
              />

              <Story
                number="03"
                text="So I built DronaHub — a platform for PYQs, notes, syllabus, roadmaps and student contributions."
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {["PYQs", "Notes", "Syllabus", "Roadmaps"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#ded5c6] bg-[#f8f4eb] px-5 py-2.5 text-xs font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-6 rounded-[32px] border border-[#ded5c6] bg-white/70 p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-7 sm:flex-row">
              <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border-2 border-[#cf623e]/50 bg-[#ead7c8]">
                <img
                  src="/kaushal.png"
                  alt="Kaushal Sharma"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#cf623e]">
                  BUILT BY
                </p>

                <h2 className="mt-4 font-[var(--font-manrope)] text-3xl font-bold">
                  Kaushal Sharma
                </h2>

                <p className="mt-2 text-sm text-[#70695f]">
                  Founder & Developer of{" "}
                  <span className="font-semibold text-[#cf623e]">
                    DronaHub
                  </span>
                </p>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#70695f]">
                  Building products that solve real problems and make life a
                  little easier for students.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/kaushal-sharma-302900296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#ded5c6] bg-white px-5 py-2.5 text-xs font-semibold transition hover:-translate-y-1 hover:border-[#cf623e]"
                  >
                    LinkedIn ↗
                  </a>

                  <a
                    href="mailto:sharmakaushal77777@gmail.com"
                    className="rounded-full border border-[#ded5c6] bg-white px-5 py-2.5 text-xs font-semibold transition hover:-translate-y-1 hover:border-[#cf623e]"
                  >
                    Email ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ded5c6] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="grid grid-cols-3 divide-x divide-[#ded5c6]">
                <Stat number="1" label="Mission" />
                <Stat number="1000+" label="Students" />
                <Stat number="∞" label="Impact" />
              </div>

              <p className="mt-9 text-[10px] font-bold tracking-[0.3em] text-[#cf623e]">
                TECH USED
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Supabase",
                  "Framer Motion",
                  "React",
                ].map((tech) => (
                  <motion.span
                    whileHover={{ y: -3 }}
                    key={tech}
                    className="rounded-xl border border-[#ded5c6] bg-[#f8f4eb] px-4 py-3 text-xs font-semibold"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#cf623e]">
              SPECIAL THANKS
            </p>

            <h2 className="mt-4 font-serif text-3xl md:text-4xl">
              Grateful for the people who support this journey.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ThanksCard
              emoji="★"
              name="Adarsh Anand"
              text="For constant support and valuable suggestions."
              delay={0}
            />

            <ThanksCard
              emoji="♥"
              name="Rajat Chaurasia"
              text="For being there in every step of this project."
              delay={0.1}
            />

            <ThanksCard
              emoji="✦"
              name="Roshan Jha"
              text="For ideas, motivation and believing in this vision."
              delay={0.2}
            />
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-[32px] border border-[#ded5c6] bg-white/60 p-10 md:p-14"
        >
          <div className="absolute right-10 top-5 text-8xl text-[#cf623e]/10">
            →
          </div>

          <div className="relative max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#cf623e]">
              WHAT&apos;S NEXT
            </p>

            <h2 className="mt-5 font-serif text-4xl md:text-6xl">
              This is just the beginning.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#70695f]">
              DronaHub will continue to grow with more resources, smarter
              features and contributions from students.
            </p>

            <a
              href="/"
              className="mt-8 inline-flex rounded-full bg-[#cf623e] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              Explore DronaHub →
            </a>
          </div>
        </motion.section>

        <div className="py-10 text-center text-xs text-[#8a8177]">
          The best student resources should not disappear when one batch
          graduates.
        </div>
      </div>
    </main>
  );
}

function FloatingCard({
  className,
  icon,
  delay,
}: {
  className: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ded5c6] bg-white/90 text-2xl shadow-sm ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 4, 0],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
}

function Story({ number, text }: { number: string; text: string }) {
  return (
    <div className="grid grid-cols-[50px_1fr] gap-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ded5c6] bg-[#f8f4eb] text-[10px] font-bold text-[#cf623e]">
        {number}
      </div>

      <p className="pt-1 text-sm leading-7 text-[#70695f] md:text-base">
        {text}
      </p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-4 text-center first:pl-0 last:pr-0">
      <p className="text-2xl font-bold text-[#cf623e]">{number}</p>
      <p className="mt-2 text-[10px] font-semibold text-[#70695f]">
        {label}
      </p>
    </div>
  );
}

function ThanksCard({
  emoji,
  name,
  text,
  delay,
}: {
  emoji: string;
  name: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -7 }}
      className="rounded-[24px] border border-[#ded5c6] bg-white/70 p-7 transition"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ded5c6] bg-[#f8f4eb] text-2xl text-[#cf623e]">
        {emoji}
      </div>

      <h3 className="mt-6 font-[var(--font-manrope)] text-lg font-bold">
        {name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#70695f]">{text}</p>
    </motion.div>
  );
}