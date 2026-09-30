import { CustomerDirectory } from "@/components/customers/CustomerDirectory";
import { listCustomerCities, listCustomers } from "@/server/repositories";

export const metadata = { title: "Customers" };

export default async function CustomersPage() {
  const [customers, cities] = await Promise.all([listCustomers(), listCustomerCities()]);
  return <CustomerDirectory initialCustomers={customers} cities={cities} />;
}
