import { sampleData } from "../../data/sampleData";
import styles from "./Subjects.module.css";

function Subjects() {
  return (
    <div className="placeholderPage">
      <h1 className="pageTitle">Subjects</h1>

      <div className={styles.grid}>
        {sampleData.subjects.map((subject) => {
          const tasks = subject.sections.flatMap((section) => section.tasks);
          const done = tasks.filter((task) => task.done).length;

          return (
            <section className={`${styles.subjectCard} card`} key={subject.id}>
              <h2>{subject.name}</h2>
              <p>
                {done} / {tasks.length} 완료
              </p>

              {subject.sections.map((section) => (
                <div className={styles.section} key={section.id}>
                  <strong>{section.name}</strong>
                  <span>
                    {section.tasks.filter((task) => task.done).length} / {section.tasks.length}
                  </span>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;
