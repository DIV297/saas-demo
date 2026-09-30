import { addDays, atTime, startOfDay } from "@/utils/date";
import type { Job } from "@/types";

/**
 * Dates are relative to "today" so the demo always looks current.
 * at(-3, 9, 30) => three days ago at 09:30 IST (see utils/date.ts). Amounts are in ₹.
 */
function at(dayOffset: number, hour: number, minute = 0): string {
  return atTime(addDays(startOfDay(new Date()), dayOffset), hour, minute).toISOString();
}

export const jobs: Job[] = [
  // Past — completed
  { id: "J-2035", customerId: "c-108", technicianId: "t-4", service: "Cleaning", title: "Kitchen hood degrease", scheduledAt: at(-26, 7), durationMins: 180, status: "completed", amount: 12000 },
  { id: "J-2036", customerId: "c-102", technicianId: "t-3", service: "HVAC", title: "Rooftop AC unit service", scheduledAt: at(-24, 8), durationMins: 150, status: "completed", amount: 9500 },
  { id: "J-2037", customerId: "c-106", technicianId: "t-5", service: "Landscaping", title: "Lawn aeration", scheduledAt: at(-22, 9), durationMins: 120, status: "completed", amount: 2500 },
  { id: "J-2038", customerId: "c-105", technicianId: "t-2", service: "Electrical", title: "Conference room power points", scheduledAt: at(-19, 17), durationMins: 180, status: "completed", amount: 14000 },
  { id: "J-2039", customerId: "c-109", technicianId: "t-6", service: "Pest Control", title: "Termite inspection", scheduledAt: at(-17, 10), durationMins: 60, status: "completed", amount: 1500 },
  { id: "J-2040", customerId: "c-104", technicianId: "t-1", service: "Plumbing", title: "Flush valve replacement", scheduledAt: at(-15, 14), durationMins: 60, status: "completed", amount: 900 },
  { id: "J-2041", customerId: "c-101", technicianId: "t-1", service: "Plumbing", title: "Kitchen sink leak repair", scheduledAt: at(-12, 9), durationMins: 90, status: "completed", amount: 1200 },
  { id: "J-2042", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(-10, 18), durationMins: 180, status: "completed", amount: 11000 },
  { id: "J-2043", customerId: "c-103", technicianId: "t-3", service: "HVAC", title: "AC service & filter clean", scheduledAt: at(-9, 13), durationMins: 60, status: "completed", amount: 1800 },
  { id: "J-2044", customerId: "c-108", technicianId: "t-6", service: "Pest Control", title: "Quarterly kitchen treatment", scheduledAt: at(-7, 8), durationMins: 120, status: "completed", amount: 6500 },
  { id: "J-2045", customerId: "c-107", technicianId: "t-5", service: "Landscaping", title: "Hedge trim & garden refresh", scheduledAt: at(-5, 10), durationMins: 150, status: "completed", amount: 3200 },
  { id: "J-2046", customerId: "c-102", technicianId: "t-2", service: "Electrical", title: "Replace clinic lighting", scheduledAt: at(-4, 7, 30), durationMins: 120, status: "completed", amount: 18500 },
  { id: "J-2047", customerId: "c-110", technicianId: "t-1", service: "Plumbing", title: "Geyser servicing", scheduledAt: at(-3, 15), durationMins: 60, status: "completed", amount: 850 },
  { id: "J-2048", customerId: "c-104", technicianId: "t-3", service: "HVAC", title: "Split AC installation", scheduledAt: at(-2, 11), durationMins: 90, status: "completed", amount: 3500 },
  { id: "J-2049", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(-3, 18), durationMins: 180, status: "completed", amount: 11000 },
  { id: "J-2050", customerId: "c-106", technicianId: "t-2", service: "Electrical", title: "Install EV charger circuit", scheduledAt: at(-1, 9), durationMins: 240, status: "completed", amount: 24000 },

  // Today — in progress / scheduled
  { id: "J-2063", customerId: "c-103", technicianId: "t-6", service: "Pest Control", title: "Beehive removal", scheduledAt: at(0, 7, 30), durationMins: 60, status: "completed", amount: 2200 },
  { id: "J-2051", customerId: "c-109", technicianId: "t-1", service: "Plumbing", title: "Bathroom fixture replacement", scheduledAt: at(0, 8, 30), durationMins: 150, status: "in_progress", amount: 4800 },
  { id: "J-2052", customerId: "c-108", technicianId: "t-3", service: "HVAC", title: "Cold room inspection", scheduledAt: at(0, 10), durationMins: 120, status: "in_progress", amount: 7500 },
  { id: "J-2064", customerId: "c-110", technicianId: "t-2", service: "Electrical", title: "MCB & switchboard replacement", scheduledAt: at(0, 11), durationMins: 90, status: "in_progress", amount: 2800 },
  { id: "J-2065", customerId: "c-102", technicianId: "t-4", service: "Cleaning", title: "Post-renovation clean", scheduledAt: at(0, 13), durationMins: 180, status: "scheduled", amount: 8500 },
  { id: "J-2053", customerId: "c-101", technicianId: "t-5", service: "Landscaping", title: "Terrace garden drip repair", scheduledAt: at(0, 14), durationMins: 90, status: "scheduled", amount: 1600 },

  // Upcoming — scheduled
  { id: "J-2054", customerId: "c-102", technicianId: "t-6", service: "Pest Control", title: "Perimeter treatment", scheduledAt: at(1, 8), durationMins: 60, status: "scheduled", amount: 2400 },
  { id: "J-2055", customerId: "c-103", technicianId: "t-2", service: "Electrical", title: "Wiring inspection", scheduledAt: at(1, 13, 30), durationMins: 60, status: "scheduled", amount: 800 },
  { id: "J-2056", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(2, 18), durationMins: 180, status: "scheduled", amount: 11000 },
  { id: "J-2057", customerId: "c-107", technicianId: "t-6", service: "Pest Control", title: "Organic ant treatment", scheduledAt: at(2, 9), durationMins: 90, status: "scheduled", amount: 1900 },
  { id: "J-2058", customerId: "c-110", technicianId: "t-3", service: "HVAC", title: "AC gas refill", scheduledAt: at(3, 11), durationMins: 90, status: "scheduled", amount: 2700 },
  { id: "J-2059", customerId: "c-104", technicianId: "t-1", service: "Plumbing", title: "RO water purifier install", scheduledAt: at(4, 10), durationMins: 90, status: "scheduled", amount: 1500 },
  { id: "J-2060", customerId: "c-106", technicianId: "t-5", service: "Landscaping", title: "Post-monsoon garden cleanup", scheduledAt: at(5, 8), durationMins: 240, status: "scheduled", amount: 4500 },
  { id: "J-2061", customerId: "c-109", technicianId: "t-2", service: "Electrical", title: "Ceiling fan installation", scheduledAt: at(6, 15), durationMins: 120, status: "scheduled", amount: 700 },
  { id: "J-2062", customerId: "c-108", technicianId: "t-4", service: "Cleaning", title: "Kitchen hood degrease", scheduledAt: at(8, 7), durationMins: 180, status: "scheduled", amount: 12000 },

  // More upcoming work, so the board looks busy whichever day the demo is opened.
  { id: "J-2070", customerId: "c-101", technicianId: "t-1", service: "Plumbing", title: "Kitchen tap replacement", scheduledAt: at(1, 10), durationMins: 90, status: "scheduled", amount: 1400 },
  { id: "J-2071", customerId: "c-106", technicianId: "t-3", service: "HVAC", title: "Split AC deep service", scheduledAt: at(1, 11, 30), durationMins: 120, status: "scheduled", amount: 2200 },
  { id: "J-2072", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Pantry & washroom sanitisation", scheduledAt: at(1, 16), durationMins: 150, status: "scheduled", amount: 6500 },
  { id: "J-2073", customerId: "c-109", technicianId: "t-5", service: "Landscaping", title: "Balcony garden setup", scheduledAt: at(1, 9), durationMins: 180, status: "scheduled", amount: 5200 },
  { id: "J-2074", customerId: "c-108", technicianId: "t-2", service: "Electrical", title: "Kitchen exhaust fan wiring", scheduledAt: at(2, 8), durationMins: 120, status: "scheduled", amount: 3200 },
  { id: "J-2075", customerId: "c-104", technicianId: "t-1", service: "Plumbing", title: "Overhead tank cleaning", scheduledAt: at(2, 11), durationMins: 120, status: "scheduled", amount: 1800 },
  { id: "J-2076", customerId: "c-102", technicianId: "t-3", service: "HVAC", title: "Clinic AC filter change", scheduledAt: at(2, 19), durationMins: 60, status: "scheduled", amount: 1600 },
  { id: "J-2077", customerId: "c-110", technicianId: "t-5", service: "Landscaping", title: "Lawn mowing & edging", scheduledAt: at(2, 15), durationMins: 90, status: "scheduled", amount: 1500 },
  { id: "J-2078", customerId: "c-103", technicianId: "t-4", service: "Cleaning", title: "Sofa & carpet shampoo", scheduledAt: at(3, 10), durationMins: 180, status: "scheduled", amount: 3800 },
  { id: "J-2079", customerId: "c-107", technicianId: "t-2", service: "Electrical", title: "Inverter battery installation", scheduledAt: at(3, 14), durationMins: 90, status: "scheduled", amount: 2100 },
  { id: "J-2080", customerId: "c-105", technicianId: "t-6", service: "Pest Control", title: "Office cockroach gel treatment", scheduledAt: at(3, 18, 30), durationMins: 90, status: "scheduled", amount: 4200 },
  { id: "J-2081", customerId: "c-101", technicianId: "t-1", service: "Plumbing", title: "Shower mixer repair", scheduledAt: at(3, 9), durationMins: 60, status: "scheduled", amount: 950 },
  { id: "J-2082", customerId: "c-106", technicianId: "t-6", service: "Pest Control", title: "Termite pre-treatment", scheduledAt: at(4, 8), durationMins: 180, status: "scheduled", amount: 7800 },
  { id: "J-2083", customerId: "c-109", technicianId: "t-3", service: "HVAC", title: "Window AC uninstall & refit", scheduledAt: at(4, 12), durationMins: 120, status: "scheduled", amount: 1900 },
  { id: "J-2084", customerId: "c-102", technicianId: "t-4", service: "Cleaning", title: "Clinic weekend deep clean", scheduledAt: at(4, 16), durationMins: 180, status: "scheduled", amount: 9000 },
  { id: "J-2085", customerId: "c-103", technicianId: "t-2", service: "Electrical", title: "Smart switch installation", scheduledAt: at(5, 11), durationMins: 90, status: "scheduled", amount: 2600 },
  { id: "J-2086", customerId: "c-108", technicianId: "t-1", service: "Plumbing", title: "Grease trap cleaning", scheduledAt: at(5, 7, 30), durationMins: 120, status: "scheduled", amount: 4500 },
  { id: "J-2087", customerId: "c-107", technicianId: "t-5", service: "Landscaping", title: "Terrace planter makeover", scheduledAt: at(6, 9), durationMins: 240, status: "scheduled", amount: 6800 },
  { id: "J-2088", customerId: "c-110", technicianId: "t-3", service: "HVAC", title: "Central AC duct inspection", scheduledAt: at(6, 13), durationMins: 120, status: "scheduled", amount: 3500 },
  { id: "J-2089", customerId: "c-104", technicianId: "t-6", service: "Pest Control", title: "Bed bug treatment", scheduledAt: at(6, 17), durationMins: 120, status: "scheduled", amount: 3900 },
  { id: "J-2090", customerId: "c-105", technicianId: "t-2", service: "Electrical", title: "UPS load check & rewiring", scheduledAt: at(7, 10), durationMins: 180, status: "scheduled", amount: 8500 },
  { id: "J-2091", customerId: "c-101", technicianId: "t-4", service: "Cleaning", title: "Festive home deep clean", scheduledAt: at(7, 9), durationMins: 240, status: "scheduled", amount: 5500 },
  { id: "J-2092", customerId: "c-109", technicianId: "t-1", service: "Plumbing", title: "Water pressure pump install", scheduledAt: at(8, 11), durationMins: 120, status: "scheduled", amount: 6200 },
  { id: "J-2093", customerId: "c-106", technicianId: "t-2", service: "Electrical", title: "Festive lighting setup", scheduledAt: at(9, 15), durationMins: 180, status: "scheduled", amount: 4800 },
  { id: "J-2094", customerId: "c-103", technicianId: "t-3", service: "HVAC", title: "AC gas top-up", scheduledAt: at(9, 10), durationMins: 60, status: "scheduled", amount: 2400 },
];
