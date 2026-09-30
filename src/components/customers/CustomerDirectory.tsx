"use client";

import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, Dropdown, EmptyState, PageHeader, Segmented, TextField } from "@/components/ui";
import { useCustomers } from "@/hooks";
import { CUSTOMER_PLANS } from "@/lib/constants";
import type { Customer, CustomerPlan } from "@/types";
import { withCounts } from "@/utils/options";
import { CustomerTable } from "./CustomerTable";
import { customerDirectoryStyles as s } from "./styles";

type PlanFilter = CustomerPlan | "all";

interface CustomerDirectoryProps {
  initialCustomers: Customer[];
  cities: string[];
}

/** Customer list with live search plus plan-type and location filters (all applied by the API). */
export function CustomerDirectory({ initialCustomers, cities }: CustomerDirectoryProps) {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState<PlanFilter>("all");
  const [city, setCity] = useState("");

  const { data: customers = [], isSearching, error } = useCustomers(
    { q: query, plan: plan === "all" ? undefined : plan, city: city || undefined },
    initialCustomers,
  );

  // Counts are for the whole directory, so they don't jump around while you filter.
  const planOptions = useMemo(
    () => withCounts<Customer, PlanFilter>(initialCustomers, CUSTOMER_PLANS, (c) => c.plan, { value: "all", label: "All" }),
    [initialCustomers],
  );
  const locationOptions = useMemo(
    () => withCounts(initialCustomers, cities, (c) => c.city, { value: "", label: "All locations" }),
    [initialCustomers, cities],
  );
  const hasFilters = query !== "" || plan !== "all" || city !== "";

  const clearFilters = () => {
    setQuery("");
    setPlan("all");
    setCity("");
  };

  return (
    <>
      <PageHeader
        title="Customers"
        meta={isSearching ? "Searching…" : `${customers.length} ${hasFilters ? "matching" : "accounts"}`}
        actions={
          <TextField
            type="search"
            placeholder="Search name, email, city…"
            aria-label="Search customers"
            icon={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={s.search}
          />
        }
      />
      <Card flush>
        <div className={s.toolbar}>
          <Segmented label="Filter by plan type" options={planOptions} value={plan} onChange={setPlan} />
          <Dropdown
            label="Filter by location"
            icon={<MapPin size={16} />}
            options={locationOptions}
            value={city}
            onChange={setCity}
            className={s.location}
          />
          {hasFilters && (
            <button type="button" onClick={clearFilters} className={s.clear}>
              Clear filters
            </button>
          )}
        </div>

        {error ? (
          <EmptyState title="Couldn't load customers" hint={error.message} />
        ) : customers.length ? (
          <CustomerTable customers={customers} />
        ) : (
          <EmptyState title="No customers match these filters" hint="Try another location, plan or search term." />
        )}
      </Card>
    </>
  );
}
