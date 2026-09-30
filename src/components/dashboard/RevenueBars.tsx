import { formatCurrency } from "@/lib/format";
import { appendClass } from "@/styles/classes";
import { revenueBarsStyles as s } from "./styles";

interface RevenueBarsProps {
  data: { label: string; value: number }[];
}

/** Tiny single-series bar chart. No chart library needed at this size. */
export function RevenueBars({ data }: RevenueBarsProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={s.chart} role="img" aria-label="Completed revenue, last four weeks">
      {data.map((d, i) => {
        const isCurrent = i === data.length - 1;
        return (
          <div key={d.label} tabIndex={0} className={s.column}>
            <span className={appendClass(s.tooltip.base, isCurrent ? s.tooltip.alignRight : s.tooltip.centered)}>
              {d.label}: <strong>{formatCurrency(d.value)}</strong>
            </span>
            <span
              className={appendClass(s.bar.base, isCurrent ? s.bar.current : s.bar.past)}
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
