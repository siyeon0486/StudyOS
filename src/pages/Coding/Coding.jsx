import { useMemo, useState } from "react";
import { useStudy } from "../../context/StudyContext.jsx";
import styles from "./Coding.module.css";

const categories = {
  탐색: ["BFS/DFS", "이분탐색", "브루트포스"],
  그래프: ["그래프", "최단경로", "위상정렬", "유니온파인드"],
  자료구조: ["스택/큐", "힙", "세그먼트트리", "해시"],
  최적화: ["DP", "그리디", "분할정복"],
  기법: ["구현", "백트래킹", "비트마스킹", "투포인터", "슬라이딩윈도우", "문자열", "정렬", "수학"],
};

const statusLabel = {
  todo: "미풀이",
  solving: "풀이중",
  solved: "완료",
  retry: "다시 풀기",
};

const statusBadge = {
  todo: "badgeTodo",
  solving: "badgeSolving",
  solved: "badgeSolved",
  retry: "badgeRetry",
};

const JS_KEYWORDS = new Set([
  "function", "return", "const", "let", "var", "for", "while", "if", "else",
  "new", "of", "in", "class", "extends", "import", "export", "from", "default",
  "break", "continue", "switch", "case", "true", "false", "null", "undefined",
  "Map", "Set", "Array", "Object", "Number", "String", "Math",
]);

