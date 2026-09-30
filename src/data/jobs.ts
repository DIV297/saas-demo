import type { Job } from "@/types";

/**
 * Dates are relative to "today" so the demo always looks current.
 * at(-3, 9, 30) => three days ago at 09:30 (business time, see lib/date.ts).
 */
function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + dayOffset);
  d.setUTCHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const jobs: Job[] = [
  // Past — completed
  { id: "J-2035", customerId: "c-108", technicianId: "t-4", service: "Cleaning", title: "Kitchen hood degrease", scheduledAt: at(-26, 6), durationMins: 180, status: "completed", amount: 690 },
  { id: "J-2036", customerId: "c-102", technicianId: "t-3", service: "HVAC", title: "Rooftop unit service", scheduledAt: at(-24, 7), durationMins: 150, status: "completed", amount: 540 },
  { id: "J-2037", customerId: "c-106", technicianId: "t-5", service: "Landscaping", title: "Lawn aeration", scheduledAt: at(-22, 9), durationMins: 120, status: "completed", amount: 220 },
  { id: "J-2038", customerId: "c-105", technicianId: "t-2", service: "Electrical", title: "Conference room outlets", scheduledAt: at(-19, 17), durationMins: 180, status: "completed", amount: 860 },
  { id: "J-2039", customerId: "c-109", technicianId: "t-6", service: "Pest Control", title: "Termite inspection", scheduledAt: at(-17, 10), durationMins: 60, status: "completed", amount: 140 },
  { id: "J-2040", customerId: "c-104", technicianId: "t-1", service: "Plumbing", title: "Toilet valve replacement", scheduledAt: at(-15, 14), durationMins: 60, status: "completed", amount: 165 },
  { id: "J-2041", customerId: "c-101", technicianId: "t-1", service: "Plumbing", title: "Kitchen sink leak repair", scheduledAt: at(-12, 9), durationMins: 90, status: "completed", amount: 240 },
  { id: "J-2042", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(-10, 18), durationMins: 180, status: "completed", amount: 620 },
  { id: "J-2043", customerId: "c-103", technicianId: "t-3", service: "HVAC", title: "AC tune-up & filter swap", scheduledAt: at(-9, 13), durationMins: 60, status: "completed", amount: 185 },
  { id: "J-2044", customerId: "c-108", technicianId: "t-6", service: "Pest Control", title: "Quarterly kitchen treatment", scheduledAt: at(-7, 7), durationMins: 120, status: "completed", amount: 410 },
  { id: "J-2045", customerId: "c-107", technicianId: "t-5", service: "Landscaping", title: "Hedge trim & mulch refresh", scheduledAt: at(-5, 10), durationMins: 150, status: "completed", amount: 360 },
  { id: "J-2046", customerId: "c-102", technicianId: "t-2", service: "Electrical", title: "Replace exam-room lighting", scheduledAt: at(-4, 7, 30), durationMins: 120, status: "completed", amount: 780 },
  { id: "J-2047", customerId: "c-110", technicianId: "t-1", service: "Plumbing", title: "Water heater flush", scheduledAt: at(-3, 15), durationMins: 60, status: "completed", amount: 150 },
  { id: "J-2048", customerId: "c-104", technicianId: "t-3", service: "HVAC", title: "Thermostat install", scheduledAt: at(-2, 11), durationMins: 90, status: "completed", amount: 295 },
  { id: "J-2049", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(-3, 18), durationMins: 180, status: "completed", amount: 620 },
  { id: "J-2050", customerId: "c-106", technicianId: "t-2", service: "Electrical", title: "Install EV charger circuit", scheduledAt: at(-1, 9), durationMins: 240, status: "completed", amount: 1150 },

  // Today — in progress / scheduled
  { id: "J-2051", customerId: "c-109", technicianId: "t-1", service: "Plumbing", title: "Bathroom fixture replacement", scheduledAt: at(0, 8, 30), durationMins: 150, status: "in_progress", amount: 520 },
  { id: "J-2052", customerId: "c-108", technicianId: "t-3", service: "HVAC", title: "Walk-in cooler inspection", scheduledAt: at(0, 10), durationMins: 120, status: "in_progress", amount: 450 },
  { id: "J-2063", customerId: "c-103", technicianId: "t-6", service: "Pest Control", title: "Wasp nest removal", scheduledAt: at(0, 7, 30), durationMins: 60, status: "completed", amount: 160 },
  { id: "J-2064", customerId: "c-110", technicianId: "t-2", service: "Electrical", title: "GFCI outlet replacement", scheduledAt: at(0, 11), durationMins: 90, status: "in_progress", amount: 210 },
  { id: "J-2065", customerId: "c-102", technicianId: "t-4", service: "Cleaning", title: "Post-renovation clean", scheduledAt: at(0, 13), durationMins: 180, status: "scheduled", amount: 480 },
  { id: "J-2053", customerId: "c-101", technicianId: "t-5", service: "Landscaping", title: "Sprinkler zone repair", scheduledAt: at(0, 14), durationMins: 90, status: "scheduled", amount: 210 },

  // Upcoming — scheduled
  { id: "J-2054", customerId: "c-102", technicianId: "t-6", service: "Pest Control", title: "Perimeter treatment", scheduledAt: at(1, 7), durationMins: 60, status: "scheduled", amount: 175 },
  { id: "J-2055", customerId: "c-103", technicianId: "t-2", service: "Electrical", title: "Panel upgrade consultation", scheduledAt: at(1, 13, 30), durationMins: 60, status: "scheduled", amount: 95 },
  { id: "J-2056", customerId: "c-105", technicianId: "t-4", service: "Cleaning", title: "Weekly office deep clean", scheduledAt: at(2, 18), durationMins: 180, status: "scheduled", amount: 620 },
  { id: "J-2057", customerId: "c-107", technicianId: "t-6", service: "Pest Control", title: "Organic ant treatment", scheduledAt: at(2, 9), durationMins: 90, status: "scheduled", amount: 230 },
  { id: "J-2058", customerId: "c-110", technicianId: "t-3", service: "HVAC", title: "Heating system check", scheduledAt: at(3, 11), durationMins: 90, status: "scheduled", amount: 190 },
  { id: "J-2059", customerId: "c-104", technicianId: "t-1", service: "Plumbing", title: "Garbage disposal install", scheduledAt: at(4, 10), durationMins: 90, status: "scheduled", amount: 330 },
  { id: "J-2060", customerId: "c-106", technicianId: "t-5", service: "Landscaping", title: "Fall yard cleanup", scheduledAt: at(5, 8), durationMins: 240, status: "scheduled", amount: 540 },
  { id: "J-2061", customerId: "c-109", technicianId: "t-2", service: "Electrical", title: "Ceiling fan installation", scheduledAt: at(6, 15), durationMins: 120, status: "scheduled", amount: 260 },
  { id: "J-2062", customerId: "c-108", technicianId: "t-4", service: "Cleaning", title: "Kitchen hood degrease", scheduledAt: at(8, 6), durationMins: 180, status: "scheduled", amount: 690 },
];
