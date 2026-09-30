"use client";

import { ConfirmDialog } from "@/components/ui";
import type { ConfirmableStatus } from "@/utils/jobs";

const COPY: Record<ConfirmableStatus, { title: string; message: string; confirm: string; keep: string; tone: "primary" | "danger" }> = {
  cancelled: {
    title: "Cancel this booking?",
    message:
      "Are you sure? Its status will be marked as Cancelled. It stays in the job history, and you can reschedule it later.",
    confirm: "Yes, cancel booking",
    keep: "Keep booking",
    tone: "danger",
  },
  completed: {
    title: "Mark as completed?",
    message:
      "This is irreversible: a completed job can't be edited, rescheduled or cancelled. Any further work needs a new booking.",
    confirm: "Mark completed",
    keep: "Not yet",
    tone: "primary",
  },
};

interface ConfirmStatusDialogProps {
  /** The status being confirmed; null = closed. */
  status: ConfirmableStatus | null;
  pending?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

/** The confirmation shown before cancelling or completing a job (details dialog and work-orders table). */
export function ConfirmStatusDialog({ status, pending, error, onConfirm, onClose }: ConfirmStatusDialogProps) {
  const copy = COPY[status ?? "cancelled"];
  return (
    <ConfirmDialog
      open={status !== null}
      title={copy.title}
      message={copy.message}
      confirmLabel={copy.confirm}
      cancelLabel={copy.keep}
      tone={copy.tone}
      pending={pending}
      error={error}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
