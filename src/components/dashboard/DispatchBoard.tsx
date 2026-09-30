import { JobSummary } from "@/components/jobs/JobSummary";
import { Card, TechnicianAvatar, Tooltip, TruncatedText } from "@/components/ui";
import { hourOfDay } from "@/lib/date";
import { formatTime } from "@/lib/format";
import { appendClass, statusClasses } from "@/styles/classes";
import type { JobWithRelations, Technician } from "@/types";
import { dispatchBoardStyles as s } from "./styles";

const DAY_START = 7; // 7am
const DAY_END = 20; // 8pm
const SPAN = DAY_END - DAY_START;
const HOURS = Array.from({ length: SPAN + 1 }, (_, i) => DAY_START + i);

const toPercent = (hours: number) => `${((hours - DAY_START) / SPAN) * 100}%`;
const hourLabel = (h: number) => `${h % 12 || 12}${h < 12 ? "a" : "p"}`;

interface DispatchBoardProps {
  technicians: Technician[];
  jobs: JobWithRelations[]; // today's jobs
}

/** Gantt-style view of today: one lane per technician, blocks positioned by time. */
export function DispatchBoard({ technicians, jobs }: DispatchBoardProps) {
  const now = hourOfDay(new Date());
  const showNow = now >= DAY_START && now <= DAY_END;

  return (
    <Card eyebrow="Live" title="Today's dispatch board" flush>
      <div className={s.scroller}>
        <div className={s.board}>
          <div className={s.axis}>
            <span />
            <div className={s.ticks}>
              {HOURS.map((h) => (
                <span key={h} className={s.tick} style={{ left: toPercent(h) }}>
                  {hourLabel(h)}
                </span>
              ))}
            </div>
          </div>

          {technicians.map((tech) => {
            const lane = jobs.filter((j) => j.technicianId === tech.id);
            return (
              <div key={tech.id} className={s.lane}>
                <div className={s.tech}>
                  <TechnicianAvatar technician={tech} />
                  <div className={s.techText}>
                    <TruncatedText className={s.techName}>{tech.name}</TruncatedText>
                    <p className={s.techSkill}>{tech.skill}</p>
                  </div>
                </div>

                <div className={s.track}>
                  <div className={s.gridlines} aria-hidden>
                    {HOURS.slice(0, -1).map((h) => (
                      <span key={h} className={s.gridline} />
                    ))}
                  </div>

                  {lane.length === 0 && <span className={s.idle}>Available</span>}

                  {lane.map((job) => {
                    const tone = statusClasses[job.status];
                    return (
                      <Tooltip
                        key={job.id}
                        as="div"
                        focusable
                        content={<JobSummary job={job} />}
                        className={appendClass(s.job, tone.border, tone.soft)}
                        style={{
                          left: toPercent(hourOfDay(new Date(job.scheduledAt))),
                          width: `${(job.durationMins / 60 / SPAN) * 100}%`,
                        }}
                      >
                        <strong className={s.jobCustomer}>{job.customer.name}</strong>
                        <span className={s.jobMeta}>
                          {formatTime(job.scheduledAt)} · {job.service}
                        </span>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {showNow && (
            <div className={s.nowOverlay} aria-hidden>
              <span />
              <div className={s.nowTrack}>
                <span className={s.nowLine} style={{ left: toPercent(now) }}>
                  <span className={s.nowTag}>NOW</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
