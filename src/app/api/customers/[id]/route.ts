import { NextResponse } from "next/server";
import { getCustomer } from "@/server/repositories";

export async function GET(_request: Request, ctx: RouteContext<"/api/customers/[id]">) {
  const { id } = await ctx.params;
  const customer = await getCustomer(id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: customer });
}
