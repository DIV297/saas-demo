import { tag } from "@/styles/classes";
import type { ServiceType } from "@/types";
import { SERVICE_ICONS } from "./icons";

export function ServiceTag({ service }: { service: ServiceType }) {
  const Icon = SERVICE_ICONS[service];
  return (
    <span className={tag}>
      <Icon size={13} strokeWidth={2} aria-hidden />
      {service}
    </span>
  );
}
