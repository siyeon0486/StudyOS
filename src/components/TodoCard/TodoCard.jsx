import Card from "../Card/Card";
import styles from "./TodoCard.module.css";

export default function TodoCard({ tasks, onToggle, onOpenTask }) {
  const sorted = [...tasks].sort((a, b) => Number(a.done) - Number(b.done));
  const done = tasks.filter((task) => task.done).length;

  return (
    <Card className={styles.todoCard}>
      <div className={styles.cardHeader}><h2>오늘 할 일</h2><span>{done} / {tasks.length} 완료</span></div>
      <div className={styles.list}>
        {sorted.length === 0 && <p className={styles.empty}>오늘 할 일이 없습니다. Study Plan이나 Calendar에서 추가하세요.</p>}
        {sorted.map((task) => (
          <div key={task.id} className={`${styles.todoItem} ${task.done ? styles.done : ""}`}>
            <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
            <button type="button" onClick={() => onOpenTask(task)} className={styles.todoText}>
              <strong>{task.title}</strong>
              <span>{task.subject} · {task.section}</span>
            </button>
            <em>{task.duration}분</em>
          </div>
        ))}
      </div>
    </Card>
  );
}
