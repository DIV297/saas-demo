"use client";

import { useDashboardStats } from "@/hooks";
import { formatCurrency } from "@/lib/format";
import type { DashboardStats } from "@/types";
import { RevenueBars } from "./RevenueBars";
import { StatCard } from "./StatCard";
import { statGridStyles as s } from "./styles";

/** KPI row. Server-rendered first, then kept fresh by useDashboardStats (polls every minute). */
export function StatGrid({ initialStats }: { initialStats: DashboardStats }) {
  const { data: stats } = useDashboardStats(initialStats);

  return (
    <div className={s.grid}>
      <StatCard index={1} label="Customers" value={String(stats.totalCustomers)} footnote="Residential + commercial" />
      <StatCard index={2} label="Active jobs" value={String(stats.activeJobs)} footnote="Crews on-site right now" />
      <StatCard index={3} label="Upcoming" value={String(stats.upcomingAppointments)} footnote="Appointments booked ahead" />
      <StatCard
        index={4}
        label="Revenue · 30 days"
        value={formatCurrency(stats.revenue)}
        footnote="Completed work orders"
        highlight
        className={s.featured}
      >
        <RevenueBars data={stats.revenueByWeek} />
      </StatCard>
    </div>
  );
}
