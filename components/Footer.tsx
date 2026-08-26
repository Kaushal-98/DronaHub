import Image from "next/image";
import Link from "next/link";

const platformLinks = [
  { name: "Resources", href: "/resources" },
  { name: "Roadmaps", href: "/roadmaps" },
  { name: "Upload", href: "/upload" },
];

const studyLinks = [
  { name: "Notes", href: "/resources?type=notes" },
  { name: "Previous Papers", href: "/resources?type=pyq" },
  { name: "Study Material", href: "/resources?type=study-material" },
  { name: "Announcements", href: "/announcements" },
];

const companyLinks = [
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#171412] px-4 pb-4 pt-6 md:px-8">
      <div className="overflow-hidden rounded-[32px] bg-[#1d1917]">
        {/* MAIN CONTENT */}
        <div className="px-6 py-12 md:px-12 md:py-16">
          {/* LOGO IMAGE */}
          <div className="flex justify-center">
            <Image
              src="/CampusVault-removebg-preview.png"
              alt="DronaHub"
              width={700}
              height={100}
              className="h-auto w-full max-w-[850px] object-contain"
              priority
            />
          </div>

          {/* TAGLINE */}
          <p className="mt-5 text-center text-xs font-semibold tracking-[0.4em] text-white/40">
            YOUR CAMPUS. ORGANIZED.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/resources"
              className="flex items-center gap-4 rounded-full bg-[#f3eee1] px-6 py-4 text-sm font-medium text-[#171412] transition duration-300 hover:scale-105"
            >
              Explore Resources

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171412] text-white">
                ↗
              </span>
            </Link>

            <Link
              href="/upload"
              className="rounded-full border border-white/15 px-7 py-4 text-sm text-white transition duration-300 hover:bg-white/10"
            >
              Upload a Resource
            </Link>
          </div>

          {/* LINKS */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-10 md:grid-cols-4">
            {/* PLATFORM */}
            <div>
              <h3 className="mb-5 text-xs tracking-[0.25em] text-white/40">
                PLATFORM
              </h3>

              <div className="space-y-3">
                {platformLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-white/70 transition hover:text-[#d6613f]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* STUDY */}
            <div>
              <h3 className="mb-5 text-xs tracking-[0.25em] text-white/40">
                STUDY
              </h3>

              <div className="space-y-3">
                {studyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-white/70 transition hover:text-[#d6613f]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="mb-5 text-xs tracking-[0.25em] text-white/40">
                COMPANY
              </h3>

              <div className="space-y-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-white/70 transition hover:text-[#d6613f]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CONNECT */}
            <div>
              <h3 className="mb-5 text-xs tracking-[0.25em] text-white/40">
                CONNECT
              </h3>

              <div className="space-y-4 text-sm text-white/70">
                <a
                  href="mailto:contact@dronahub.com"
                  className="block transition hover:text-[#d6613f]"
                >
                  Email Us
                </a>

                <span className="block">India</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 px-6 py-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            {/* LEFT */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <span className="text-sm text-white/40">
                © 2026 Dronahub
              </span>

              <div className="flex gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 transition hover:border-[#d6613f] hover:bg-[#d6613f] hover:text-white"
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 transition hover:border-[#d6613f] hover:bg-[#d6613f] hover:text-white"
                >
                  IN
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 transition hover:border-[#d6613f] hover:bg-[#d6613f] hover:text-white"
                >
                  GH
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex gap-5 text-xs text-white/40">
              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}