import { useStudy } from "../../context/StudyContext.jsx";
import { todayISO } from "../../utils/dates";
import styles from "./StudyPlan.module.css";

export default function StudyPlan() {
  const { allTasks } = useStudy();
  const today = allTasks.filter((task) => task.dueDate === todayISO());
  const scheduled = allTasks.filter((task) => task.dueDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Study Plan</h1>
      <div className={styles.columns}>
        <section className="card"><h2>오늘</h2>{today.map((t) => <p key={t.id}>{t.subject} · {t.section} · {t.title}</p>)}</section>
        <section className="card"><h2>날짜 지정된 Task</h2>{scheduled.map((t) => <p key={t.id}><b>{t.dueDate}</b> {t.subject} · {t.title}</p>)}</section>
        <section className="card"><h2>이번 주 목표</h2><p>연구 Related Work</p><p>TOEFL Reading</p><p>전공 Simplex 복습</p></section>
      </div>
    </div>
  );
}
