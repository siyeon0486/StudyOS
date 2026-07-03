import { useState } from "react";
import Schedule from "../../components/Schedule/Schedule.jsx";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import TodoCard from "../../components/TodoCard/TodoCard.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import { shiftDateISO, todayISO } from "../../utils/dates";
import styles from "./Dashboard.module.css";

const fallback = ["#2f7d5b", "#4f8f6f", "#7aa06a", "#8aa46b", "#5f8c75", "#6f9a84"];
const softBg = (c) => `linear-gradient(90deg, ${c}22, #f8fbf5)`;

export default function Dashboard() {
  const { data, allTasks, addTask, toggleTask, updateTask, deleteTask, addScheduleEvent, updateScheduleEvent, deleteScheduleEvent } = useStudy();
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultStartTime, setDefaultStartTime] = useState("");

  const selectedTasks = allTasks.filter((task) => task.dueDate === selectedDate);
  const colorMap = new Map(data.subjects.map((s, i) => [s.id, s.color || fallback[i % fallback.length]]));
  const selectedEvents = data.schedule.filter((e) => e.date === selectedDate).map((e) => {
    const color = colorMap.get(e.subjectId) || "#2f7d5b";
    return { ...e, color, bg: softBg(color) };
  });

  const openNewTask = (startTime = "") => {
    setModalTask(null);
    setDefaultStartTime(startTime);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.topGrid}>
        <TodoCard tasks={selectedTasks} onToggle={toggleTask} onOpenTask={(task) => { setModalTask(task); setDefaultStartTime(""); setIsModalOpen(true); }} />
        <Schedule events={selectedEvents} selectedDate={selectedDate} onPrevDate={() => setSelectedDate((d) => shiftDateISO(d, -1))} onNextDate={() => setSelectedDate((d) => shiftDateISO(d, 1))} onUpdate={updateScheduleEvent} onDelete={deleteScheduleEvent} onBlankClick={openNewTask} />
      </div>

      <section className={`${styles.subjectStatus} card`}>
        <div className={styles.statusHead}><h2>과목별 현황</h2><button onClick={() => openNewTask("")}>할 일 추가</button></div>
        <div className={styles.statusGrid}>
          {data.subjects.map((subject, index) => {
            const tasks = subject.sections.flatMap((section) => section.tasks);
            const done = tasks.filter((task) => task.done).length;
            const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
            const color = subject.color || fallback[index % fallback.length];
            return (
              <article key={subject.id} className={styles.statusCard} style={{ borderTopColor: color }}>
                <div><strong>{subject.name}</strong><span>{done} / {tasks.length}</span></div>
                <ProgressBar value={percent} />
                <p>{percent}% 완료</p>
              </article>
            );
          })}
        </div>
      </section>

      <TaskModal open={isModalOpen} task={modalTask} subjects={data.subjects} defaultDate={selectedDate} defaultStartTime={defaultStartTime} onClose={() => setIsModalOpen(false)} onSave={updateTask} onDelete={deleteTask} onCreate={addTask} onAddSchedule={addScheduleEvent} />
    </div>
  );
}
