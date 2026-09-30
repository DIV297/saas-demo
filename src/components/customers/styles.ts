/**
 * Styles for the customers feature. Shared tokens come from @/styles/classes;
 * anything only used here lives in this file.
 */
import {
  linkAccent,
  appendClass,
  bgPaper,
  captionText,
  eyebrow,
  stickyTableBelowToolbar,
  stickyToolbar,
  stripe,
  microLabel,
  monoText,
  sectionTitle,
  tag,
  tagDark,
  textMuted,
  textSecondary,
} from "@/styles/classes";

/** Column widths shared by the header row and each customer row, so they always line up. */
const columns = {
  avatar: "w-9 shrink-0",
  identity: "min-w-0 flex-[1.4]",
  desktop: "hidden min-w-0 flex-1 md:block",
  plan: "w-24 shrink-0",
  chevron: "w-4 shrink-0",
};

export const customerTableStyles = {
  header: appendClass(
    bgPaper,
    microLabel,
    "hidden items-center gap-4 px-4 py-2 md:flex lg:sticky lg:top-below-toolbar lg:z-[5]",
  ),
  columns,

  item: stripe,
  row: "group flex items-center gap-4 px-4 py-2 transition hover:bg-brand-soft/40",

  name: "font-medium",
  email: captionText,
  detail: appendClass(columns.desktop, "text-secondary", textSecondary),
  since: appendClass(columns.desktop, monoText, textMuted),

  plan: {
    base: appendClass(tag, "text-secondary font-semibold"),
    Commercial: tagDark,
    Residential: "bg-sunken text-ink-2",
  },
  chevron: appendClass(columns.chevron, "text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink"),
} as const;

export const customerProfileStyles = {
  card: "h-fit",
  identity: "flex items-center gap-4",
  meta: eyebrow,
  name: appendClass(sectionTitle, "my-0.5"),

  /** The money tile gets a little more room; values sit at the bottom so all three always line up. */
  metrics: "my-6 grid grid-cols-[1.4fr_1fr_1fr] gap-2",
  metric: appendClass(bgPaper, "flex flex-col justify-between gap-1 rounded-lg p-3"),
  metricLabel: appendClass(captionText, "leading-tight"),
  metricValue: "font-display text-title font-semibold leading-none tabular-nums md:text-heading",

  details: "grid gap-4",
  detail: "flex gap-3 break-words text-secondary",
  detailLabel: eyebrow,
} as const;

export const customerDirectoryStyles = {
  search: "w-full md:w-72",
  toolbar: appendClass(stickyToolbar, "flex flex-wrap items-center gap-2 px-4 py-3"),
  location: "w-full sm:w-56",
  /** Pinned to the toolbar's right edge (wraps to its own line on phones). */
  clear: appendClass(linkAccent, "ml-auto cursor-pointer"),
} as const;

export const serviceHistoryStyles = {
  toolbar: appendClass(stickyToolbar, "flex items-center px-4 pb-3"),
  card: stickyTableBelowToolbar,
} as const;
