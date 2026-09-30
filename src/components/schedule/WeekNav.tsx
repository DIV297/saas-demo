import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PendingBar } from "@/components/ui";
import { addDays } from "@/utils/date";
import { formatDate } from "@/utils/format";
import { appendClass } from "@/styles/classes";
import { weekNavStyles as s } from "./styles";

interface WeekNavProps {
  weekStart: Date;
  offset: number;
}

/**
 * Week switcher for the page header: "This week" · ‹ range ›.
 * "This week" always keeps its space (just hidden on the current week), so the arrows never move.
 */
export function WeekNav({ weekStart, offset }: WeekNavProps) {
  const range = `${formatDate(weekStart)} – ${formatDate(addDays(weekStart, 6))}`;
  const isCurrentWeek = offset === 0;

  return (
    <div className={s.bar}>
      <Link
        href="/schedule"
        scroll={false}
        className={appendClass(s.reset, isCurrentWeek && s.resetHidden)}
        aria-hidden={isCurrentWeek || undefined}
        tabIndex={isCurrentWeek ? -1 : undefined}
      >
        This week
        <PendingBar />
      </Link>
      <div className={s.nav}>
        <Link href={`/schedule?week=${offset - 1}`} scroll={false} className={s.arrow} aria-label="Previous week">
          <ChevronLeft size={16} />
          <PendingBar />
        </Link>
        <span className={s.range}>{range}</span>
        <Link href={`/schedule?week=${offset + 1}`} scroll={false} className={s.arrow} aria-label="Next week">
          <ChevronRight size={16} />
          <PendingBar />
        </Link>
      </div>
    </div>
  );
}
