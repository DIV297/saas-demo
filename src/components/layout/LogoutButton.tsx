"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui";
import { useLogout } from "@/hooks";
import { topbarStyles as s } from "./styles";

export function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <Button variant="ghost" size="sm" onClick={() => logout()} disabled={isPending}>
      <LogOut size={16} aria-hidden />
      <span className={s.logoutLabel}>Sign out</span>
    </Button>
  );
}
