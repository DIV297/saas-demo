/** Styles for the week calendar and its navigation. */
import {
  appendClass,
  eventBlock,
  eyebrow,
  iconButton,
  inlineRow,
  linkAccent,
  monoText,
  panel,
  pressable,
  textMuted,
  textSecondary,
} from "@/styles/classes";

export const weekCalendarStyles = {
  /** Swipe area around the calendar; the week slides in from the side you navigated towards. */
  viewport: "touch-pan-y overflow-x-clip",
  slide: {
    next: "motion-safe:animate-week-next",
    prev: "motion-safe:animate-week-prev",
    none: "",
  },

  /**
   * Each day is its own card. Phone: stacked agenda. Tablet/desktop: 7 columns whose widths come from
   * the --calendar-columns variable, so past days can shrink to a slim strip and give their space away.
   */
  grid: "grid grid-cols-1 gap-2 md:grid-cols-(--calendar-columns) md:overflow-x-auto md:pb-1",
  /** On tablet/desktop the card's top edge is the pinned header cell above it. */
  day: appendClass(panel, "group flex min-w-0 flex-col data-today:bg-brand-soft md:min-h-[420px] md:rounded-t-none"),

  /**
   * Pinned row of day names (tablet/desktop). It lives outside the grid's horizontal scroll so it can stick
   * under the page header, and follows the grid sideways via a transform (see WeekCalendar).
   */
  headerRow:
    "hidden overflow-hidden bg-paper md:sticky md:top-below-header md:z-[4] md:block",
  headerRowInner: "grid grid-cols-(--calendar-columns) gap-2 will-change-transform",
  headerCell:
    "group flex items-center gap-2 rounded-t-xl bg-surface px-3 pb-1 pt-3 data-today:bg-brand-soft",
  headerCellCollapsed: appendClass(
    pressable,
    "flex cursor-pointer flex-col items-center justify-end gap-1 rounded-t-xl bg-surface px-1 pb-1 pt-3 hover:text-ink",
  ),

  /** A past day folded into a slim strip (a row on phones): day, job count, done tick. Click to expand. */
  collapsed: appendClass(
    pressable,
    "flex h-full w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-ink-3 hover:bg-sunken/60 hover:text-ink",
    "md:flex-col md:justify-start md:gap-2 md:px-1 md:py-3 md:text-center",
  ),
  /** Date inside a folded day: needed on phones; on wider screens the pinned row already shows it. */
  collapsedDate: "flex items-center gap-3 md:hidden",
  collapsedCount: "rounded-full bg-sunken px-2 font-mono text-secondary text-ink-2",
  collapsedDone: "text-success",
  collapsedHint: "ml-auto flex items-center gap-1 text-secondary md:ml-0 md:mt-auto",
  collapseButton:
    "grid size-6 cursor-pointer place-items-center rounded-md text-ink-3 transition hover:bg-sunken hover:text-ink",

  /** Day names stay pinned below the sticky page header while you scroll a busy week (desktop). */
  /** Phones only: the header inside each day card (tablet/desktop use the pinned row instead). */
  dayHeader: "flex items-center gap-2 px-3 pb-1 pt-3 md:hidden",
  weekday: eyebrow,
  /** Today: the number sits in a yellow circle (compact, no extra "Today" badge needed). */
  dayNumber:
    "grid min-w-8 place-items-center font-display text-heading font-semibold leading-none group-data-today:size-9 group-data-today:rounded-full group-data-today:bg-brand group-data-today:text-title group-data-today:text-on-brand",
  /** Reserves one button's width. On wider screens the Book button grows leftwards over the header on hover. */
  headerActions: "relative ml-auto flex h-7 shrink-0 items-center justify-end md:w-7",
  /** Compact "+" that slides open to "+ Book" on hover/focus (always open on phones). */
  bookButton: appendClass(
    pressable,
    "group/book z-[1] inline-flex h-7 cursor-pointer items-center gap-1 rounded-md bg-ink px-1.5 text-secondary font-semibold text-paper shadow-sm hover:bg-brand hover:text-on-brand focus-visible:bg-brand focus-visible:text-on-brand md:absolute md:right-0 md:top-0",
  ),
  bookLabel:
    "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/book:max-w-12 group-hover/book:opacity-100 group-focus-visible/book:max-w-12 group-focus-visible/book:opacity-100 max-md:max-w-12 max-md:opacity-100",

  events: "flex flex-1 flex-col gap-2 p-2",
  empty: appendClass("px-1 py-3 text-secondary", textMuted),

  /** Clickable job card: lifts slightly on hover, dips on press, shows a focus ring for keyboards. */
  event: appendClass(
    eventBlock,
    pressable,
    "flex w-full cursor-pointer flex-col items-start px-3 py-2 text-left text-secondary",
    "hover:-translate-y-px hover:shadow-card hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-ink",
  ),
  eventCancelled: "opacity-60 [&>span:nth-child(2)]:line-through",
  cancelledTag: "ml-2 rounded-sm bg-surface px-1 font-sans text-secondary font-medium",
  eventTime: appendClass(monoText, "text-secondary font-semibold"),
  eventTitle: "my-0.5 text-secondary font-semibold text-ink",
  eventMeta: textSecondary,
  eventTech: appendClass(inlineRow, "gap-1", textSecondary),
  techBadge: "grid size-4 place-items-center rounded-sm bg-surface text-ink",
} as const;

export const weekNavStyles = {
  bar: "flex items-center gap-3",
  nav: appendClass(inlineRow, "gap-2"),
  arrow: iconButton,
  range: "min-w-36 text-center font-mono text-secondary",
  reset: linkAccent,
  /** Keeps its width so the arrows don't shift, but isn't visible or clickable. */
  resetHidden: "invisible",
} as const;
