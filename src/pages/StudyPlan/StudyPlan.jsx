import { useParams } from "react-router-dom";
import { useState } from "react";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import { todayISO } from "../../utils/dates";
import styles from "./StudyPlan.module.css";

export default function StudyPlan() {
  const { subjectId } = useParams();
  const {
    data, addSubject, addSection, addTask, toggleTask, updateTask,
    scheduleTaskDate, deleteTask, addScheduleEvent,
  } = useStudy();

  const selected = data.subjects.find((subject) => subject.id === subjectId) || data.subjects[0];
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newSection, setNewSection] = useState("");

  const all = selected.sections.flatMap((section) =>
    section.tasks.map((task) => ({ ...task, sectionName: section.name, sectionId: section.id }))
  );
  const done = all.filter((task) => task.done).length;
  const sorted = [...all].sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"));

  const addSubjectSubmit = (event) => {
    event.preventDefault();
    addSubject(newSubject);
    setNewSubject("");
  };

  const addSectionSubmit = (event) => {
    event.preventDefault();
    addSection(selected.id, newSection);
    setNewSection("");
  };

  return (
    <div className={styles.page}>
      <aside className={styles.list}>
        <h1>Study Plan</h1>
        <nav className={styles.subjectNav}>
          {data.subjects.map((subject) => (
            <a key={subject.id} href={`/study-plan/${subject.id}`} className={selected.id === subject.id ? styles.active : ""}>
              {subject.name}
            </a>
          ))}
        </nav>

        <div className={styles.sideTools}>
          <form onSubmit={addSubjectSubmit}>
            <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="새 과목" />
            <button>+</button>
          </form>
          <form onSubmit={addSectionSubmit}>
            <input value={newSection} onChange={(e) => setNewSection(e.target.value)} placeholder="새 분류" />
            <button>+</button>
          </form>
        </div>
      </aside>

      <section className={`${styles.workspace} card`}>
        <div className={styles.head}>
          <div>
            <h2>{selected.name}</h2>
          </div>
          <span>{done} / {all.length} 완료</span>
        </div>

        <div className={styles.sectionGrid}>
          {selected.sections.map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <div className={styles.sectionHead}>
                <div>
                  <strong>{section.name}</strong>
                  <span>{section.tasks.filter((task) => task.done).length} / {section.tasks.length}</span>
                </div>
                <button
                  className={styles.smallAdd}
                  onClick={() => {
                    setModalTask({ subjectId: selected.id, sectionId: section.id, title: "", dueDate: todayISO(), duration: 40, note: "" });
                    setIsModalOpen(true);
                  }}
                >
                  + 계획
                </button>
              </div>

              {section.tasks.length === 0 && <p className={styles.empty}>아직 할 일이 없습니다.</p>}
              {section.tasks.map((task) => (
                <div className={styles.taskLine} key={task.id}>
                  <label><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />{task.title}</label>
                  <input type="date" value={task.dueDate || ""} onChange={(e) => scheduleTaskDate(task.id, e.target.value)} />
                  <button onClick={() => { setModalTask({ ...task, subjectId: selected.id, subject: selected.name, sectionId: section.id, section: section.name }); setIsModalOpen(true); }}>수정</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <section className={styles.gantt}>
          <h3>{selected.name} 일정 로드맵</h3>
          <div className={styles.ganttList}>
            {sorted.length === 0 && <p className={styles.empty}>계획을 추가하면 여기에 날짜순으로 표시됩니다.</p>}
            {sorted.map((task, index) => (
              <button
                key={task.id}
                className={`${styles.ganttItem} ${task.done ? styles.doneTask : ""}`}
                onClick={() => { setModalTask({ ...task, subjectId: selected.id, subject: selected.name }); setIsModalOpen(true); }}
              >
                <span className={styles.dot}>{index + 1}</span>
                <b>{task.title}</b>
                <em>{task.sectionName}</em>
                <strong>{task.dueDate || "날짜 미정"}</strong>
              </button>
            ))}
          </div>
        </section>
      </section>

      <TaskModal
        open={isModalOpen}
        task={modalTask?.id ? modalTask : null}
        subjects={data.subjects}
        defaultDate={modalTask?.dueDate || todayISO()}
        onClose={() => setIsModalOpen(false)}
        onSave={updateTask}
        onDelete={deleteTask}
        onCreate={(payload) => addTask({
          ...payload,
          subjectId: modalTask?.subjectId || payload.subjectId,
          sectionId: modalTask?.sectionId || payload.sectionId,
        })}
        onAddSchedule={addScheduleEvent}
      />
    </div>
  );
}
