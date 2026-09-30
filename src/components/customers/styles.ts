/**
 * Styles for the customers feature. Shared tokens come from @/styles/classes;
 * anything only used here lives in this file.
 */
import {
  appendClass,
  bgPaper,
  captionText,
  eyebrow,
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
  header: appendClass(bgPaper, microLabel, "hidden items-center gap-4 px-5 py-3 md:flex"),
  columns,

  item: stripe,
  row: "group flex items-center gap-4 px-4 py-3 transition hover:bg-sunken/70 md:px-5",

  name: "font-medium",
  email: captionText,
  detail: appendClass(columns.desktop, "text-label", textSecondary),
  since: appendClass(columns.desktop, monoText, textMuted),

  plan: {
    base: appendClass(tag, "text-caption font-semibold"),
    Commercial: tagDark,
    Residential: textSecondary,
  },
  chevron: appendClass(columns.chevron, "text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink"),
} as const;

export const customerProfileStyles = {
  card: "h-fit",
  identity: "flex items-center gap-4",
  meta: eyebrow,
  name: appendClass(sectionTitle, "my-0.5"),
  since: captionText,

  metrics: "my-6 grid grid-cols-3 gap-2",
  metric: appendClass(bgPaper, "rounded-lg p-3 md:px-4"),
  metricLabel: eyebrow,
  metricValue: "mt-1 font-display text-title font-semibold tabular-nums md:text-heading",

  details: "grid gap-4",
  detail: "flex gap-3 break-words text-label",
  detailLabel: eyebrow,
} as const;

export const customerDirectoryStyles = {
  search: "w-full md:w-72",
  toolbar: "flex flex-wrap items-center gap-3 px-4 py-3 md:px-5 md:py-4",
  location: "w-full sm:w-56",
  clear: "text-label font-medium text-ink-2 underline decoration-signal decoration-2 underline-offset-4 transition hover:text-ink cursor-pointer",
} as const;
