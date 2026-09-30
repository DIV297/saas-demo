import type { JobStatus, StatusFilter } from "@/types";

/** Jobs per status plus "all", e.g. for filter-tab counts. */
export function countByStatus(jobs: { status: JobStatus }[]): Record<StatusFilter, number> {
  const counts = { all: jobs.length, scheduled: 0, in_progress: 0, completed: 0, cancelled: 0 };
  jobs.forEach((j) => counts[j.status]++);
  return counts;
}

export function filterByStatus<T extends { status: JobStatus }>(jobs: T[], filter: StatusFilter): T[] {
  return filter === "all" ? jobs : jobs.filter((j) => j.status === filter);
}

/** Scheduled or in progress: can still be edited or cancelled. */
const isOpenJob = (status: JobStatus) => status === "scheduled" || status === "in_progress";

/**
 * Statuses a person can move a job to. "In progress" isn't one: a job starts automatically at its
 * booked time (see hasStarted). Completed jobs are final. Moving back to Scheduled is a reschedule,
 * so it needs a new date and time. The API enforces the same rules (checkJobChange).
 */
export const STATUS_TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  scheduled: ["cancelled"],
  in_progress: ["completed", "cancelled", "scheduled"],
  completed: [],
  cancelled: ["scheduled"],
};

export const isStatusLocked = (status: JobStatus) => STATUS_TRANSITIONS[status].length === 0;

const canMoveTo = (from: JobStatus, to: JobStatus) => from === to || STATUS_TRANSITIONS[from].includes(to);

/** Back to Scheduled from another status: needs a new date and time. */
export const isReschedule = (from: JobStatus, to: JobStatus) => to === "scheduled" && from !== "scheduled";

/** A scheduled job whose booked time has arrived is now in progress. */
export const hasStarted = (job: { status: JobStatus; scheduledAt: string }, now = new Date()) =>
  job.status === "scheduled" && new Date(job.scheduledAt) <= now;

export type JobChangeProblem = "locked" | "invalid_status" | "past_time";

export const JOB_CHANGE_MESSAGE: Record<JobChangeProblem, string> = {
  locked: "Completed jobs can't be changed",
  invalid_status: "That status change isn't allowed",
  past_time: "Pick a date and time in the future",
};

/**
 * Why a change to a job isn't allowed, or null if it is. New times (a reschedule, a restore,
 * or simply moving the booking) must be in the future.
 */
export function checkJobChange(
  job: { status: JobStatus; scheduledAt: string },
  change: { status?: JobStatus; scheduledAt?: string },
  now = new Date(),
): JobChangeProblem | null {
  if (isStatusLocked(job.status)) return "locked";
  if (change.status && !canMoveTo(job.status, change.status)) return "invalid_status";

  const nextTime = new Date(change.scheduledAt ?? job.scheduledAt);
  const timeChanged = nextTime.getTime() !== new Date(job.scheduledAt).getTime();
  const rescheduling = change.status !== undefined && isReschedule(job.status, change.status);
  if ((timeChanged || rescheduling) && nextTime <= now) return "past_time";
  return null;
}

/** A new booking's start must be in the future too. */
export const isInFuture = (iso: string, now = new Date()) => new Date(iso) > now;

/** Board order: what's happening now, then what's next; finished work after, newest first. */
const STATUS_ORDER: Record<JobStatus, number> = { in_progress: 0, scheduled: 1, completed: 2, cancelled: 3 };

export function sortForBoard<T extends { status: JobStatus; scheduledAt: string }>(jobs: T[]): T[] {
  return [...jobs].sort((a, b) => {
    const byStatus = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (byStatus) return byStatus;
    const byTime = a.scheduledAt.localeCompare(b.scheduledAt);
    return isOpenJob(a.status) ? byTime : -byTime; // upcoming: soonest first; history: latest first
  });
}
