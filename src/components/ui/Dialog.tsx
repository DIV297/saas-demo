"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { appendClass } from "@/styles/classes";
import { dialogStyles as s } from "./styles";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  /** "sm" for short confirmations. */
  size?: keyof typeof s.size;
  children: ReactNode;
}

/**
 * Modal built on the native <dialog> element: focus trapping, Esc-to-close
 * and the backdrop come from the browser, so there's no extra library.
 */
export function Dialog({ open, onClose, eyebrow, title, size = "md", children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.focus(); // focus the dialog itself, so the close button doesn't open with a focus ring
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      className={appendClass(s.dialog, s.size[size])}
      aria-labelledby={titleId}
      // Only this dialog's own close event: a confirmation stacked on top closes by itself.
      onClose={(e) => e.target === e.currentTarget && onClose()}
      // Clicking the backdrop (the <dialog> itself, not its content) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <header className={s.header}>
        <div>
          {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>
        </div>
        <button type="button" onClick={onClose} className={s.close} aria-label="Close">
          <X size={18} aria-hidden />
        </button>
      </header>
      <div className={s.body}>{children}</div>
    </dialog>
  );
}

/** Sticky action bar at the bottom of a Dialog (buttons stay reachable while the form scrolls). */
export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className={s.footer}>{children}</div>;
}
