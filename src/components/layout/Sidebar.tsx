"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Avatar, Tooltip } from "@/components/ui";
import { NAV_ITEMS } from "@/lib/constants";
import { appendClass } from "@/styles/classes";
import { Logo } from "./Logo";
import { NavIcon } from "./NavIcon";
import { sidebarStyles as s } from "./styles";

interface SidebarProps {
  company: string;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ company, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const current = (href: string) => (pathname.startsWith(href) ? "page" : undefined);
  const mode = collapsed ? "collapsed" : "expanded";
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <>
      {/* Desktop: fixed rail. Full width with labels, or collapsed to icons */}
      <aside className={appendClass(s.rail.base, s.rail[mode])}>
        <div className={appendClass(s.brand.base, s.brand[mode])}>
          <Logo inverted compact={collapsed} />
          <button
            type="button"
            onClick={onToggle}
            className={s.toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <ToggleIcon size={18} aria-hidden />
          </button>
        </div>

        <nav className={s.nav} aria-label="Main">
          {!collapsed && <p className={s.navHeading}>Workspace</p>}
          {NAV_ITEMS.map((item, index) => (
            <Tooltip key={item.href} as="div" side="right" content={item.label} disabled={!collapsed} className={s.navItem}>
              <Link
                href={item.href}
                aria-current={current(item.href)}
                aria-label={collapsed ? item.label : undefined}
                className={appendClass(s.link.base, s.link[mode])}
              >
                <span className={s.activeTick} />
                <NavIcon name={item.icon} />
                {!collapsed && (
                  <>
                    <span className={s.linkLabel}>{item.label}</span>
                    <span className={s.linkIndex}>0{index + 1}</span>
                  </>
                )}
              </Link>
            </Tooltip>
          ))}
        </nav>

        {collapsed ? (
          <Tooltip as="div" side="right" content={company} className={s.accountCompact}>
            <Avatar name={company} size="sm" tone="signal" />
          </Tooltip>
        ) : (
          <div className={s.account}>
            <p className={s.accountHeading}>Account</p>
            <p className={s.accountName}>{company}</p>
            <p className={s.accountPlan}>Pro plan · 6 technicians</p>
          </div>
        )}
      </aside>

      {/* Mobile / tablet: bottom tab bar, thumb-friendly for crews in the field */}
      <nav className={s.tabBar} aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} aria-current={current(item.href)} className={s.tab}>
            <span className={s.tabIcon}>
              <NavIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
