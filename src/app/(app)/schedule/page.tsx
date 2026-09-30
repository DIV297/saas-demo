import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { WeekNav } from "@/components/schedule/WeekNav";
import { PageHeader } from "@/components/ui";
import { addDays, startOfWeek } from "@/lib/date";
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
        eyebrow="Calendar"
        title="Schedule"
        description={`${jobs.length} appointments this week · click a day to book a job.`}
        actions={<WeekNav weekStart={weekStart} offset={offset} />}
      />
      <ScheduleBoard
        weekStart={weekStart.toISOString()}
        jobs={jobs}
        customers={customers.map(({ id, name }) => ({ id, name }))}
        technicians={technicians}
      />
    </>
  );
}
