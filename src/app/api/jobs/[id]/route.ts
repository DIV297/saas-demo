import { NextResponse } from "next/server";
import { updateJobSchema } from "@/lib/schemas";
import { updateJob } from "@/server/repositories";
import { JOB_CHANGE_MESSAGE } from "@/utils/jobs";

/**
 * PATCH /api/jobs/:id: change status, reschedule, reassign or cancel a job.
 * Body is any subset of { status, technicianId, title, scheduledAt, durationMins }.
 * Status rules (completed is final, reschedules need a future time) live in utils/jobs.
 */
export async function PATCH(request: Request, ctx: RouteContext<"/api/jobs/[id]">) {
  const { id } = await ctx.params;
  const parsed = updateJobSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid update" }, { status: 400 });
  }

  const result = await updateJob(id, parsed.data);
  if (result === "not_found") return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (result === "unknown_technician") return NextResponse.json({ error: "Unknown technician" }, { status: 422 });
  if (typeof result === "string") return NextResponse.json({ error: JOB_CHANGE_MESSAGE[result] }, { status: 409 });
  return NextResponse.json({ data: result });
}
