import styles from "./Roadmap.module.css";

function Roadmap({ subjects }) {
  return (
    <section className={`${styles.roadmapCard} card`}>
      <div className={styles.cardHeader}>
        <h2>전체 학습 로드맵</h2>
        <span>과목 · 분류 · 할 일</span>
      </div>

      <div className={styles.grid}>
        {subjects.map((subject) => {
          const subjectTasks = subject.sections.flatMap((section) => section.tasks);
          const subjectDone = subjectTasks.filter((task) => task.done).length;

          return (
            <details className={styles.subject} key={subject.id} open>
              <summary>
                <span>{subject.name}</span>
                <em>
                  {subjectDone} / {subjectTasks.length}
                </em>
              </summary>

              {subject.sections.map((section) => {
                const sectionDone = section.tasks.filter((task) => task.done).length;

                return (
                  <details className={styles.section} key={section.id}>
                    <summary>
                      <span>{section.name}</span>
                      <em>
                        {sectionDone} / {section.tasks.length}
                      </em>
                    </summary>

                    <div className={styles.tasks}>
                      {section.tasks.map((task) => (
                        <label key={task.id}>
                          <input type="checkbox" defaultChecked={task.done} />
                          {task.title}
                        </label>
                      ))}
                    </div>
                  </details>
                );
              })}
            </details>
          );
        })}
      </div>
    </section>
  );
}

export default Roadmap;
