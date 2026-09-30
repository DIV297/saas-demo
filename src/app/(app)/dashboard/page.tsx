import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DispatchBoard } from "@/components/dashboard/DispatchBoard";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { UpcomingList } from "@/components/dashboard/UpcomingList";
import { JobTable } from "@/components/jobs/JobTable";
import { Card, PageHeader, PendingBar } from "@/components/ui";
import { DEMO_USER } from "@/lib/auth";
import { addDays, startOfDay } from "@/utils/date";
import { getDashboardStats, listJobs, listTechnicians } from "@/server/repositories";
import { layoutMainAside, linkAccent, sectionGap } from "@/styles/classes";

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const today = startOfDay(new Date());

  const [stats, allJobs, upcoming, recent, technicians] = await Promise.all([
    getDashboardStats(),
    listJobs(), // the dispatch timeline scrolls across days, so it gets every job
    listJobs({ status: "scheduled", from: new Date() }),
    listJobs({ status: "completed" }),
    listTechnicians(),
  ]);
  const todaysJobs = allJobs.filter((j) => {
    const at = new Date(j.scheduledAt);
    return j.status !== "cancelled" && at >= today && at < addDays(today, 1);
  });

  return (
    <>
      <PageHeader
        title="Overview"
        meta={`Hi ${DEMO_USER.name.split(" ")[0]}, ${todaysJobs.length} jobs on the board today`}
      />

      <div className={sectionGap}>
        <StatGrid initialStats={stats} />

        <div className={layoutMainAside}>
          <DispatchBoard technicians={technicians} initialJobs={allJobs} />
          <UpcomingList jobs={upcoming.slice(0, 5)} />
        </div>

        <Card
          title="Recently completed"
          flush
          action={
            <Link href="/jobs" className={linkAccent}>
              All work orders <ArrowUpRight size={14} aria-hidden />
              <PendingBar />
            </Link>
          }
        >
          <JobTable jobs={recent.slice(-5).reverse()} />
        </Card>
      </div>
    </>
  );
}
