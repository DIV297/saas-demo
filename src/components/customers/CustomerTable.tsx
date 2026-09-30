import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CustomerAvatar, PendingBar, TruncatedText } from "@/components/ui";
import { formatDate } from "@/utils/format";
import { appendClass } from "@/styles/classes";
import type { Customer } from "@/types";
import { customerTableStyles as s } from "./styles";

const { columns: col } = s;

export function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <>
      <div className={s.header} aria-hidden>
        <span className={col.avatar} />
        <span className={col.identity}>Customer</span>
        <span className={col.desktop}>Phone</span>
        <span className={col.desktop}>Location</span>
        <span className={col.plan}>Plan</span>
        <span className={col.desktop}>Customer since</span>
        <span className={col.chevron} />
      </div>

      <ul>
        {customers.map((c) => (
          <li key={c.id} className={s.item}>
            <Link href={`/customers/${c.id}`} className={s.row}>
              <CustomerAvatar customer={c} />
              <div className={col.identity}>
                <TruncatedText className={s.name}>{c.name}</TruncatedText>
                <TruncatedText className={s.email}>{c.email}</TruncatedText>
              </div>
              <p className={s.detail}>{c.phone}</p>
              <p className={s.detail}>{c.city}</p>
              <span className={col.plan}>
                <span className={appendClass(s.plan.base, s.plan[c.plan])}>{c.plan}</span>
              </span>
              <p className={s.since}>{formatDate(c.since, { month: "short", year: true })}</p>
              <ChevronRight size={16} aria-hidden className={s.chevron} />
              <PendingBar />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
