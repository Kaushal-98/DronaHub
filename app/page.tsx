import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import StatsRow from "@/components/StatsRow";
import Gallery from "@/components/Gallery";
import Quotes from "@/components/Quotes";
import BlogPreview from "@/components/BlogPreview";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f3eee1]">
      {/* HERO / CAMPUS SECTION */}
      <section className="relative overflow-hidden">
        {/* CAMPUS INSPIRED BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Soft architectural shapes */}
          <div className="absolute -left-20 top-24 h-[420px] w-[420px] rounded-full bg-[#e7c7ae]/30 blur-3xl" />

          <div className="absolute right-[-120px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#d6613f]/10 blur-3xl" />

          {/* College architecture inspired background */}
          <div className="absolute bottom-0 left-0 right-0 h-[260px] opacity-[0.1]">
            <div className="absolute bottom-0 left-[4%] h-[150px] w-[180px] border-x border-t border-[#74695c]" />

            <div className="absolute bottom-0 left-[18%] h-[220px] w-[240px] border-x border-t border-[#74695c]" />

            <div className="absolute bottom-0 left-[42%] h-[180px] w-[190px] border-x border-t border-[#74695c]" />

            <div className="absolute bottom-0 right-[16%] h-[240px] w-[260px] border-x border-t border-[#74695c]" />

            {/* Windows */}
            <div className="absolute bottom-[35px] left-[7%] grid grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 border border-[#74695c]"
                />
              ))}
            </div>

            <div className="absolute bottom-[35px] right-[19%] grid grid-cols-5 gap-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 border border-[#74695c]"
                />
              ))}
            </div>
          </div>

          {/* Small campus accents */}
          <div className="absolute left-[8%] top-[32%] h-3 w-3 rounded-full bg-[#d6613f]/40" />

          <div className="absolute right-[12%] top-[45%] h-2 w-2 rounded-full bg-[#d6613f]/50" />

          <div className="absolute left-[28%] top-[15%] h-2 w-2 rounded-full bg-[#d6613f]/30" />
        </div>

        {/* CONTENT */}
        <div className="relative mx-auto max-w-[1500px] px-6 pt-4 md:px-10">
          <Navbar />

          <Hero />

          <StatsRow />
        </div>
      </section>

      {/* BLOG / FEATURED CONTENT */}
      <div className="relative w-full">
        <BlogPreview />
      </div>

      {/* HOW DRONAHUB WORKS */}
      <div className="my-20">
        <HowItWorks />
      </div>

      {/* CAMPUS GALLERY */}
      <div className="w-full">
        <Gallery />
      </div>

      {/* QUOTES */}
      <div className="mx-auto max-w-[1500px] px-6 pb-10 md:px-10">
        <Quotes />
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}