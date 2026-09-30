import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CustomerProfile } from "@/components/customers/CustomerProfile";
import { JobTable } from "@/components/jobs/JobTable";
import { Card, EmptyState } from "@/components/ui";
import { getCustomer } from "@/server/repositories";
import { backLink, layoutAsideMain } from "@/styles/classes";

export default async function CustomerPage({ params }: PageProps<"/customers/[id]">) {
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();

  return (
    <>
      <Link href="/customers" className={backLink}>
        <ArrowLeft size={16} aria-hidden /> All customers
      </Link>

      <div className={layoutAsideMain}>
        <CustomerProfile customer={customer} />
        <Card eyebrow="Service history" title={`${customer.jobs.length} work orders`} flush>
          {customer.jobs.length ? (
            <JobTable jobs={[...customer.jobs].reverse()} hideCustomer />
          ) : (
            <EmptyState title="No jobs yet" hint="Book this customer's first visit." />
          )}
        </Card>
      </div>
    </>
  );
}
