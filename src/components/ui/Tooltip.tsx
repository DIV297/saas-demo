"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { appendClass } from "@/styles/classes";
import { placeTooltip } from "@/utils/position";
import { tooltipStyles as s } from "./styles";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  /** Only open when the wrapped text is actually cut off (for truncated labels). */
  onlyWhenTruncated?: boolean;
  as?: "span" | "div";
  className?: string;
  style?: CSSProperties;
  /** Make the trigger reachable by keyboard (for non-interactive elements like job blocks). */
  focusable?: boolean;
  /** Preferred side; flips automatically when there's no room. "right" is for side navigation and menus. */
  side?: "top" | "right";
  disabled?: boolean;
}

/**
 * Hover / focus tooltip rendered into <body> with fixed positioning, so scroll containers and
 * clipped parents can't cut it off. It measures itself and always stays inside the window:
 * "top" flips below when there's no room above; "right" flips to the left near the right edge.
 */
export function Tooltip({
  content,
  children,
  onlyWhenTruncated,
  as: Tag = "span",
  className,
  style,
  focusable,
  side = "top",
  disabled,
}: TooltipProps) {
  const ref = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  const open = () => {
    const el = ref.current;
    if (!el || disabled) return;
    if (onlyWhenTruncated && el.scrollWidth <= el.clientWidth) return;
    setCoords(null);
    setAnchor(el.getBoundingClientRect());
  };
  const close = () => setAnchor(null);

  // Place the bubble once its size is known (it renders hidden for this first measurement).
  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    if (!anchor || !bubble) return;
    setCoords(placeTooltip(anchor, bubble.getBoundingClientRect(), side));
  }, [anchor, side]);

  return (
    <>
      <Tag
        ref={ref as never}
        className={className}
        style={style}
        tabIndex={focusable ? 0 : undefined}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
      >
        {children}
      </Tag>
      {anchor &&
        createPortal(
          <div
            ref={bubbleRef}
            role="tooltip"
            className={s.bubble}
            style={{ left: coords?.left ?? 0, top: coords?.top ?? 0, visibility: coords ? "visible" : "hidden" }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}

/** Text that truncates with "…" and reveals the full value on hover/focus. */
export function TruncatedText({ children, className }: { children: string; className?: string }) {
  return (
    <Tooltip content={children} onlyWhenTruncated className={appendClass("block truncate", className)}>
      {children}
    </Tooltip>
  );
}
