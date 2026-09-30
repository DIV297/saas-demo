"use client";

import { useState, type ReactNode } from "react";
import { SIDEBAR_COOKIE } from "@/lib/constants";
import { appendClass } from "@/styles/classes";
import { Sidebar } from "./Sidebar";
import { appShellStyles as s } from "./styles";

const ONE_YEAR = 60 * 60 * 24 * 365;

interface ShellFrameProps {
  company: string;
  initialCollapsed: boolean;
  topbar: ReactNode; // server-rendered, passed through as a slot
  children: ReactNode;
}

/** Owns the sidebar's collapsed state and shifts the main column to match. */
export function ShellFrame({ company, initialCollapsed, topbar, children }: ShellFrameProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    // Cookie (not localStorage) so the server renders the right width on the next load, with no flash.
    document.cookie = `${SIDEBAR_COOKIE}=${next ? "1" : "0"}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
  };

  return (
    <div className={s.root}>
      <Sidebar company={company} collapsed={collapsed} onToggle={toggle} />
      <div className={appendClass(s.main.base, collapsed ? s.main.collapsed : s.main.expanded)}>
        {topbar}
        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
}
