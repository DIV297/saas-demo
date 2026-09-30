/**
 * All scheduling maths runs in a single business timezone so the server and
 * the browser always agree (no hydration mismatches). For the demo that is UTC;
 * in production it would be each tenant's configured timezone.
 */
export const BUSINESS_TZ = "UTC";

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** Monday of the week that contains `date`. */
export function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  const day = (d.getUTCDay() + 6) % 7; // Mon = 0
  d.setUTCDate(d.getUTCDate() - day);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

/** Hours since midnight as a decimal, e.g. 13:30 -> 13.5 */
export function hourOfDay(date: Date): number {
  return date.getUTCHours() + date.getUTCMinutes() / 60;
}
