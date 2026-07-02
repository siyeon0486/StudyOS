import { BookOpen, CalendarDays, Code2, Home, RotateCcw, Settings, ClipboardList } from "lucide-react";
import { NavLink } from "react-router-dom";
import ExamMini from "../ExamMini/ExamMini.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import { getSidebarDate } from "../../utils/dates";
import styles from "./Sidebar.module.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/study-plan", label: "Study Plan", icon: ClipboardList },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/review", label: "Review", icon: RotateCcw },
  { to: "/coding", label: "Coding", icon: Code2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const date = getSidebarDate();
  const { data } = useStudy();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.dateBlock}>
        <div className={styles.weekday}>{date.weekday}</div>
        <div className={styles.day}>{date.day}</div>
        <div className={styles.month}>{date.month}</div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <section className={styles.sideCard}>
        <div className={styles.sideCardHeader}><strong>이번 주 목표</strong><span>7.2 - 7.8</span></div>
        <label><input type="checkbox" defaultChecked /> 연구 Related Work</label>
        <label><input type="checkbox" /> TOEFL Reading</label>
        <label><input type="checkbox" /> 전공 Simplex 복습</label>
      </section>

      <ExamMini exam={data.exams[0]} />
    </aside>
  );
}
