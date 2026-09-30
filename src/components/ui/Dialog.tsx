"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { dialogStyles as s } from "./styles";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

/**
 * Modal built on the native <dialog> element: focus trapping, Esc-to-close
 * and the backdrop come from the browser, so there's no extra library.
 */
export function Dialog({ open, onClose, eyebrow, title, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="dialog-title"
      onClose={onClose}
      // Clicking the backdrop (the <dialog> itself, not its content) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <header className={s.header}>
        <div>
          {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
          <h2 id="dialog-title" className={s.title}>
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
