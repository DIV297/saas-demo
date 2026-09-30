"use client";

import type { ReactNode } from "react";
import { segmentedStyles as s } from "./styles";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Optional leading visual, e.g. a status dot or icon. */
  icon?: ReactNode;
  count?: number;
}

interface SegmentedProps<T extends string> {
  label: string; // accessible name of the group
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Single-choice tab strip used for filters (job status, customer plan…). */
export function Segmented<T extends string>({ label, options, value, onChange }: SegmentedProps<T>) {
  return (
    <div role="tablist" aria-label={label} className={s.list}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={s.option}
        >
          {option.icon}
          {option.label}
          {option.count !== undefined && <span className={s.count}>{option.count}</span>}
        </button>
      ))}
    </div>
  );
}
