import Roadmap from "../../components/Roadmap/Roadmap.jsx";
import Schedule from "../../components/Schedule/Schedule.jsx";
import TodoCard from "../../components/TodoCard/TodoCard.jsx";
import { useStudy } from "../../context/StudyContext.jsx";
import { todayISO } from "../../utils/dates";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const {
    data,
    allTasks,
    toggleTask,
    scheduleTaskToday,
    scheduleTaskDate,
    addScheduleEvent,
    updateScheduleEvent,
    deleteScheduleEvent,
  } = useStudy();

  const todayTasks = allTasks.filter((task) => task.dueDate === todayISO());

  return (
    <div className={styles.dashboard}>
      <div className={styles.topGrid}>
        <TodoCard tasks={todayTasks} onToggle={toggleTask} />
        <Schedule events={data.schedule} onAdd={addScheduleEvent} onUpdate={updateScheduleEvent} onDelete={deleteScheduleEvent} />
      </div>
      <Roadmap
        subjects={data.subjects}
        onToggle={toggleTask}
        onScheduleToday={scheduleTaskToday}
        onScheduleDate={scheduleTaskDate}
      />
    </div>
  );
}
