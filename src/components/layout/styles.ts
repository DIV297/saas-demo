/** Styles for the app shell: sidebar, bottom tab bar, top bar and logo. */
import { appendClass, eyebrow, flexRow, monoText, pageContent } from "@/styles/classes";

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
    "grid size-8 cursor-pointer place-items-center rounded-lg text-sidebar-muted transition hover:bg-white/5 hover:text-white focus-visible:outline-signal",

  nav: "mt-6 flex flex-col gap-0.5",
  navHeading: appendClass(eyebrow, "px-3 pb-2 text-sidebar-muted"),
  navItem: "block",
  link: {
    base: appendClass(
      "group relative flex h-10 items-center gap-3 rounded-lg transition hover:bg-white/5 hover:text-white focus-visible:outline-signal",
      activeState,
    ),
    expanded: "px-3",
    collapsed: "justify-center",
  },
  activeTick:
    "absolute inset-y-2.5 -left-3 w-[3px] rounded-r bg-signal opacity-0 transition group-aria-[current=page]:opacity-100",
  linkLabel: "flex-1",
  linkIndex: appendClass(monoText, "text-sidebar-dim group-aria-[current=page]:text-signal"),

  account: "mt-auto rounded-lg bg-white/[0.04] p-3",
  accountCompact: "mt-auto grid place-items-center",
  accountHeading: appendClass(eyebrow, "text-sidebar-muted"),
  accountName: "mt-1.5 font-medium text-white",
  accountPlan: "text-label",

  tabBar:
    "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 bg-ink p-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] lg:hidden",
  tab: appendClass("group flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-micro text-sidebar-text", activeState),
  tabIcon: "group-aria-[current=page]:text-signal",
} as const;

export const topbarStyles = {
  bar: "sticky top-0 z-10 flex h-topbar items-center justify-between bg-paper/85 px-4 backdrop-blur md:px-8",
  mobileLogo: "lg:hidden",
  date: "hidden items-center gap-2 font-mono text-label text-ink-2 lg:flex",
  liveDot: "size-2 rounded-full bg-done ring-3 ring-done-soft",
  actions: appendClass(flexRow, "gap-2"),
  user: "mr-2 hidden items-center gap-2 md:flex",
  userName: "text-label",
  logoutLabel: "hidden md:inline",
} as const;

export const logoStyles = {
  wordmark: "inline-flex items-center gap-2.5 font-display text-title font-bold uppercase tracking-[0.02em]",
  tone: { light: "text-ink", inverted: "text-white" },
  mark: "grid w-[22px] gap-[3px]",
  srOnly: "sr-only",
  /** Three stacked bars; yellow on dark backgrounds, ink on light ones for contrast. */
  bar: "h-1 rounded-sm",
  barShapes: ["w-full", "ml-[30%] w-[70%] opacity-75", "w-[45%] opacity-50"],
  barTone: { light: "bg-ink", inverted: "bg-signal" },
} as const;
