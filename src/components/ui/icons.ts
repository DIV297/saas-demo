import { Bug, Droplets, Fan, Leaf, Sparkles, UserRound, Zap, type LucideIcon } from "lucide-react";
import type { ServiceType } from "@/types";

/** One recognisable icon per trade: used for technicians, service tags and calendar events. */
export const SERVICE_ICONS: Record<ServiceType, LucideIcon> = {
  Plumbing: Droplets,
  Electrical: Zap,
  HVAC: Fan,
  Cleaning: Sparkles,
  Landscaping: Leaf,
  "Pest Control": Bug,
};

/** Customers are people/accounts: a profile icon. Residential vs commercial is shown by avatar tone. */
export const CUSTOMER_ICON: LucideIcon = UserRound;
