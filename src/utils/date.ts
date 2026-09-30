/**
 * All scheduling maths runs in one business timezone, India Standard Time, so the
 * server and the browser always agree (no hydration mismatches).
 *
 * IST is a fixed UTC+05:30 with no daylight saving, so converting is a constant shift.
 * In production this would be each company's configured timezone.
 */
export const BUSINESS_TZ = "Asia/Kolkata";
export const BUSINESS_TZ_LABEL = "IST";

const IST_OFFSET_MS = (5 * 60 + 30) * 60_000;
const DAY_MS = 24 * 60 * 60_000;

/** A Date whose UTC fields read as IST wall-clock time (internal helper). */
const toIst = (date: Date) => new Date(date.getTime() + IST_OFFSET_MS);
const fromIst = (date: Date) => new Date(date.getTime() - IST_OFFSET_MS);

/** Midnight IST of the day containing `date`. */
export function startOfDay(date: Date): Date {
  const ist = toIst(date);
  ist.setUTCHours(0, 0, 0, 0);
  return fromIst(ist);
}

/** Monday 00:00 IST of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const day = startOfDay(date);
  const weekday = (toIst(day).getUTCDay() + 6) % 7; // Mon = 0
  return addDays(day, -weekday);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

/** A time on the given IST day, e.g. atTime(today, 9, 30) → 09:30 IST. */
export function atTime(day: Date, hour: number, minute = 0): Date {
  return new Date(startOfDay(day).getTime() + (hour * 60 + minute) * 60_000);
}

/** IST calendar date as "YYYY-MM-DD" (the value format of <input type="date">). */
export function toDateKey(date: Date): string {
  return toIst(date).toISOString().slice(0, 10);
}

/** "YYYY-MM-DD" → midnight IST of that date. */
export function fromDateKey(key: string): Date {
  return fromIst(new Date(`${key}T00:00:00.000Z`));
}

/** Hours since IST midnight as a decimal, e.g. 13:30 → 13.5 */
export function hourOfDay(date: Date): number {
  const ist = toIst(date);
  return ist.getUTCHours() + ist.getUTCMinutes() / 60;
}

/** "14:30" → that time on `day` (IST). Pairs with the start-time options. */
export function atTimeValue(day: Date, time: string): Date {
  const [hour, minute] = time.split(":").map(Number);
  return atTime(day, hour, minute);
}

/** An instant → its IST "HH:MM" value. */
export function toTimeValue(date: Date): string {
  const hours = hourOfDay(date);
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Whole days from `from` to `to` (IST calendar days), e.g. tomorrow → 1. */
export function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);
}
