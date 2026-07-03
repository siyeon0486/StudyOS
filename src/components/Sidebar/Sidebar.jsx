import { useState } from "react";
import { BookOpen, CalendarDays, Code2, Home, Languages, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import { getDday, getSidebarDate } from "../../utils/dates";
import styles from "./Sidebar.module.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/study-plan", label: "Study Plan", icon: BookOpen },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/coding", label: "Coding", icon: Code2 },
  { to: "/english", label: "English", icon: Languages },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const date = getSidebarDate();
  const { data, addWeeklyGoal, toggleWeeklyGoal, deleteWeeklyGoal, updateExam, addExam, deleteExam } = useStudy();
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [examOpen, setExamOpen] = useState(false);
  const [examForm, setExamForm] = useState({ id: "", title: "", date: "", completed: 0, total: 100 });

  const submitGoal = (event) => { event.preventDefault(); addWeeklyGoal(goalTitle); setGoalTitle(""); setGoalOpen(false); };
  const openExam = (exam = null) => { setExamForm(exam || { id: "", title: "새 시험", date: "", completed: 0, total: 100 }); setExamOpen(true); };
  const submitExam = (event) => {
    event.preventDefault();
    const payload = { title: examForm.title, date: examForm.date, completed: Number(examForm.completed) || 0, total: Number(examForm.total) || 1 };
    if (examForm.id) updateExam(examForm.id, payload); else addExam(payload);
    setExamOpen(false);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.dateBlock}><div className={styles.weekday}>{date.weekday}</div><div className={styles.day}>{date.day}</div><div className={styles.month}>{date.month}</div></div>
      <nav className={styles.nav}>{navItems.map((item) => { const Icon = item.icon; return <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}><Icon size={18} /><span>{item.label}</span></NavLink>; })}</nav>
      <section className={styles.sideCard}><div className={styles.sideCardHeader}><strong>이번 주 목표</strong><button onClick={() => setGoalOpen(true)}>+</button></div>{data.weeklyGoals.map((goal) => <label key={goal.id}><input type="checkbox" checked={goal.done} onChange={() => toggleWeeklyGoal(goal.id)} /><span>{goal.title}</span><button onClick={() => deleteWeeklyGoal(goal.id)}>×</button></label>)}</section>
      <section className={styles.examList}><div className={styles.examListHead}><strong>시험 현황</strong><button onClick={() => openExam()}>+</button></div>{data.exams.map((exam) => <button key={exam.id} className={styles.examBox} onClick={() => openExam(exam)}><div className={styles.examHead}><strong>{exam.title}</strong><span>D-{getDday(exam.date)}</span></div><small>{exam.date}</small></button>)}</section>
      <SimpleModal open={goalOpen} title="이번 주 목표 추가" onClose={() => setGoalOpen(false)}><form className={styles.modalForm} onSubmit={submitGoal}><input value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} placeholder="목표 입력" /><button>추가</button></form></SimpleModal>
      <SimpleModal open={examOpen} title="시험 현황 수정" onClose={() => setExamOpen(false)}><form className={styles.modalForm} onSubmit={submitExam}><label>시험명<input value={examForm.title} onChange={(e) => setExamForm((p) => ({ ...p, title: e.target.value }))} /></label><label>시험 날짜<input type="date" value={examForm.date} onChange={(e) => setExamForm((p) => ({ ...p, date: e.target.value }))} /></label><label>완료량<input type="number" value={examForm.completed} onChange={(e) => setExamForm((p) => ({ ...p, completed: e.target.value }))} /></label><label>전체량<input type="number" value={examForm.total} onChange={(e) => setExamForm((p) => ({ ...p, total: e.target.value }))} /></label><div className={styles.modalActions}>{examForm.id && <button type="button" onClick={() => { deleteExam(examForm.id); setExamOpen(false); }}>삭제</button>}<button>저장</button></div></form></SimpleModal>
    </aside>
  );
}
