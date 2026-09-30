"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { DashboardStats } from "@/types";

/** KPI numbers, polled every minute so the overview stays live. */
export function useDashboardStats(initialStats: DashboardStats) {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: api.getStats,
    initialData: initialStats,
    refetchInterval: 60_000,
  });
}
