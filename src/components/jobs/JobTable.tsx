import { ServiceTag, StatusBadge, TechnicianAvatar } from "@/components/ui";
import { formatDate, formatTime } from "@/lib/format";
import { table } from "@/styles/classes";
import type { JobStatus, JobWithRelations } from "@/types";
import { StatusSelect } from "./StatusSelect";
import { jobTableStyles as s } from "./styles";

interface JobTableProps {
  jobs: JobWithRelations[];
  /** When provided, the status column becomes an editable dropdown. */
  onStatusChange?: (id: string, status: JobStatus) => void;
  hideCustomer?: boolean;
}

/** Work-order table. On small screens each row turns into a labelled card (see `table` classes). */
export function JobTable({ jobs, onStatusChange, hideCustomer }: JobTableProps) {
  const columns = ["Work order", !hideCustomer && "Customer", "Service", "Technician", "Date / time", "Status"];

  return (
    <div className={table.wrapper}>
      <table className={table.root}>
        <thead className={table.head}>
          <tr>
            {columns.filter(Boolean).map((label) => (
              <th key={label as string} className={table.headCell}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={table.body}>
          {jobs.map((job) => (
            <tr key={job.id} className={table.row}>
              <td className={table.cell} data-label="Work order">
                <span className={s.id}>{job.id}</span>
                <span className={s.title}>{job.title}</span>
              </td>
              {!hideCustomer && (
                <td className={table.cell} data-label="Customer">
                  <span className={s.customer}>{job.customer.name}</span>
                  <span className={s.address}>{job.customer.address}</span>
                </td>
              )}
              <td className={table.cell} data-label="Service">
                <ServiceTag service={job.service} />
              </td>
              <td className={table.cell} data-label="Technician">
                <span className={s.technician}>
                  <TechnicianAvatar technician={job.technician} />
                  <span className={s.technicianName}>{job.technician.name}</span>
                </span>
              </td>
              <td className={table.cell} data-label="Date / time">
                <span className={s.date}>{formatDate(job.scheduledAt)}</span>
                <span className={s.time}>{formatTime(job.scheduledAt)}</span>
              </td>
              <td className={table.cell} data-label="Status">
                {onStatusChange ? (
                  <StatusSelect value={job.status} onChange={(status) => onStatusChange(job.id, status)} />
                ) : (
                  <StatusBadge status={job.status} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
