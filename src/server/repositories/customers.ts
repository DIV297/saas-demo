import { db } from "@/server/db";
import type { Customer, CustomerFilters, CustomerWithHistory } from "@/types";
import { listJobs } from "./jobs";

/**
 * Data-access layer. Today it reads from in-memory dummy data;
 * in production these functions become PostgreSQL queries (see docs/PRODUCTION.md)
 * without any change to the pages or API routes that call them.
 */
export async function listCustomers({ q, plan, city }: CustomerFilters = {}): Promise<Customer[]> {
  const term = q?.trim().toLowerCase();

  return db.customers.filter(
    (c) =>
      (!plan || c.plan === plan) &&
      (!city || c.city === city) &&
      (!term || [c.name, c.email, c.city].some((field) => field.toLowerCase().includes(term))),
  );
}

/** Distinct cities, for the location filter. */
export async function listCustomerCities(): Promise<string[]> {
  return [...new Set(db.customers.map((c) => c.city))].sort();
}

export async function getCustomer(id: string): Promise<CustomerWithHistory | null> {
  const customer = db.customers.find((c) => c.id === id);
  if (!customer) return null;

  const jobs = (await listJobs()).filter((j) => j.customerId === id);
  const lifetimeValue = jobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + j.amount, 0);

  return { ...customer, jobs, lifetimeValue };
}
