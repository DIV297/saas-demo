/**
 * Data table. Below the md breakpoint each row becomes a stacked card and every
 * cell shows its column name (from `data-label`) on the left.
 */
export const table = {
  wrapper: "overflow-x-auto",
  root: "w-full border-collapse max-md:block",
  head: "max-md:hidden",
  body: "max-md:block",
  headCell:
    "whitespace-nowrap bg-paper px-5 py-3 text-left font-mono text-caption font-medium uppercase tracking-label text-ink-3",
  /** Striped rows instead of divider lines. */
  row: "transition even:bg-paper/60 hover:bg-sunken/70 max-md:block max-md:px-4 max-md:py-3",
  cell: [
    "px-5 py-3 align-middle",
    "max-md:grid max-md:grid-cols-[96px_1fr] max-md:items-center max-md:px-0 max-md:py-1.5 max-md:*:justify-self-start",
    "max-md:before:row-span-2 max-md:before:font-mono max-md:before:text-micro max-md:before:uppercase max-md:before:tracking-label max-md:before:text-ink-3 max-md:before:content-[attr(data-label)]",
  ].join(" "),
} as const;
