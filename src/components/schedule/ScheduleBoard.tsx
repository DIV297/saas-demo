"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type TouchEvent } from "react";
import type { JobWithRelations, Technician } from "@/types";
import { swipeDirection } from "@/utils/gesture";
import { BookingDialog } from "./BookingDialog";
import type { CustomerChoice } from "@/components/jobs/JobFields";
import { JobDetailsDialog } from "@/components/jobs/JobDetailsDialog";
import { weekCalendarStyles as s } from "./styles";
import { WeekCalendar } from "./WeekCalendar";

interface ScheduleBoardProps {
  weekStart: string; // ISO; plain data crosses the server → client boundary
  offset: number; // weeks from the current week
  jobs: JobWithRelations[];
  customers: CustomerChoice[];
  technicians: Technician[];
}

/**
 * Week calendar + "click a day to book" dialog.
 * Changing week slides the calendar in from that side, like a drawer; on phones you can also swipe.
 */
export function ScheduleBoard({ weekStart, offset, jobs, customers, technicians }: ScheduleBoardProps) {
  const router = useRouter();
  const [bookingDay, setBookingDay] = useState<Date | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobWithRelations | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Remember which way we moved so the new week slides in from the right side (React's "adjust state on prop change" pattern).
  const [shown, setShown] = useState({ offset, direction: "none" as keyof typeof s.slide });
  if (shown.offset !== offset) {
    setShown({ offset, direction: offset > shown.offset ? "next" : "prev" });
  }

  const goToWeek = (next: number) => router.push(`/schedule?week=${next}`, { scroll: false });

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    // Phones only: on wider screens the calendar may scroll sideways itself.
    if (!start || !window.matchMedia("(max-width: 767px)").matches) return;
    const direction = swipeDirection(start, { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    if (direction) goToWeek(offset + direction);
  };

  return (
    <>
      <div className={s.viewport} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Keyed by week so the slide animation replays on every change. */}
        <div key={weekStart} className={s.slide[shown.direction]}>
          <WeekCalendar weekStart={new Date(weekStart)} jobs={jobs} onBook={setBookingDay} onSelectJob={setSelectedJob} />
        </div>
      </div>
      <JobDetailsDialog job={selectedJob} technicians={technicians} onClose={() => setSelectedJob(null)} />
      <BookingDialog
        day={bookingDay}
        customers={customers}
        technicians={technicians}
        onClose={() => setBookingDay(null)}
      />
    </>
  );
}
