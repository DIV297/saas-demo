"use client";

import { ChevronDown } from "lucide-react";
import { JOB_STATUSES, JOB_STATUS_LABEL } from "@/lib/constants";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobStatus } from "@/types";
import { statusSelectStyles as s } from "./styles";

interface StatusSelectProps {
  value: JobStatus;
  onChange: (status: JobStatus) => void;
}

/** Looks like the status badge, but is a native <select> so it's accessible for free. */
export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const tone = statusClasses[value];

  return (
    <span className={appendClass(s.wrapper, tone.soft, tone.text)}>
      <span className={s.dot} aria-hidden />
      <select
        value={value}
        aria-label="Change status"
        onChange={(e) => onChange(e.target.value as JobStatus)}
        className={s.select}
      >
        {JOB_STATUSES.map((status) => (
          <option key={status} value={status}>
            {JOB_STATUS_LABEL[status]}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className={s.chevron} aria-hidden />
    </span>
  );
}
