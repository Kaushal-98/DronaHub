"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

const BRANCHES = [
  "CSE AI & IoT",
  "VLSI",
  "ME/AE",
  "CSE",
  "CSIT",
  "ECE",
  "ECS",
  "EEE",
  "ME",
  "AI/ML",
  "IoT",
  "RAA",
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const TYPES = [
  {
    value: "pyq",
    label: "PYQs",
    description: "Previous year question papers",
    number: "01",
  },
  {
    value: "notes",
    label: "Notes",
    description: "Useful study material",
    number: "02",
  },
  {
    value: "syllabus",
    label: "Syllabus",
    description: "Official subject syllabus",
    number: "03",
  },
];

export default function UploadPage() {
  const { user, loading: userLoading } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("pyq");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState(1);
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [directLink, setDirectLink] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  if (userLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d6613f] border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6">
        <div className="max-w-md text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#d6613f]">
            DRONAHUB / CONTRIBUTOR ACCESS
          </p>

          <h1 className="mt-4 font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f]">
            Sign in to contribute.
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#74695c]">
            Share useful PYQs, notes and study resources with students across
            your campus.
          </p>

          <a
            href="/login"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d6613f] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(214,97,63,0.2)] transition hover:-translate-y-0.5 hover:bg-[#bd4f30]"
          >
            Sign in to contribute
            <span>→</span>
          </a>
        </div>
      </main>
    );
  }

  function handleFile(selectedFile: File | null) {
    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!title.trim()) {
      setError("Please enter a resource title.");
      return;
    }

    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    /*
      PYQ:
      At least one of these is required:
      - Direct PDF link
      - Uploaded PDF

      Notes / Syllabus:
      - PDF upload is required
    */

    if (type === "pyq" && !directLink.trim() && !file) {
      setError(
        "For PYQs, please add a PDF link, upload a PDF, or provide both."
      );
      return;
    }

    if (type !== "pyq" && !file) {
      setError("Please choose a PDF file.");
      return;
    }

    if (directLink.trim()) {
      try {
        new URL(directLink.trim());
      } catch {
        setError("Please enter a valid PDF URL.");
        return;
      }
    }

    setLoading(true);

    let uploadedPdfUrl: string | null = null;

    /*
      Upload PDF if a file was selected
    */
    if (file) {
      const safeFileName = file.name.replace(/\s+/g, "-");

      const filePath = `${user.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(filePath, file);

      if (uploadError) {
        setLoading(false);
        setError(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("resources")
        .getPublicUrl(filePath);

      uploadedPdfUrl = urlData.publicUrl;
    }

    /*
      Save resource in database

      file_url:
      Uploaded PDF

      direct_link:
      External PDF / Drive / website link
    */
    const { error: insertError } = await supabase
      .from("resources")
      .insert({
        title: title.trim(),
        type,
        branch,
        semester,
        subject: subject.trim(),
        year: year ? parseInt(year) : null,

        file_url: uploadedPdfUrl,

        direct_link: directLink.trim() || null,

        uploaded_by: user.id,
        status: "pending",
      });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    resetForm();
    setSuccess(true);
  }

  function resetForm() {
    setTitle("");
    setSubject("");
    setYear("");
    setFile(null);
    setDirectLink("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function changeResourceType(newType: string) {
    setType(newType);
    setFile(null);
    setDirectLink("");
    setError("");
    setSuccess(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f1e7] text-[#14110f]">
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ddd4c6 1px, transparent 1px),
            linear-gradient(to bottom, #ddd4c6 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <section className="relative px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1450px]">
          {/* HEADER */}
          <header className="mb-8 flex flex-col justify-between gap-6 border-b border-[#ded5c6] pb-8 md:flex-row md:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold tracking-[0.35em] text-[#d6613f]"
              >
                CONTRIBUTE TO DRONAHUB
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-4 font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f] md:text-6xl"
              >
                Share what you know.
              </motion.h1>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#74695c] md:text-base">
              One resource can save another student hours of searching. Share
              it once and keep it available for the batches that follow.
            </p>
          </header>

          <form onSubmit={handleUpload}>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
              {/* LEFT SIDE */}
              <div className="space-y-6">
                {/* RESOURCE TYPE */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[30px] border border-[#ded5c6] bg-[#fbf8f1]/90 p-6 shadow-[0_20px_60px_rgba(100,80,50,0.06)] backdrop-blur"
                >
                  <p className="text-[10px] font-bold tracking-[0.28em] text-[#d6613f]">
                    STEP 01
                  </p>

                  <h2 className="mt-2 font-[var(--font-manrope)] text-2xl font-bold tracking-tight">
                    What are you sharing?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#74695c]">
                    Choose the type of academic resource you want to
                    contribute.
                  </p>

                  <div className="mt-7 space-y-3">
                    {TYPES.map((item) => {
                      const active = type === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => changeResourceType(item.value)}
                          className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                            active
                              ? "border-[#d6613f] bg-[#fff3ed] shadow-[0_8px_25px_rgba(214,97,63,0.08)]"
                              : "border-[#e4dccf] bg-white/80 hover:-translate-y-0.5 hover:border-[#d6613f]/60"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                active
                                  ? "bg-[#d6613f] text-white"
                                  : "bg-[#f3eee1] text-[#9a8f81]"
                              }`}
                            >
                              {item.number}
                            </span>

                            <div>
                              <p className="font-[var(--font-manrope)] text-sm font-bold text-[#14110f]">
                                {item.label}
                              </p>

                              <p className="mt-1 text-xs text-[#74695c]">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-lg transition-transform duration-300 ${
                              active
                                ? "translate-x-1 text-[#d6613f]"
                                : "text-[#8a8177] group-hover:translate-x-1"
                            }`}
                          >
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.section>

                {/* CONTRIBUTION GUIDE */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="rounded-[30px] border border-[#eadfce] bg-[#fffaf2]/90 p-6 shadow-[0_20px_60px_rgba(100,80,50,0.05)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.28em] text-[#d6613f]">
                        CONTRIBUTION GUIDE
                      </p>

                      <h3 className="mt-2 font-[var(--font-manrope)] text-lg font-bold">
                        Help students find better resources.
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbe4d8] text-lg text-[#d6613f]">
                      ✦
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <GuideRow
                      number="01"
                      title="Use a clear title"
                      text="Mention the subject, exam or resource clearly."
                    />

                    <GuideRow
                      number="02"
                      title="Choose correct details"
                      text="Branch, semester and subject help students find it faster."
                    />

                    <GuideRow
                      number="03"
                      title="Reviewed before publishing"
                      text="Every contribution is checked before appearing publicly."
                    />
                  </div>
                </motion.section>

                {/* PYQ INFORMATION */}
                {type === "pyq" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[26px] border border-[#f0d8cd] bg-[#fff6f1] p-6"
                  >
                    <p className="text-[10px] font-bold tracking-[0.25em] text-[#d6613f]">
                      PYQ FLEXIBILITY
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#74695c]">
                      For previous year question papers, you can paste a direct
                      PDF link, upload the PDF file, or provide both.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[30px] border border-[#ded5c6] bg-[#fffdf9]/95 p-6 shadow-[0_25px_80px_rgba(100,80,50,0.08)] backdrop-blur md:p-9"
              >
                {/* FORM HEADER */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.28em] text-[#d6613f]">
                      STEP 02
                    </p>

                    <h2 className="mt-2 font-[var(--font-manrope)] text-3xl font-bold tracking-tight">
                      Resource details
                    </h2>

                    <p className="mt-2 text-sm text-[#74695c]">
                      Add accurate details so students can find this resource
                      easily.
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#eadfce] bg-[#f8f4eb] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6613f]" />
                    <span className="text-[9px] font-bold tracking-[0.16em] text-[#74695c]">
                      PENDING REVIEW
                    </span>
                  </div>
                </div>

                {/* ALERTS */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600"
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700"
                    >
                      Resource submitted successfully. It will appear after
                      admin approval.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* TITLE */}
                <div className="mb-6">
                  <FieldLabel label="RESOURCE TITLE" />

                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Data Structures Mid-Sem 2024"
                    className="w-full rounded-2xl border border-[#e6dfd0] bg-[#fcfaf6] px-5 py-4 text-sm text-[#14110f] outline-none transition placeholder:text-[#aaa195] focus:border-[#d6613f] focus:bg-white focus:ring-4 focus:ring-[#d6613f]/5"
                  />
                </div>

                {/* BRANCH + SEMESTER */}
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel label="BRANCH" />

                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full rounded-2xl border border-[#e6dfd0] bg-[#fcfaf6] px-5 py-4 text-sm text-[#14110f] outline-none transition focus:border-[#d6613f] focus:bg-white"
                    >
                      {BRANCHES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <FieldLabel label="SEMESTER" />

                    <select
                      value={semester}
                      onChange={(e) =>
                        setSemester(parseInt(e.target.value))
                      }
                      className="w-full rounded-2xl border border-[#e6dfd0] bg-[#fcfaf6] px-5 py-4 text-sm text-[#14110f] outline-none transition focus:border-[#d6613f] focus:bg-white"
                    >
                      {SEMESTERS.map((item) => (
                        <option key={item} value={item}>
                          Semester {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* SUBJECT + YEAR */}
                <div className="mb-7 grid gap-4 md:grid-cols-[1fr_190px]">
                  <div>
                    <FieldLabel label="SUBJECT" />

                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Operating Systems"
                      className="w-full rounded-2xl border border-[#e6dfd0] bg-[#fcfaf6] px-5 py-4 text-sm text-[#14110f] outline-none transition placeholder:text-[#aaa195] focus:border-[#d6613f] focus:bg-white focus:ring-4 focus:ring-[#d6613f]/5"
                    />
                  </div>

                  <div>
                    <FieldLabel label="YEAR (OPTIONAL)" />

                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      className="w-full rounded-2xl border border-[#e6dfd0] bg-[#fcfaf6] px-5 py-4 text-sm text-[#14110f] outline-none transition placeholder:text-[#aaa195] focus:border-[#d6613f] focus:bg-white"
                    />
                  </div>
                </div>

                {/* PYQ LINK + PDF */}
                {type === "pyq" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-7"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <FieldLabel label="ADD RESOURCE" />

                      <span className="text-[10px] font-semibold text-[#74695c]">
                        One or both options
                      </span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      {/* DIRECT LINK */}
                      <div className="rounded-[22px] border border-[#eadfce] bg-[#fffaf5] p-5">
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fbe4d8] text-xs font-bold text-[#d6613f]">
                              01
                            </span>

                            <p className="text-[10px] font-bold tracking-[0.18em] text-[#d6613f]">
                              DIRECT LINK
                            </p>
                          </div>

                          <h3 className="mt-3 font-[var(--font-manrope)] text-base font-bold">
                            Paste a PDF link
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-[#74695c]">
                            Google Drive, direct PDF or original source.
                          </p>
                        </div>

                        <input
                          type="url"
                          value={directLink}
                          onChange={(e) => setDirectLink(e.target.value)}
                          placeholder="https://example.com/file.pdf"
                          className="w-full rounded-xl border border-[#e6dfd0] bg-white px-4 py-3.5 text-sm text-[#14110f] outline-none transition placeholder:text-[#aaa195] focus:border-[#d6613f]"
                        />
                      </div>

                      {/* PDF UPLOAD */}
                      <div className="rounded-[22px] border border-[#eadfce] bg-[#fffaf5] p-5">
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fbe4d8] text-xs font-bold text-[#d6613f]">
                              02
                            </span>

                            <p className="text-[10px] font-bold tracking-[0.18em] text-[#d6613f]">
                              PDF UPLOAD
                            </p>
                          </div>

                          <h3 className="mt-3 font-[var(--font-manrope)] text-base font-bold">
                            Upload the PDF
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-[#74695c]">
                            Upload the original question paper directly.
                          </p>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) =>
                            handleFile(e.target.files?.[0] || null)
                          }
                        />

                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            handleFile(e.dataTransfer.files?.[0] || null);
                          }}
                          className={`cursor-pointer rounded-xl border border-dashed px-4 py-4 text-center transition ${
                            dragging
                              ? "border-[#d6613f] bg-[#fff1eb]"
                              : file
                              ? "border-[#d6613f] bg-[#fff4ef]"
                              : "border-[#d7ccbd] bg-white hover:border-[#d6613f]"
                          }`}
                        >
                          {file ? (
                            <>
                              <p className="truncate text-sm font-bold text-[#14110f]">
                                {file.name}
                              </p>

                              <p className="mt-1 text-xs text-[#74695c]">
                                {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
                                ready
                              </p>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile();
                                }}
                                className="mt-3 text-xs font-bold text-[#d6613f]"
                              >
                                REMOVE FILE
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="text-xl text-[#d6613f]">+</span>

                              <p className="mt-2 text-sm font-bold text-[#14110f]">
                                Drop PDF here
                              </p>

                              <p className="mt-1 text-xs text-[#74695c]">
                                Click to browse · Maximum 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-[#74695c]">
                      Tip: Adding both a link and uploaded PDF provides better
                      availability for students.
                    </p>
                  </motion.div>
                )}

                {/* NOTES + SYLLABUS PDF UPLOAD */}
                {type !== "pyq" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-7"
                  >
                    <FieldLabel label="UPLOAD PDF" />

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleFile(e.target.files?.[0] || null)
                      }
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        handleFile(e.dataTransfer.files?.[0] || null);
                      }}
                      className={`cursor-pointer rounded-[24px] border border-dashed p-8 text-center transition ${
                        dragging
                          ? "border-[#d6613f] bg-[#fff1eb]"
                          : file
                          ? "border-[#d6613f] bg-[#fff4ef]"
                          : "border-[#cfc6b7] bg-[#fcfaf6] hover:border-[#d6613f]"
                      }`}
                    >
                      {file ? (
                        <>
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fbe4d8] text-[#d6613f]">
                            ✓
                          </div>

                          <p className="mt-4 font-[var(--font-manrope)] text-sm font-bold text-[#14110f]">
                            {file.name}
                          </p>

                          <p className="mt-2 text-xs text-[#74695c]">
                            {(file.size / 1024 / 1024).toFixed(2)} MB · Ready to
                            upload
                          </p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="mt-4 text-xs font-bold text-[#d6613f]"
                          >
                            REMOVE FILE
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fbe4d8] text-xl text-[#d6613f]">
                            +
                          </div>

                          <p className="mt-4 font-[var(--font-manrope)] text-base font-bold text-[#14110f]">
                            Drop your PDF here
                          </p>

                          <p className="mt-2 text-xs text-[#74695c]">
                            or click to browse · PDF only · Maximum 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-between rounded-full bg-[#d6613f] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(214,97,63,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bd4f30] hover:shadow-[0_18px_40px_rgba(214,97,63,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {loading
                      ? "Submitting resource..."
                      : "Submit for review"}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-[#8a8177]">
                  Your contribution will be reviewed before being published on
                  DronaHub.
                </p>
              </motion.section>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#74695c]">
      {label}
    </label>
  );
}

function GuideRow({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[34px_1fr] gap-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fbe4d8] text-[10px] font-bold text-[#d6613f]">
        {number}
      </span>

      <div>
        <p className="text-sm font-bold text-[#14110f]">{title}</p>

        <p className="mt-1 text-xs leading-5 text-[#74695c]">{text}</p>
      </div>
    </div>
  );
}