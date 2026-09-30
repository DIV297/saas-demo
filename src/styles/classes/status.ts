import type { JobStatus } from "@/types";

/** Every visual state of a job status in one place. Badges, calendar and dispatch board read from here. */
export const statusClasses: Record<JobStatus, { text: string; soft: string; solid: string; border: string }> = {
  scheduled: {
    text: "text-scheduled",
    soft: "bg-scheduled-soft",
    solid: "bg-scheduled",
    border: "border-scheduled",
  },
  in_progress: {
    text: "text-progress",
    soft: "bg-progress-soft",
    solid: "bg-progress",
    border: "border-progress",
  },
  completed: {
    text: "text-done",
    soft: "bg-done-soft",
    solid: "bg-done",
    border: "border-done",
  },
};
