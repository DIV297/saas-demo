import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DispatchBoard } from "@/components/dashboard/DispatchBoard";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { UpcomingList } from "@/components/dashboard/UpcomingList";
import { JobTable } from "@/components/jobs/JobTable";
import { Card, PageHeader } from "@/components/ui";
import { DEMO_USER } from "@/lib/auth";
import { addDays, startOfDay } from "@/lib/date";
import { getDashboardStats, listJobs, listTechnicians } from "@/server/repositories";
import { layoutMainAside, linkAccent, sectionGap } from "@/styles/classes";

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const today = startOfDay(new Date());

  const [stats, todaysJobs, upcoming, recent, technicians] = await Promise.all([
    getDashboardStats(),
    listJobs({ from: today, to: addDays(today, 1) }),
    listJobs({ status: "scheduled", from: new Date() }),
    listJobs({ status: "completed" }),
    listTechnicians(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${DEMO_USER.name.split(" ")[0]}`}
        description={`${todaysJobs.length} jobs on the board today across ${technicians.length} technicians.`}
      />

      <div className={sectionGap}>
        <StatGrid initialStats={stats} />

        <div className={layoutMainAside}>
          <DispatchBoard technicians={technicians} jobs={todaysJobs} />
          <UpcomingList jobs={upcoming.slice(0, 5)} />
        </div>

        <Card
          eyebrow="History"
          title="Recently completed"
          flush
          action={
            <Link href="/jobs" className={linkAccent}>
              All work orders <ArrowUpRight size={14} aria-hidden />
            </Link>
          }
        >
          <JobTable jobs={recent.slice(-5).reverse()} />
        </Card>
      </div>
    </>
  );
}
