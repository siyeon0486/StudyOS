import Card from "../Card/Card";
import styles from "./Roadmap.module.css";

export default function Roadmap({ subjects, onToggle, onScheduleToday, onScheduleDate }) {
  return (
    <Card className={styles.roadmapCard}>
      <div className={styles.cardHeader}><h2>전체 학습 로드맵</h2><span>날짜 지정 시 Todo/Calendar에 연결</span></div>
      <div className={styles.row}>
        {subjects.map((subject) => {
          const all = subject.sections.flatMap((section) => section.tasks);
          const done = all.filter((task) => task.done).length;
          return (
            <details className={styles.subject} key={subject.id} open>
              <summary><strong>{subject.name}</strong><em>{done} / {all.length}</em></summary>
              <div className={styles.sections}>
                {subject.sections.map((section) => (
                  <details className={styles.section} key={section.id}>
                    <summary><span>{section.name}</span><em>{section.tasks.filter((t) => t.done).length} / {section.tasks.length}</em></summary>
                    {section.tasks.map((task) => (
                      <div className={styles.taskRow} key={task.id}>
                        <label><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />{task.title}</label>
                        <button onClick={() => onScheduleToday(task.id)}>오늘</button>
                        <input type="date" value={task.dueDate || ""} onChange={(e) => onScheduleDate(task.id, e.target.value)} />
                      </div>
                    ))}
                  </details>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </Card>
  );
}
