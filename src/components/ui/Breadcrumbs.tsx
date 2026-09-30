import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { Fragment } from "react";
import { PendingBar } from "./PendingBar";
import { breadcrumbStyles as s } from "./styles";

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Home › parent › parent › — the current page's title follows on the same line
 * (rendered by PageHeader as the <h1>), so the trail costs no extra vertical space.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={s.nav}>
      <ol className={s.list}>
        <li className={s.item}>
          <Link href="/dashboard" className={s.link} aria-label="Home">
            <House size={15} aria-hidden />
            <PendingBar />
          </Link>
        </li>
        {items.map((crumb) => (
          <Fragment key={crumb.href}>
            <li className={s.separator} aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li className={s.item}>
              <Link href={crumb.href} className={s.link}>
                {crumb.label}
                <PendingBar />
              </Link>
            </li>
          </Fragment>
        ))}
        <li className={s.separator} aria-hidden>
          <ChevronRight size={14} />
        </li>
      </ol>
    </nav>
  );
}
