import { useEffect, useState } from "react";
import { timeStringToNumber } from "../../utils/time";
import styles from "./TaskModal.module.css";

const timeOptions = Array.from({ length: 31 }, (_, i) => {
  const total = 8 * 60 + i * 30;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

export default function TaskModal({
  open,
  task,
  subjects,
  defaultDate = "",
  defaultStartTime = "",
  onClose,
  onSave,
  onDelete,
  onCreate,
  onAddSchedule,
}) {
  const firstSubject = subjects[0];
  const [form, setForm] = useState({
    subjectId: firstSubject?.id || "",
    sectionId: firstSubject?.sections[0]?.id || "",
    title: "",
    dueDate: defaultDate,
    startTime: defaultStartTime,
    durationHours: "1",
    note: "",
  });

  useEffect(() => {
    if (!open) return;
    if (task) {
      setForm({
        subjectId: task.subjectId || firstSubject?.id || "",
        sectionId: task.sectionId || firstSubject?.sections[0]?.id || "",
        title: task.title || "",
        dueDate: task.dueDate || defaultDate || "",
        startTime: defaultStartTime || "",
        durationHours: String((task.duration || 60) / 60),
        note: task.note || "",
      });
    } else {
      setForm({
        subjectId: firstSubject?.id || "",
        sectionId: firstSubject?.sections[0]?.id || "",
        title: "",
        dueDate: defaultDate || "",
        startTime: defaultStartTime || "",
        durationHours: "1",
        note: "",
      });
    }
  }, [open, task, defaultDate, defaultStartTime, firstSubject?.id]);

  if (!open) return null;

  const subject = subjects.find((s) => s.id === form.subjectId) || firstSubject;
  const section = subject?.sections.find((s) => s.id === form.sectionId) || subject?.sections[0];

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    const payload = {
      subjectId: form.subjectId,
      sectionId: form.sectionId,
      title: form.title.trim(),
      dueDate: form.dueDate,
      duration: Number(form.durationHours) * 60 || 60,
      note: form.note,
    };

    let taskId = task?.id;
    if (task) onSave(task.id, payload);
    else taskId = onCreate(payload);

    const start = timeStringToNumber(form.startTime);
    if (form.startTime && onAddSchedule) {
      onAddSchedule({
        taskId,
        date: form.dueDate,
        title: form.title.trim(),
        subjectId: form.subjectId,
        subject: subject?.name || "",
        section: section?.name || "",
        start,
        end: start + (Number(form.durationHours) || 1),
      });
    }

    onClose();
  };

  return (
    <div className={styles.backdrop}>
      <section className={styles.modal}>
        <div className={styles.head}>
          <h2>{task ? "Task 수정" : "Task 추가"}</h2>
          <button type="button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <label>과목
            <select
              value={form.subjectId}
              onChange={(e) => {
                const nextSubject = subjects.find((s) => s.id === e.target.value);
                setForm((prev) => ({ ...prev, subjectId: e.target.value, sectionId: nextSubject?.sections[0]?.id || "" }));
              }}
            >
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>

          <label>분류
            <select value={form.sectionId} onChange={(e) => setForm((prev) => ({ ...prev, sectionId: e.target.value }))}>
              {subject?.sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>

          <label className={styles.full}>할 일 제목
            <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
          </label>

          <label>날짜
            <input type="date" value={form.dueDate} onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
          </label>

          <label>시간표 시작
            <select value={form.startTime} onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}>
              <option value="">시간표에 안 넣기</option>
              {timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
          </label>

          <label>길이
            <select value={form.durationHours} onChange={(e) => setForm((prev) => ({ ...prev, durationHours: e.target.value }))}>
              <option value="0.5">30분</option>
              <option value="1">1시간</option>
              <option value="1.5">1시간 30분</option>
              <option value="2">2시간</option>
              <option value="3">3시간</option>
            </select>
          </label>

          <label className={styles.full}>메모
            <textarea value={form.note} onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))} />
          </label>

          <div className={styles.actions}>
            {task && <button type="button" className={styles.deleteBtn} onClick={() => { onDelete(task.id); onClose(); }}>삭제</button>}
            <button type="button" onClick={onClose}>취소</button>
            <button type="submit">{task ? "저장" : "추가"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
