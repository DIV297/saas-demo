/** Keeps `value` within [min, max]; if the range is empty, `min` wins. */
export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));
