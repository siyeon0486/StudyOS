import styles from "./TodoCard.module.css";

function TodoCard({ tasks }) {
  const done = tasks.filter((task) => task.done).length;

  return (
    <section className={`${styles.todoCard} card`}>
      <div className={styles.cardHeader}>
        <h2>오늘 할 일</h2>
        <span>{done} / {tasks.length} 완료</span>
      </div>

      <div className={styles.list}>
        {tasks.map((task) => (
          <label key={task.id} className={`${styles.todoItem} ${task.done ? styles.done : ""}`}>
            <input type="checkbox" defaultChecked={task.done} />
            <div className={styles.todoText}>
              <strong>{task.title}</strong>
              <span>
                {task.subject} · {task.section}
              </span>
            </div>
            <em>{task.duration}분</em>
          </label>
        ))}
      </div>
    </section>
  );
}

export default TodoCard;
