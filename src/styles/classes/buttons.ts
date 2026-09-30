import { appendClass } from "./append-class";

export const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent font-medium transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer";

export const buttonVariants = {
  primary: "bg-brand text-on-brand font-semibold hover:brightness-95",
  secondary: "border-line-strong bg-surface text-ink hover:bg-sunken",
  ghost: "bg-transparent text-ink-2 hover:bg-sunken hover:text-ink",
  /** Destructive action offered as an option (e.g. "Cancel booking"). */
  dangerGhost: "bg-transparent text-danger hover:bg-danger-soft",
  /** Destructive action being confirmed. */
  danger: "bg-danger font-semibold text-white hover:brightness-95",
} as const;

export const buttonSizes = {
  sm: "h-8 px-3 text-secondary",
  md: "h-10 px-4",
} as const;

/** Tactile press feedback for anything clickable that isn't a Button. */
export const pressable = "transition active:scale-[0.97]";

export const iconButton = appendClass(
  pressable,
  "grid size-8 place-items-center rounded-lg border border-line-strong bg-surface hover:bg-sunken",
);