function escapeHtml(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function highlightCode(code) {
  const escaped = escapeHtml(code);
  return escaped.replace(
    /(\/\/.*)|("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g,
    (match, comment, string, number, word) => {
      if (comment) return `<em>${comment}</em>`;
      if (string) return `<u>${string}</u>`;
      if (number) return `<i>${number}</i>`;
      if (word && JS_KEYWORDS.has(word)) return `<b>${word}</b>`;
      return match;
    }
  );
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emptyProblem(type = "탐색", subType = "BFS/DFS") {
  return {
    title: "새 문제",
    type,
    subType,
    level: "Lv.0",
    source: "Programmers",
    status: "todo",
    solvedDate: "",
    retryDate: "",
    url: "",
    comment: "",
    idea: "",
    mistake: "",
    memo: "",
    code: "",
  };
}

export default function Coding() {
  const { data, addCodingProblem, updateCodingProblem, deleteCodingProblem } = useStudy();

  const [mode, setMode] = useState("list"); // list | add | notebook
  const [selectedId, setSelectedId] = useState(data.codingProblems[0]?.id || "");
  const [typeFilter, setTypeFilter] = useState("all");
  const [subTypeFilter, setSubTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(emptyProblem());

  const problems = data.codingProblems || [];
  const selected = problems.find((p) => p.id === selectedId) || problems[0];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return problems.filter((p) => {
      const byType = typeFilter === "all" || p.type === typeFilter;
      const bySub = subTypeFilter === "all" || p.subType === subTypeFilter || p.type === subTypeFilter;
      const byStatus = statusFilter === "all" || p.status === statusFilter;
      const bySearch = `${p.title} ${p.type} ${p.subType} ${p.level} ${p.source} ${p.comment} ${p.idea} ${p.mistake} ${p.memo}`.toLowerCase().includes(q);
      return byType && bySub && byStatus && bySearch;
    });
  }, [problems, typeFilter, subTypeFilter, statusFilter, query]);

  const grouped = useMemo(() => {
    return Object.keys(categories).map((type) => ({
      type,
      problems: filtered.filter((p) => p.type === type),
      subTypes: categories[type].map((subType) => ({
        subType,
        problems: filtered.filter((p) => p.type === type && p.subType === subType),
      })),
    }));
  }, [filtered]);

  const openAdd = (type = "탐색", subType = "BFS/DFS") => {
    setDraft(emptyProblem(type, subType));
    setMode("add");
  };

  const submitNew = (event) => {
    event.preventDefault();
    addCodingProblem(draft);
    setMode("list");
  };

  const markSolvedToday = (problem) => {
    updateCodingProblem(problem.id, {
      status: "solved",
      solvedDate: todayISO(),
    });
  };

  return (
    <div className={styles.page}>
      <header className={`${styles.header} card`}>
        <div>
          <h1>Coding Record</h1>
          <p>{filtered.length}개 표시 / 전체 {problems.length}개</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setMode("list")}>문제 목록</button>
          <button onClick={() => setMode("notebook")}>단권화 보기</button>
          <button className={styles.primary} onClick={() => openAdd()}>새 문제 추가</button>
        </div>
      </header>

      <section className={`${styles.categoryBoard} card`}>
        <div className={styles.boardTop}>
          <h2>알고리즘별 분류</h2>
          <button onClick={() => { setTypeFilter("all"); setSubTypeFilter("all"); }}>전체 보기</button>
        </div>
        <div className={styles.categoryGrid}>
          {Object.entries(categories).map(([type, items]) => (
            <div className={styles.categoryCol} key={type}>
              <button className={typeFilter === type ? styles.categoryActive : ""} onClick={() => { setTypeFilter(type); setSubTypeFilter("all"); }}>
                {type}
              </button>
              {items.map((item) => (
                <button
                  key={item}
                  className={subTypeFilter === item ? styles.typeActive : ""}
                  onClick={() => {
                    setTypeFilter(type);
                    setSubTypeFilter(item);
                  }}
                >
                  {item}
                  <span>{problems.filter((p) => p.subType === item || p.type === item).length}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.controls} card`}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="문제명, 유형, comment 검색" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">전체 상태</option>
          <option value="todo">미풀이</option>
          <option value="solving">풀이중</option>
          <option value="solved">완료</option>
          <option value="retry">다시 풀기</option>
        </select>
      </section>

      {mode === "add" && (
        <section className={`${styles.addPage} card`}>
          <form onSubmit={submitNew} className={styles.addForm}>
            <div className={styles.formMain}>
              <h2>새 문제 추가</h2>
              <label>문제명<input value={draft.title} onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))} /></label>
              <div className={styles.formGrid}>
                <label>대분류
                  <select value={draft.type} onChange={(e) => {
                    const next = e.target.value;
                    setDraft((p) => ({ ...p, type: next, subType: categories[next]?.[0] || "" }));
                  }}>
                    {Object.keys(categories).map((type) => <option key={type}>{type}</option>)}
                  </select>
                </label>
                <label>세부 유형
                  <select value={draft.subType} onChange={(e) => setDraft((p) => ({ ...p, subType: e.target.value }))}>
                    {(categories[draft.type] || []).map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>난이도<input value={draft.level} onChange={(e) => setDraft((p) => ({ ...p, level: e.target.value }))} /></label>
                <label>출처<input value={draft.source} onChange={(e) => setDraft((p) => ({ ...p, source: e.target.value }))} /></label>
                <label>상태
                  <select value={draft.status} onChange={(e) => setDraft((p) => ({ ...p, status: e.target.value }))}>
                    <option value="todo">미풀이</option>
                    <option value="solving">풀이중</option>
                    <option value="solved">완료</option>
                    <option value="retry">다시 풀기</option>
                  </select>
                </label>
                <label>문제 링크<input value={draft.url} onChange={(e) => setDraft((p) => ({ ...p, url: e.target.value }))} /></label>
                <label>푼 날짜<input type="date" value={draft.solvedDate} onChange={(e) => setDraft((p) => ({ ...p, solvedDate: e.target.value }))} /></label>
                <label>다시 풀 날짜<input type="date" value={draft.retryDate} onChange={(e) => setDraft((p) => ({ ...p, retryDate: e.target.value }))} /></label>
              </div>
              <label>Comment<input value={draft.comment} onChange={(e) => setDraft((p) => ({ ...p, comment: e.target.value }))} /></label>
              <label>핵심 아이디어<textarea value={draft.idea} onChange={(e) => setDraft((p) => ({ ...p, idea: e.target.value }))} /></label>
              <label>실수 / 다시 볼 부분<textarea value={draft.mistake} onChange={(e) => setDraft((p) => ({ ...p, mistake: e.target.value }))} /></label>
              <label>코드<textarea className={styles.codeInput} value={draft.code} onChange={(e) => setDraft((p) => ({ ...p, code: e.target.value }))} /></label>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setMode("list")}>취소</button>
                <button className={styles.primary}>추가</button>
              </div>
            </div>

            <aside className={styles.previewCard}>
              <h3>미리보기</h3>
              <strong>{draft.title}</strong>
              <p>{draft.type} · {draft.subType} · {draft.level}</p>
              <span className={styles[statusBadge[draft.status] || "badgeTodo"]}>{statusLabel[draft.status]}</span>
              <blockquote>{draft.comment || "Comment가 여기에 표시됩니다."}</blockquote>
            </aside>
          </form>
        </section>
      )}

      {mode === "notebook" && (
        <section className={`${styles.notebook} card`}>
          <h2>코테 단권화</h2>
          {grouped.map((group) => (
            <article key={group.type} className={styles.notebookGroup}>
              <h3>{group.type}</h3>
              {group.problems.length === 0 && <p className={styles.empty}>저장된 문제가 없습니다.</p>}
              {group.subTypes.map((sub) => sub.problems.length > 0 && (
                <div key={sub.subType} className={styles.notebookSub}>
                  <h4>{sub.subType}</h4>
                  {sub.problems.map((p) => (
                    <div key={p.id} className={styles.notebookItem}>
                      <strong>{p.title}</strong>
                      <span>{p.level} · {statusLabel[p.status]}</span>
                      {p.idea && <p>핵심: {p.idea}</p>}
                      {p.mistake && <p>실수: {p.mistake}</p>}
                      {p.retryDate && <em>다시 풀기: {p.retryDate}</em>}
                    </div>
                  ))}
                </div>
              ))}
            </article>
          ))}
        </section>
      )}

      {mode === "list" && (
        <div className={styles.mainGrid}>
          <section className={`${styles.tableCard} card`}>
            <div className={styles.tableHead}>
              <h2>문제 풀이 목록</h2>
              <button onClick={() => openAdd(typeFilter === "all" ? "탐색" : typeFilter, subTypeFilter === "all" ? (categories[typeFilter]?.[0] || "BFS/DFS") : subTypeFilter)}>+ 문제</button>
            </div>

            <div className={styles.problemTable}>
              <div className={styles.tableHeader}>
                <span>유형</span><span>난이도</span><span>문제</span><span>출처</span><span>상태</span><span>푼 날짜</span><span>RE?</span>
              </div>
              {filtered.map((problem) => (
                <button key={problem.id} className={`${styles.tableRow} ${selected?.id === problem.id ? styles.selectedRow : ""}`} onClick={() => setSelectedId(problem.id)}>
                  <span>{problem.subType || problem.type}</span>
                  <span>{problem.level}</span>
                  <strong>{problem.title}</strong>
                  <span>{problem.source || "-"}</span>
                  <em className={styles[statusBadge[problem.status] || "badgeTodo"]}>{statusLabel[problem.status]}</em>
                  <span>{problem.solvedDate || "-"}</span>
                  <span>{problem.retryDate ? "✅" : ""}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={`${styles.detail} card`}>
            {selected ? (
              <>
                <div className={styles.detailTop}>
                  <input value={selected.title} onChange={(e) => updateCodingProblem(selected.id, { title: e.target.value })} />
                  <button onClick={() => deleteCodingProblem(selected.id)}>삭제</button>
                </div>

                <div className={styles.detailMeta}>
                  <label>대분류
                    <select value={selected.type || "기법"} onChange={(e) => updateCodingProblem(selected.id, { type: e.target.value, subType: categories[e.target.value]?.[0] || "" })}>
                      {Object.keys(categories).map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </label>
                  <label>세부 유형
                    <select value={selected.subType || ""} onChange={(e) => updateCodingProblem(selected.id, { subType: e.target.value })}>
                      {(categories[selected.type] || []).map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>난이도<input value={selected.level || ""} onChange={(e) => updateCodingProblem(selected.id, { level: e.target.value })} /></label>
                  <label>출처<input value={selected.source || ""} onChange={(e) => updateCodingProblem(selected.id, { source: e.target.value })} /></label>
                  <label>상태
                    <select value={selected.status || "todo"} onChange={(e) => updateCodingProblem(selected.id, { status: e.target.value })}>
                      <option value="todo">미풀이</option>
                      <option value="solving">풀이중</option>
                      <option value="solved">완료</option>
                      <option value="retry">다시 풀기</option>
                    </select>
                  </label>
                  <label>푼 날짜<input type="date" value={selected.solvedDate || ""} onChange={(e) => updateCodingProblem(selected.id, { solvedDate: e.target.value })} /></label>
                  <label>다시 풀 날짜<input type="date" value={selected.retryDate || ""} onChange={(e) => updateCodingProblem(selected.id, { retryDate: e.target.value })} /></label>
                  <label>링크<input value={selected.url || ""} onChange={(e) => updateCodingProblem(selected.id, { url: e.target.value })} /></label>
                </div>

                <div className={styles.quickActions}>
                  <button onClick={() => markSolvedToday(selected)}>오늘 완료</button>
                  <button onClick={() => updateCodingProblem(selected.id, { status: "retry" })}>다시 풀기 표시</button>
                  {selected.url && <a href={selected.url} target="_blank" rel="noreferrer">문제 열기</a>}
                </div>

                <label className={styles.full}>Comment<input value={selected.comment || ""} onChange={(e) => updateCodingProblem(selected.id, { comment: e.target.value })} /></label>

                <div className={styles.memoGrid}>
                  <label>핵심 아이디어<textarea value={selected.idea || ""} onChange={(e) => updateCodingProblem(selected.id, { idea: e.target.value })} /></label>
                  <label>실수 / 다시 볼 부분<textarea value={selected.mistake || ""} onChange={(e) => updateCodingProblem(selected.id, { mistake: e.target.value })} /></label>
                </div>

                <label className={styles.full}>풀이 코드<textarea className={styles.codeInput} value={selected.code || ""} onChange={(e) => updateCodingProblem(selected.id, { code: e.target.value })} /></label>
                <div className={styles.codePreview}>
                  <strong>Preview</strong>
                  <pre dangerouslySetInnerHTML={{ __html: highlightCode(selected.code || "") }} />
                </div>
              </>
            ) : (
              <p>문제를 추가하세요.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
