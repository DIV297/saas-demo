import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our custom type scale (theme.css) so `text-caption` is treated as a size, not a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "caption", "label", "body", "title", "heading", "display", "hero"],
    },
  },
});

/**
 * Combine class strings: appendClass(flexBetween, panel, isActive && textAccent).
 * Falsy values are skipped, and when two Tailwind classes conflict the later one wins.
 */
export function appendClass(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
