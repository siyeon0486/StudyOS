import styles from "./Schedule.module.css";

function Schedule({ schedule }) {
  return (
    <section className={`${styles.scheduleCard} card`}>
      <div className={styles.cardHeader}>
        <h2>오늘 시간표</h2>
        <button>+ 일정 추가</button>
      </div>

      <div className={styles.table}>
        {schedule.map((item) => (
          <div className={styles.row} key={item.id}>
            <div className={styles.time}>{item.time}</div>
            <div className={styles.slot}>
              {item.title && (
                <button className={styles.event}>
                  <strong>{item.title}</strong>
                  {item.subject && <span>{item.subject} · {item.section}</span>}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Schedule;
