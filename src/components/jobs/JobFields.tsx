import { CustomerAvatar, SelectField, TechnicianAvatar } from "@/components/ui";
import type { Customer, ServiceType, Technician } from "@/types";
import { DURATION_CHOICES, sortForService, TIME_OPTIONS } from "@/utils/options";
import { jobFormStyles as s } from "./styles";

/** Form fields shared by "Book a job" and "Edit booking", so both look and behave the same. */

export type CustomerChoice = Pick<Customer, "id" | "name" | "city" | "plan">;

interface CustomerFieldProps {
  id: string;
  customers: CustomerChoice[];
  value: string;
  onChange: (id: string) => void;
}

/** Searchable by name or city. */
export function CustomerField({ id, customers, value, onChange }: CustomerFieldProps) {
  const options = customers.map((c) => ({
    value: c.id,
    label: c.name,
    hint: c.city,
    icon: <CustomerAvatar customer={c} size="sm" />,
  }));
  return (
    <SelectField
      id={id}
      label="Customer"
      placeholder="Select a customer…"
      searchable
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

interface TechnicianFieldProps {
  id: string;
  technicians: Technician[];
  /** Technicians with this trade are listed first. */
  service?: ServiceType;
  value: string;
  onChange: (id: string) => void;
}

/** Searchable by name or trade; each option shows the trade icon. */
export function TechnicianField({ id, technicians, service, value, onChange }: TechnicianFieldProps) {
  const options = sortForService(technicians, service).map((t) => ({
    value: t.id,
    label: t.name,
    hint: t.skill,
    icon: <TechnicianAvatar technician={t} />,
  }));
  return <SelectField id={id} label="Technician" searchable options={options} value={value} onChange={onChange} />;
}

interface TimeFieldsProps {
  idPrefix: string;
  time: string;
  durationMins: string;
  onTimeChange: (time: string) => void;
  onDurationChange: (mins: string) => void;
}

/** Start time (IST, half-hour steps) and duration, side by side. */
export function TimeFields({ idPrefix, time, durationMins, onTimeChange, onDurationChange }: TimeFieldsProps) {
  return (
    <div className={s.row}>
      <SelectField id={`${idPrefix}-time`} label="Start time" options={TIME_OPTIONS} value={time} onChange={onTimeChange} />
      <SelectField
        id={`${idPrefix}-duration`}
        label="Duration"
        options={DURATION_CHOICES}
        value={durationMins}
        onChange={onDurationChange}
      />
    </div>
  );
}
