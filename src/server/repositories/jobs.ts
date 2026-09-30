import { db } from "@/server/db";
import type { Job, JobStatus, JobWithRelations, Technician } from "@/types";
import { checkJobChange, hasStarted, isInFuture, type JobChangeProblem } from "@/utils/jobs";

function withRelations(job: Job): JobWithRelations {
  const customer = db.customers.find((c) => c.id === job.customerId)!;
  const technician = db.technicians.find((t) => t.id === job.technicianId)!;
  return {
    ...job,
    customer: { id: customer.id, name: customer.name, address: customer.address },
    technician,
  };
}

/**
 * Jobs start automatically: anything still "scheduled" whose booked time has arrived becomes
 * "in progress". Run before every read (in production: a scheduled worker, or the technician's app).
 */
export function startDueJobs(now = new Date()) {
  db.jobs.forEach((job) => {
    if (hasStarted(job, now)) job.status = "in_progress";
  });
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
  startDueJobs();
  return db.jobs
    .filter((j) => !filters.status || j.status === filters.status)
    .filter((j) => !filters.from || new Date(j.scheduledAt) >= filters.from)
    .filter((j) => !filters.to || new Date(j.scheduledAt) < filters.to)
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
    .map(withRelations);
}

export type NewJob = Omit<Job, "id" | "status">;

/** Demo-only: appends to in-memory data (an INSERT in production). New jobs start as "scheduled". */
export async function createJob(
  input: NewJob,
): Promise<JobWithRelations | "past_time" | "unknown_customer" | "unknown_technician"> {
  if (!isInFuture(input.scheduledAt)) return "past_time";
  if (!db.customers.some((c) => c.id === input.customerId)) return "unknown_customer";
  if (!db.technicians.some((t) => t.id === input.technicianId)) return "unknown_technician";

  const lastNumber = Math.max(...db.jobs.map((j) => Number(j.id.replace("J-", ""))));
  const job: Job = { ...input, id: `J-${lastNumber + 1}`, status: "scheduled" };
  db.jobs.push(job);
  return withRelations(job);
}

export type JobPatch = Partial<Pick<Job, "technicianId" | "title" | "scheduledAt" | "durationMins" | "status">>;

/**
 * Demo-only: mutates in-memory data (an UPDATE in production). Used for status changes,
 * edits, cancellations and reschedules; cancelled jobs are kept so history stays complete.
 * Rules live in checkJobChange. Giving a job a new time makes it "scheduled" again.
 */
export async function updateJob(
  id: string,
  patch: JobPatch,
): Promise<JobWithRelations | "not_found" | "unknown_technician" | JobChangeProblem> {
  startDueJobs();
  const job = db.jobs.find((j) => j.id === id);
  if (!job) return "not_found";
  const problem = checkJobChange(job, patch);
  if (problem) return problem;
  if (patch.technicianId && !db.technicians.some((t) => t.id === patch.technicianId)) return "unknown_technician";

  const scheduledAt = patch.scheduledAt ? new Date(patch.scheduledAt).toISOString() : job.scheduledAt;
  const rescheduled = scheduledAt !== job.scheduledAt;
  Object.assign(job, patch, { scheduledAt }, rescheduled ? { status: "scheduled" } : {});
  return withRelations(job);
}
