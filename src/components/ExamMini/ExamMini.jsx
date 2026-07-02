import ProgressBar from "../ProgressBar/ProgressBar";
import { getDday } from "../../utils/dates";
import styles from "./ExamMini.module.css";

export default function ExamMini({ exam }) {
  const percent = Math.round((exam.completed / exam.total) * 100);
  return (
    <section className={styles.examBox}>
      <div className={styles.head}><strong>시험 현황</strong><span>D-{getDday(exam.date)}</span></div>
      <p>{exam.title}</p>
      <ProgressBar value={percent} />
      <small>{exam.completed} / {exam.total} 완료 · {percent}%</small>
      <div className={styles.due}><b>D-3</b><span>전공 과제 제출</span></div>
      <div className={styles.due}><b>D-7</b><span>TOEFL 모의고사</span></div>
    </section>
  );
}
