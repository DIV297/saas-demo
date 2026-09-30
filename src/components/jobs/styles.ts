/** Styles for the work-orders feature. The table layout itself is the shared `table` class set. */
import {
  alertError,
  appendClass,
  captionText,
  dot,
  flexRow,
  monoText,
  numeric,
  textMuted,
} from "@/styles/classes";

export const jobTableStyles = {
  id: appendClass(monoText, textMuted, "block"),
  title: "block font-medium",
  customer: "block font-medium",
  address: appendClass(captionText, "block"),
  date: appendClass(numeric, "block font-medium"),
  time: appendClass(captionText, numeric, "block"),
  technician: appendClass(flexRow, "gap-2"),
  technicianName: "text-label",
} as const;

export const jobsBoardStyles = {
  toolbar: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4",
  search: "w-full md:w-72",
  error: appendClass(alertError, "rounded-none px-5 py-3"),
} as const;

export const statusSelectStyles = {
  wrapper: "relative inline-flex h-7 items-center rounded-full",
  dot: appendClass(dot, "pointer-events-none absolute left-2.5"),
  select:
    "h-full cursor-pointer appearance-none rounded-full border border-transparent bg-transparent pl-6 pr-7 text-caption font-semibold hover:border-current/35",
  chevron: "pointer-events-none absolute right-2",
} as const;

/** Hover card on a dark tooltip background. */
export const jobSummaryStyles = {
  root: "grid gap-1 py-0.5",
  id: "font-mono text-micro uppercase tracking-label text-sidebar-muted",
  title: "font-semibold text-white",
  rows: "mt-1 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1 text-caption",
  label: "text-sidebar-muted",
  address: "block text-sidebar-text",
  status: "inline-flex items-center gap-1.5",
  dot: appendClass(dot, "ring-2 ring-white/20"),
} as const;
