import { NextResponse, type NextRequest } from "next/server";
import { JOB_STATUSES } from "@/lib/constants";
import { createJobSchema } from "@/lib/schemas";
import { createJob, listJobs } from "@/server/repositories";
import type { JobStatus } from "@/types";

/** GET /api/jobs?status=&from=&to= */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status") as JobStatus | null;
  const from = params.get("from");
  const to = params.get("to");

  const data = await listJobs({
    status: status && JOB_STATUSES.includes(status) ? status : undefined,
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  });
  return NextResponse.json({ data });
}

/** POST /api/jobs: book a new job. Body is validated with the shared Zod schema. */
export async function POST(request: Request) {
  const parsed = createJobSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid job details";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const result = await createJob(parsed.data);
  if (result === "unknown_customer" || result === "unknown_technician") {
    return NextResponse.json({ error: `Unknown ${result.replace("unknown_", "")}` }, { status: 422 });
  }
  return NextResponse.json({ data: result }, { status: 201 });
}
