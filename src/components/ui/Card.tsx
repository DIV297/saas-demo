import type { ReactNode } from "react";
import { appendClass, cardBody, cardHeader, cardShell, cardTitle, eyebrow as eyebrowClass, panel } from "@/styles/classes";

interface CardProps {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  flush?: boolean; // no body padding: for tables and lists
  className?: string;
  children: ReactNode;
}

export function Card({ title, eyebrow, action, flush, className, children }: CardProps) {
  return (
    <section className={appendClass(panel, cardShell, className)}>
      {(title || action) && (
        <header className={cardHeader}>
          <div>
            {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
            {title && <h2 className={appendClass(cardTitle, "mt-0.5")}>{title}</h2>}
          </div>
          {action}
        </header>
      )}
      <div className={flush ? undefined : cardBody}>{children}</div>
    </section>
  );
}
