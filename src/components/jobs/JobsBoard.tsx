"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, EmptyState, TextField } from "@/components/ui";
import { useJobs, useUpdateJobStatus } from "@/hooks";
import type { JobWithRelations } from "@/types";
import { JobTable } from "./JobTable";
import { StatusTabs, type StatusFilter } from "./StatusTabs";
import { jobsBoardStyles as s } from "./styles";

/** Work-order list: filter by status, search, and change status inline. */
export function JobsBoard({ initialJobs }: { initialJobs: JobWithRelations[] }) {
  const { data: jobs = [] } = useJobs(initialJobs);
  const updateStatus = useUpdateJobStatus();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const base = { all: jobs.length, scheduled: 0, in_progress: 0, completed: 0 };
    jobs.forEach((j) => base[j.status]++);
    return base;
  }, [jobs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (filter === "all" || j.status === filter) &&
        (!q ||
          [j.id, j.title, j.customer.name, j.technician.name, j.service].some((field) =>
            field.toLowerCase().includes(q),
          )),
    );
  }, [jobs, filter, query]);

  return (
    <Card flush>
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
        <JobTable jobs={visible} onStatusChange={(id, status) => updateStatus.mutate({ id, status })} />
      ) : (
        <EmptyState title="No work orders match" hint="Try a different status or search term." />
      )}
    </Card>
  );
}
