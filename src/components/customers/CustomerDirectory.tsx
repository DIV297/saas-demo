"use client";

import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, EmptyState, PageHeader, Segmented, SelectField, TextField } from "@/components/ui";
import { useCustomers } from "@/hooks";
import { CUSTOMER_PLANS } from "@/lib/constants";
import type { Customer, CustomerPlan } from "@/types";
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

  const planOptions = useMemo(
    () => [
      { value: "all" as const, label: "All", count: initialCustomers.length },
      ...CUSTOMER_PLANS.map((p) => ({
        value: p,
        label: p,
        count: initialCustomers.filter((c) => c.plan === p).length,
      })),
    ],
    [initialCustomers],
  );

  const locationOptions = [{ value: "", label: "All locations" }, ...cities.map((c) => ({ value: c, label: c }))];
  const hasFilters = query !== "" || plan !== "all" || city !== "";

  const clearFilters = () => {
    setQuery("");
    setPlan("all");
    setCity("");
  };

  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Customers"
        description={isSearching ? "Searching…" : `${customers.length} ${hasFilters ? "matching" : "active"} accounts`}
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
          <SelectField
            aria-label="Filter by location"
            icon={<MapPin size={16} />}
            options={locationOptions}
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
