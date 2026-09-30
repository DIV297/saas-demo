import { BUSINESS_TZ_LABEL } from "@/utils/date";
import { formatDayLong, formatTime } from "@/utils/format";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { topbarStyles as s } from "./styles";

export function Topbar({ userName, company }: { userName: string; company: string }) {
  const today = `${formatDayLong(new Date())} · ${formatTime(new Date())} ${BUSINESS_TZ_LABEL}`;

  return (
    <header className={s.bar}>
      <div className={s.mobileLogo}>
        <Logo />
      </div>
      <p className={s.date}>
        <span className={s.liveDot} aria-hidden />
        {today}
      </p>

      <div className={s.actions}>
        <UserMenu userName={userName} company={company} />
      </div>
    </header>
  );
}
