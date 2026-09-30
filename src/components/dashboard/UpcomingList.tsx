import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, EmptyState, PendingBar, TruncatedText } from "@/components/ui";
import { formatDate, formatTime } from "@/utils/format";
import { linkAccent, listRow } from "@/styles/classes";
import type { JobWithRelations } from "@/types";
import { upcomingListStyles as s } from "./styles";

export function UpcomingList({ jobs }: { jobs: JobWithRelations[] }) {
  return (
    <Card
      title="Upcoming appointments"
      flush
      action={
        <Link href="/schedule" className={linkAccent}>
          Schedule <ArrowUpRight size={14} aria-hidden />
          <PendingBar />
        </Link>
      }
    >
      {jobs.length === 0 ? (
        <EmptyState title="Nothing booked" hint="New appointments will appear here." />
      ) : (
        <ol>
          {jobs.map((job) => (
            <li key={job.id} className={listRow}>
              <div className={s.dateTile}>
                <span className={s.day}>{formatDate(job.scheduledAt, { day: "2-digit" })}</span>
                <span className={s.month}>{formatDate(job.scheduledAt, { month: "short" })}</span>
              </div>
              <div className={s.body}>
                <TruncatedText className={s.title}>{job.title}</TruncatedText>
                <TruncatedText className={s.meta}>{`${job.customer.name} · ${job.technician.name}`}</TruncatedText>
              </div>
              <span className={s.time}>{formatTime(job.scheduledAt)}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
