import { useEffect, useRef, type RefObject } from "react";

/** While `active`, calls `onOutside` when the user presses anywhere outside all of `refs` (menus, popovers). */
export function useClickOutside(active: boolean, refs: RefObject<Element | null>[], onOutside: () => void) {
  const handler = useRef(onOutside);
  handler.current = onOutside;

  useEffect(() => {
    if (!active) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!refs.some((ref) => ref.current?.contains(e.target as Node))) handler.current();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // refs are stable ref objects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
