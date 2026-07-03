import { useMemo, useState } from "react";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./English.module.css";

export default function English() {
  const { data, addEnglishNote, updateEnglishNote, deleteEnglishNote, toggleEnglishNote } = useStudy();
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [form, setForm] = useState({
    front: "",
    back: "",
    phrase: "",
    mySentence: "",
    tags: "",
    source: "TOEFL",
    reviewDate: "",
    difficulty: "Again",
    memo: "",
  });

  const sources = ["all", ...new Set(data.englishNotes.map((note) => note.source || "기타"))];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.englishNotes.filter((note) => {
      const bySource = sourceFilter === "all" || note.source === sourceFilter;
      const byDifficulty = difficultyFilter === "all" || note.difficulty === difficultyFilter;
      const bySearch = `${note.front} ${note.back} ${note.phrase} ${note.mySentence} ${note.tags} ${note.memo}`.toLowerCase().includes(q);
      return bySource && byDifficulty && bySearch;
    });
  }, [data.englishNotes, query, sourceFilter, difficultyFilter]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.front.trim() && !form.phrase.trim()) return;
    addEnglishNote(form);
    setForm((prev) => ({ ...prev, front: "", back: "", phrase: "", mySentence: "", memo: "" }));
  };

  return (
    <div className={styles.page}>
      <section className={`${styles.addCard} card`}>
        <div className={styles.leftHead}>
          <h1>English</h1>
          <button onClick={() => setNotebookOpen(!notebookOpen)}>
            {notebookOpen ? "카드 편집" : "단권화 보기"}
          </button>
        </div>

        <div className={styles.filters}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="문장, 표현, 태그 검색" />
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            {sources.map((source) => <option key={source} value={source}>{source === "all" ? "전체 출처" : source}</option>)}
          </select>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="all">전체 난이도</option>
            <option>Again</option>
            <option>Hard</option>
            <option>Good</option>
            <option>Easy</option>
          </select>
        </div>

        <form onSubmit={submit}>
          <textarea value={form.front} onChange={(e) => setForm((p) => ({ ...p, front: e.target.value }))} placeholder="영어 문장 / 표현" />
          <textarea value={form.back} onChange={(e) => setForm((p) => ({ ...p, back: e.target.value }))} placeholder="뜻 / 해석" />
          <input value={form.phrase} onChange={(e) => setForm((p) => ({ ...p, phrase: e.target.value }))} placeholder="핵심 표현" />
          <textarea value={form.mySentence} onChange={(e) => setForm((p) => ({ ...p, mySentence: e.target.value }))} placeholder="내 예문" />
          <input value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="태그" />
          <input value={form.source} onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))} placeholder="출처" />
          <select value={form.difficulty} onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))}>
            <option>Again</option>
            <option>Hard</option>
            <option>Good</option>
            <option>Easy</option>
          </select>
          <input type="date" value={form.reviewDate} onChange={(e) => setForm((p) => ({ ...p, reviewDate: e.target.value }))} />
          <textarea value={form.memo} onChange={(e) => setForm((p) => ({ ...p, memo: e.target.value }))} placeholder="메모" />
          <button>추가</button>
        </form>
      </section>

      <section className={`${styles.main} card`}>
        {notebookOpen ? (
          <div className={styles.notebook}>
            <h2>영어 단권화</h2>
            {filtered.map((note) => (
              <article key={note.id}>
                <h3>{note.phrase || note.front}</h3>
                <p>{note.source} · {note.difficulty} · {note.tags}</p>
                <blockquote>{note.front}</blockquote>
                <strong>{note.back}</strong>
                {note.mySentence && <span>내 예문: {note.mySentence}</span>}
                {note.memo && <em>{note.memo}</em>}
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.toolbar}>
              <h2>Review Deck</h2>
              <span>{filtered.length}개 표시 / 전체 {data.englishNotes.length}개</span>
            </div>

            <div className={styles.deck}>
              {filtered.map((note) => (
                <article className={`${styles.cardItem} ${note.done ? styles.done : ""}`} key={note.id}>
                  <div className={styles.cardTop}>
                    <label><input type="checkbox" checked={note.done} onChange={() => toggleEnglishNote(note.id)} />완료</label>
                    <button onClick={() => deleteEnglishNote(note.id)}>삭제</button>
                  </div>
                  <textarea className={styles.front} value={note.front} onChange={(e) => updateEnglishNote(note.id, { front: e.target.value })} />
                  <textarea value={note.back} onChange={(e) => updateEnglishNote(note.id, { back: e.target.value })} />
                  <div className={styles.meta}>
                    <input value={note.phrase} onChange={(e) => updateEnglishNote(note.id, { phrase: e.target.value })} placeholder="핵심 표현" />
                    <input value={note.tags} onChange={(e) => updateEnglishNote(note.id, { tags: e.target.value })} placeholder="태그" />
                    <select value={note.difficulty} onChange={(e) => updateEnglishNote(note.id, { difficulty: e.target.value })}>
                      <option>Again</option>
                      <option>Hard</option>
                      <option>Good</option>
                      <option>Easy</option>
                    </select>
                    <input type="date" value={note.reviewDate || ""} onChange={(e) => updateEnglishNote(note.id, { reviewDate: e.target.value })} />
                  </div>
                  <textarea value={note.mySentence || ""} onChange={(e) => updateEnglishNote(note.id, { mySentence: e.target.value })} placeholder="내 예문" />
                  <textarea value={note.memo || ""} onChange={(e) => updateEnglishNote(note.id, { memo: e.target.value })} placeholder="메모" />
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
