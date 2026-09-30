/** Styles for the sign-in form. */
import { alertError, appendClass, bodyText, eyebrow, pageTitle } from "@/styles/classes";

export const loginFormStyles = {
  form: "grid gap-4",
  error: alertError,
  demoCard: appendClass(
    "mt-2 grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-3 gap-y-0.5 rounded-lg px-4 py-3 text-left text-label transition",
    "bg-sunken hover:bg-signal-soft",
  ),
  demoLabel: eyebrow,
  demoAction: "row-span-2 font-semibold underline decoration-signal decoration-2 underline-offset-4",
  demoCredentials: "font-mono text-ink-2",
} as const;

export const brandPanelStyles = {
  panel: "relative hidden flex-col justify-between gap-10 overflow-hidden bg-ink p-10 text-white lg:flex",
  /** Faint blueprint grid, faded out at the top and bottom. */
  grid: appendClass(
    "pointer-events-none absolute inset-0 bg-size-[40px_40px]",
    "bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)]",
    "mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]",
  ),
  layer: "relative",
  kicker: "mb-4 font-mono text-label text-signal",
  headline: "font-display text-[clamp(2.5rem,5vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-display",
  headlineMuted: "text-sidebar-muted",

  preview: "relative grid gap-2 rounded-xl bg-white/[0.04] p-4",
  lane: "flex items-center gap-3",
  laneTech: "grid w-7 place-items-center text-sidebar-text",
  track: "relative h-5.5 flex-1 rounded-sm bg-white/[0.04]",
  block: "absolute inset-y-[3px] origin-left rounded-[3px] opacity-90 motion-safe:animate-bar-in",
  blockTone: {
    done: "bg-done-bright",
    active: "bg-progress-bright",
    booked: "bg-scheduled-bright",
  },
} as const;

export const loginPageStyles = {
  page: "grid min-h-screen lg:grid-cols-[1.1fr_1fr]",
  formSide: "grid place-items-start justify-center px-6 pt-[12vh] lg:place-items-center lg:pt-10",
  formInner: "w-full max-w-[380px]",
  mobileLogo: "mb-8 lg:hidden",
  eyebrow,
  title: appendClass(pageTitle, "mb-1.5 mt-1"),
  intro: appendClass(bodyText, "mb-7"),
} as const;
