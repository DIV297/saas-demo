"use client";

import { Bell, ChevronDown, LifeBuoy, LogOut, Settings, UserRound, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, Tooltip } from "@/components/ui";
import { useClickOutside, useLogout } from "@/hooks";
import { appendClass } from "@/styles/classes";
import { userMenuStyles as s } from "./styles";

/** Menu items that exist in the full product but not in this demo. */
const PLACEHOLDER_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "My profile", icon: UserRound },
  { label: "Company settings", icon: Settings },
  { label: "Notifications", icon: Bell },
  { label: "Help & support", icon: LifeBuoy },
];

interface UserMenuProps {
  userName: string;
  company: string;
}

/** Account menu opened from the name in the top bar. Closes on outside click or Esc. */
export function UserMenu({ userName, company }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending } = useLogout();

  useClickOutside(open, [rootRef], () => setOpen(false));

  return (
    <div ref={rootRef} className={s.root} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={s.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={userName} size="sm" tone="brand" />
        <span className={s.triggerName}>{userName}</span>
        <ChevronDown size={14} className={appendClass(s.chevron, open && s.chevronOpen)} aria-hidden />
      </button>

      {open && (
        <div role="menu" aria-label="Account" className={s.menu}>
          <div className={s.identity}>
            <p className={s.identityName}>{userName}</p>
            <p className={s.identityCompany}>{company}</p>
          </div>

          {PLACEHOLDER_ITEMS.map(({ label, icon: Icon }) => (
            <Tooltip key={label} as="div" side="right" content="Not part of this demo" className={s.itemWrap}>
              <span role="menuitem" aria-disabled="true" className={appendClass(s.item, s.itemDisabled)}>
                <Icon size={16} aria-hidden />
                {label}
                <span className={s.soon}>Demo</span>
              </span>
            </Tooltip>
          ))}

          <button
            type="button"
            role="menuitem"
            onClick={() => logout()}
            disabled={isPending}
            className={appendClass(s.item, s.itemDanger)}
          >
            <LogOut size={16} aria-hidden />
            {isPending ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
