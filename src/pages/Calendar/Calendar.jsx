import dayjs from "dayjs";
import { useMemo, useState } from "react";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import SimpleModal from "../../components/SimpleModal/SimpleModal.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Calendar.module.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fallback = ["#2f7d5b", "#4f8f6f", "#7aa06a", "#8aa46b", "#5f8c75", "#6f9a84"];

export default function CalendarPage() {
  const { allTasks, data, addTask, updateTask, deleteTask, scheduleTaskDate, addScheduleEvent, addCalendarMemo, updateCalendarMemo, deleteCalendarMemo } = useStudy();
  const [current, setCurrent] = useState(dayjs());
  const [modalTask, setModalTask] = useState(null);
  const [modalDate, setModalDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoForm, setMemoForm] = useState({ id: "", date: "", title: "" });
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [choiceDate, setChoiceDate] = useState("");
  const colorMap = useMemo(() => new Map(data.subjects.map((s, i) => [s.id, s.color || fallback[i % fallback.length]])), [data.subjects]);

  const days = useMemo(() => {
    const start = current.startOf("month").startOf("week");
    return Array.from({ length: 42 }, (_, i) => start.add(i, "day"));
  }, [current]);

  const saveMemo = (event) => {
    event.preventDefault();
    if (!memoForm.title.trim()) return;
    if (memoForm.id) updateCalendarMemo(memoForm.id, { date: memoForm.date, title: memoForm.title });
    else addCalendarMemo(memoForm.date, memoForm.title);
    setMemoOpen(false);
  };
  const onDropToDate = (date, event) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const payload = JSON.parse(raw);
      if (payload.type === "task") scheduleTaskDate(payload.id, date);
      if (payload.type === "memo") updateCalendarMemo(payload.id, { date });
    } catch {}
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}><button onClick={() => setCurrent(current.subtract(1, "month"))}>‹</button><div><h1>{current.format("MMMM YYYY")}</h1></div><button onClick={() => setCurrent(current.add(1, "month"))}>›</button></div>
      <section className={`${styles.calendar} card`}>
        {weekdays.map((day) => <div className={styles.weekday} key={day}>{day}</div>)}
        {days.map((day) => {
          const date = day.format("YYYY-MM-DD");
          const tasks = allTasks.filter((task) => task.dueDate === date);
          const memos = data.calendarMemos.filter((memo) => memo.date === date);
          return (
            <button key={date} className={`${styles.day} ${day.month() !== current.month() ? styles.muted : ""}`} onClick={() => { setChoiceDate(date); setChoiceOpen(true); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropToDate(date, e)}>
              <strong>{day.date()}</strong>
              {tasks.slice(0, 5).map((task) => {
                const color = colorMap.get(task.subjectId) || "#2f7d5b";
                return <span key={task.id} style={{ borderLeftColor: color, background: `${color}18` }} draggable onDragStart={(e) => { e.stopPropagation(); e.dataTransfer.setData("text/plain", JSON.stringify({ type: "task", id: task.id })); }} onClick={(e) => { e.stopPropagation(); setModalTask(task); setModalDate(date); setIsModalOpen(true); }}>{task.subject} · {task.title}</span>;
              })}
              {memos.slice(0, 3).map((memo) => <em key={memo.id} draggable onDragStart={(e) => { e.stopPropagation(); e.dataTransfer.setData("text/plain", JSON.stringify({ type: "memo", id: memo.id })); }} onClick={(e) => { e.stopPropagation(); setMemoForm(memo); setMemoOpen(true); }}>{memo.title}</em>)}
            </button>
          );
        })}
      </section>
      <TaskModal open={isModalOpen} task={modalTask} subjects={data.subjects} defaultDate={modalDate} onClose={() => setIsModalOpen(false)} onSave={updateTask} onDelete={deleteTask} onCreate={addTask} onAddSchedule={addScheduleEvent} />
      <SimpleModal open={choiceOpen} title="일정 추가" onClose={() => setChoiceOpen(false)}><div className={styles.choiceGrid}><button onClick={() => { setModalTask(null); setModalDate(choiceDate); setIsModalOpen(true); setChoiceOpen(false); }}>Task 추가</button><button onClick={() => { setMemoForm({ id: "", date: choiceDate, title: "" }); setMemoOpen(true); setChoiceOpen(false); }}>메모 추가</button></div></SimpleModal>
      <SimpleModal open={memoOpen} title="메모 일정" onClose={() => setMemoOpen(false)}><form className={styles.memoForm} onSubmit={saveMemo}><label>날짜<input type="date" value={memoForm.date} onChange={(e) => setMemoForm((p) => ({ ...p, date: e.target.value }))} /></label><label>제목<input value={memoForm.title} onChange={(e) => setMemoForm((p) => ({ ...p, title: e.target.value }))} /></label><div className={styles.memoActions}>{memoForm.id && <button type="button" onClick={() => { deleteCalendarMemo(memoForm.id); setMemoOpen(false); }}>삭제</button>}<button>저장</button></div></form></SimpleModal>
    </div>
  );
}
