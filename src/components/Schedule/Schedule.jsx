import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { DAY_END, DAY_START, HOUR_HEIGHT, MIN_DURATION, formatHour, yToTime } from "../../utils/time";
import styles from "./Schedule.module.css";

const hours = Array.from({ length: DAY_END - DAY_START + 1 }, (_, i) => DAY_START + i);

export default function Schedule({ events, onAdd, onUpdate, onDelete }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [drag, setDrag] = useState(null);

  const getY = (clientY) => {
    const rect = gridRef.current.getBoundingClientRect();
    return clientY - rect.top + gridRef.current.scrollTop;
  };

  const startDrag = (event, e) => {
    e.stopPropagation();
    setDrag({ type: "move", id: event.id, offset: getY(e.clientY) - (event.start - DAY_START) * HOUR_HEIGHT, duration: event.end - event.start });
  };

  const startResize = (event, e) => {
    e.stopPropagation();
    setDrag({ type: "resize", id: event.id, start: event.start });
  };

  const handleMouseMove = (e) => {
    if (!drag) return;
    const y = getY(e.clientY);

    if (drag.type === "move") {
      const start = yToTime(y - drag.offset);
      const end = Math.min(DAY_END, start + drag.duration);
      onUpdate(drag.id, { start, end });
    }

    if (drag.type === "resize") {
      const end = Math.max(drag.start + MIN_DURATION, Math.min(DAY_END, yToTime(y)));
      onUpdate(drag.id, { end });
    }
  };

  const handleEmptyClick = (e) => {
    if (e.target !== gridRef.current) return;
    const start = yToTime(getY(e.clientY));
    const title = window.prompt(`${formatHour(start)}에 추가할 일정`);
    if (title) onAdd({ title, start, end: Math.min(start + 1, DAY_END) });
  };

  const handleEventClick = (event) => {
    const action = window.prompt("1: 과목으로 이동 / 2: 삭제 / 취소: 닫기");
    if (action === "1" && event.subjectId) navigate(`/subjects/${event.subjectId}`);
    if (action === "2") onDelete(event.id);
  };

  return (
    <Card className={styles.scheduleCard}>
      <div className={styles.cardHeader}><h2>오늘 시간표</h2><span>드래그 · 리사이즈</span></div>
      <div className={styles.calendar} onMouseMove={handleMouseMove} onMouseUp={() => setDrag(null)} onMouseLeave={() => setDrag(null)}>
        <div className={styles.timeCol}>
          {hours.map((hour) => <div key={hour} className={styles.time}>{formatHour(hour)}</div>)}
        </div>
        <div className={styles.grid} ref={gridRef} onClick={handleEmptyClick}>
          {hours.map((hour) => <div key={hour} className={styles.hourLine} />)}
          {events.map((event) => (
            <div
              key={event.id}
              className={styles.event}
              style={{ top: `${(event.start - DAY_START) * HOUR_HEIGHT}px`, height: `${(event.end - event.start) * HOUR_HEIGHT - 4}px` }}
              onDoubleClick={() => handleEventClick(event)}
              onMouseDown={(e) => startDrag(event, e)}
            >
              <strong>{event.title}</strong>
              {event.subject && <em>{event.subject} · {event.section}</em>}
              <button className={styles.resizeHandle} onMouseDown={(e) => startResize(event, e)} aria-label="resize" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
