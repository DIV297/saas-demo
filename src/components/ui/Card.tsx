import type { ReactNode } from "react";
import { appendClass, cardBody, cardHeader, cardShell, cardTitle, panel } from "@/styles/classes";

interface CardProps {
  title?: string;
  action?: ReactNode;
  flush?: boolean; // no body padding: for tables and lists
  className?: string;
  children: ReactNode;
}

export function Card({ title, action, flush, className, children }: CardProps) {
  return (
    <section className={appendClass(panel, cardShell, className)}>
      {(title || action) && (
        <header className={cardHeader}>
          {title && <h2 className={cardTitle}>{title}</h2>}
          {action}
        </header>
      )}
      <div className={flush ? undefined : cardBody}>{children}</div>
    </section>
  );
}
