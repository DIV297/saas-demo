import { appendClass, dot, statusClasses } from "@/styles/classes";
import type { JobStatus } from "@/types";

/** Small coloured dot for a job status (tabs, dropdown options). */
export function StatusDot({ status }: { status: JobStatus }) {
  return <span className={appendClass(dot, statusClasses[status].solid)} aria-hidden />;
}
