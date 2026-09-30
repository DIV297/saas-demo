import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PendingBar } from "@/components/ui";
import { addDays } from "@/utils/date";
import { formatDate } from "@/utils/format";
import { weekNavStyles as s } from "./styles";

interface WeekNavProps {
  weekStart: Date;
  offset: number;
}

/** Week switcher for the page header: ‹ range ›. On phones it spans the full row. */
export function WeekNav({ weekStart, offset }: WeekNavProps) {
  const range = `${formatDate(weekStart)} – ${formatDate(addDays(weekStart, 6))}`;

  return (
    <nav className={s.nav} aria-label="Change week">
      <Link href={`/schedule?week=${offset - 1}`} scroll={false} className={s.arrow} aria-label="Previous week">
        <ChevronLeft size={16} />
        <PendingBar />
      </Link>
      <span className={s.range}>{range}</span>
      <Link href={`/schedule?week=${offset + 1}`} scroll={false} className={s.arrow} aria-label="Next week">
        <ChevronRight size={16} />
        <PendingBar />
      </Link>
    </nav>
  );
}

/** "Back to this week" link, shown next to the page meta while another week is open. */
export function ThisWeekLink() {
  return (
    <Link href="/schedule" scroll={false} className={s.reset}>
      This week
      <PendingBar />
    </Link>
  );
}
