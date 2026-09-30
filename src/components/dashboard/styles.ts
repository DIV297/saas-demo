/** Styles for the overview dashboard widgets. */
import {
  appendClass,
  bgPaper,
  captionText,
  eventBlock,
  eyebrow,
  flexBetween,
  flexRow,
  grow,
  monoText,
  panel,
  panelDark,
  statValue,
  textMuted,
  textSecondary,
} from "@/styles/classes";

export const statGridStyles = {
  grid: "grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4",
  /** On phones the revenue card leads, full width. */
  featured: "max-sm:order-first max-sm:col-span-full",
} as const;

export const statCardStyles = {
  card: {
    base: "flex flex-col gap-2 p-3 sm:px-4 sm:py-3.5",
    default: panel,
    highlight: panelDark,
  },
  header: appendClass(flexBetween, "gap-2"),
  label: {
    base: appendClass(eyebrow, "max-sm:text-micro"),
    highlight: "text-sidebar-muted",
  },
  index: {
    base: appendClass(monoText, textMuted),
    default: "max-sm:hidden",
  },
  body: "mt-auto flex items-end justify-between gap-3",
  value: appendClass(statValue, "max-sm:text-heading"),
  footnote: {
    base: "text-label",
    default: "text-ink-2 max-sm:hidden",
    highlight: "text-sidebar-text",
  },
} as const;

export const revenueBarsStyles = {
  chart: "flex h-13 w-22 shrink-0 items-end gap-0.5",
  column: "group relative flex h-full flex-1 items-end outline-none",
  tooltip: {
    base: "pointer-events-none absolute bottom-[calc(100%+8px)] z-10 whitespace-nowrap rounded bg-surface px-2 py-1 text-caption text-ink opacity-0 shadow-pop transition group-hover:opacity-100 group-focus-visible:opacity-100",
    centered: "left-1/2 -translate-x-1/2",
    alignRight: "right-0", // last bar: keep the tooltip inside the card
  },
  bar: {
    base: "w-full rounded-t transition group-hover:bg-white group-focus-visible:bg-white",
    past: "bg-white/30",
    current: "bg-signal",
  },
} as const;

export const upcomingListStyles = {
  dateTile: appendClass(bgPaper, "flex w-11 flex-col items-center rounded-lg py-1"),
  day: "font-display text-title font-semibold leading-tight",
  month: appendClass(eyebrow, "text-micro"),
  body: grow,
  title: "font-medium",
  meta: captionText,
  time: appendClass(monoText, textSecondary, "whitespace-nowrap"),
} as const;

/** Label column + timeline column, shared by the axis, every lane and the "now" overlay. */
const boardRow = "grid grid-cols-[116px_1fr] gap-3 md:grid-cols-[168px_1fr]";

export const dispatchBoardStyles = {
  scroller: "overflow-x-auto",
  board: "relative min-w-[720px] px-4 pb-4 pt-2 md:px-5",

  axis: appendClass(boardRow, "px-2"),
  ticks: "relative h-7",
  tick: "absolute top-2 -translate-x-1/2 font-mono text-micro text-ink-3",

  /** Striped lanes instead of divider lines; px-2 keeps content off the rounded edge. */
  lane: appendClass(boardRow, "min-h-14 items-center rounded-lg px-2 even:bg-paper/60"),
  tech: appendClass(flexRow, "min-w-0 gap-2"),
  techText: "min-w-0",
  techName: "text-label",
  techSkill: appendClass("text-caption", textMuted),

  track: "relative h-11",
  gridlines: "absolute inset-0 flex",
  gridline: "flex-1 border-l border-dotted border-line-strong/60",
  idle: "absolute inset-0 flex items-center pl-3 text-caption italic text-ink-3",

  job: appendClass(
    eventBlock,
    "absolute inset-y-1 flex min-w-0 cursor-default flex-col justify-center overflow-hidden px-2 text-micro leading-tight transition hover:z-10 hover:brightness-95",
  ),
  jobCustomer: "truncate font-semibold text-ink",
  jobMeta: appendClass("truncate", textSecondary),

  nowOverlay: appendClass(boardRow, "pointer-events-none absolute inset-x-6 bottom-4 top-2 md:inset-x-7"),
  nowTrack: "relative",
  nowLine: "absolute bottom-0 top-5.5 w-0.5 bg-ink",
  nowTag: "absolute -top-4 left-1/2 -translate-x-1/2 rounded-sm bg-signal px-1 font-mono text-[0.58rem] font-semibold text-on-signal",
} as const;
