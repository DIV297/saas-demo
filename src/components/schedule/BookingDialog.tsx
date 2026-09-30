"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button, Dialog, SelectField, TextField } from "@/components/ui";
import { useCreateJob } from "@/hooks";
import { BOOKING_HOURS, DURATION_OPTIONS, SERVICE_TYPES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { createJobSchema } from "@/lib/schemas";
import type { Customer, ServiceType, Technician } from "@/types";
import { bookingDialogStyles as s } from "./styles";

type CustomerOption = Pick<Customer, "id" | "name">;

interface BookingDialogProps {
  day: Date | null; // null = closed
  customers: CustomerOption[];
  technicians: Technician[];
  onClose: () => void;
}

/** Half-hour start times, e.g. { value: "09:30", label: "9:30 AM" }. */
const TIME_OPTIONS = Array.from({ length: (BOOKING_HOURS.last - BOOKING_HOURS.first + 1) * 2 }, (_, i) => {
  const hour = BOOKING_HOURS.first + Math.floor(i / 2);
  const minute = i % 2 ? "30" : "00";
  const label = `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
  return { value: `${String(hour).padStart(2, "0")}:${minute}`, label };
});

const DURATION_SELECT = DURATION_OPTIONS.map((mins) => ({
  value: String(mins),
  label: mins < 60 ? `${mins} min` : `${mins / 60} hr${mins > 60 ? "s" : ""}`,
}));

/** Book a job on the day the user clicked in the calendar. */
export function BookingDialog({ day, customers, technicians, onClose }: BookingDialogProps) {
  return (
    <Dialog
      open={day !== null}
      onClose={onClose}
      eyebrow="New booking"
      title={day ? formatDate(day, { weekday: "long", month: "long", day: "numeric" }) : ""}
    >
      {/* Keyed by day so the form resets each time a different day is clicked. */}
      {day && (
        <BookingForm key={day.toISOString()} day={day} customers={customers} technicians={technicians} onDone={onClose} />
      )}
    </Dialog>
  );
}

interface BookingFormProps {
  day: Date;
  customers: CustomerOption[];
  technicians: Technician[];
  onDone: () => void;
}

function BookingForm({ day, customers, technicians, onDone }: BookingFormProps) {
  const createJob = useCreateJob();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerId: "",
    service: "Plumbing" as ServiceType,
    technicianId: technicians.find((t) => t.skill === "Plumbing")?.id ?? "",
    title: "",
    time: "09:00",
    durationMins: "60",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null); // the user is fixing the form: drop the stale message
  };

  // Show the technicians for the chosen trade first; fall back to everyone.
  const technicianOptions = useMemo(() => {
    const skilled = technicians.filter((t) => t.skill === form.service);
    return (skilled.length ? skilled : technicians).map((t) => ({ value: t.id, label: `${t.name} · ${t.skill}` }));
  }, [technicians, form.service]);

  const changeService = (service: ServiceType) => {
    const match = technicians.find((t) => t.skill === service);
    setForm((prev) => ({ ...prev, service, technicianId: match?.id ?? prev.technicianId }));
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const date = day.toISOString().slice(0, 10); // business-timezone date (see lib/date.ts)

    const parsed = createJobSchema.safeParse({
      customerId: form.customerId,
      technicianId: form.technicianId,
      service: form.service,
      title: form.title,
      scheduledAt: `${date}T${form.time}:00.000Z`,
      durationMins: Number(form.durationMins),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setError(null);
    createJob.mutate(parsed.data, { onSuccess: onDone, onError: (err) => setError(err.message) });
  };

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <SelectField
        id="booking-customer"
        label="Customer"
        value={form.customerId}
        onChange={(e) => update("customerId", e.target.value)}
        options={[{ value: "", label: "Select a customer…" }, ...customers.map((c) => ({ value: c.id, label: c.name }))]}
      />

      <div className={s.row}>
        <SelectField
          id="booking-service"
          label="Service"
          value={form.service}
          onChange={(e) => changeService(e.target.value as ServiceType)}
          options={SERVICE_TYPES.map((service) => ({ value: service, label: service }))}
        />
        <SelectField
          id="booking-technician"
          label="Technician"
          value={form.technicianId}
          onChange={(e) => update("technicianId", e.target.value)}
          options={technicianOptions}
        />
      </div>

      <TextField
        id="booking-title"
        label="Job description"
        placeholder="e.g. Replace kitchen faucet"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
        maxLength={80}
      />

      <div className={s.row}>
        <SelectField
          id="booking-time"
          label="Start time"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          options={TIME_OPTIONS}
        />
        <SelectField
          id="booking-duration"
          label="Duration"
          value={form.durationMins}
          onChange={(e) => update("durationMins", e.target.value)}
          options={DURATION_SELECT}
        />
      </div>

      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}

      <div className={s.footer}>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={createJob.isPending}>
          {createJob.isPending ? "Booking…" : "Book job"}
        </Button>
      </div>
    </form>
  );
}
