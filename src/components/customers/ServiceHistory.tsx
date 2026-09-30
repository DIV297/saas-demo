"use client";

import { useMemo, useState } from "react";
import { JobTable } from "@/components/jobs/JobTable";
import { StatusTabs } from "@/components/jobs/StatusTabs";
import { Card, EmptyState } from "@/components/ui";
import { countByStatus, filterByStatus, sortForBoard } from "@/utils/jobs";
import type { JobWithRelations, StatusFilter } from "@/types";
import { serviceHistoryStyles as s } from "./styles";

/** A customer's past and upcoming jobs, filterable by status (same tabs as the Work orders page). */
export function ServiceHistory({ jobs }: { jobs: JobWithRelations[] }) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const counts = useMemo(() => countByStatus(jobs), [jobs]);
  const visible = sortForBoard(filterByStatus(jobs, filter));

  return (
    <Card title="Service history" flush className={s.card}>
      {jobs.length > 0 && (
        <div className={s.toolbar}>
          <StatusTabs value={filter} counts={counts} onChange={setFilter} />
        </div>
      )}
      {visible.length ? (
        <JobTable jobs={visible} hideCustomer />
      ) : (
        <EmptyState
          title={jobs.length ? "No jobs with this status" : "No jobs yet"}
          hint={jobs.length ? "Pick another status above." : "Book this customer's first visit from the Schedule."}
        />
      )}
    </Card>
  );
}
