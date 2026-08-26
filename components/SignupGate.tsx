"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";

export default function SignupGate() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    // Logged-in users can use the website normally
    if (user) return;

    // Signup/Login pages should remain accessible
    if (pathname === "/signup" || pathname === "/login") return;

    const handleClick = (event: MouseEvent) => {
      // Ignore right-click
      if (event.button !== 0) return;

      // Ignore Ctrl / Cmd click
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;

      event.preventDefault();
      event.stopPropagation();

      router.push("/signup");
    };

    // Capture phase = website ke kisi bhi element ke click se pehle chalega
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname, router, user]);

  return null;
}