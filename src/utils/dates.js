import dayjs from "dayjs";

export function getSidebarDate() {
  const now = dayjs();

  return {
    weekday: now.format("dddd"),
    day: now.format("DD"),
    month: now.format("MMMM"),
  };
}

export function getDday(date) {
  const today = dayjs().startOf("day");
  const target = dayjs(date).startOf("day");

  return target.diff(today, "day");
}
