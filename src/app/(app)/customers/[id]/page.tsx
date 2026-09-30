import { notFound } from "next/navigation";
import { CustomerProfile } from "@/components/customers/CustomerProfile";
import { ServiceHistory } from "@/components/customers/ServiceHistory";
import { PageHeader } from "@/components/ui";
import { formatDate } from "@/utils/format";
import { getCustomer } from "@/server/repositories";
import { layoutAsideMain } from "@/styles/classes";

export default async function CustomerPage({ params }: PageProps<"/customers/[id]">) {
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();

  return (
    <>
      <PageHeader
        parents={[{ label: "Customers", href: "/customers" }]}
        title={customer.name}
        meta={`${customer.plan} · since ${formatDate(customer.since, { month: "short", year: "numeric" })}`}
      />

      <div className={layoutAsideMain}>
        <CustomerProfile customer={customer} />
        <ServiceHistory jobs={[...customer.jobs].reverse()} />
      </div>
    </>
  );
}
