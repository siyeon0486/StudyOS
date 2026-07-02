import { NavLink } from "react-router-dom";
import { BookOpen, CalendarDays, ChartColumn, ClipboardList, Home, RotateCcw, Settings } from "lucide-react";
import { getSidebarDate } from "../../utils/dates";
import styles from "./Sidebar.module.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/study-plan", label: "Study Plan", icon: CalendarDays },
  { to: "/review", label: "Review", icon: RotateCcw },
  { to: "/statistics", label: "Statistics", icon: ChartColumn },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const date = getSidebarDate();

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
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <section className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <strong>이번 주 목표</strong>
          <span>7.2 - 7.8</span>
        </div>

        <label>
          <input type="checkbox" defaultChecked />
          IELTS Reading Test 4까지
        </label>
        <label>
          <input type="checkbox" defaultChecked />
          OR Chapter 5
        </label>
        <label>
          <input type="checkbox" />
          연극 무대 디자인 초안
        </label>
      </section>

      <section className={styles.timerCard}>
        <strong>집중 타이머</strong>
        <div className={styles.timer}>25:00</div>
        <button>시작하기</button>
      </section>
    </aside>
  );
}

export default Sidebar;
