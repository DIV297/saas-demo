"use client";

import { Dropdown, Segmented, StatusDot } from "@/components/ui";
import { JOB_STATUSES, JOB_STATUS_LABEL } from "@/lib/constants";
import type { Option, StatusFilter } from "@/types";
import { statusTabsStyles as s } from "./styles";

interface StatusTabsProps {
  value: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (value: StatusFilter) => void;
}

/**
 * Job status filter with a count and coloured dot per status. Tabs on wider screens;
 * on phones the same options in the brand Dropdown, so nothing gets cut off.
 */
export function StatusTabs({ value, counts, onChange }: StatusTabsProps) {
  const options: Option<StatusFilter>[] = [
    { value: "all", label: "All statuses", count: counts.all },
    ...JOB_STATUSES.map((status) => ({
      value: status,
      label: JOB_STATUS_LABEL[status],
      count: counts[status],
      icon: <StatusDot status={status} />,
    })),
  ];

  return (
    <>
      <div className={s.tabs}>
        <Segmented
          label="Filter by status"
          options={options.map((o) => (o.value === "all" ? { ...o, label: "All" } : o))}
          value={value}
          onChange={onChange}
        />
      </div>
      <Dropdown label="Filter by status" options={options} value={value} onChange={onChange} className={s.dropdown} />
    </>
  );
}
