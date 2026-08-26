const steps = [
  {
    number: "01",
    tag: "START HERE",
    title: "DISCOVER",
    description:
      "Find resources based on your branch, semester and subjects.",
    result: "Relevant resources instantly",
  },
  {
    number: "02",
    tag: "STUDY",
    title: "EXPLORE",
    description:
      "Access notes, previous papers and useful study material in one place.",
    result: "Organized learning material",
  },
  {
    number: "03",
    tag: "PLAN",
    title: "NAVIGATE",
    description:
      "Follow structured roadmaps and understand what to learn next.",
    result: "Clear learning direction",
  },
  {
    number: "04",
    tag: "COMMUNITY",
    title: "CONTRIBUTE",
    description:
      "Upload useful resources and help other students in your campus.",
    result: "Stronger student community",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">

        {/* HEADING */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.4em] text-[#d6613f]">
              HOW IT WORKS
            </p>

            <h2 className="text-5xl font-bold uppercase leading-[0.9] text-[#24211e] md:text-7xl">
              YOUR CAMPUS.
              <br />
              <span className="text-[#d6613f]">
                SIMPLIFIED.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#74695c] md:text-base">
            Everything you need for your academic journey, organized in one
            central platform.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group flex min-h-[430px] flex-col rounded-[28px] border border-[#d8d0c0] bg-[#f3eee1] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#d6613f] hover:shadow-xl"
            >
              {/* NUMBER */}
              <div
                className="mb-12 text-7xl font-bold leading-none text-[#f3eee1]"
                style={{
                  WebkitTextStroke: "1.5px #24211e",
                }}
              >
                {step.number}
              </div>

              {/* TAG */}
              <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-[#74695c]">
                {step.tag}
              </p>

              {/* TITLE */}
              <h3 className="mb-4 text-3xl font-bold text-[#24211e]">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm leading-7 text-[#74695c]">
                {step.description}
              </p>

              {/* RESULT */}
              <div className="mt-auto border-t border-[#d8d0c0] pt-5">
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#d6613f]">
                  RESULT
                </p>

                <p className="mt-2 text-sm text-[#4d4943]">
                  {step.result}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}