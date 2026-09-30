import type { ReactNode } from "react";
import { pageEnter } from "@/styles/classes";

/**
 * Unlike a layout, a template re-mounts on every navigation, so its entrance animation
 * plays once per page change. The sidebar and top bar (in the layout) stay still.
 */
export default function PageTemplate({ children }: { children: ReactNode }) {
  return <div className={pageEnter}>{children}</div>;
}
