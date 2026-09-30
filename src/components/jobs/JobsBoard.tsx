"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, EmptyState, TextField } from "@/components/ui";
import { useJobs, useUpdateJobStatus } from "@/hooks";
import {
  countByStatus,
  filterByStatus,
  isReschedule,
  needsConfirmation,
  sortForBoard,
  type ConfirmableStatus,
} from "@/utils/jobs";
import { matchesQuery } from "@/utils/search";
import type { JobStatus, JobWithRelations, StatusFilter, Technician } from "@/types";
import { ConfirmStatusDialog } from "./ConfirmStatusDialog";
import { JobDetailsDialog } from "./JobDetailsDialog";
import { JobTable } from "./JobTable";
import { StatusTabs } from "./StatusTabs";
import { jobsBoardStyles as s } from "./styles";

/** Work-order list: filter by status, search, and change status inline. */
interface JobsBoardProps {
  initialJobs: JobWithRelations[];
  technicians: Technician[];
}

export function JobsBoard({ initialJobs, technicians }: JobsBoardProps) {
  const { data: jobs = [] } = useJobs(initialJobs);
  const updateStatus = useUpdateJobStatus();
  const [rescheduling, setRescheduling] = useState<JobWithRelations | null>(null);
  const [confirming, setConfirming] = useState<{ job: JobWithRelations; status: ConfirmableStatus } | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => countByStatus(jobs), [jobs]);

  const visible = useMemo(
    () =>
      sortForBoard(filterByStatus(jobs, filter)).filter((j) =>
        matchesQuery([j.id, j.title, j.customer.name, j.technician.name, j.service], query),
      ),
    [jobs, filter, query],
  );

  // Moving back to Scheduled needs a new date and time; cancelling or completing asks for confirmation first.
  const changeStatus = (job: JobWithRelations, status: JobStatus) => {
    if (isReschedule(job.status, status)) setRescheduling(job);
    else if (needsConfirmation(status)) setConfirming({ job, status });
    else updateStatus.mutate({ id: job.id, status });
  };

  const confirmStatus = () => {
    if (!confirming) return;
    updateStatus.mutate({ id: confirming.job.id, status: confirming.status }); // optimistic: the row updates at once
    setConfirming(null);
  };

  return (
    <>
      <Card flush className={s.card}>
        <div className={s.toolbar}>
          <StatusTabs value={filter} counts={counts} onChange={setFilter} />
          <TextField
            type="search"
            placeholder="Search jobs, customers, techs…"
            aria-label="Search work orders"
            icon={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={s.search}
          />
        </div>

        {updateStatus.isError && (
          <p role="alert" className={s.error}>
            Couldn&apos;t update {updateStatus.variables?.id}: {updateStatus.error.message}. The change was undone.
          </p>
        )}

        {visible.length ? (
          <JobTable jobs={visible} onStatusChange={changeStatus} />
        ) : (
          <EmptyState title="No work orders match" hint="Try a different status or search term." />
        )}
      </Card>

      <ConfirmStatusDialog status={confirming?.status ?? null} onConfirm={confirmStatus} onClose={() => setConfirming(null)} />
      <JobDetailsDialog
        job={rescheduling}
        technicians={technicians}
        initialMode="reschedule"
        onClose={() => setRescheduling(null)}
      />
    </>
  );
}
