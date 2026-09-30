import type { ReactNode } from "react";
import { appendClass } from "@/styles/classes";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { pageHeaderStyles as s } from "./styles";

interface PageHeaderProps {
  title: string;
  /** Parent pages, e.g. [{ label: "Customers", href: "/customers" }]. Home is always first. */
  parents?: Crumb[];
  /** One short fact shown after the title, e.g. "10 accounts" (may include a small link). */
  meta?: ReactNode;
  actions?: ReactNode;
  /** Keep the whole row pinned under the top bar while the page scrolls (e.g. calendar controls). */
  sticky?: boolean;
}

/** One compact row: 🏠 › Parents › Title · meta ………… actions */
export function PageHeader({ title, parents = [], meta, actions, sticky }: PageHeaderProps) {
  return (
    <header className={appendClass(s.header, sticky && s.sticky)}>
      <div className={s.heading}>
        <Breadcrumbs items={parents} />
        <h1 className={s.title} aria-current="page">
          {title}
        </h1>
        {meta && <p className={s.meta}>{meta}</p>}
      </div>
      {actions && <div className={s.actions}>{actions}</div>}
    </header>
  );
}
