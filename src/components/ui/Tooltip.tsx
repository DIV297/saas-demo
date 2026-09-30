"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { appendClass } from "@/styles/classes";
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
  /** "top" flips below near the viewport edge; "right" is for side navigation. */
  side?: "top" | "right";
  disabled?: boolean;
}

interface Position {
  x: number;
  y: number;
  placement: "above" | "below" | "right";
}

const GAP = 8;
const MIN_SPACE_ABOVE = 96; // flip below the trigger when it's too close to the top of the viewport

/**
 * Hover / focus tooltip rendered into <body> with fixed positioning,
 * so scroll containers and overflow-hidden parents can't clip it.
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
  const [position, setPosition] = useState<Position | null>(null);

  const open = () => {
    const el = ref.current;
    if (!el || disabled) return;
    if (onlyWhenTruncated && el.scrollWidth <= el.clientWidth) return;

    const rect = el.getBoundingClientRect();
    if (side === "right") {
      setPosition({ x: rect.right + GAP, y: rect.top + rect.height / 2, placement: "right" });
      return;
    }
    const placement = rect.top < MIN_SPACE_ABOVE ? "below" : "above";
    setPosition({
      x: rect.left + rect.width / 2,
      y: placement === "above" ? rect.top - GAP : rect.bottom + GAP,
      placement,
    });
  };
  const close = () => setPosition(null);

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
      {position &&
        createPortal(
          <div
            role="tooltip"
            className={appendClass(s.bubble, s.placement[position.placement])}
            style={{ left: position.x, top: position.y }}
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
