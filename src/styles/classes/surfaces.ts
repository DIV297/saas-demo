// Cards, panels and list rows.
export const panel = "rounded-xl bg-surface shadow-card";
export const panelDark = "rounded-xl bg-ink text-paper shadow-card";
/** overflow-clip (not hidden) rounds the corners without breaking sticky toolbars/headers inside the card. */
export const cardShell = "flex min-w-0 flex-col overflow-clip";

/** Desktop: pinned under the page heading row. Fixed height, so a sticky table header can sit right below it. */
export const stickyToolbar = "bg-surface lg:sticky lg:top-below-header lg:z-[6] lg:h-toolbar lg:py-0";
/** Put on a Card whose table header should stick below its sticky toolbar. */
export const stickyTableBelowToolbar = "[--table-sticky-top:var(--spacing-below-toolbar)]";
export const cardHeader = "flex items-center justify-between gap-3 px-4 pb-2 pt-3.5";
export const cardBody = "p-4";

/** List item without divider lines: rows are separated by spacing and a rounded hover state. */
export const listRow = "mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-brand-soft/50";

export const iconTile = "grid size-8 shrink-0 place-items-center rounded-lg bg-sunken text-ink-2";
