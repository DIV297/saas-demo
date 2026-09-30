"use client";

import { useState, type FormEvent } from "react";
import { CustomerField, TechnicianField, TimeFields, type CustomerChoice } from "@/components/jobs/JobFields";
import { jobFormStyles as s } from "@/components/jobs/styles";
import { Button, Dialog, DialogFooter, SelectField, SERVICE_ICONS, TextField } from "@/components/ui";
import { useCreateJob } from "@/hooks";
import { SERVICE_TYPES } from "@/lib/constants";
import { createJobSchema } from "@/lib/schemas";
import type { ServiceType, Technician } from "@/types";
import { atTimeValue } from "@/utils/date";
import { formatDayShort } from "@/utils/format";
import { isInFuture, JOB_CHANGE_MESSAGE } from "@/utils/jobs";
import { suggestStart } from "@/utils/options";

const DEFAULT_START = "09:00";

const SERVICE_OPTIONS = SERVICE_TYPES.map((service) => {
  const Icon = SERVICE_ICONS[service];
  return { value: service, label: service, icon: <Icon size={16} aria-hidden /> };
});

interface BookingDialogProps {
  day: Date | null; // null = closed
  customers: CustomerChoice[];
  technicians: Technician[];
  onClose: () => void;
}

/** Book a job on the day the user clicked in the calendar. */
export function BookingDialog({ day, customers, technicians, onClose }: BookingDialogProps) {
  return (
    <Dialog
      open={day !== null}
      onClose={onClose}
      eyebrow="New booking"
      title={day ? formatDayShort(day) : ""}
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
  customers: CustomerChoice[];
  technicians: Technician[];
  onDone: () => void;
}

function BookingForm({ day, customers, technicians, onDone }: BookingFormProps) {
  const createJob = useCreateJob();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(() => ({
    customerId: "",
    service: "Plumbing" as ServiceType,
    technicianId: technicians.find((t) => t.skill === "Plumbing")?.id ?? "",
    title: "",
    // 9 am on the clicked day, or the next free slot if that's already past (booking for today).
    time: suggestStart(atTimeValue(day, DEFAULT_START)).time,
    durationMins: "60",
  }));

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null); // the user is fixing the form: drop the stale message
  };

  const changeService = (service: ServiceType) => {
    const match = technicians.find((t) => t.skill === service);
    setForm((prev) => ({ ...prev, service, technicianId: match?.id ?? prev.technicianId }));
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const parsed = createJobSchema.safeParse({
      customerId: form.customerId,
      technicianId: form.technicianId,
      service: form.service,
      title: form.title,
      scheduledAt: atTimeValue(day, form.time).toISOString(),
      durationMins: Number(form.durationMins),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (!isInFuture(parsed.data.scheduledAt)) {
      setError(JOB_CHANGE_MESSAGE.past_time);
      return;
    }

    setError(null);
    createJob.mutate(parsed.data, { onSuccess: onDone, onError: (err) => setError(err.message) });
  };

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <CustomerField id="booking-customer" customers={customers} value={form.customerId} onChange={(id) => update("customerId", id)} />

      <div className={s.row}>
        <SelectField id="booking-service" label="Service" options={SERVICE_OPTIONS} value={form.service} onChange={changeService} />
        <TechnicianField
          id="booking-technician"
          technicians={technicians}
          service={form.service}
          value={form.technicianId}
          onChange={(id) => update("technicianId", id)}
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

      <TimeFields
        idPrefix="booking"
        time={form.time}
        durationMins={form.durationMins}
        onTimeChange={(time) => update("time", time)}
        onDurationChange={(mins) => update("durationMins", mins)}
      />

      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={createJob.isPending}>
          {createJob.isPending ? "Booking…" : "Book job"}
        </Button>
      </DialogFooter>
    </form>
  );
}
