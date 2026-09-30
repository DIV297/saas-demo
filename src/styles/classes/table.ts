/**
 * Data table. Below the md breakpoint each row becomes a stacked card and every
 * cell shows its column name (from `data-label`) on the left.
 */
export const table = {
  /** Only phones scroll sideways; on desktop the header row can stay sticky. */
  wrapper: "max-md:overflow-x-auto",
  root: "w-full border-collapse max-md:block",
  head: "max-md:hidden",
  body: "max-md:block",
  headCell:
    "whitespace-nowrap bg-paper px-4 py-2 text-left font-mono text-secondary font-medium uppercase tracking-label text-ink-3 lg:sticky lg:top-[var(--table-sticky-top,var(--spacing-below-header))] lg:z-[5]",
  /** Striped rows instead of divider lines. */
  row: "transition even:bg-paper/60 hover:bg-brand-soft/40 max-md:block max-md:px-4 max-md:py-2.5",
  cell: [
    "px-4 py-2 align-middle",
    "max-md:grid max-md:grid-cols-[96px_1fr] max-md:items-center max-md:px-0 max-md:py-1 max-md:*:justify-self-start",
    "max-md:before:row-span-2 max-md:before:font-mono max-md:before:text-secondary max-md:before:uppercase max-md:before:tracking-label max-md:before:text-ink-3 max-md:before:content-[attr(data-label)]",
  ].join(" "),
} as const;
