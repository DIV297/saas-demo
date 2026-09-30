import type { ReactNode } from "react";

/** Cancelled jobs are kept (not deleted) so the history stays complete. */
export type JobStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

/** Status filter used by tabs: a status, or everything. */
export type StatusFilter = JobStatus | "all";

export type ServiceType =
  | "Plumbing"
  | "Electrical"
  | "HVAC"
  | "Cleaning"
  | "Landscaping"
  | "Pest Control";

export type CustomerPlan = "Residential" | "Commercial";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  plan: CustomerPlan;
  since: string; // ISO date
  notes?: string;
}

/** Filters accepted by GET /api/customers (all optional). */
export interface CustomerFilters {
  q?: string;
  plan?: CustomerPlan;
  city?: string;
}

export interface Technician {
  id: string;
  name: string;
  skill: ServiceType;
}

export interface Job {
  id: string;
  customerId: string;
  technicianId: string;
  service: ServiceType;
  title: string;
  scheduledAt: string; // ISO datetime
  durationMins: number;
  status: JobStatus;
  amount: number; // INR (₹)
}

/** A job joined with the customer + technician it references. */
export interface JobWithRelations extends Job {
  customer: Pick<Customer, "id" | "name" | "address">;
  technician: Technician;
}

export interface DashboardStats {
  totalCustomers: number;
  activeJobs: number;
  upcomingAppointments: number;
  revenue: number;
  revenueByWeek: { label: string; value: number }[];
}

export interface CustomerWithHistory extends Customer {
  jobs: JobWithRelations[];
  lifetimeValue: number;
}

/** One choice in a picker (Segmented tabs, Dropdown, SelectField). */
export interface Option<T extends string = string> {
  value: T;
  label: string;
  /** Secondary text, e.g. a technician's trade or a customer's city (also searched). */
  hint?: string;
  /** Small number on the right, e.g. how many customers are in that city. */
  count?: number;
  /** Leading visual: a status dot, avatar or icon. */
  icon?: ReactNode;
}
