import { getDday } from "../../utils/dates";
import styles from "./ExamCard.module.css";

function ExamCard({ exam }) {
  const percent = Math.round((exam.completed / exam.total) * 100);
  const dday = getDday(exam.date);

  return (
    <section className={`${styles.examCard} card`}>
      <div className={styles.cardHeader}>
        <h2>시험 현황</h2>
        <button>전체 보기</button>
      </div>

      <div className={styles.examTop}>
        <strong>{exam.title}</strong>
        <span>D-{dday}</span>
      </div>

      <div className={styles.progressBar}>
        <div style={{ width: `${percent}%` }} />
      </div>

      <p className={styles.progressText}>
        {exam.completed} / {exam.total} 완료 · {percent}%
      </p>

      <div className={styles.divider} />

      <h3>다가오는 일정</h3>

      <div className={styles.dueItem}>
        <span>D-3</span>
        <p>OR 과제 제출</p>
      </div>
      <div className={styles.dueItem}>
        <span>D-7</span>
        <p>IELTS 모의고사</p>
      </div>
      <div className={styles.dueItem}>
        <span>D-15</span>
        <p>연극 공연 리허설</p>
      </div>
      <div className={styles.dueItem}>
        <span>D-18</span>
        <p>연극 공연</p>
      </div>
    </section>
  );
}

export default ExamCard;
