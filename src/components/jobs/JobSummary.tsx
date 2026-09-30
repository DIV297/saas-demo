import { JOB_STATUS_LABEL } from "@/lib/constants";
import { formatDate, formatTimeRange } from "@/lib/format";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobWithRelations } from "@/types";
import { jobSummaryStyles as s } from "./styles";

/** Compact job details, used as the hover card on the dispatch board and calendar. */
export function JobSummary({ job }: { job: JobWithRelations }) {
  return (
    <div className={s.root}>
      <p className={s.id}>
        {job.id} · {job.service}
      </p>
      <p className={s.title}>{job.title}</p>
      <dl className={s.rows}>
        <dt className={s.label}>Customer</dt>
        <dd>
          {job.customer.name}
          <span className={s.address}>{job.customer.address}</span>
        </dd>
        <dt className={s.label}>When</dt>
        <dd>
          {formatDate(job.scheduledAt, { weekday: "short", month: "short", day: "numeric" })},{" "}
          {formatTimeRange(job.scheduledAt, job.durationMins)}
        </dd>
        <dt className={s.label}>Tech</dt>
        <dd>{job.technician.name}</dd>
        <dt className={s.label}>Status</dt>
        <dd className={s.status}>
          <span className={appendClass(s.dot, statusClasses[job.status].solid)} aria-hidden />
          {JOB_STATUS_LABEL[job.status]}
        </dd>
      </dl>
    </div>
  );
}
