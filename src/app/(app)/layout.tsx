import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { SESSION_COOKIE } from "@/lib/constants";

/**
 * Every authenticated screen lives under this route group.
 * proxy.ts does the fast redirect; this server check is the real gate.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session) redirect("/login");

  return <AppShell>{children}</AppShell>;
}
