import { CalendarDays, LayoutGrid, Users, Wrench } from "lucide-react";
import type { NAV_ITEMS } from "@/lib/constants";

const ICONS = {
  grid: LayoutGrid,
  wrench: Wrench,
  calendar: CalendarDays,
  users: Users,
};

export function NavIcon({ name }: { name: (typeof NAV_ITEMS)[number]["icon"] }) {
  const Icon = ICONS[name];
  return <Icon size={18} strokeWidth={1.8} aria-hidden />;
}
