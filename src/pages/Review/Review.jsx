import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Review.module.css";

export default function Review() {
  const { data, toggleReview } = useStudy();
  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Review</h1>
      <section className={`${styles.panel} card`}>
        <h2>복습 큐</h2>
        {data.reviews.map((item) => (
          <label key={item.id} className={`${styles.reviewItem} ${item.done ? styles.done : ""}`}>
            <input type="checkbox" checked={item.done} onChange={() => toggleReview(item.id)} />
            <span><strong>{item.title}</strong><em>{item.subject} · {item.level} · {item.memo}</em></span>
          </label>
        ))}
      </section>
    </div>
  );
}
