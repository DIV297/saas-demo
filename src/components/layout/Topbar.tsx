import { Avatar } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { Logo } from "./Logo";
import { LogoutButton } from "./LogoutButton";
import { topbarStyles as s } from "./styles";

export function Topbar({ userName }: { userName: string }) {
  const today = formatDate(new Date(), { weekday: "long", month: "long", day: "numeric" });

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
        <div className={s.user}>
          <Avatar name={userName} size="sm" tone="ink" />
          <span className={s.userName}>{userName}</span>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
