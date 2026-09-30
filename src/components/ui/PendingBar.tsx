"use client";

import { useLinkStatus } from "next/link";
import { pendingBarStyles as s } from "./styles";

/**
 * Place inside a <Link>. While that link's page is loading, a thin yellow bar runs across
 * the top of the screen. It only appears after 150ms, so fast navigations never flash it.
 */
export function PendingBar() {
  const { pending } = useLinkStatus();
  return pending ? <span className={s.bar} role="progressbar" aria-label="Loading page" /> : null;
}
