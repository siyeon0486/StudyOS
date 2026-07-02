import Card from "../Card/Card";
import styles from "./TodoCard.module.css";

export default function TodoCard({ tasks, onToggle }) {
  const sorted = [...tasks].sort((a, b) => Number(a.done) - Number(b.done));
  const done = tasks.filter((task) => task.done).length;

  return (
    <Card className={styles.todoCard}>
      <div className={styles.cardHeader}><h2>오늘 할 일</h2><span>{done} / {tasks.length} 완료</span></div>
      <div className={styles.list}>
        {sorted.map((task) => (
          <label key={task.id} className={`${styles.todoItem} ${task.done ? styles.done : ""}`}>
            <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
            <div className={styles.todoText}><strong>{task.title}</strong><span>{task.subject} · {task.section}</span></div>
            <em>{task.duration}분</em>
          </label>
        ))}
      </div>
    </Card>
  );
}
