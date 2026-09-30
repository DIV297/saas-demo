export type JobStatus = "scheduled" | "in_progress" | "completed";

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
  amount: number; // USD
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
