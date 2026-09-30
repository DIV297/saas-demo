"use client";

import { Dropdown, StatusBadge, StatusDot } from "@/components/ui";
import { JOB_STATUS_LABEL } from "@/lib/constants";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobStatus } from "@/types";
import { isReschedule, isStatusLocked, STATUS_TRANSITIONS } from "@/utils/jobs";
import { statusSelectStyles as s } from "./styles";

interface StatusSelectProps {
  value: JobStatus;
  onChange: (status: JobStatus) => void;
}

/**
 * The status badge as a brand Dropdown, offering only the moves allowed from the current status
 * (see STATUS_TRANSITIONS). "In progress" is never offered: it starts automatically at the booked time.
 * Completed jobs are final, so they show a plain badge.
 */
export function StatusSelect({ value, onChange }: StatusSelectProps) {
  if (isStatusLocked(value)) return <StatusBadge status={value} />;

  const options = [value, ...STATUS_TRANSITIONS[value]].map((status) => ({
    value: status,
    label: isReschedule(value, status) ? "Reschedule…" : JOB_STATUS_LABEL[status],
    icon: <StatusDot status={status} />,
  }));
  const tone = statusClasses[value];

  return (
    <Dropdown
      label="Change status"
      variant="field"
      value={value}
      options={options}
      onChange={onChange}
      className={appendClass(s.trigger, tone.soft, tone.text)}
    />
  );
}
