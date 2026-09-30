"use client";

import { useState, type FormEvent } from "react";
import { Button, DialogFooter, TextField } from "@/components/ui";
import { useUpdateJob } from "@/hooks";
import { updateJobSchema } from "@/lib/schemas";
import type { JobWithRelations, Technician } from "@/types";
import { atTimeValue, fromDateKey, startOfDay, toDateKey } from "@/utils/date";
import { checkJobChange, JOB_CHANGE_MESSAGE } from "@/utils/jobs";
import { suggestStart } from "@/utils/options";
import { TechnicianField, TimeFields } from "./JobFields";
import { jobFormStyles as s } from "./styles";

interface EditJobFormProps {
  job: JobWithRelations;
  technicians: Technician[];
  /**
   * Reschedule: put the job back on the calendar (restoring a cancelled job, or pulling back one
   * in progress). Asks for a new future date and time and sets the status to Scheduled.
   */
  reschedule?: boolean;
  onCancel: () => void;
  onSaved: () => void;
}

/** Edit or reschedule a booking. Validated with the same schema and rules as the API. */
export function EditJobForm({ job, technicians, reschedule, onCancel, onSaved }: EditJobFormProps) {
  const updateJob = useUpdateJob();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(() => {
    const start = suggestStart(new Date(job.scheduledAt));
    return {
      technicianId: job.technicianId,
      date: toDateKey(start.day),
      time: start.time,
      durationMins: String(job.durationMins),
      title: job.title,
    };
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = updateJobSchema.safeParse({
      technicianId: form.technicianId,
      title: form.title,
      scheduledAt: atTimeValue(fromDateKey(form.date), form.time).toISOString(),
      durationMins: Number(form.durationMins),
      ...(reschedule && { status: "scheduled" }),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const problem = checkJobChange(job, parsed.data);
    if (problem) {
      setError(JOB_CHANGE_MESSAGE[problem]);
      return;
    }
    updateJob.mutate({ id: job.id, ...parsed.data }, { onSuccess: onSaved, onError: (err) => setError(err.message) });
  };

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      {reschedule && <p className={s.intro}>Pick a new date and time. The job goes back to Scheduled.</p>}
      <TextField
        id="edit-date"
        label="Date"
        type="date"
        min={toDateKey(startOfDay(new Date()))}
        value={form.date}
        onChange={(e) => update("date", e.target.value)}
      />
      <TimeFields
        idPrefix="edit"
        time={form.time}
        durationMins={form.durationMins}
        onTimeChange={(time) => update("time", time)}
        onDurationChange={(mins) => update("durationMins", mins)}
      />
      <TechnicianField
        id="edit-technician"
        technicians={technicians}
        service={job.service}
        value={form.technicianId}
        onChange={(id) => update("technicianId", id)}
      />
      <TextField
        id="edit-title"
        label="Job description"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
        maxLength={80}
      />

      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Back
        </Button>
        <Button type="submit" disabled={updateJob.isPending}>
          {updateJob.isPending ? "Saving…" : reschedule ? "Reschedule" : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
