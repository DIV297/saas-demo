/** Week-calendar helpers (all days are IST midnights). */
import { addDays, isSameDay } from "./date";

const COLLAPSED_COLUMN = "72px";
const OPEN_COLUMN = "minmax(128px, 1fr)"; // 7 days fit on a laptop next to the sidebar

export const weekDays = (weekStart: Date) => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

export const jobsOnDay = <T extends { scheduledAt: string }>(jobs: T[], day: Date) =>
  jobs.filter((job) => isSameDay(new Date(job.scheduledAt), day));

/** CSS grid-template-columns for the week: folded days become slim strips. */
export const weekColumns = (days: Date[], isCollapsed: (day: Date) => boolean) =>
  days.map((day) => (isCollapsed(day) ? COLLAPSED_COLUMN : OPEN_COLUMN)).join(" ");

/** A copy of `set` with `key` added, or removed if it was there. */
export function toggleInSet<T>(set: Set<T>, key: T): Set<T> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}
