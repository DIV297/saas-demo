import { JOB_STATUS_LABEL } from "@/lib/constants";
import { appendClass, badge, dot, statusClasses } from "@/styles/classes";
import type { JobStatus } from "@/types";

export function StatusBadge({ status }: { status: JobStatus }) {
  const tone = statusClasses[status];

  return (
    <span className={appendClass(badge, tone.soft, tone.text)}>
      <span className={appendClass(dot, status === "in_progress" && "motion-safe:animate-live")} aria-hidden />
      {JOB_STATUS_LABEL[status]}
    </span>
  );
}
