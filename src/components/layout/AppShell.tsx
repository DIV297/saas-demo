import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { DEMO_USER } from "@/lib/auth";
import { SIDEBAR_COOKIE } from "@/lib/constants";
import { ShellFrame } from "./ShellFrame";
import { Topbar } from "./Topbar";

export async function AppShell({ children }: { children: ReactNode }) {
  const collapsed = (await cookies()).get(SIDEBAR_COOKIE)?.value === "1";

  return (
    <ShellFrame company={DEMO_USER.company} initialCollapsed={collapsed} topbar={<Topbar userName={DEMO_USER.name} />}>
      {children}
    </ShellFrame>
  );
}
