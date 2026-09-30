import { BRAND } from "@/lib/constants";
import { appendClass } from "@/styles/classes";
import { logoStyles as s } from "./styles";

interface LogoProps {
  inverted?: boolean;
  /** Mark only (collapsed sidebar); the name stays available to screen readers. */
  compact?: boolean;
}

/** Wordmark with three stacked bars: a stylised dispatch board. */
export function Logo({ inverted = false, compact = false }: LogoProps) {
  return (
    <span className={appendClass(s.wordmark, inverted ? s.tone.inverted : s.tone.light)}>
      <span className={s.mark} aria-hidden>
        {s.barShapes.map((shape) => (
          <span key={shape} className={appendClass(s.bar, shape, inverted ? s.barTone.inverted : s.barTone.light)} />
        ))}
      </span>
      <span className={compact ? s.srOnly : undefined}>{BRAND.name}</span>
    </span>
  );
}
