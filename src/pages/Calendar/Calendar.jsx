import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Calendar.module.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { allTasks, scheduleTaskDate } = useStudy();
  const [current, setCurrent] = useState(dayjs());

  const days = useMemo(() => {
    const start = current.startOf("month").startOf("week");
    return Array.from({ length: 42 }, (_, i) => start.add(i, "day"));
  }, [current]);

  const handleDayClick = (date) => {
    const unscheduled = allTasks.filter((task) => !task.dueDate);
    if (!unscheduled.length) return alert("날짜 미지정 Task가 없습니다.");
    const picked = window.prompt(
      `이 날짜에 배치할 Task 번호\n` +
      unscheduled.map((t, i) => `${i + 1}. ${t.subject} · ${t.title}`).join("\n")
    );
    const task = unscheduled[Number(picked) - 1];
    if (task) scheduleTaskDate(task.id, date.format("YYYY-MM-DD"));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button onClick={() => setCurrent(current.subtract(1, "month"))}>‹</button>
        <h1>{current.format("MMMM YYYY")}</h1>
        <button onClick={() => setCurrent(current.add(1, "month"))}>›</button>
      </div>

      <section className={`${styles.calendar} card`}>
        {weekdays.map((day) => <div className={styles.weekday} key={day}>{day}</div>)}
        {days.map((day) => {
          const date = day.format("YYYY-MM-DD");
          const tasks = allTasks.filter((task) => task.dueDate === date);
          return (
            <button key={date} className={`${styles.day} ${day.month() !== current.month() ? styles.muted : ""}`} onClick={() => handleDayClick(day)}>
              <strong>{day.date()}</strong>
              {tasks.slice(0, 3).map((task) => <span key={task.id}>{task.subject} · {task.title}</span>)}
            </button>
          );
        })}
      </section>
    </div>
  );
}
