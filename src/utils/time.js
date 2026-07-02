export const DAY_START = 8;
export const DAY_END = 23;
export const HOUR_HEIGHT = 54;
export const MIN_DURATION = 0.5;

export function formatHour(value) {
  const hour = Math.floor(value);
  const min = Math.round((value - hour) * 60);
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function yToTime(y) {
  const raw = DAY_START + y / HOUR_HEIGHT;
  return Math.max(DAY_START, Math.min(DAY_END - MIN_DURATION, Math.round(raw * 2) / 2));
}
