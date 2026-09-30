/** Builders for picker options (booking forms, filters). Plain data: components add icons if they need them. */
import { BOOKING_HOURS, DURATION_OPTIONS } from "@/lib/constants";
import type { Option, ServiceType, Technician } from "@/types";
import { addDays, atTimeValue, startOfDay, toTimeValue } from "./date";
import { formatClock, formatDuration } from "./format";

/** Half-hour start times in IST, e.g. { value: "09:30", label: "9:30 am IST" }. */
export const TIME_OPTIONS: Option[] = Array.from({ length: (BOOKING_HOURS.last - BOOKING_HOURS.first + 1) * 2 }, (_, i) => {
  const hour = BOOKING_HOURS.first + Math.floor(i / 2);
  const minute = i % 2 ? 30 : 0;
  return {
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    label: `${formatClock(hour, minute)} IST`,
  };
});

export const DURATION_CHOICES: Option[] = DURATION_OPTIONS.map((mins) => ({
  value: String(mins),
  label: formatDuration(mins),
}));

/** Technicians with the job's trade first, so the right person is at the top of the list. */
export function sortForService(technicians: Technician[], service?: ServiceType): Technician[] {
  if (!service) return technicians;
  return [...technicians].sort((a, b) => Number(b.skill === service) - Number(a.skill === service));
}

/**
 * "All" plus one option per value, each with how many items have it.
 * e.g. withCounts(customers, cities, (c) => c.city, { value: "", label: "All locations" })
 */
export function withCounts<T, V extends string>(
  items: T[],
  values: readonly V[],
  pick: (item: T) => string,
  all: { value: V; label: string },
): Option<V>[] {
  return [
    { ...all, count: items.length },
    ...values.map((value) => ({ value, label: value, count: items.filter((item) => pick(item) === value).length })),
  ];
}

/**
 * A start to pre-fill in booking / reschedule forms: `preferred` if it's still ahead,
 * otherwise the next free half-hour slot today (or tomorrow's first slot).
 */
export function suggestStart(preferred: Date, now = new Date()): { day: Date; time: string } {
  if (preferred > now) return { day: startOfDay(preferred), time: toTimeValue(preferred) };
  const today = startOfDay(now);
  const slot = TIME_OPTIONS.find((o) => atTimeValue(today, o.value) > now);
  return slot ? { day: today, time: slot.value } : { day: addDays(today, 1), time: TIME_OPTIONS[0].value };
}
