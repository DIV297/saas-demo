"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { Dialog, DialogFooter } from "./Dialog";
import { confirmDialogStyles as s } from "./styles";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** "danger" for destructive actions (red confirm button). */
  tone?: "primary" | "danger";
  pending?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

/** Small "are you sure?" popup, stacked on top of whatever opened it. */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "Go back",
  tone = "primary",
  pending,
  error,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title={title} size="sm">
      <p className={s.message}>{message}</p>
      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}
      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={tone} onClick={onConfirm} disabled={pending}>
          {pending ? "Saving…" : confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
