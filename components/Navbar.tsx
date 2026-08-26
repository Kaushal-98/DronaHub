"use client";

import { useState } from "react";
import { useUser } from "@/lib/useUser";
import ProfileDropdown from "@/components/ProfileDropdown";

const menus: Record<
  string,
  { label: string; desc: string; href: string }[]
> = {
  Resources: [
    {
      label: "PYQs",
      desc: "Previous year question papers, by subject",
      href: "/resources",
    },
    {
      label: "Notes",
      desc: "Senior-shared notes, unit-wise",
      href: "/resources",
    },
    {
      label: "Syllabus",
      desc: "Full semester syllabus, all branches",
      href: "/resources",
    },
    {
      label: "Upload",
      desc: "Share your own notes or papers",
      href: "/upload",
    },
  ],

  Roadmaps: [
    {
      label: "DSA Roadmap",
      desc: "Structured path from arrays to graphs",
      href: "/roadmaps",
    },
    {
      label: "Placement Prep",
      desc: "CS fundamentals to mock interviews",
      href: "/roadmaps",
    },
    {
      label: "Web Development",
      desc: "Frontend to full-stack, step by step",
      href: "/roadmaps",
    },
  ],

  Careers: [
    {
      label: "Software Development",
      desc: "Frontend, Backend & Full Stack",
      href: "/careers",
    },
    {
      label: "Data & AI",
      desc: "Data Science, AI & Machine Learning",
      href: "/careers",
    },
    {
      label: "Cybersecurity",
      desc: "Networks, Security & Ethical Hacking",
      href: "/careers",
    },
    {
      label: "Cloud & DevOps",
      desc: "Cloud, Linux & Deployment",
      href: "/careers",
    },
  ],
};

export default function Navbar() {
  const { user } = useUser();
  const [open, setOpen] = useState<string | null>(null);

  function getViewAllLink(key: string) {
    if (key === "Resources") return "/resources";
    if (key === "Roadmaps") return "/roadmaps";
    if (key === "Careers") return "/careers";

    return "/";
  }

  return (
    <div className="sticky top-5 z-50 w-full">
      <nav
        className="relative flex items-center justify-between rounded-full
        border border-white/10 bg-[#161311]/95 px-4 py-3
        shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl"
        onMouseLeave={() => setOpen(null)}
      >
        {/* LOGO */}
        <a
          href="/"
          className="group flex items-center gap-3 rounded-full px-3 py-1.5"
        >
          <div className="overflow-hidden">
            <img
              src="/CampusVault-removebg-preview.png"
              alt="DronaHub"
              className="h-5 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-2 md:flex">
          {Object.keys(menus).map((key) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setOpen(key)}
            >
              <button
                onClick={() =>
                  setOpen((prev) => (prev === key ? null : key))
                }
                className={`
                  group relative flex items-center gap-1.5
                  rounded-full px-4 py-2.5 text-[14px] font-medium
                  transition-all duration-300
                  ${
                    open === key
                      ? "bg-white/10 text-white"
                      : "text-[#bdb7ae] hover:bg-white/[0.06] hover:text-white"
                  }
                `}
              >
                {key}

                <span
                  className={`
                    text-[9px] transition-transform duration-300
                    ${open === key ? "rotate-180" : ""}
                  `}
                >
                  ▾
                </span>

                <span
                  className={`
                    absolute bottom-1.5 left-1/2 h-[3px]
                    rounded-full bg-[#d6613f]
                    transition-all duration-300
                    ${
                      open === key
                        ? "w-4 -translate-x-1/2"
                        : "w-0 -translate-x-1/2"
                    }
                  `}
                />
              </button>

              {/* DROPDOWN */}
              <div
                className={`
                  absolute left-1/2 top-full w-[340px]
                  -translate-x-1/2 pt-4
                  transition-all duration-300
                  ${
                    open === key
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }
                `}
              >
                <div
                  className="overflow-hidden rounded-[24px]
                  border border-white/10
                  bg-[#211d1a]/95
                  p-3 shadow-[0_25px_70px_rgba(0,0,0,0.4)]
                  backdrop-blur-2xl"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between px-3 pb-3 pt-2">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#7e756b]">
                      EXPLORE {key.toUpperCase()}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[#d6613f]" />
                  </div>

                  {/* MENU ITEMS */}
                  <div className="space-y-1">
                    {menus[key].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(null)}
                        className="group/item relative block overflow-hidden rounded-2xl
                        px-4 py-3.5 transition-all duration-300
                        hover:bg-white/[0.07]"
                      >
                        <span
                          className="absolute left-0 top-1/2 h-0 w-[3px]
                          -translate-y-1/2 rounded-full bg-[#d6613f]
                          transition-all duration-300
                          group-hover/item:h-7"
                        />

                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className="text-sm font-semibold text-[#f2eee8]
                              transition-transform duration-300
                              group-hover/item:translate-x-1"
                            >
                              {item.label}
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-[#928a81]">
                              {item.desc}
                            </p>
                          </div>

                          <span
                            className="mt-1 translate-x-2 text-sm text-[#d6613f]
                            opacity-0 transition-all duration-300
                            group-hover/item:translate-x-0
                            group-hover/item:opacity-100"
                          >
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* VIEW ALL */}
                  <div className="mt-2 border-t border-white/10 px-3 pb-1 pt-3">
                    <a
                      href={getViewAllLink(key)}
                      onClick={() => setOpen(null)}
                      className="group flex items-center justify-between text-xs
                      font-medium text-[#aaa39a] transition-colors
                      hover:text-white"
                    >
                      <span>
                        {key === "Careers"
                          ? "Explore all careers"
                          : "View all"}
                      </span>

                      <span className="text-[#d6613f] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ABOUT */}
          <a
            href="/about"
            className="group relative rounded-full px-4 py-2.5
            text-[14px] font-medium text-[#bdb7ae]
            transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            About

            <span
              className="absolute bottom-1.5 left-1/2 h-[3px] w-0
              -translate-x-1/2 rounded-full bg-[#d6613f]
              transition-all duration-300 group-hover:w-4"
            />
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center">
          {user ? (
            <ProfileDropdown />
          ) : (
            <a
              href="/login"
              className="group relative overflow-hidden rounded-full
              bg-[#f1ede5] px-5 py-2.5 text-sm font-semibold
              text-[#14110f] transition-all duration-300
              hover:scale-[1.03]"
            >
              <span className="relative z-10">Sign in</span>
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}