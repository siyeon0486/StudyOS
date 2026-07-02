import ExamCard from "../../components/ExamCard/ExamCard.jsx";
import Roadmap from "../../components/Roadmap/Roadmap.jsx";
import Schedule from "../../components/Schedule/Schedule.jsx";
import TodoCard from "../../components/TodoCard/TodoCard.jsx";
import { sampleData } from "../../data/sampleData";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const todayTasks = sampleData.tasks.filter((task) => task.today);

  return (
    <div className={styles.dashboard}>
      <div className={styles.topGrid}>
        <TodoCard tasks={todayTasks} />
        <Schedule schedule={sampleData.schedule} />
        <ExamCard exam={sampleData.exams[0]} />
      </div>

      <Roadmap subjects={sampleData.subjects} />
    </div>
  );
}

export default Dashboard;
