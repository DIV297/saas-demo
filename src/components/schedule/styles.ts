/** Styles for the week calendar and its navigation. */
import {
  alertError,
  appendClass,
  eventBlock,
  eyebrow,
  iconButton,
  inlineRow,
  linkAccent,
  monoText,
  panel,
  textMuted,
  textSecondary,
} from "@/styles/classes";

export const weekCalendarStyles = {
  /** Each day is its own card. Phone: stacked agenda · tablet: 7 columns that scroll · desktop: 7 flexible columns. */
  grid: "grid grid-cols-1 gap-2 md:grid-cols-[repeat(7,180px)] md:overflow-x-auto md:pb-1 xl:grid-cols-7",
  day: appendClass(panel, "group flex min-w-0 flex-col data-today:bg-signal-soft md:min-h-[460px]"),

  dayHeader: "flex items-center gap-2 px-3 pb-1 pt-3",
  weekday: eyebrow,
  dayNumber: "font-display text-heading font-semibold leading-none group-data-today:text-ink",
  headerActions: "ml-auto flex items-center gap-1.5",
  todayTag: "rounded-sm bg-signal px-1.5 py-px font-mono text-[0.6rem] font-semibold uppercase text-on-signal",
  addButton:
    "grid size-6 cursor-pointer place-items-center rounded-md text-ink-3 transition hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper",

  events: "flex flex-1 flex-col gap-2 p-2",
  empty: appendClass("px-1 py-3 text-caption", textMuted),
  /** Free space under a day's jobs: click to book. Revealed on hover (always visible on touch screens). */
  bookSlot: appendClass(
    "flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-label font-medium text-ink-3 transition",
    "opacity-0 hover:bg-ink/[0.05] hover:text-ink group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100",
  ),

  event: appendClass(eventBlock, "cursor-default px-3 py-2 text-caption transition hover:brightness-95"),
  eventTime: appendClass(monoText, "text-micro font-semibold"),
  eventTitle: "my-0.5 text-label font-semibold text-ink",
  eventMeta: textSecondary,
  eventTech: appendClass(inlineRow, "gap-1", textSecondary),
  techBadge: "grid size-4 place-items-center rounded-sm bg-surface text-ink",
} as const;

export const bookingDialogStyles = {
  form: "grid gap-4",
  row: "grid gap-4 sm:grid-cols-2",
  rowThree: "grid gap-4 sm:grid-cols-3",
  error: alertError,
  footer: "mt-2 flex flex-wrap items-center justify-end gap-2",
} as const;

export const weekNavStyles = {
  nav: appendClass(inlineRow, "gap-2"),
  arrow: iconButton,
  range: "min-w-36 text-center font-mono text-label",
  reset: linkAccent,
} as const;
