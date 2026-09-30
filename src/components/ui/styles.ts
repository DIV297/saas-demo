/** Styles for the shared UI primitives that aren't generic enough for @/styles/classes. */
import {
  appendClass,
  captionText,
  eyebrow,
  fieldWrapper,
  flexWrap,
  gridCenter,
  inputIcon,
  inputBase,
  inputWithIcon,
  labelText,
  pageTitle,
  pressable,
} from "@/styles/classes";

export const avatarStyles = {
  base: appendClass(gridCenter, "shrink-0 font-mono font-semibold"),
  size: {
    sm: "size-7 rounded-lg text-secondary",
    md: "size-9 rounded-lg text-secondary",
    lg: "size-16 rounded-xl text-title",
  },
  tone: {
    paper: "bg-sunken text-ink-2",
    ink: "bg-ink text-brand",
    brandSoft: "bg-brand-soft text-ink",
    brand: "bg-brand text-on-brand",
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

/** Breadcrumbs, title and meta share one row; actions sit on the right. */
export const pageHeaderStyles = {
  /** Desktop: every page heading row stays pinned under the top bar (fixed height, so the next layer knows its offset). */
  header:
    "mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 lg:sticky lg:top-topbar lg:z-20 lg:-mx-8 lg:h-subheader lg:bg-paper lg:px-8",
  /** Opt-in: also pinned on smaller screens (e.g. calendar controls). */
  sticky:
    "max-lg:sticky max-lg:top-topbar max-lg:z-20 max-lg:-mx-4 max-lg:bg-paper max-lg:px-4 max-lg:py-2 md:max-lg:-mx-8 md:max-lg:h-subheader md:max-lg:px-8 md:max-lg:py-0",
  heading: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
  title: pageTitle,
  meta: appendClass(captionText, "before:mr-2 before:text-line-strong before:content-['·']"),
  actions: appendClass(flexWrap, "max-md:w-full"),
} as const;

export const breadcrumbStyles = {
  nav: "flex items-center",
  list: "flex items-center gap-1.5 text-secondary",
  item: "inline-flex items-center",
  link: "relative inline-flex items-center gap-1 rounded-sm text-ink-3 transition hover:text-ink",
  separator: "text-line-strong",
} as const;

/** Thin yellow bar at the very top while a clicked link is still loading. */
export const pendingBarStyles = {
  bar: "pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand opacity-0 motion-safe:animate-nav-progress motion-reduce:opacity-100",
} as const;

/** Tab-style picker (status filter, plan filter…). */
export const segmentedStyles = {
  list: "inline-flex max-w-full gap-0.5 overflow-x-auto rounded-lg bg-sunken p-[3px]",
  option: appendClass(
    pressable,
    "inline-flex h-8 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-secondary font-medium text-ink-2 hover:text-ink aria-selected:bg-brand aria-selected:text-on-brand aria-selected:shadow-sm",
  ),
  count: "min-w-5 rounded-full bg-paper px-1.5 text-center font-mono text-secondary tabular-nums text-ink-3",
} as const;

export const dialogStyles = {
  dialog:
    "m-auto max-h-[min(760px,calc(100dvh-32px))] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-2xl bg-surface p-0 text-ink shadow-pop backdrop:bg-ink/45 backdrop:backdrop-blur-[2px] open:flex open:flex-col open:motion-safe:animate-dialog-in",
  /** Stays put: only the body scrolls. */
  header: "flex shrink-0 items-start justify-between gap-4 px-5 pb-3 pt-5 md:px-6",
  eyebrow,
  title: appendClass(pageTitle, "md:text-heading"),
  close: "grid size-8 cursor-pointer place-items-center rounded-lg text-ink-3 transition hover:bg-sunken hover:text-ink",
  /** Scrolls between the fixed header and the sticky footer. */
  body: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 md:px-6",
  /** Action bar pinned to the bottom of the body while the content scrolls. */
  footer:
    "sticky bottom-0 -mx-5 mt-1 flex flex-wrap items-center justify-end gap-2 bg-surface px-5 pb-5 pt-3 shadow-[0_-10px_16px_-14px_rgb(17_19_24/0.25)] md:-mx-6 md:px-6",
} as const;

/** The brand select (filters, form fields, status pill). Menu is shared; the trigger has two looks. */
export const dropdownStyles = {
  trigger: appendClass(
    pressable,
    "flex h-10 w-full cursor-pointer items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-left text-primary transition",
    "hover:border-ink aria-expanded:border-ink aria-expanded:ring-3 aria-expanded:ring-brand-soft focus-visible:outline-none focus-visible:border-ink focus-visible:ring-3 focus-visible:ring-brand-soft",
  ),
  variant: {
    filter: "",
    /** Form fields don't lift on press, like the text inputs next to them. */
    field: "active:scale-100",
  },
  /** Filter look while a filter is applied. */
  triggerActive: "border-brand bg-brand-soft font-medium hover:border-ink",
  icon: "flex shrink-0 text-ink-3",
  iconActive: "text-ink",
  value: "flex min-w-0 flex-1 items-baseline gap-1.5 truncate",
  placeholder: "text-ink-3",
  hint: "truncate text-secondary text-ink-3",
  chevron: "shrink-0 text-ink-3 transition",
  chevronOpen: "rotate-180 text-ink",

  /** Position, max height and min width come from placeMenu (inline style). */
  menu: "fixed z-50 flex min-w-44 max-w-[min(420px,calc(100vw-16px))] flex-col overflow-hidden rounded-xl bg-surface shadow-pop motion-safe:animate-[fade-in_120ms_ease-out]",
  search: "relative flex shrink-0 items-center p-1.5 pb-0",
  searchIcon: "pointer-events-none absolute left-4 text-ink-3",
  searchInput:
    "h-9 w-full rounded-lg bg-sunken pl-8.5 pr-3 text-secondary outline-none placeholder:text-ink-3 focus:ring-2 focus:ring-brand",
  list: "min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5 outline-none",
  option: "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-secondary",
  optionActive: "bg-sunken",
  optionSelected: "bg-brand-soft font-semibold",
  optionLabel: "flex min-w-0 flex-1 items-baseline gap-1.5 truncate",
  count: "rounded-full bg-paper px-1.5 font-mono text-secondary text-ink-3",
  check: "grid size-5 shrink-0 place-items-center rounded-full text-on-brand [&:has(svg)]:bg-brand",
  empty: "px-2.5 py-3 text-secondary text-ink-3",
} as const;

export const selectFieldStyles = {
  field: fieldWrapper,
  label: labelText,
} as const;

export const tooltipStyles = {
  bubble:
    "pointer-events-none fixed z-50 max-w-72 rounded-lg bg-ink px-3 py-2 text-secondary text-paper shadow-pop motion-safe:animate-[fade-in_120ms_ease-out]",
} as const;

export const emptyStateStyles = {
  root: "bg-[repeating-linear-gradient(-45deg,transparent_0_10px,--theme(--color-line/35%)_10px_11px)] px-5 py-10 text-center",
  title: "mb-1 font-semibold",
  hint: captionText,
} as const;
