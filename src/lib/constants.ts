import type { CustomerPlan, JobStatus, ServiceType } from "@/types";

/** Product identity. Change the name here and it updates everywhere. */
export const BRAND = {
  name: "HomeCrew",
  tagline: "Home services, dispatched.",
  description: "Home services management: customers, work orders and crew scheduling.",
} as const;

/** Demo-only credentials, shown on the login screen. The server may override them via env vars. */
export const DEMO_CREDENTIALS = {
  email: "demo@homecrew.app",
  password: "demo1234",
} as const;

export const SESSION_COOKIE = "hc_session";
/** Remembers whether the desktop sidebar is collapsed (read on the server, so no layout flash). */
export const SIDEBAR_COOKIE = "hc_sidebar";

export const CUSTOMER_PLANS: CustomerPlan[] = ["Residential", "Commercial"];

export const SERVICE_TYPES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Cleaning",
  "Landscaping",
  "Pest Control",
] as const satisfies readonly ServiceType[];

/** Booking form options. */
export const BOOKING_HOURS = { first: 7, last: 19 }; // 7:00 AM – 7:30 PM start times
export const DURATION_OPTIONS = [30, 60, 90, 120, 150, 180, 240, 360, 480];

export const JOB_STATUS_LABEL: Record<JobStatus, string> = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const JOB_STATUSES = Object.keys(JOB_STATUS_LABEL) as JobStatus[];

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/jobs", label: "Work orders", icon: "wrench" },
  { href: "/schedule", label: "Schedule", icon: "calendar" },
  { href: "/customers", label: "Customers", icon: "users" },
] as const;
