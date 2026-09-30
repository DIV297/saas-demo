const SWIPE_MIN_PX = 60;

/**
 * A mostly-horizontal swipe between two touch points: 1 = swiped left (go forward),
 * -1 = swiped right (go back), 0 = not a swipe (too short, or mostly vertical scrolling).
 */
export function swipeDirection(start: { x: number; y: number }, end: { x: number; y: number }): 1 | -1 | 0 {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return 0;
  return dx < 0 ? 1 : -1;
}
