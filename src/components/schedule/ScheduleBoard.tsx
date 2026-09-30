"use client";

import { useState } from "react";
import type { Customer, JobWithRelations, Technician } from "@/types";
import { BookingDialog } from "./BookingDialog";
import { WeekCalendar } from "./WeekCalendar";

interface ScheduleBoardProps {
  weekStart: string; // ISO; plain data crosses the server → client boundary
  jobs: JobWithRelations[];
  customers: Pick<Customer, "id" | "name">[];
  technicians: Technician[];
}

/** Week calendar + "click a day to book" dialog. */
export function ScheduleBoard({ weekStart, jobs, customers, technicians }: ScheduleBoardProps) {
  const [bookingDay, setBookingDay] = useState<Date | null>(null);

  return (
    <>
      <WeekCalendar weekStart={new Date(weekStart)} jobs={jobs} onBook={setBookingDay} />
      <BookingDialog
        day={bookingDay}
        customers={customers}
        technicians={technicians}
        onClose={() => setBookingDay(null)}
      />
    </>
  );
}
