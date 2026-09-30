"use client";

import { Segmented, type SegmentedOption } from "@/components/ui";
import { JOB_STATUSES, JOB_STATUS_LABEL } from "@/lib/constants";
import { appendClass, dot, statusClasses } from "@/styles/classes";
import type { JobStatus } from "@/types";

export type StatusFilter = JobStatus | "all";

interface StatusTabsProps {
  value: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (value: StatusFilter) => void;
}

/** Job status filter: the shared Segmented control with a coloured dot per status. */
export function StatusTabs({ value, counts, onChange }: StatusTabsProps) {
  const options: SegmentedOption<StatusFilter>[] = [
    { value: "all", label: "All", count: counts.all },
    ...JOB_STATUSES.map((status) => ({
      value: status,
      label: JOB_STATUS_LABEL[status],
      count: counts[status],
      icon: <span className={appendClass(dot, statusClasses[status].solid)} aria-hidden />,
    })),
  ];

  return <Segmented label="Filter by status" options={options} value={value} onChange={onChange} />;
}
