import type { Customer, Technician } from "@/types";
import { Avatar } from "./Avatar";
import { CUSTOMER_ICON, SERVICE_ICONS } from "./icons";

type Size = "sm" | "md" | "lg";

/** Technician shown by their trade (droplet for plumbing, bolt for electrical…). */
export function TechnicianAvatar({ technician, size = "sm" }: { technician: Technician; size?: Size }) {
  return (
    <Avatar
      name={`${technician.name}, ${technician.skill}`}
      icon={SERVICE_ICONS[technician.skill]}
      size={size}
      tone="trade"
    />
  );
}

/** Customer profile icon; commercial accounts get the dark tile, residential the light one. */
export function CustomerAvatar({
  customer,
  size = "md",
  highlight,
}: {
  customer: Pick<Customer, "name" | "plan">;
  size?: Size;
  highlight?: boolean;
}) {
  const tone = highlight ? "signal" : customer.plan === "Commercial" ? "ink" : "paper";
  return <Avatar name={customer.name} icon={CUSTOMER_ICON} size={size} tone={tone} />;
}
