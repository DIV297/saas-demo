import { NextResponse } from "next/server";
import { getDashboardStats } from "@/server/repositories";

export async function GET() {
  return NextResponse.json({ data: await getDashboardStats() });
}
