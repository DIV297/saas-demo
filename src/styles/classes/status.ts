import type { JobStatus } from "@/types";

/**
 * Every visual state of a job status in one place. Badges, calendar and dispatch board read from here.
 * Statuses reuse the brand palette instead of adding colours:
 *   scheduled → secondary (ink), in progress → primary (brand yellow), completed → success,
 *   cancelled → danger (and struck through / faded where it appears on the schedule).
 */
export const statusClasses: Record<JobStatus, { text: string; soft: string; solid: string; border: string }> = {
  scheduled: {
    text: "text-ink-2",
    soft: "bg-sunken",
    solid: "bg-ink-3",
    border: "border-ink-3",
  },
  in_progress: {
    text: "text-ink",
    soft: "bg-brand-soft",
    solid: "bg-brand",
    border: "border-brand",
  },
  completed: {
    text: "text-success",
    soft: "bg-success-soft",
    solid: "bg-success",
    border: "border-success",
  },
  cancelled: {
    text: "text-danger",
    soft: "bg-danger-soft",
    solid: "bg-danger",
    border: "border-danger",
  },
};
