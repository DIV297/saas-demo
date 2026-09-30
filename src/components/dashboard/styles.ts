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
  pressable,
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
    base: appendClass(eyebrow, "max-sm:text-secondary"),
    highlight: "text-sidebar-muted",
  },
  index: {
    base: appendClass(monoText, textMuted),
    default: "max-sm:hidden",
  },
  body: "mt-auto flex items-end justify-between gap-3",
  value: appendClass(statValue, "max-sm:text-heading"),
  footnote: {
    base: "text-secondary",
    default: "text-ink-2 max-sm:hidden",
    highlight: "text-sidebar-text",
  },
} as const;

export const revenueBarsStyles = {
  chart: "flex h-13 w-22 shrink-0 items-end gap-0.5",
  column: "group relative flex h-full flex-1 items-end outline-none",
  tooltip: {
    base: "pointer-events-none absolute bottom-[calc(100%+8px)] z-10 whitespace-nowrap rounded bg-surface px-2 py-1 text-secondary text-ink opacity-0 shadow-pop transition group-hover:opacity-100 group-focus-visible:opacity-100",
    centered: "left-1/2 -translate-x-1/2",
    alignRight: "right-0", // last bar: keep the tooltip inside the card
  },
  bar: {
    base: "w-full rounded-t transition group-hover:bg-white group-focus-visible:bg-white",
    past: "bg-white/30",
    current: "bg-brand",
  },
} as const;

export const upcomingListStyles = {
  dateTile: appendClass(bgPaper, "flex w-11 flex-col items-center rounded-lg py-1"),
  day: "font-display text-title font-semibold leading-tight",
  month: appendClass(eyebrow, "text-secondary"),
  body: grow,
  title: "font-medium",
  meta: captionText,
  time: appendClass(monoText, textSecondary, "whitespace-nowrap"),
} as const;

/**
 * Pinned first column (technician names): stays in view while the timeline scrolls sideways.
 * Layering inside the board: day grid < NOW line (z-1) < job blocks (hover z-2) < pinned column (z-3).
 */
const stickyColumn = "sticky left-0 z-[3] w-(--label-w) shrink-0";

export const dispatchBoardStyles = {
  controls: "flex items-center gap-1",
  todayButton: appendClass(
    pressable,
    "h-8 cursor-pointer rounded-lg bg-ink px-3 text-secondary font-semibold text-paper hover:bg-brand hover:text-on-brand",
  ),
  navButton: appendClass(pressable, "grid size-8 cursor-pointer place-items-center rounded-lg text-ink-2 hover:bg-sunken hover:text-ink"),
  visibleDay: "min-w-24 text-center text-secondary font-medium",

  scroller: "overflow-x-auto overscroll-x-contain [scrollbar-width:thin]",
  /** --label-w: width of the pinned technician column (also used to place the NOW line). */
  board: "relative w-max pb-3 [--label-w:136px] md:[--label-w:176px]",

  axis: "flex",
  corner: appendClass(stickyColumn, "bg-surface"),
  axisTrack: "relative h-14",
  axisDay: "absolute inset-y-0",
  /** Day label sticks just right of the name column while its day is on screen. */
  dayLabel:
    "sticky left-[calc(var(--label-w)+8px)] top-0 inline-flex h-7 items-center rounded-md px-2 font-display text-secondary font-semibold text-ink",
  dayLabelToday: "bg-brand text-on-brand",
  dayLabelPast: "text-ink-3",
  tick: "absolute bottom-1 -translate-x-1/2 font-mono text-secondary text-ink-3 first:translate-x-0",

  /** Striped lanes (solid colours, so the pinned name column can inherit them). */
  lane: "flex min-h-14 items-stretch bg-surface even:bg-paper",
  tech: appendClass(flexRow, stickyColumn, "gap-2 bg-inherit px-3 shadow-[6px_0_10px_-10px_rgb(17_19_24/0.35)]"),
  techText: "min-w-0",
  techName: "text-secondary",
  techSkill: appendClass("text-secondary", textMuted),

  track: "relative",
  /** One hour grid per day, drawn as a repeating background instead of extra elements. */
  dayGrid:
    "absolute inset-y-0 bg-[repeating-linear-gradient(to_right,var(--color-line)_0_1px,transparent_1px_64px)]",
  /** Off-hours between days: a narrow hatched strip. */
  night:
    "absolute inset-y-0 bg-[repeating-linear-gradient(135deg,var(--color-sunken)_0_5px,transparent_5px_10px)]",

  job: appendClass(
    eventBlock,
    "absolute inset-y-1.5 flex min-w-0 cursor-default flex-col justify-center overflow-hidden px-2 text-secondary leading-tight transition hover:z-[2] hover:brightness-95",
  ),
  jobCustomer: "truncate font-semibold text-ink",
  jobMeta: appendClass("truncate", textSecondary),

  nowLine: "pointer-events-none absolute bottom-3 top-7 z-[1] w-0.5 bg-ink",
  nowTag: "absolute -top-5 left-1/2 -translate-x-1/2 rounded-sm bg-brand px-1 font-mono text-secondary font-semibold text-on-brand",
} as const;
