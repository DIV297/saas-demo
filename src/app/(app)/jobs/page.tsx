import { JobsBoard } from "@/components/jobs/JobsBoard";
import { PageHeader } from "@/components/ui";
import { listJobs, listTechnicians } from "@/server/repositories";

export const metadata = { title: "Work orders" };

export default async function JobsPage() {
  const [jobs, technicians] = await Promise.all([listJobs(), listTechnicians()]);

  return (
    <>
      <PageHeader title="Work orders" />
      <JobsBoard initialJobs={jobs} technicians={technicians} />
    </>
  );
}
