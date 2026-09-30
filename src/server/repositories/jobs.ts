import { db } from "@/server/db";
import type { Job, JobStatus, JobWithRelations, Technician } from "@/types";

function withRelations(job: Job): JobWithRelations {
  const customer = db.customers.find((c) => c.id === job.customerId)!;
  const technician = db.technicians.find((t) => t.id === job.technicianId)!;
  return {
    ...job,
    customer: { id: customer.id, name: customer.name, address: customer.address },
    technician,
  };
}

export async function listTechnicians(): Promise<Technician[]> {
  return db.technicians;
}

export interface JobFilters {
  status?: JobStatus;
  from?: Date;
  to?: Date;
}

export async function listJobs(filters: JobFilters = {}): Promise<JobWithRelations[]> {
  return db.jobs
    .filter((j) => !filters.status || j.status === filters.status)
    .filter((j) => !filters.from || new Date(j.scheduledAt) >= filters.from)
    .filter((j) => !filters.to || new Date(j.scheduledAt) < filters.to)
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
    .map(withRelations);
}

export type NewJob = Omit<Job, "id" | "status">;

/** Demo-only: appends to in-memory data (an INSERT in production). New jobs start as "scheduled". */
export async function createJob(input: NewJob): Promise<JobWithRelations | "unknown_customer" | "unknown_technician"> {
  if (!db.customers.some((c) => c.id === input.customerId)) return "unknown_customer";
  if (!db.technicians.some((t) => t.id === input.technicianId)) return "unknown_technician";

  const lastNumber = Math.max(...db.jobs.map((j) => Number(j.id.replace("J-", ""))));
  const job: Job = { ...input, id: `J-${lastNumber + 1}`, status: "scheduled" };
  db.jobs.push(job);
  return withRelations(job);
}

/** Demo-only: mutates in-memory data. Resets on server restart. */
export async function updateJobStatus(id: string, status: JobStatus): Promise<JobWithRelations | null> {
  const job = db.jobs.find((j) => j.id === id);
  if (!job) return null;
  job.status = status;
  return withRelations(job);
}
