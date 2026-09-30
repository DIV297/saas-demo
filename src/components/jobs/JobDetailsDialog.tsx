"use client";

import { CalendarClock, CheckCircle2, Pencil, RotateCcw, XCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button, Dialog, DialogFooter, StatusBadge } from "@/components/ui";
import { useUpdateJob } from "@/hooks";
import type { JobStatus, JobWithRelations, Technician } from "@/types";
import { BUSINESS_TZ_LABEL } from "@/utils/date";
import { formatCurrency, formatDayShort, formatTimeRange } from "@/utils/format";
import type { ConfirmableStatus } from "@/utils/jobs";
import { ConfirmStatusDialog } from "./ConfirmStatusDialog";
import { EditJobForm } from "./EditJobForm";
import { jobDetailsStyles as s } from "./styles";

type JobDialogMode = "view" | "edit" | "reschedule";

interface JobDetailsDialogProps {
  job: JobWithRelations | null; // null = closed
  technicians: Technician[];
  /** Open straight into a form, e.g. "reschedule" when Scheduled is picked in the work-orders table. */
  initialMode?: JobDialogMode;
  onClose: () => void;
}

/**
 * A booking's details and what can be done with it next, based on its status:
 * scheduled → edit or cancel; in progress → mark completed, reschedule or cancel;
 * cancelled → reschedule (restores it); completed → read-only.
 */
export function JobDetailsDialog({ job, technicians, initialMode = "view", onClose }: JobDetailsDialogProps) {
  return (
    <Dialog open={job !== null} onClose={onClose} eyebrow={job ? `${job.id} · ${job.service}` : ""} title={job?.title ?? ""}>
      {/* Keyed so the dialog starts fresh for each job. */}
      {job && (
        <JobDetails key={`${job.id}-${initialMode}`} job={job} technicians={technicians} initialMode={initialMode} onDone={onClose} />
      )}
    </Dialog>
  );
}

interface JobDetailsProps {
  job: JobWithRelations;
  technicians: Technician[];
  initialMode: JobDialogMode;
  onDone: () => void;
}

function JobDetails({ job, technicians, initialMode, onDone }: JobDetailsProps) {
  const [mode, setMode] = useState(initialMode);
  const [confirming, setConfirming] = useState<ConfirmableStatus | null>(null);
  const updateJob = useUpdateJob();

  const confirmStatus = () => confirming && updateJob.mutate({ id: job.id, status: confirming }, { onSuccess: onDone });

  if (mode === "edit" || mode === "reschedule") {
    return (
      <EditJobForm
        job={job}
        technicians={technicians}
        reschedule={mode === "reschedule"}
        onCancel={() => (initialMode === "view" ? setMode("view") : onDone())}
        onSaved={onDone}
      />
    );
  }

  const cancelButton = (
    <Button variant="dangerGhost" className={s.footerStart} onClick={() => setConfirming("cancelled")}>
      <XCircle size={16} aria-hidden />
      Cancel booking
    </Button>
  );

  const actions: Record<JobStatus, ReactNode> = {
    scheduled: (
      <>
        {cancelButton}
        <Button onClick={() => setMode("edit")}>
          <Pencil size={16} aria-hidden />
          Edit
        </Button>
      </>
    ),
    in_progress: (
      <>
        {cancelButton}
        <Button variant="secondary" onClick={() => setMode("reschedule")}>
          <CalendarClock size={16} aria-hidden />
          Reschedule
        </Button>
        <Button onClick={() => setConfirming("completed")}>
          <CheckCircle2 size={16} aria-hidden />
          Mark completed
        </Button>
      </>
    ),
    cancelled: (
      <>
        <p className={s.confirmText}>This booking was cancelled.</p>
        <Button onClick={() => setMode("reschedule")}>
          <RotateCcw size={16} aria-hidden />
          Reschedule
        </Button>
      </>
    ),
    completed: (
      <>
        <p className={s.confirmText}>Completed jobs can&apos;t be changed.</p>
        <Button variant="ghost" onClick={onDone}>
          Close
        </Button>
      </>
    ),
  };

  return (
    <>
      <div className={s.summary}>
        <div className={s.status}>
          <StatusBadge status={job.status} />
          <span className={s.amount}>{formatCurrency(job.amount)}</span>
        </div>
        <dl className={s.rows}>
          <dt className={s.label}>Customer</dt>
          <dd>
            {job.customer.name}
            <span className={s.sub}>{job.customer.address}</span>
          </dd>
          <dt className={s.label}>When</dt>
          <dd>
            {formatDayShort(job.scheduledAt)}
            <span className={s.sub}>
              {formatTimeRange(job.scheduledAt, job.durationMins)} {BUSINESS_TZ_LABEL}
            </span>
          </dd>
          <dt className={s.label}>Technician</dt>
          <dd>
            {job.technician.name}
            <span className={s.sub}>{job.technician.skill}</span>
          </dd>
        </dl>
      </div>

      <DialogFooter>{actions[job.status]}</DialogFooter>

      <ConfirmStatusDialog
        status={confirming}
        pending={updateJob.isPending}
        error={updateJob.error?.message}
        onConfirm={confirmStatus}
        onClose={() => {
          setConfirming(null);
          updateJob.reset();
        }}
      />
    </>
  );
}
