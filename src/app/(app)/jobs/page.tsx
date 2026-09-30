import { JobsBoard } from "@/components/jobs/JobsBoard";
import { PageHeader } from "@/components/ui";
import { listJobs } from "@/server/repositories";

export const metadata = { title: "Work orders" };

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Work orders"
        description="Every job, who's on it and where it stands. Change a status straight from the table."
      />
      <JobsBoard initialJobs={jobs} />
    </>
  );
}
