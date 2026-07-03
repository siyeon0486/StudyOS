import { addDaysISO, todayISO } from "../utils/dates";

const today = todayISO();

export const defaultData = {
  exams: [
    { id: "exam-toefl", title: "TOEFL", date: "2026-08-20", completed: 18, total: 120 },
    { id: "exam-opic", title: "OPIc", date: "2026-09-05", completed: 6, total: 40 },
  ],

  weeklyGoals: [
    { id: "goal-1", title: "TOEFL Reading 2세트", done: false },
    { id: "goal-2", title: "연구 Related Work 3편 정리", done: true },
    { id: "goal-3", title: "전공 Simplex 예제 복습", done: false },
  ],

  subjects: [
    {
      id: "sub-research",
      name: "연구",
      color: "#2f7d5b",
      sections: [
        {
          id: "sec-paper",
          name: "논문",
          tasks: [
            { id: "task-r-1", title: "Related Work 2편 읽기", dueDate: today, duration: 60, note: "핵심 방법론 중심으로 정리", done: false },
            { id: "task-r-2", title: "실험표 수정", dueDate: addDaysISO(2), duration: 40, note: "", done: false },
          ],
        },
        { id: "sec-exp", name: "실험", tasks: [{ id: "task-r-3", title: "baseline 재실행", dueDate: addDaysISO(4), duration: 60, note: "", done: true }] },
        { id: "sec-meeting", name: "미팅", tasks: [] },
      ],
    },
    {
      id: "sub-toefl",
      name: "TOEFL",
      color: "#4f8f6f",
      examId: "exam-toefl",
      sections: [
        { id: "sec-toefl-reading", name: "Reading", tasks: [{ id: "task-t-1", title: "Reading Passage 1", dueDate: today, duration: 45, note: "", done: false }] },
        { id: "sec-toefl-listening", name: "Listening", tasks: [{ id: "task-t-2", title: "Lecture note-taking", dueDate: addDaysISO(1), duration: 30, note: "", done: false }] },
        { id: "sec-toefl-speaking", name: "Speaking", tasks: [] },
        { id: "sec-toefl-writing", name: "Writing", tasks: [] },
      ],
    },
    {
      id: "sub-opic",
      name: "OPIc",
      color: "#7aa06a",
      examId: "exam-opic",
      sections: [
        { id: "sec-opic-script", name: "스크립트", tasks: [{ id: "task-o-1", title: "자기소개 스크립트 녹음", dueDate: addDaysISO(3), duration: 30, note: "", done: false }] },
        { id: "sec-opic-recording", name: "녹음", tasks: [] },
        { id: "sec-opic-review", name: "피드백", tasks: [] },
      ],
    },
    {
      id: "sub-major",
      name: "전공 공부",
      color: "#8aa46b",
      sections: [
        { id: "sec-or", name: "OR", tasks: [{ id: "task-m-1", title: "Simplex tableau 복습", dueDate: today, duration: 50, note: "", done: false }] },
        { id: "sec-db", name: "DB", tasks: [] },
        { id: "sec-dm", name: "Data Mining", tasks: [] },
      ],
    },
  ],

  schedule: [
    { id: "evt-1", date: today, taskId: "task-r-1", title: "Related Work", subjectId: "sub-research", subject: "연구", section: "논문", start: 10, end: 11 },
    { id: "evt-2", date: today, taskId: "task-t-1", title: "TOEFL Reading", subjectId: "sub-toefl", subject: "TOEFL", section: "Reading", start: 14, end: 15 },
  ],

  codingProblems: [
    { id: "cp-1", title: "두 수의 합", type: "구현", level: "Lv.0", status: "solved", url: "", memo: "입출력 형식 확인", code: "function solution(a, b) {\n  return a + b;\n}" },
    { id: "cp-2", title: "완주하지 못한 선수", type: "해시", level: "Lv.1", status: "retry", url: "", memo: "동명이인 처리 주의", code: "" },
    { id: "cp-3", title: "타겟 넘버", type: "DFS/BFS", level: "Lv.2", status: "todo", url: "", memo: "", code: "" },
  ],

  englishNotes: [
    {
      id: "eng-1",
      front: "I was born and raised here.",
      back: "나는 여기서 태어나고 자랐다.",
      phrase: "be born and raised",
      mySentence: "I was born and raised in Seoul, so I know the city pretty well.",
      tags: "intro, speaking",
      source: "OPIc",
      reviewDate: addDaysISO(2),
      difficulty: "Good",
      memo: "자기소개/고향 답변에 사용",
      done: false,
    },
    {
      id: "eng-2",
      front: "This approach is particularly useful when...",
      back: "이 접근법은 특히 ...할 때 유용하다.",
      phrase: "particularly useful when",
      mySentence: "This approach is particularly useful when the dataset is imbalanced.",
      tags: "research, writing",
      source: "Paper",
      reviewDate: addDaysISO(4),
      difficulty: "Hard",
      memo: "논문 표현",
      done: false,
    },
  ],

  calendarMemos: [
    { id: "memo-1", date: addDaysISO(1), title: "연구 미팅" },
  ],

  settings: {
    studyStart: "09:00",
    studyEnd: "23:00",
    dailyGoal: 6,
  },
};
