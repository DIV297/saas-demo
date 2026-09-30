// Flex & grid building blocks.
export const flexRow = "flex items-center gap-3";
export const flexCol = "flex flex-col";
export const flexBetween = "flex items-center justify-between gap-3";
export const flexWrap = "flex flex-wrap items-center gap-3";
export const inlineRow = "inline-flex items-center gap-1.5";
export const gridCenter = "grid place-items-center";
export const grow = "min-w-0 flex-1";

// Page-level containers.
export const pageContent = "mx-auto max-w-content px-4 pb-24 pt-4 md:px-8 md:pt-5 lg:pb-8";
export const sectionGap = "grid gap-4";
/** Entrance animation for each new page (skipped for users who prefer reduced motion). */
export const pageEnter = "motion-safe:animate-page-in";

// Page templates.
export const layoutMainAside = "grid items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]";
export const layoutAsideMain = "grid items-start gap-5 xl:grid-cols-[360px_minmax(0,1fr)]";
export const fullScreenCenter = "grid min-h-screen place-items-center p-6 text-center";
