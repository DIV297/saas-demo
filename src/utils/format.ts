import { istParts } from "./date";

/** Indian formatting throughout: ₹ with lakh grouping (₹1,85,400), "30 Sep", "9:30 am". */
const LOCALE = "en-IN";

const currency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => currency.format(value);

/**
 * Dates and times are spelled out by hand instead of with toLocaleDateString: browsers ship different
 * locale data (iOS Safari prints "Sep" and "PM", Node prints "Sept" and "pm"), which would make the
 * same screen look different on each device and break hydration.
 */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const short = (name: string) => name.slice(0, 3);

interface DateParts {
  weekday?: "short" | "long";
  day?: "numeric" | "2-digit";
  month?: "short" | "long";
  year?: boolean;
}

/** IST date with the chosen parts, e.g. { weekday: "short", day: "numeric", month: "short" } → "Wed, 30 Sep". */
export function formatDate(iso: string | Date, parts: DateParts = { day: "numeric", month: "short" }): string {
  const p = istParts(new Date(iso));
  const weekday = parts.weekday && (parts.weekday === "long" ? WEEKDAYS[p.weekday] : short(WEEKDAYS[p.weekday]));
  const date = [
    parts.day && (parts.day === "2-digit" ? String(p.day).padStart(2, "0") : p.day),
    parts.month && (parts.month === "long" ? MONTHS[p.month] : short(MONTHS[p.month])),
    parts.year && p.year,
  ]
    .filter(Boolean)
    .join(" ");
  return [weekday, date].filter(Boolean).join(", ");
}

/** "Wed, 30 Sep" */
export const formatDayShort = (iso: string | Date) => formatDate(iso, { weekday: "short", day: "numeric", month: "short" });

/** "Wednesday, 30 September" */
export const formatDayLong = (iso: string | Date) => formatDate(iso, { weekday: "long", day: "numeric", month: "long" });

/** IST time, e.g. "9:30 am". */
export const formatTime = (iso: string | Date) => {
  const { hour, minute } = istParts(new Date(iso));
  return formatClock(hour, minute);
};

/** "9:00 am – 10:30 am" */
export const formatTimeRange = (startIso: string, durationMins: number) =>
  `${formatTime(startIso)} – ${formatTime(new Date(new Date(startIso).getTime() + durationMins * 60_000))}`;

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => /^[a-z]/i.test(part)) // skip "&", "-", etc.
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** 13 → "1p", 9 → "9a" (compact axis labels). */
export const formatHourShort = (hour: number) => `${hour % 12 || 12}${hour < 12 ? "a" : "p"}`;

/** 9.5 → "9:30 am" (hour of day as a decimal). */
export const formatClock = (hour: number, minute = 0) =>
  `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "am" : "pm"}`;

/** 30 → "30 min", 60 → "1 hr", 90 → "1.5 hrs". */
export const formatDuration = (mins: number) =>
  mins < 60 ? `${mins} min` : `${mins / 60} hr${mins > 60 ? "s" : ""}`;
