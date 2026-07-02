import styles from "./Review.module.css";

function Review() {
  return (
    <div className="placeholderPage">
      <h1 className="pageTitle">Review</h1>

      <section className={`${styles.panel} card`}>
        <h2>복습 큐</h2>
        <p>다음 Sprint에서 복습 추가, 중요도, 메모 기능을 연결할 예정.</p>
      </section>
    </div>
  );
}

export default Review;
