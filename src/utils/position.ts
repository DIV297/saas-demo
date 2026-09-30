import { clamp } from "./math";

/** Floating layers (tooltips, menus) keep this distance from their trigger and from the window edges. */
const GAP = 6;
const EDGE = 8;

interface Size {
  width: number;
  height: number;
}

/**
 * Where to put a tooltip next to `anchor`. "top" flips below when there's no room above,
 * "right" flips to the left near the right edge; the result is always inside the window.
 */
export function placeTooltip(anchor: DOMRect, bubble: Size, side: "top" | "right") {
  const maxLeft = window.innerWidth - bubble.width - EDGE;
  const maxTop = window.innerHeight - bubble.height - EDGE;
  let left: number;
  let top: number;

  if (side === "right") {
    left = anchor.right + GAP;
    if (left > maxLeft) left = anchor.left - GAP - bubble.width;
    top = anchor.top + anchor.height / 2 - bubble.height / 2;
  } else {
    top = anchor.top - GAP - bubble.height;
    if (top < EDGE) top = anchor.bottom + GAP;
    left = anchor.left + anchor.width / 2 - bubble.width / 2;
  }
  return { left: clamp(left, EDGE, maxLeft), top: clamp(top, EDGE, maxTop) };
}

/**
 * Where to put a dropdown menu for `trigger`: below it, or above when there's more room there
 * (e.g. a field at the bottom of a dialog). `maxHeight` fits the chosen side.
 */
export function placeMenu(trigger: DOMRect, menuWidth: number) {
  const below = window.innerHeight - trigger.bottom - GAP - EDGE;
  const above = trigger.top - GAP - EDGE;
  const openUp = below < 240 && above > below;
  const width = Math.max(menuWidth, trigger.width);

  return {
    left: clamp(trigger.left, EDGE, window.innerWidth - width - EDGE),
    minWidth: trigger.width,
    maxHeight: Math.min(openUp ? above : below, 320),
    ...(openUp ? { bottom: window.innerHeight - trigger.top + GAP } : { top: trigger.bottom + GAP }),
  };
}
