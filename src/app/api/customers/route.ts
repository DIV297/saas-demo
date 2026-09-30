import { NextResponse, type NextRequest } from "next/server";
import { CUSTOMER_PLANS } from "@/lib/constants";
import { listCustomers } from "@/server/repositories";
import type { CustomerPlan } from "@/types";

/** GET /api/customers?q=&plan=Residential|Commercial&city= */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const plan = params.get("plan") as CustomerPlan | null;

  const data = await listCustomers({
    q: params.get("q") ?? undefined,
    plan: plan && CUSTOMER_PLANS.includes(plan) ? plan : undefined,
    city: params.get("city") ?? undefined,
  });
  return NextResponse.json({ data });
}
