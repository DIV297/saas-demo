import { BUSINESS_TZ } from "./date";

/** Indian formatting throughout: ₹ with lakh grouping (₹1,85,400), "30 Sept", "9:30 am". */
const LOCALE = "en-IN";

const currency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => currency.format(value);

export const formatDate = (iso: string | Date, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
  new Date(iso).toLocaleDateString(LOCALE, { ...opts, timeZone: BUSINESS_TZ });

/** "Wed, 30 Sept" */
export const formatDayShort = (iso: string | Date) => formatDate(iso, { weekday: "short", day: "numeric", month: "short" });

/** "Wednesday, 30 September" */
export const formatDayLong = (iso: string | Date) => formatDate(iso, { weekday: "long", day: "numeric", month: "long" });

export const formatTime = (iso: string | Date) =>
  new Date(iso).toLocaleTimeString(LOCALE, { hour: "numeric", minute: "2-digit", timeZone: BUSINESS_TZ });

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
