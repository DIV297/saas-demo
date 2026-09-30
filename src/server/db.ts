import { customers } from "@/data/customers";
import { jobs } from "@/data/jobs";
import { technicians } from "@/data/technicians";
import type { Customer, Job, Technician } from "@/types";

interface DemoDatabase {
  customers: Customer[];
  technicians: Technician[];
  jobs: Job[];
}

/**
 * In-memory stand-in for PostgreSQL.
 *
 * Next.js bundles pages and API routes separately, so a plain module-level array would
 * exist once per bundle and a job created via the API wouldn't show up on a page.
 * Keeping one instance on globalThis (the same pattern used for a Prisma client)
 * gives every bundle the same data. It still resets when the server restarts.
 */
const globalForDb = globalThis as typeof globalThis & { __homecrewDb?: DemoDatabase };

export const db: DemoDatabase = (globalForDb.__homecrewDb ??= {
  customers: structuredClone(customers),
  technicians: structuredClone(technicians),
  jobs: structuredClone(jobs),
});
