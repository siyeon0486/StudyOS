import dayjs from "dayjs";

export function getSidebarDate() {
  const now = dayjs();
  return { weekday: now.format("dddd"), day: now.format("DD"), month: now.format("MMMM") };
}
export function getDday(date) {
  return dayjs(date).startOf("day").diff(dayjs().startOf("day"), "day");
}
export function todayISO() {
  return dayjs().format("YYYY-MM-DD");
}
export function addDaysISO(days) {
  return dayjs().add(days, "day").format("YYYY-MM-DD");
}
export function shiftDateISO(date, amount) {
  return dayjs(date).add(amount, "day").format("YYYY-MM-DD");
}
export function yearDays(year = dayjs().year()) {
  const start = dayjs(`${year}-01-01`);
  const end = dayjs(`${year}-12-31`);
  const diff = end.diff(start, "day") + 1;
  return Array.from({ length: diff }, (_, i) => start.add(i, "day").format("YYYY-MM-DD"));
}
