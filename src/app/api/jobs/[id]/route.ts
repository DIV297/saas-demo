import { NextResponse } from "next/server";
import { JOB_STATUSES } from "@/lib/constants";
import { updateJobStatus } from "@/server/repositories";
import type { JobStatus } from "@/types";

export async function PATCH(request: Request, ctx: RouteContext<"/api/jobs/[id]">) {
  const { id } = await ctx.params;
  const { status } = (await request.json().catch(() => ({}))) as { status?: JobStatus };

  if (!status || !JOB_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const job = await updateJobStatus(id, status);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: job });
}
