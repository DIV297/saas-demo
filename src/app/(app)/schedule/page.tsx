import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { ThisWeekLink, WeekNav } from "@/components/schedule/WeekNav";
import { PageHeader } from "@/components/ui";
import { addDays, startOfWeek } from "@/utils/date";
import { listCustomers, listJobs, listTechnicians } from "@/server/repositories";

export const metadata = { title: "Schedule" };

export default async function SchedulePage({ searchParams }: PageProps<"/schedule">) {
  const { week } = await searchParams;
  const offset = Number(week) || 0;
  const weekStart = addDays(startOfWeek(new Date()), offset * 7);

  const [jobs, customers, technicians] = await Promise.all([
    listJobs({ from: weekStart, to: addDays(weekStart, 7) }),
    listCustomers(),
    listTechnicians(),
  ]);

  return (
    <>
      <PageHeader
        title="Schedule"
        meta={
          <>
            {jobs.length} this week
            {offset !== 0 && <ThisWeekLink />}
          </>
        }
        actions={<WeekNav weekStart={weekStart} offset={offset} />}
        sticky
      />
      <ScheduleBoard
        weekStart={weekStart.toISOString()}
        offset={offset}
        jobs={jobs}
        customers={customers.map(({ id, name, city, plan }) => ({ id, name, city, plan }))}
        technicians={technicians}
      />
    </>
  );
}
