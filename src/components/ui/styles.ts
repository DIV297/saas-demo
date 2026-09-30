/** Styles for the shared UI primitives that aren't generic enough for @/styles/classes. */
import {
  appendClass,
  bodyText,
  captionText,
  eyebrow,
  fieldWrapper,
  flexCol,
  flexWrap,
  gridCenter,
  inputBase,
  inputIcon,
  inputWithIcon,
  labelText,
  pageTitle,
} from "@/styles/classes";

export const avatarStyles = {
  base: appendClass(gridCenter, "shrink-0 font-mono font-semibold"),
  size: {
    sm: "size-7 rounded-lg text-micro",
    md: "size-9 rounded-lg text-caption",
    lg: "size-16 rounded-xl text-title",
  },
  tone: {
    paper: "bg-sunken text-ink-2",
    ink: "bg-ink text-paper",
    signal: "bg-signal text-on-signal",
    trade: "bg-ink/[0.06] text-ink",
  },
  /** Icon size (px) for each avatar size. */
  iconSize: { sm: 14, md: 17, lg: 28 },
} as const;

export const textFieldStyles = {
  wrapper: fieldWrapper,
  label: labelText,
  control: "relative flex items-center",
  icon: inputIcon,
  input: inputBase,
  inputWithIcon,
} as const;

export const pageHeaderStyles = {
  header: "mb-4 flex flex-wrap items-end justify-between gap-3",
  heading: appendClass(flexCol, "gap-1"),
  eyebrow,
  title: pageTitle,
  description: bodyText,
  actions: appendClass(flexWrap, "max-md:w-full"),
} as const;

/** Tab-style picker (status filter, plan filter…). */
export const segmentedStyles = {
  list: "inline-flex max-w-full gap-0.5 overflow-x-auto rounded-lg bg-sunken p-[3px]",
  option:
    "inline-flex h-8 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-label font-medium text-ink-2 transition hover:text-ink aria-selected:bg-surface aria-selected:text-ink aria-selected:shadow-sm",
  count: "min-w-5 rounded-full bg-paper px-1.5 text-center font-mono text-micro tabular-nums text-ink-3",
} as const;

export const dialogStyles = {
  dialog:
    "m-auto w-[min(560px,calc(100vw-32px))] rounded-2xl bg-surface p-0 text-ink shadow-pop backdrop:bg-ink/45 backdrop:backdrop-blur-[2px] open:motion-safe:animate-[fade-in_150ms_ease-out]",
  header: "flex items-start justify-between gap-4 px-5 pb-2 pt-5 md:px-6",
  eyebrow,
  title: appendClass(pageTitle, "md:text-heading"),
  close: "grid size-8 cursor-pointer place-items-center rounded-lg text-ink-3 transition hover:bg-sunken hover:text-ink",
  body: "px-5 pb-5 md:px-6 md:pb-6",
} as const;

export const selectFieldStyles = {
  field: fieldWrapper,
  label: labelText,
  wrapper: "relative flex items-center",
  icon: inputIcon,
  select: appendClass(inputBase, "cursor-pointer appearance-none pr-9"),
  selectWithIcon: inputWithIcon,
  chevron: "pointer-events-none absolute right-3 text-ink-3",
} as const;

export const tooltipStyles = {
  bubble:
    "pointer-events-none fixed z-50 max-w-72 rounded-lg bg-ink px-3 py-2 text-label text-paper shadow-pop motion-safe:animate-[fade-in_120ms_ease-out]",
  placement: {
    above: "-translate-x-1/2 -translate-y-full",
    below: "-translate-x-1/2",
    right: "-translate-y-1/2",
  },
} as const;

export const emptyStateStyles = {
  root: "bg-[repeating-linear-gradient(-45deg,transparent_0_10px,--theme(--color-line/35%)_10px_11px)] px-5 py-10 text-center",
  title: "mb-1 font-semibold",
  hint: captionText,
} as const;
