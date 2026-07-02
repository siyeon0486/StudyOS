import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Settings.module.css";

export default function Settings() {
  const { data, updateSettings } = useStudy();
  const s = data.settings;

  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Settings</h1>
      <section className={`${styles.panel} card`}>
        <h2>기본 설정</h2>
        <label>공부 시작 시간<input value={s.studyStart} onChange={(e) => updateSettings({ studyStart: e.target.value })} /></label>
        <label>공부 종료 시간<input value={s.studyEnd} onChange={(e) => updateSettings({ studyEnd: e.target.value })} /></label>
        <label>하루 목표 시간<input type="number" value={s.dailyGoal} onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })} /></label>
        <label>포모도로<input type="number" value={s.pomodoro} onChange={(e) => updateSettings({ pomodoro: Number(e.target.value) })} /></label>
        <label>휴식시간<input type="number" value={s.breakTime} onChange={(e) => updateSettings({ breakTime: Number(e.target.value) })} /></label>
      </section>
      <section className={`${styles.panel} card`}>
        <h2>데이터</h2>
        <button onClick={() => alert(JSON.stringify(data, null, 2))}>데이터 미리보기</button>
        <button onClick={() => localStorage.clear()}>localStorage 초기화</button>
      </section>
    </div>
  );
}
