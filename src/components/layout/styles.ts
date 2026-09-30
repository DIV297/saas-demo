/** Styles for the app shell: sidebar, bottom tab bar, top bar and logo. */
import { appendClass, eyebrow, flexRow, monoText, pageContent, pressable } from "@/styles/classes";

/** Shared by desktop nav links and mobile tabs: highlights the current page. */
const activeState = "aria-[current=page]:bg-white/8 aria-[current=page]:text-white";

export const appShellStyles = {
  root: "min-h-screen",
  main: {
    base: "min-w-0 transition-[margin] duration-200",
    expanded: "lg:ml-sidebar",
    collapsed: "lg:ml-sidebar-collapsed",
  },
  content: pageContent,
} as const;

export const sidebarStyles = {
  rail: {
    base: "fixed inset-y-0 left-0 z-20 hidden flex-col bg-ink px-3 py-5 text-sidebar-text transition-[width] duration-200 lg:flex",
    expanded: "w-sidebar",
    collapsed: "w-sidebar-collapsed",
  },
  brand: {
    base: "flex h-11 items-center",
    expanded: "justify-between pl-3",
    collapsed: "flex-col justify-center gap-3 h-auto",
  },
  toggle:
    "grid size-8 cursor-pointer place-items-center rounded-lg text-sidebar-muted transition hover:bg-white/5 hover:text-white focus-visible:outline-brand",

  nav: "mt-6 flex flex-col gap-0.5",
  navHeading: appendClass(eyebrow, "px-3 pb-2 text-sidebar-muted"),
  navItem: "block",
  link: {
    base: appendClass(
      "group relative flex h-10 items-center gap-3 rounded-lg hover:bg-white/5 hover:text-white focus-visible:outline-brand",
      pressable,
      activeState,
    ),
    expanded: "px-3",
    collapsed: "justify-center",
  },
  activeTick:
    "absolute inset-y-2.5 -left-3 w-[3px] rounded-r bg-brand opacity-0 transition group-aria-[current=page]:opacity-100",
  linkLabel: "flex-1",
  linkIndex: appendClass(monoText, "text-sidebar-dim group-aria-[current=page]:text-brand"),

  account: "mt-auto rounded-lg bg-white/[0.04] p-3",
  accountCompact: "mt-auto grid place-items-center",
  accountHeading: appendClass(eyebrow, "text-sidebar-muted"),
  accountName: "mt-1.5 font-medium text-white",
  accountPlan: "text-secondary",

  tabBar:
    "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 bg-ink p-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] lg:hidden",
  tab: appendClass("group flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-secondary text-sidebar-text", pressable, activeState),
  tabIcon: "group-aria-[current=page]:text-brand",
} as const;

export const topbarStyles = {
  /** Layering: top bar (z-30) > sticky page header (z-20) > anything inside page content (≤ z-3). */
  bar: "sticky top-0 z-30 flex h-topbar items-center justify-between bg-paper px-5 md:px-8",
  mobileLogo: "lg:hidden",
  date: "hidden items-center gap-2 font-mono text-secondary text-ink-2 lg:flex",
  liveDot: "size-2 rounded-full bg-success ring-3 ring-success-soft",
  actions: appendClass(flexRow, "gap-2"),
} as const;

export const userMenuStyles = {
  root: "relative",
  trigger: appendClass(
    pressable,
    "flex h-9 cursor-pointer items-center gap-2 rounded-lg pl-1 pr-2 hover:bg-sunken aria-expanded:bg-sunken",
  ),
  triggerName: "hidden text-secondary font-medium md:inline",
  chevron: "text-ink-3 transition",
  chevronOpen: "rotate-180",
  menu: "absolute right-0 top-[calc(100%+6px)] z-30 w-60 rounded-xl bg-surface p-1.5 shadow-pop motion-safe:animate-dialog-in",
  identity: "px-2.5 pb-2 pt-1.5",
  identityName: "text-secondary font-semibold",
  identityCompany: "text-secondary text-ink-3",
  itemWrap: "block",
  item: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-secondary",
  itemDisabled: "cursor-not-allowed text-ink-3",
  soon: "ml-auto rounded-sm bg-sunken px-1.5 font-mono text-secondary text-ink-3",
  itemDanger: "mt-1 cursor-pointer bg-danger-soft/0 font-medium text-danger transition hover:bg-danger-soft",
} as const;

export const logoStyles = {
  wordmark: "inline-flex items-center gap-2.5 font-display text-title font-bold uppercase tracking-[0.02em]",
  tone: { light: "text-ink", inverted: "text-white" },
  mark: "grid w-[22px] gap-[3px]",
  srOnly: "sr-only",
  /** Three stacked bars; yellow on dark backgrounds, ink on light ones for contrast. */
  bar: "h-1 rounded-sm",
  barShapes: ["w-full", "ml-[30%] w-[70%] opacity-75", "w-[45%] opacity-50"],
  barTone: { light: "bg-ink", inverted: "bg-brand" },
} as const;
