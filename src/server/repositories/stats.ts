import { db } from "@/server/db";
import type { DashboardStats } from "@/types";
import { startOfDay } from "@/lib/date";

const WEEKS_IN_CHART = 4;

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const today = startOfDay(now);

  const completed = db.jobs.filter((j) => j.status === "completed");

  const revenueByWeek = Array.from({ length: WEEKS_IN_CHART }, (_, i) => {
    const weeksAgo = WEEKS_IN_CHART - 1 - i;
    const end = new Date(today);
    end.setUTCDate(end.getUTCDate() + 1 - weeksAgo * 7);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 7);

    const value = completed
      .filter((j) => {
        const d = new Date(j.scheduledAt);
        return d >= start && d < end;
      })
      .reduce((sum, j) => sum + j.amount, 0);

    return { label: weeksAgo === 0 ? "This wk" : `${weeksAgo}w ago`, value };
  });

  return {
    totalCustomers: db.customers.length,
    activeJobs: db.jobs.filter((j) => j.status === "in_progress").length,
    upcomingAppointments: db.jobs.filter(
      (j) => j.status === "scheduled" && new Date(j.scheduledAt) >= now,
    ).length,
    revenue: completed.reduce((sum, j) => sum + j.amount, 0),
    revenueByWeek,
  };
}
