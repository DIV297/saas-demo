"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Customer, CustomerFilters } from "@/types";
import { useDebounce } from "./useDebounce";

/**
 * Customer list with search + filters. Typing is debounced (300ms); plan/city apply instantly.
 * Previous results stay on screen while the next request loads.
 */
export function useCustomers({ q = "", plan, city }: CustomerFilters, initialCustomers?: Customer[]) {
  const term = useDebounce(q.trim());
  const filters: CustomerFilters = { q: term || undefined, plan, city };
  const isUnfiltered = !term && !plan && !city;

  const result = useQuery({
    queryKey: queryKeys.customers(filters),
    queryFn: () => api.getCustomers(filters),
    initialData: isUnfiltered ? initialCustomers : undefined,
    placeholderData: keepPreviousData,
  });

  return { ...result, isSearching: term !== q.trim() || result.isFetching };
}
