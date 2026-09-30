"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { JobSummary } from "@/components/jobs/JobSummary";
import { Card, TechnicianAvatar, Tooltip, TruncatedText } from "@/components/ui";
import { useJobs } from "@/hooks";
import { addDays, startOfDay } from "@/utils/date";
import { formatDayShort, formatHourShort, formatTime } from "@/utils/format";
import {
  DAY_PX,
  dayAt,
  HOURS,
  layoutJobs,
  NIGHT_PX,
  SEGMENT_PX,
  xOfDay,
  xOfHour,
  xOfInstant,
  type DayRange,
} from "@/utils/timeline";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobWithRelations, Technician } from "@/types";
import { dispatchBoardStyles as s } from "./styles";

// Infinite scrolling: start with a small window around today and grow it in chunks near either edge.
const INITIAL_RANGE: DayRange = { start: -2, end: 5 };
const CHUNK_DAYS = 7;
const MAX_DAYS_BACK = 60;
/** "Now" sits this far across the viewport; the header shows the day under this point. */
const FOCUS_RATIO = 0.35;

interface DispatchBoardProps {
  technicians: Technician[];
  initialJobs: JobWithRelations[];
}

/**
 * Continuous dispatch timeline: one lane per technician, days laid side by side.
 * Opens at "now", loads more days as you scroll either way, and keeps names + day labels pinned.
 */
export function DispatchBoard({ technicians, initialJobs }: DispatchBoardProps) {
  const { data: jobs = [] } = useJobs(initialJobs);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pendingShift = useRef(0); // px to add to scrollLeft after days are prepended
  const [range, setRange] = useState(INITIAL_RANGE);
  const [now, setNow] = useState<Date | null>(null); // client-only, avoids a hydration mismatch
  const [visibleDay, setVisibleDay] = useState(0); // offset from today of the day in view

  const today = useMemo(() => startOfDay(new Date()), []);
  const dayCount = range.end - range.start + 1;
  const days = Array.from({ length: dayCount }, (_, i) => range.start + i);
  const dayX = (offset: number) => xOfDay(offset, range.start);
  const blocks = useMemo(() => layoutJobs(jobs, today, range), [jobs, today, range]);
  const nowX = now ? xOfInstant(now, today, range.start) : null;

  // Live clock for the NOW line.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // The range grows to the left as you scroll back, so "Today" must use the current start, not the initial one.
  const rangeStartRef = useRef(range.start);
  rangeStartRef.current = range.start;

  const scrollToNow = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollerRef.current;
    if (!el) return;
    const x = xOfInstant(new Date(), today, rangeStartRef.current);
    el.scrollTo({ left: Math.max(x - el.clientWidth * FOCUS_RATIO, 0), behavior });
  }, [today]);

  // Open at the current time.
  useLayoutEffect(() => scrollToNow("instant"), [scrollToNow]);

  // After prepending days, keep the same content under the viewport.
  useLayoutEffect(() => {
    if (pendingShift.current && scrollerRef.current) {
      scrollerRef.current.scrollLeft += pendingShift.current;
      pendingShift.current = 0;
    }
  }, [range.start]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setVisibleDay(dayAt(el.scrollLeft + el.clientWidth * FOCUS_RATIO, range.start));

    if (el.scrollLeft + el.clientWidth > el.scrollWidth - SEGMENT_PX) {
      setRange((r) => ({ ...r, end: r.end + CHUNK_DAYS }));
    } else if (el.scrollLeft < SEGMENT_PX / 2 && range.start > -MAX_DAYS_BACK) {
      pendingShift.current = CHUNK_DAYS * SEGMENT_PX;
      setRange((r) => ({ ...r, start: r.start - CHUNK_DAYS }));
    }
  };

  const scrollByDay = (direction: 1 | -1) =>
    scrollerRef.current?.scrollBy({ left: direction * SEGMENT_PX, behavior: "smooth" });

  const visibleLabel =
    visibleDay === 0 ? "Today" : formatDayShort(addDays(today, visibleDay));

  const controls = (
    <div className={s.controls}>
      <button type="button" onClick={() => scrollToNow()} className={s.todayButton}>
        Today
      </button>
      <button type="button" onClick={() => scrollByDay(-1)} className={s.navButton} aria-label="Previous day">
        <ChevronLeft size={16} aria-hidden />
      </button>
      <span className={s.visibleDay} aria-live="polite">
        {visibleLabel}
      </span>
      <button type="button" onClick={() => scrollByDay(1)} className={s.navButton} aria-label="Next day">
        <ChevronRight size={16} aria-hidden />
      </button>
    </div>
  );

  const trackWidth: CSSProperties = { width: dayCount * SEGMENT_PX };

  return (
    <Card title="Dispatch board" action={controls} flush>
      <div ref={scrollerRef} className={s.scroller} onScroll={onScroll}>
        <div className={s.board}>
          {/* Axis: day labels (pinned while their day is in view) + hour ticks */}
          <div className={s.axis}>
            <div className={s.corner} />
            <div className={s.axisTrack} style={trackWidth}>
              {days.map((offset) => (
                <div key={offset} className={s.axisDay} style={{ left: dayX(offset), width: DAY_PX }}>
                  <span className={appendClass(s.dayLabel, offset === 0 && s.dayLabelToday, offset < 0 && s.dayLabelPast)}>
                    {offset === 0 ? "Today · " : ""}
                    {formatDayShort(addDays(today, offset))}
                  </span>
                  {HOURS.map((h) => (
                    <span key={h} className={s.tick} style={{ left: xOfHour(h) }}>
                      {formatHourShort(h)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {technicians.map((tech) => (
            <div key={tech.id} className={s.lane}>
              <div className={s.tech}>
                <TechnicianAvatar technician={tech} />
                <div className={s.techText}>
                  <TruncatedText className={s.techName}>{tech.name}</TruncatedText>
                  <p className={s.techSkill}>{tech.skill}</p>
                </div>
              </div>

              <div className={s.track} style={trackWidth}>
                {days.map((offset) => (
                  <Fragment key={offset}>
                    <div className={s.dayGrid} style={{ left: dayX(offset), width: DAY_PX }} />
                    <div className={s.night} style={{ left: dayX(offset) + DAY_PX, width: NIGHT_PX }} />
                  </Fragment>
                ))}

                {blocks
                  .filter((b) => b.job.technicianId === tech.id)
                  .map(({ job, left, width }) => {
                    const tone = statusClasses[job.status];
                    return (
                      <Tooltip
                        key={job.id}
                        as="div"
                        focusable
                        content={<JobSummary job={job} />}
                        className={appendClass(s.job, tone.border, tone.soft)}
                        style={{ left, width }}
                      >
                        <strong className={s.jobCustomer}>{job.customer.name}</strong>
                        <span className={s.jobMeta}>
                          {formatTime(job.scheduledAt)} · {job.service}
                        </span>
                      </Tooltip>
                    );
                  })}
              </div>
            </div>
          ))}

          {nowX !== null && (
            <div className={s.nowLine} style={{ left: `calc(var(--label-w) + ${nowX}px)` }} aria-hidden>
              <span className={s.nowTag}>NOW</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
