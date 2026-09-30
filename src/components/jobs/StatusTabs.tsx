"use client";

import { Segmented, StatusDot } from "@/components/ui";
import { JOB_STATUSES, JOB_STATUS_LABEL } from "@/lib/constants";
import type { Option, StatusFilter } from "@/types";

interface StatusTabsProps {
  value: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (value: StatusFilter) => void;
}

/** Job status filter: the shared Segmented control with a coloured dot per status. */
export function StatusTabs({ value, counts, onChange }: StatusTabsProps) {
  const options: Option<StatusFilter>[] = [
    { value: "all", label: "All", count: counts.all },
    ...JOB_STATUSES.map((status) => ({
      value: status,
      label: JOB_STATUS_LABEL[status],
      count: counts[status],
      icon: <StatusDot status={status} />,
    })),
  ];

  return <Segmented label="Filter by status" options={options} value={value} onChange={onChange} />;
}
