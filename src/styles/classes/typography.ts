// Type styles. Only five sizes exist (theme.css): text-primary, text-secondary, text-title, text-heading, text-display.

// Headings carry the brand as a yellow marker next to ink text (yellow text itself isn't readable on white).
/** Page title with a short yellow bar in front. */
export const pageTitle =
  "flex items-center gap-3 font-display text-heading font-bold tracking-display before:h-[0.8em] before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']";
export const sectionTitle = "font-display text-heading font-bold tracking-heading";
/** Card title with a small yellow marker in front. */
export const cardTitle =
  "flex items-center gap-2 font-display text-title font-semibold tracking-heading before:size-2 before:shrink-0 before:rounded-[2px] before:bg-brand before:content-['']";

export const eyebrow = "font-mono text-secondary font-medium uppercase tracking-label text-ink-3";
export const microLabel = "font-mono text-secondary uppercase tracking-label text-ink-3";
export const labelText = "text-secondary font-medium text-ink-2";
export const captionText = "text-secondary text-ink-3";
export const bodyText = "text-primary text-ink-2";
export const monoText = "font-mono text-secondary";

export const statValue = "font-display text-display font-semibold leading-none tracking-display tabular-nums";
export const numeric = "tabular-nums";

/** Ink text with a thick yellow underline: the accent without putting yellow text on a light background. */
export const linkAccent =
  "inline-flex items-center gap-1 text-secondary font-medium text-ink underline decoration-brand decoration-2 underline-offset-4 transition hover:decoration-ink";
