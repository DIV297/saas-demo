import { db } from "@/server/db";
import type { DashboardStats } from "@/types";
import { addDays, startOfDay } from "@/utils/date";
import { startDueJobs } from "./jobs";

const WEEKS_IN_CHART = 4;

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  startDueJobs(now);
  const today = startOfDay(now);

  const completed = db.jobs.filter((j) => j.status === "completed");

  const revenueByWeek = Array.from({ length: WEEKS_IN_CHART }, (_, i) => {
    const weeksAgo = WEEKS_IN_CHART - 1 - i;
    const end = addDays(today, 1 - weeksAgo * 7);
    const start = addDays(end, -7);

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
