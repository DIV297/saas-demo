import { z } from "zod";
import type { JobStatus } from "@/types";
import { JOB_STATUSES, SERVICE_TYPES } from "./constants";

/**
 * Input for booking a new job. Shared by the API route (server-side validation)
 * and the booking form, so both enforce exactly the same rules.
 */
export const createJobSchema = z.object({
  customerId: z.string().min(1, "Choose a customer"),
  technicianId: z.string().min(1, "Choose a technician"),
  service: z.enum(SERVICE_TYPES),
  title: z.string().trim().min(3, "Describe the job (min. 3 characters)").max(80),
  scheduledAt: z.iso.datetime({ message: "Pick a valid date and time" }),
  durationMins: z.number().int().min(30).max(480),
  amount: z.number().min(0).max(100_000).default(0),
});

export type CreateJobInput = z.input<typeof createJobSchema>;

/**
 * Editing a booking: any subset of the schedulable fields, plus status
 * (cancelling sets status "cancelled"; the job is kept, never deleted).
 */
export const updateJobSchema = createJobSchema
  .pick({ technicianId: true, title: true, scheduledAt: true, durationMins: true })
  .extend({ status: z.enum(JOB_STATUSES as [JobStatus, ...JobStatus[]]) })
  .partial()
  .refine((patch) => Object.keys(patch).length > 0, "Nothing to update");

export type UpdateJobInput = z.input<typeof updateJobSchema>;
