import type { ReactNode } from "react";
import { appendClass } from "@/styles/classes";
import { statCardStyles as s } from "./styles";

interface StatCardProps {
  index: number;
  label: string;
  value: string;
  footnote?: ReactNode;
  /** Inverted dark card for the headline metric. */
  highlight?: boolean;
  className?: string;
  children?: ReactNode; // optional mini visual (e.g. revenue bars)
}

export function StatCard({ index, label, value, footnote, highlight, className, children }: StatCardProps) {
  const tone = highlight ? "highlight" : "default";

  return (
    <article className={appendClass(s.card.base, s.card[tone], className)}>
      <div className={s.header}>
        <p className={appendClass(s.label.base, highlight && s.label.highlight)}>{label}</p>
        <span className={appendClass(s.index.base, !highlight && s.index.default)}>
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className={s.body}>
        <p className={s.value}>{value}</p>
        {children}
      </div>

      {footnote && <p className={appendClass(s.footnote.base, s.footnote[tone])}>{footnote}</p>}
    </article>
  );
}
