"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

type Resource = {
  id: string;
  title: string;
  type: "pyq" | "notes" | "syllabus";
  branch: string;
  semester: number;
  subject: string;
  year: number | null;
  file_url: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type StatusFilter = "pending" | "approved" | "rejected";
type TypeFilter = "all" | "pyq" | "notes" | "syllabus";

const ADMIN_EMAILS = ["kaushal12test@gmail.com"];

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("pending");

  const [typeFilter, setTypeFilter] =
    useState<TypeFilter>("all");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState("");

  useEffect(() => {
    loadResources();
  }, [statusFilter, typeFilter]);

  async function loadResources() {
    setLoading(true);

    let query = supabase
      .from("resources")
      .select("*")
      .eq("status", statusFilter)
      .order("created_at", { ascending: false });

    if (typeFilter !== "all") {
      query = query.eq("type", typeFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading resources:", error.message);
      setResources([]);
    } else {
      setResources((data || []) as Resource[]);
    }

    setLoading(false);
  }

  async function updateStatus(
    id: string,
    status: "pending" | "approved" | "rejected"
  ) {
    setUpdatingId(id);

    const { error } = await supabase
      .from("resources")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating resource:", error.message);
      alert(error.message);
    } else {
      await loadResources();
    }

    setUpdatingId(null);
  }

  function getTypeLabel(type: Resource["type"]) {
    if (type === "pyq") return "PYQ";
    if (type === "notes") return "NOTES";
    return "SYLLABUS";
  }

  function getTypeDescription(type: Resource["type"]) {
    if (type === "pyq") return "Previous Year Question Paper";
    if (type === "notes") return "Study Notes";
    return "Syllabus Document";
  }

  function getStatusCount(status: StatusFilter) {
    return resources.filter((resource) => resource.status === status).length;
  }

  if (userLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3eee1]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#d6613f] border-t-transparent" />
      </main>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3eee1] px-6 text-center">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-[#d6613f]">
            DRONAHUB / RESTRICTED ACCESS
          </p>

          <h1 className="mt-4 font-[var(--font-manrope)] text-4xl font-bold text-[#14110f]">
            Admin access only.
          </h1>

          <p className="mt-3 text-sm text-[#74695c]">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3eee1]">
      {/* BACKGROUND GRID */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c8c1b3 1px, transparent 1px),
            linear-gradient(to bottom, #c8c1b3 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <section className="relative px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1450px]">
          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-6 border-b border-[#d8d0c0] pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[#d6613f]">
                DRONAHUB / ADMIN PANEL
              </p>

              <h1 className="mt-3 font-[var(--font-manrope)] text-4xl font-bold tracking-tight text-[#14110f] md:text-6xl">
                Review resources.
              </h1>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#74695c]">
              Review student submissions and decide which resources should
              appear on DronaHub.
            </p>
          </div>

          {/* STATUS FILTER */}
          <div className="mb-5 flex flex-wrap gap-3">
            {(["pending", "approved", "rejected"] as StatusFilter[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setStatusFilter(item)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    statusFilter === item
                      ? "border-[#14110f] bg-[#14110f] text-white"
                      : "border-[#d8d0c0] bg-white/70 text-[#74695c] hover:border-[#d6613f] hover:text-[#14110f]"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              )
            )}
          </div>

          {/* TYPE FILTER */}
          <div className="mb-8 flex flex-col gap-4 border-b border-[#d8d0c0] pb-7 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex w-fit flex-wrap rounded-2xl border border-[#d8d0c0] bg-white/60 p-1">
              {(
                [
                  ["all", "All"],
                  ["pyq", "PYQs"],
                  ["notes", "Notes"],
                  ["syllabus", "Syllabus"],
                ] as [TypeFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setTypeFilter(value)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    typeFilter === value
                      ? "bg-[#14110f] text-white"
                      : "text-[#74695c] hover:text-[#14110f]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={loadResources}
              className="w-fit rounded-full border border-[#d8d0c0] bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-[#14110f] transition hover:border-[#14110f]"
            >
              REFRESH →
            </button>
          </div>

          {/* RESULTS */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#d6613f] border-t-transparent" />
            </div>
          ) : resources.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[28px] border border-dashed border-[#cfc6b7] bg-white/40 px-6 text-center">
              <div>
                <p className="font-[var(--font-manrope)] text-xl font-bold text-[#14110f]">
                  No {statusFilter} resources.
                </p>

                <p className="mt-2 text-sm text-[#74695c]">
                  There are no resources matching this filter right now.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-[24px] border border-[#ded6c8] bg-white p-5 md:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* RESOURCE INFO */}
                    <div className="flex min-w-0 items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f3eee1] text-sm font-bold text-[#d6613f]">
                        {resource.type === "pyq"
                          ? "01"
                          : resource.type === "notes"
                          ? "02"
                          : "03"}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#fbe4d8] px-3 py-1 text-[10px] font-bold tracking-wider text-[#d6613f]">
                            {getTypeLabel(resource.type)}
                          </span>

                          <span className="text-[10px] font-bold tracking-wider text-[#74695c]">
                            {resource.branch} · SEM {resource.semester}
                          </span>
                        </div>

                        <h2 className="mt-3 truncate font-[var(--font-manrope)] text-lg font-bold text-[#14110f] md:text-xl">
                          {resource.title}
                        </h2>

                        <p className="mt-1 text-sm text-[#74695c]">
                          {resource.subject}
                          {resource.year ? ` · ${resource.year}` : ""}
                        </p>

                        <p className="mt-2 text-xs text-[#a59b8d]">
                          {getTypeDescription(resource.type)}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      {/* VIEW */}
                      <button
                        onClick={() => {
                          setViewerUrl(resource.file_url);
                          setViewerTitle(resource.title);
                        }}
                        className="rounded-full border border-[#d8d0c0] px-4 py-2.5 text-xs font-bold text-[#14110f] transition hover:border-[#14110f] hover:bg-[#14110f] hover:text-white"
                      >
                        VIEW
                      </button>

                      {/* PENDING ACTIONS */}
                      {statusFilter === "pending" && (
                        <>
                          <button
                            disabled={updatingId === resource.id}
                            onClick={() =>
                              updateStatus(resource.id, "approved")
                            }
                            className="rounded-full bg-[#14110f] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#d6613f] disabled:opacity-60"
                          >
                            {updatingId === resource.id
                              ? "..."
                              : "APPROVE"}
                          </button>

                          <button
                            disabled={updatingId === resource.id}
                            onClick={() =>
                              updateStatus(resource.id, "rejected")
                            }
                            className="rounded-full border border-[#d8d0c0] px-4 py-2.5 text-xs font-bold text-[#74695c] transition hover:border-red-400 hover:text-red-500 disabled:opacity-60"
                          >
                            REJECT
                          </button>
                        </>
                      )}

                      {/* APPROVED / REJECTED ACTION */}
                      {statusFilter !== "pending" && (
                        <button
                          disabled={updatingId === resource.id}
                          onClick={() =>
                            updateStatus(resource.id, "pending")
                          }
                          className="rounded-full border border-[#d8d0c0] px-4 py-2.5 text-xs font-bold text-[#74695c] transition hover:border-[#d6613f] hover:text-[#d6613f] disabled:opacity-60"
                        >
                          MOVE TO PENDING
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

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
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-white"
            >
              <div className="flex items-center justify-between border-b border-[#e6dfd0] bg-[#f3eee1] px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#d6613f]">
                    ADMIN RESOURCE VIEWER
                  </p>

                  <p className="mt-1 max-w-[70vw] truncate text-sm font-bold text-[#14110f]">
                    {viewerTitle}
                  </p>
                </div>

                <button
                  onClick={() => setViewerUrl(null)}
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