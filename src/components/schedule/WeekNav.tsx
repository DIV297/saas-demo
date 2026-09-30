import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays } from "@/lib/date";
import { formatDate } from "@/lib/format";
import { weekNavStyles as s } from "./styles";

interface WeekNavProps {
  weekStart: Date;
  offset: number;
}

export function WeekNav({ weekStart, offset }: WeekNavProps) {
  const range = `${formatDate(weekStart)} – ${formatDate(addDays(weekStart, 6))}`;

  return (
    <div className={s.nav}>
      <Link href={`/schedule?week=${offset - 1}`} className={s.arrow} aria-label="Previous week">
        <ChevronLeft size={16} />
      </Link>
      <span className={s.range}>{range}</span>
      <Link href={`/schedule?week=${offset + 1}`} className={s.arrow} aria-label="Next week">
        <ChevronRight size={16} />
      </Link>
      {offset !== 0 && (
        <Link href="/schedule" className={s.reset}>
          This week
        </Link>
      )}
    </div>
  );
}
