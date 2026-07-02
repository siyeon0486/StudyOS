import styles from "./StudyPlan.module.css";

function StudyPlan() {
  return (
    <div className="placeholderPage">
      <h1 className="pageTitle">Study Plan</h1>

      <section className={`${styles.panel} card`}>
        <h2>전체 학습 일정</h2>
        <p>다음 Sprint에서 목차 붙여넣기 → 자동 일정 생성 기능을 붙일 예정.</p>
      </section>
    </div>
  );
}

export default StudyPlan;
