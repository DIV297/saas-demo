import type { CustomerFilters } from "@/types";

/** Central query keys so cache reads, writes and invalidations always match. */
export const queryKeys = {
  stats: ["stats"] as const,
  jobs: ["jobs"] as const,
  customers: (filters: CustomerFilters = {}) => ["customers", filters] as const,
};
