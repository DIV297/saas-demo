/** Styles for the work-orders feature. The table layout itself is the shared `table` class set. */
import {
  alertError,
  appendClass,
  stickyTableBelowToolbar,
  stickyToolbar,
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
  technicianName: "text-secondary",
} as const;

export const jobsBoardStyles = {
  toolbar: appendClass(stickyToolbar, "flex flex-wrap items-center justify-between gap-2 px-4 py-3"),
  card: stickyTableBelowToolbar,
  search: "w-full md:w-60",
  error: appendClass(alertError, "rounded-none px-4 py-2"),
} as const;

/** Overrides the Dropdown trigger so it looks like the status badge (colours come from statusClasses). */
export const statusSelectStyles = {
  trigger: "h-7 w-auto gap-1.5 rounded-full border-transparent px-2.5 text-secondary font-semibold hover:border-current/35",
} as const;

/** Hover card on a dark tooltip background. */
export const jobSummaryStyles = {
  root: "grid gap-1 py-0.5",
  id: "font-mono text-secondary uppercase tracking-label text-sidebar-muted",
  title: "font-semibold text-white",
  rows: "mt-1 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1 text-secondary",
  label: "text-sidebar-muted",
  address: "block text-sidebar-text",
  status: "inline-flex items-center gap-1.5",
  dot: appendClass(dot, "ring-2 ring-white/20"),
} as const;

/** Booking and edit forms (see JobFields; also used by the schedule's booking dialog). The sticky action bar is the shared DialogFooter. */
export const jobFormStyles = {
  form: "grid gap-4",
  intro: "rounded-lg bg-brand-soft px-3 py-2 text-secondary text-ink",
  row: "grid gap-4 sm:grid-cols-2",
  error: alertError,
} as const;

export const jobDetailsStyles = {
  summary: "grid gap-4 pb-2",
  status: "flex items-center gap-2",
  amount: "ml-auto font-display text-title font-semibold tabular-nums",
  rows: "grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 text-primary",
  label: "text-secondary text-ink-3",
  sub: "block text-secondary text-ink-3",
  footerStart: "mr-auto",
  confirmText: "mr-auto text-secondary text-ink-2",
  error: alertError,
} as const;
