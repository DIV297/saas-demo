import { BUSINESS_TZ } from "./date";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => currency.format(value);

export const formatDate = (iso: string | Date, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) =>
  new Date(iso).toLocaleDateString("en-US", { ...opts, timeZone: BUSINESS_TZ });

export const formatTime = (iso: string | Date) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: BUSINESS_TZ });

export const formatDateTime = (iso: string) => `${formatDate(iso)} · ${formatTime(iso)}`;

/** "9:00 AM – 10:30 AM" */
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
