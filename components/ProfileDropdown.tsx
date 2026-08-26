"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@/lib/useUser";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconUpload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconHelp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconLogOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function ProfileDropdown() {
  const { user } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!user) return null;

  // ACTUAL USER NAME FROM SUPABASE
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.username ||
    user.email?.split("@")[0] ||
    "Student";

  const email = user.email || "";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word: string) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSignOut() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      {/* PROFILE BUTTON */}
      <button
        onClick={() => setOpen((previous) => !previous)}
        className="flex items-center gap-2 rounded-full
        py-1 pl-2 pr-1
        transition-all duration-300
        hover:bg-white/10"
      >
        {/* AVATAR */}
        <div
          className="flex h-10 w-10 items-center justify-center
          rounded-full
          bg-gradient-to-br from-[#d6613f] to-[#f0a06e]
          text-xs font-semibold text-white
          shadow-[0_4px_15px_rgba(214,97,63,0.25)]"
        >
          {initials}
        </div>

        {/* NAME */}
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-[#cfc9bf] lg:block">
          {name}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-3 w-72
          overflow-hidden rounded-[22px]
          border border-white/10
          bg-[#14110f]/95
          shadow-[0_25px_70px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl"
        >
          {/* USER INFO */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center
              rounded-full
              bg-gradient-to-br from-[#d6613f] to-[#f0a06e]
              text-sm font-semibold text-white"
            >
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {name}
              </p>

              <p className="mt-0.5 truncate text-xs text-[#9f978e]">
                {email}
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="py-2">
            <a
              href="/upload"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3
              text-sm text-[#cfc9bf]
              transition hover:bg-white/5 hover:text-white"
            >
              <IconUpload />
              <span>Upload a resource</span>
            </a>

            <a
              href="/resources"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3
              text-sm text-[#cfc9bf]
              transition hover:bg-white/5 hover:text-white"
            >
              <IconUser />
              <span>Browse resources</span>
            </a>

            <a
              href="/#about"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3
              text-sm text-[#cfc9bf]
              transition hover:bg-white/5 hover:text-white"
            >
              <IconHelp />
              <span>Help and support</span>
            </a>
          </div>

          {/* SIGN OUT */}
          <div className="border-t border-white/10 py-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-3
              text-left text-sm text-[#d6613f]
              transition hover:bg-white/5"
            >
              <IconLogOut />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}