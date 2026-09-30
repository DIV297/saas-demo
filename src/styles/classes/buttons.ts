export const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent font-medium transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer";

export const buttonVariants = {
  primary: "bg-ink text-paper hover:bg-black",
  secondary: "border-line-strong bg-surface text-ink hover:bg-sunken",
  ghost: "bg-transparent text-ink-2 hover:bg-sunken hover:text-ink",
} as const;

export const buttonSizes = {
  sm: "h-8 px-3 text-label",
  md: "h-10 px-4",
} as const;

export const iconButton = "grid size-8 place-items-center rounded-lg border border-line-strong bg-surface hover:bg-sunken";
