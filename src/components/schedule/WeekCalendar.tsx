import { Plus } from "lucide-react";
import { JobSummary } from "@/components/jobs/JobSummary";
import { SERVICE_ICONS, Tooltip } from "@/components/ui";
import { addDays, isSameDay, startOfDay } from "@/lib/date";
import { formatDate, formatTime } from "@/lib/format";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobWithRelations } from "@/types";
import { weekCalendarStyles as s } from "./styles";

interface WeekCalendarProps {
  weekStart: Date;
  jobs: JobWithRelations[];
  /** Called when the user clicks a day (today or later) to book a job on it. */
  onBook: (day: Date) => void;
}

/** Seven day cards of appointments. Collapses into an agenda list on phones. */
export function WeekCalendar({ weekStart, jobs, onBook }: WeekCalendarProps) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className={s.grid}>
      {days.map((day) => {
        const dayJobs = jobs.filter((j) => isSameDay(new Date(j.scheduledAt), day));
        const isToday = isSameDay(day, today);
        const canBook = day >= today;
        const dayLabel = formatDate(day, { weekday: "long", month: "long", day: "numeric" });

        return (
          <section key={day.toISOString()} data-today={isToday || undefined} className={s.day}>
            <header className={s.dayHeader}>
              <span className={s.weekday}>{formatDate(day, { weekday: "short" })}</span>
              <span className={s.dayNumber}>{formatDate(day, { day: "numeric" })}</span>
              <span className={s.headerActions}>
                {isToday && <span className={s.todayTag}>Today</span>}
                {canBook && (
                  <button type="button" onClick={() => onBook(day)} className={s.addButton} aria-label={`Book a job on ${dayLabel}`}>
                    <Plus size={15} aria-hidden />
                  </button>
                )}
              </span>
            </header>

            <div className={s.events}>
              {dayJobs.length === 0 && !canBook && <p className={s.empty}>No bookings</p>}
              {dayJobs.map((job) => {
                const tone = statusClasses[job.status];
                const TradeIcon = SERVICE_ICONS[job.service];
                return (
                  <Tooltip
                    key={job.id}
                    as="div"
                    focusable
                    content={<JobSummary job={job} />}
                    className={appendClass(s.event, tone.border, tone.soft)}
                  >
                    <p className={appendClass(s.eventTime, tone.text)}>{formatTime(job.scheduledAt)}</p>
                    <p className={s.eventTitle}>{job.title}</p>
                    <p className={s.eventMeta}>{job.customer.name}</p>
                    <p className={s.eventTech}>
                      <span className={s.techBadge}>
                        <TradeIcon size={10} strokeWidth={2.2} aria-hidden />
                      </span>
                      {job.technician.name}
                    </p>
                  </Tooltip>
                );
              })}

              {/* The rest of the day card is a click target for booking. */}
              {canBook && (
                <button type="button" onClick={() => onBook(day)} className={s.bookSlot} tabIndex={-1} aria-hidden>
                  <Plus size={14} aria-hidden />
                  Book a job
                </button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
