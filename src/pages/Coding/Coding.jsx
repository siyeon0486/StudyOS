import { useMemo, useState } from "react";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Coding.module.css";

const statusMap = {
  todo: "미풀이",
  solving: "풀이중",
  solved: "완료",
  retry: "다시 풀기",
};

export default function Coding() {
  const { data, addCodingProblemFromUrl, updateCodingProblem, deleteCodingProblem } = useStudy();
  const [url, setUrl] = useState("");
  const [selectedId, setSelectedId] = useState(data.codingProblems[0]?.id || "");
  const [query, setQuery] = useState("");

  const problems = data.codingProblems;
  const selected = problems.find((problem) => problem.id === selectedId) || problems[0];

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const text = `${p.title} ${p.site} ${p.level} ${p.tags.join(" ")} ${p.idea} ${p.mistake}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [problems, query]);

  const handleAdd = () => {
    if (!url.trim()) return;
    addCodingProblemFromUrl(url.trim());
    setUrl("");
  };

  return (
    <div className={styles.page}>
      <section className={`${styles.left} card`}>
        <div className={styles.header}>
          <h1>Coding</h1>
          <p>문제 링크를 넣고, 풀이 코드와 실수를 누적합니다.</p>
        </div>

        <div className={styles.addBox}>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="프로그래머스 문제 링크 붙여넣기" />
          <button onClick={handleAdd}>추가</button>
        </div>

        <input className={styles.search} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="문제명, 태그, 메모 검색" />

        <div className={styles.problemList}>
          {filtered.map((problem) => (
            <button key={problem.id} className={`${styles.problemItem} ${selected?.id === problem.id ? styles.active : ""}`} onClick={() => setSelectedId(problem.id)}>
              <strong>{problem.title}</strong>
              <span>{problem.site} · {problem.level} · {problem.tags.join(", ") || "No tag"}</span>
              <em>{statusMap[problem.status] || problem.status}</em>
            </button>
          ))}
        </div>
      </section>

      <section className={`${styles.detail} card`}>
        {selected ? (
          <>
            <div className={styles.detailTop}>
              <div>
                <input className={styles.titleInput} value={selected.title} onChange={(e) => updateCodingProblem(selected.id, { title: e.target.value })} />
                <p>{selected.site} · {selected.level}</p>
              </div>
              <div className={styles.actions}>
                <a href={selected.url} target="_blank" rel="noreferrer">문제 열기</a>
                <button onClick={() => deleteCodingProblem(selected.id)}>삭제</button>
              </div>
            </div>

            <div className={styles.metaGrid}>
              <label>레벨<input value={selected.level} onChange={(e) => updateCodingProblem(selected.id, { level: e.target.value })} /></label>
              <label>태그<input value={selected.tags.join(", ")} onChange={(e) => updateCodingProblem(selected.id, { tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} /></label>
              <label>상태<select value={selected.status} onChange={(e) => updateCodingProblem(selected.id, { status: e.target.value })}><option value="todo">미풀이</option><option value="solving">풀이중</option><option value="solved">완료</option><option value="retry">다시 풀기</option></select></label>
              <label>다시 풀 날짜<input type="date" value={selected.retryDate || ""} onChange={(e) => updateCodingProblem(selected.id, { retryDate: e.target.value })} /></label>
            </div>

            <div className={styles.memoGrid}>
              <label>핵심 아이디어<textarea value={selected.idea} onChange={(e) => updateCodingProblem(selected.id, { idea: e.target.value })} /></label>
              <label>실수 / 다시 볼 부분<textarea value={selected.mistake} onChange={(e) => updateCodingProblem(selected.id, { mistake: e.target.value })} /></label>
            </div>

            <label className={styles.codeBox}>풀이 코드<textarea value={selected.code} onChange={(e) => updateCodingProblem(selected.id, { code: e.target.value })} spellCheck="false" /></label>
          </>
        ) : (
          <p>문제를 추가해줘.</p>
        )}
      </section>
    </div>
  );
}
