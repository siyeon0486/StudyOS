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
