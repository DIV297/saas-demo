import { Bug, Droplets, Fan, Zap, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { BRAND } from "@/lib/constants";
import { appendClass } from "@/styles/classes";
import { brandPanelStyles as s } from "./styles";

type Tone = keyof typeof s.blockTone;

/** Decorative dispatch-board strip. Offsets and widths are percentages of the track. */
const PREVIEW_LANES: { trade: LucideIcon; blocks: { left: number; width: number; tone: Tone }[] }[] = [
  { trade: Droplets, blocks: [{ left: 4, width: 26, tone: "done" }, { left: 38, width: 30, tone: "active" }] },
  { trade: Zap, blocks: [{ left: 12, width: 40, tone: "active" }, { left: 60, width: 18, tone: "booked" }] },
  { trade: Fan, blocks: [{ left: 0, width: 18, tone: "done" }, { left: 44, width: 22, tone: "booked" }] },
  { trade: Bug, blocks: [{ left: 22, width: 50, tone: "booked" }] },
];

/** Left half of the login screen (desktop only). */
export function BrandPanel() {
  return (
    <section aria-hidden className={s.panel}>
      <div className={s.grid} />

      <div className={s.layer}>
        <Logo inverted />
      </div>

      <div className={s.layer}>
        <p className={s.kicker}>{BRAND.tagline}</p>
        <h1 className={s.headline}>
          Every crew.
          <br />
          Every job.
          <br />
          <span className={s.headlineMuted}>One board.</span>
        </h1>
      </div>

      <div className={s.preview}>
        {PREVIEW_LANES.map((lane, laneIndex) => (
          <div key={laneIndex} className={s.lane}>
            <span className={s.laneTech}>
              <lane.trade size={14} aria-hidden />
            </span>
            <div className={s.track}>
              {lane.blocks.map((block) => (
                <span
                  key={block.left}
                  className={appendClass(s.block, s.blockTone[block.tone])}
                  style={{ left: `${block.left}%`, width: `${block.width}%`, animationDelay: `${laneIndex * 80}ms` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
