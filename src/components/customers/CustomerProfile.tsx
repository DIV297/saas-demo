import { Mail, MapPin, Phone, StickyNote } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CustomerAvatar } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/format";
import { iconTile } from "@/styles/classes";
import type { CustomerWithHistory } from "@/types";
import { customerProfileStyles as s } from "./styles";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className={s.detail}>
      <span className={iconTile}>{icon}</span>
      <div>
        <p className={s.detailLabel}>{label}</p>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={s.metric}>
      <dt className={s.metricLabel}>{label}</dt>
      <dd className={s.metricValue}>{value}</dd>
    </div>
  );
}

export function CustomerProfile({ customer }: { customer: CustomerWithHistory }) {
  const completed = customer.jobs.filter((j) => j.status === "completed").length;

  return (
    <Card className={s.card}>
      <div className={s.identity}>
        <CustomerAvatar customer={customer} size="lg" highlight />
        <div>
          <p className={s.meta}>
            {customer.plan} · {customer.id}
          </p>
          <h2 className={s.name}>{customer.name}</h2>
          <p className={s.since}>
            Customer since {formatDate(customer.since, { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <dl className={s.metrics}>
        <Metric label="Lifetime value" value={formatCurrency(customer.lifetimeValue)} />
        <Metric label="Completed" value={completed} />
        <Metric label="Open jobs" value={customer.jobs.length - completed} />
      </dl>

      <div className={s.details}>
        <Detail icon={<Mail size={16} />} label="Email">{customer.email}</Detail>
        <Detail icon={<Phone size={16} />} label="Phone">{customer.phone}</Detail>
        <Detail icon={<MapPin size={16} />} label="Address">
          {customer.address}, {customer.city}
        </Detail>
        {customer.notes && (
          <Detail icon={<StickyNote size={16} />} label="Site notes">{customer.notes}</Detail>
        )}
      </div>
    </Card>
  );
}
