import { useParams } from "react-router-dom";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Subjects.module.css";

export default function Subjects() {
  const { subjectId } = useParams();
  const { data, toggleTask, scheduleTaskDate } = useStudy();
  const selected = data.subjects.find((subject) => subject.id === subjectId) || data.subjects[0];

  return (
    <div className={styles.page}>
      <aside className={styles.list}>
        <h1>Subjects</h1>
        {data.subjects.map((subject) => (
          <a key={subject.id} href={`/subjects/${subject.id}`} className={selected.id === subject.id ? styles.active : ""}>
            {subject.name}
          </a>
        ))}
      </aside>
      <section className={`${styles.workspace} card`}>
        <h2>{selected.name}</h2>
        <p>로드맵, 날짜, 오늘 할 일, 캘린더가 같은 Task 데이터를 공유합니다.</p>
        <div className={styles.sectionGrid}>
          {selected.sections.map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <strong>{section.name}</strong>
              <span>{section.tasks.filter((task) => task.done).length} / {section.tasks.length}</span>
              {section.tasks.map((task) => (
                <div className={styles.taskLine} key={task.id}>
                  <label><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />{task.title}</label>
                  <input type="date" value={task.dueDate || ""} onChange={(e) => scheduleTaskDate(task.id, e.target.value)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
