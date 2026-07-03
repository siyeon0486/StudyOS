import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useStudy } from "../../context/StudyContext.jsx";
import { yearDays } from "../../utils/dates.js";
import styles from "./Settings.module.css";

function intensityClass(count) {
  if (!count) return "level0";
  if (count === 1) return "level1";
  if (count === 2) return "level2";
  if (count === 3) return "level3";
  return "level4";
}

export default function Settings() {
  const { data, allTasks, updateSettings } = useStudy();
  const s = data.settings;
  const [year, setYear] = useState(dayjs().year());

  const doneByDate = useMemo(() => {
    const map = new Map();
    allTasks.forEach((task) => {
      if (task.done && task.dueDate) map.set(task.dueDate, (map.get(task.dueDate) || 0) + 1);
    });
    return map;
  }, [allTasks]);

  const days = yearDays(year);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Settings</h1>

      <div className={styles.grid}>
        <section className={`${styles.panel} card`}>
          <h2>기본 설정</h2>
          <div className={styles.formGrid}>
            <label>공부 시작 시간<input value={s.studyStart} onChange={(e) => updateSettings({ studyStart: e.target.value })} /></label>
            <label>공부 종료 시간<input value={s.studyEnd} onChange={(e) => updateSettings({ studyEnd: e.target.value })} /></label>
            <label>하루 목표 시간<input type="number" value={s.dailyGoal} onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })} /></label>
          </div>
        </section>

        <section className={`${styles.panel} card`}>
          <h2>데이터</h2>
          <button onClick={() => alert(JSON.stringify(data, null, 2))}>데이터 미리보기</button>
          <button onClick={() => localStorage.removeItem("studyos-data")}>StudyOS 데이터 초기화</button>
        </section>

        <section className={`${styles.statsPanel} card`}>
          <div className={styles.statsHead}>
            <h2>진행 현황</h2>
            <div className={styles.yearNav}>
              <button onClick={() => setYear((y) => y - 1)}>‹</button>
              <strong>{year}</strong>
              <button onClick={() => setYear((y) => y + 1)}>›</button>
            </div>
          </div>

          <div className={styles.heatmapWrap}>
            <div className={styles.weekLabels}>
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className={styles.heatmap}>
              {weeks.map((week, wi) => (
                <div className={styles.week} key={wi}>
                  {week.map((date) => {
                    const count = doneByDate.get(date) || 0;
                    return <i key={date} className={styles[intensityClass(count)]} title={`${date}: ${count}개 완료`} />;
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
