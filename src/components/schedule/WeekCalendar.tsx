"use client";

import { Check, ChevronRight, ChevronsLeft, Plus } from "lucide-react";
import { Fragment, useRef, useState, type CSSProperties, type UIEvent } from "react";
import { SERVICE_ICONS } from "@/components/ui";
import { jobsOnDay, toggleInSet, weekColumns, weekDays } from "@/utils/calendar";
import { addDays, isSameDay, startOfDay } from "@/utils/date";
import { formatDate, formatDayLong, formatTime } from "@/utils/format";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobWithRelations } from "@/types";
import { weekCalendarStyles as s } from "./styles";

interface WeekCalendarProps {
  weekStart: Date;
  jobs: JobWithRelations[];
  /** Called when the user clicks a day (today or later) to book a job on it. */
  onBook: (day: Date) => void;
  /** Called when a job card is clicked: opens its details (edit / cancel). */
  onSelectJob: (job: JobWithRelations) => void;
}

/**
 * Seven day cards. In the current week, days that have already passed fold into slim strips
 * (expand on click) so today and upcoming days get the space. Stacks into an agenda on phones.
 */
export function WeekCalendar({ weekStart, jobs, onBook, onSelectJob }: WeekCalendarProps) {
  const today = startOfDay(new Date());
  const days = weekDays(weekStart);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Only fold past days when this week still has days ahead; a fully past week was opened on purpose.
  const weekHasUpcoming = addDays(weekStart, 6) >= today;
  const isCollapsed = (day: Date) => weekHasUpcoming && day < today && !expanded.has(day.toISOString());

  const toggle = (day: Date) => setExpanded((prev) => toggleInSet(prev, day.toISOString()));
  const columns = weekColumns(days, isCollapsed);

  // The day-name row sits outside the sideways-scrolling grid (so it can stick vertically) and follows its scroll.
  const headerRowRef = useRef<HTMLDivElement>(null);
  const syncHeaderRow = (e: UIEvent<HTMLDivElement>) => {
    if (headerRowRef.current) headerRowRef.current.style.transform = `translateX(${-e.currentTarget.scrollLeft}px)`;
  };

  const headerFor = (day: Date, placement: "row" | "card") => (
    <DayHeader
      day={day}
      placement={placement}
      isToday={isSameDay(day, today)}
      isPast={day < today}
      collapsed={isCollapsed(day)}
      canCollapse={weekHasUpcoming && day < today}
      onBook={onBook}
      onToggle={toggle}
    />
  );

  return (
    <div style={{ "--calendar-columns": columns } as CSSProperties}>
      {/* Tablet/desktop: pinned row of day names + Book buttons. */}
      <div className={s.headerRow}>
        <div ref={headerRowRef} className={s.headerRowInner}>
          {days.map((day) => (
            <Fragment key={day.toISOString()}>{headerFor(day, "row")}</Fragment>
          ))}
        </div>
      </div>

      <div className={s.grid} onScroll={syncHeaderRow}>
        {days.map((day) => {
          const dayJobs = jobsOnDay(jobs, day);
          const isToday = isSameDay(day, today);
          const dayLabel = formatDayLong(day);

          if (isCollapsed(day)) {
            return (
              <section key={day.toISOString()} className={s.day}>
                <button
                  type="button"
                  onClick={() => toggle(day)}
                  className={s.collapsed}
                  aria-expanded={false}
                  aria-label={`${dayLabel}: ${dayJobs.length} ${dayJobs.length === 1 ? "job" : "jobs"}. Show details`}
                >
                  <span className={s.collapsedDate}>
                    <DayDate day={day} />
                  </span>
                  <span className={s.collapsedCount}>{dayJobs.length}</span>
                  {dayJobs.length > 0 && <Check size={16} className={s.collapsedDone} aria-hidden />}
                  <span className={s.collapsedHint}>
                    <ChevronRight size={14} aria-hidden />
                  </span>
                </button>
              </section>
            );
          }

          return (
            <section key={day.toISOString()} data-today={isToday || undefined} className={s.day}>
              {headerFor(day, "card")}
              <div className={s.events}>
                {dayJobs.length === 0 && <p className={s.empty}>No bookings</p>}
                <DayJobs jobs={dayJobs} onSelect={onSelectJob} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

interface DayHeaderProps {
  day: Date;
  /** "row": the pinned day-name row (tablet/desktop). "card": inside the day card (phones). */
  placement: "row" | "card";
  isToday: boolean;
  isPast: boolean;
  collapsed: boolean;
  canCollapse: boolean;
  onBook: (day: Date) => void;
  onToggle: (day: Date) => void;
}

/** Weekday, date and the day's actions (Book / fold). */
function DayHeader({ day, placement, isToday, isPast, collapsed, canCollapse, onBook, onToggle }: DayHeaderProps) {
  const dayLabel = formatDayLong(day);

  if (collapsed) {
    // Only shown in the pinned row: a slim, clickable date that unfolds the day.
    return placement === "row" ? (
      <button type="button" onClick={() => onToggle(day)} className={s.headerCellCollapsed} aria-label={`Show ${dayLabel}`}>
        <DayDate day={day} isToday={isToday} />
      </button>
    ) : null;
  }

  return (
    <header data-today={isToday || undefined} className={placement === "row" ? s.headerCell : s.dayHeader}>
      <DayDate day={day} isToday={isToday} />
      <span className={s.headerActions}>
        {!isPast && (
          <button type="button" onClick={() => onBook(day)} className={s.bookButton} aria-label={`Book a job on ${dayLabel}`}>
            <Plus size={15} aria-hidden />
            <span className={s.bookLabel} aria-hidden>
              Book
            </span>
          </button>
        )}
        {canCollapse && (
          <button type="button" onClick={() => onToggle(day)} className={s.collapseButton} aria-label={`Collapse ${dayLabel}`}>
            <ChevronsLeft size={15} aria-hidden />
          </button>
        )}
      </span>
    </header>
  );
}

/** "WED 30": short weekday and the date number (a yellow circle on today). */
function DayDate({ day, isToday }: { day: Date; isToday?: boolean }) {
  return (
    <>
      <span className={s.weekday}>{formatDate(day, { weekday: "short" })}</span>
      <span className={s.dayNumber} aria-label={isToday ? "Today" : undefined}>
        {formatDate(day, { day: "numeric" })}
      </span>
    </>
  );
}

/** Job cards are buttons: click to see details, edit or cancel. Cancelled ones stay visible but muted. */
function DayJobs({ jobs, onSelect }: { jobs: JobWithRelations[]; onSelect: (job: JobWithRelations) => void }) {
  return jobs.map((job) => {
    const tone = statusClasses[job.status];
    const TradeIcon = SERVICE_ICONS[job.service];
    const cancelled = job.status === "cancelled";
    return (
      <button
        key={job.id}
        type="button"
        onClick={() => onSelect(job)}
        className={appendClass(s.event, tone.border, tone.soft, cancelled && s.eventCancelled)}
        aria-label={`${job.title}, ${formatTime(job.scheduledAt)}, ${job.customer.name}${cancelled ? ", cancelled" : ""}. Open details`}
      >
        <span className={appendClass(s.eventTime, tone.text)}>
          {formatTime(job.scheduledAt)}
          {cancelled && <span className={s.cancelledTag}>Cancelled</span>}
        </span>
        <span className={s.eventTitle}>{job.title}</span>
        <span className={s.eventMeta}>{job.customer.name}</span>
        <span className={s.eventTech}>
          <span className={s.techBadge}>
            <TradeIcon size={10} strokeWidth={2.2} aria-hidden />
          </span>
          {job.technician.name}
        </span>
      </button>
    );
  });
}
