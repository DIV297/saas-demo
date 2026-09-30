/**
 * Geometry for the dispatch timeline (px). Each day shows working hours only;
 * nights collapse into a narrow strip between days.
 */
import type { JobWithRelations } from "@/types";
import { daysBetween, hourOfDay } from "./date";
import { clamp } from "./math";

const DAY_START = 7; // 7am
const DAY_END = 20; // 8pm
const HOUR_PX = 64;
export const DAY_PX = (DAY_END - DAY_START) * HOUR_PX;
export const NIGHT_PX = 32;
export const SEGMENT_PX = DAY_PX + NIGHT_PX;
export const HOURS = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i);

/** Days shown, relative to today (inclusive). */
export interface DayRange {
  start: number;
  end: number;
}

/** Left edge of a day, for a range beginning at `rangeStart`. */
export const xOfDay = (offset: number, rangeStart: number) => (offset - rangeStart) * SEGMENT_PX;

/** Horizontal position of a time of day within its day (clamped to working hours). */
export const xOfHour = (hour: number) => (clamp(hour, DAY_START, DAY_END) - DAY_START) * HOUR_PX;

/** Position of an instant on the whole track. */
export const xOfInstant = (date: Date, today: Date, rangeStart: number) =>
  xOfDay(daysBetween(today, date), rangeStart) + xOfHour(hourOfDay(date));

export interface TimelineBlock {
  job: JobWithRelations;
  left: number;
  width: number;
}

/**
 * Jobs laid out as blocks on the track: cancelled ones aren't dispatched, and anything
 * outside the loaded days or working hours is left out.
 */
export function layoutJobs(jobs: JobWithRelations[], today: Date, range: DayRange): TimelineBlock[] {
  return jobs.flatMap((job) => {
    if (job.status === "cancelled") return [];
    const at = new Date(job.scheduledAt);
    const day = daysBetween(today, at);
    const from = xOfHour(hourOfDay(at));
    const to = xOfHour(hourOfDay(at) + job.durationMins / 60);
    if (day < range.start || day > range.end || to <= from) return [];
    return [{ job, left: xOfDay(day, range.start) + from, width: to - from }];
  });
}

/** Which day (relative to today) is under a point `x` px along the track. */
export const dayAt = (x: number, rangeStart: number) => rangeStart + Math.floor(x / SEGMENT_PX);
