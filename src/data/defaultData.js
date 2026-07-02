import { todayISO } from "../utils/dates";

const today = todayISO();

export const defaultData = {
  exams: [
    { id: "exam-toefl", title: "TOEFL", date: "2026-08-20", completed: 28, total: 120 },
    { id: "exam-opic", title: "OPIc", date: "2026-09-05", completed: 9, total: 40 },
  ],

  subjects: [
    {
      id: "sub-research",
      name: "연구",
      sections: [
        {
          id: "sec-paper",
          name: "논문",
          tasks: [
            { id: "task-r-1", title: "Related Work 정리", done: false, dueDate: today, duration: 60 },
            { id: "task-r-2", title: "Experiment Table 수정", done: false, dueDate: "", duration: 90 },
          ],
        },
        {
          id: "sec-code",
          name: "실험 코드",
          tasks: [
            { id: "task-r-3", title: "Baseline 재실행", done: true, dueDate: today, duration: 40 },
            { id: "task-r-4", title: "Ablation 계획", done: false, dueDate: "", duration: 50 },
          ],
        },
      ],
    },
    {
      id: "sub-toefl",
      name: "TOEFL",
      examId: "exam-toefl",
      sections: [
        {
          id: "sec-toefl-reading",
          name: "Reading",
          tasks: [
            { id: "task-t-1", title: "Reading Passage 1", done: false, dueDate: today, duration: 45 },
            { id: "task-t-2", title: "Vocabulary 30개", done: false, dueDate: "", duration: 30 },
          ],
        },
        {
          id: "sec-toefl-speaking",
          name: "Speaking",
          tasks: [
            { id: "task-t-3", title: "Task 1 템플릿", done: false, dueDate: today, duration: 40 },
            { id: "task-t-4", title: "Task 2 녹음", done: false, dueDate: "", duration: 30 },
          ],
        },
      ],
    },
    {
      id: "sub-opic",
      name: "OPIc",
      examId: "exam-opic",
      sections: [
        {
          id: "sec-opic-script",
          name: "스크립트",
          tasks: [
            { id: "task-o-1", title: "자기소개 답변", done: true, dueDate: today, duration: 30 },
            { id: "task-o-2", title: "여행 질문 답변", done: false, dueDate: "", duration: 40 },
          ],
        },
        {
          id: "sec-opic-recording",
          name: "녹음",
          tasks: [
            { id: "task-o-3", title: "롤플레이 2개 녹음", done: false, dueDate: today, duration: 45 },
          ],
        },
      ],
    },
    {
      id: "sub-major",
      name: "전공 공부",
      sections: [
        {
          id: "sec-or",
          name: "OR",
          tasks: [
            { id: "task-m-1", title: "Simplex 복습", done: false, dueDate: today, duration: 60 },
            { id: "task-m-2", title: "Duality 정리", done: false, dueDate: "", duration: 60 },
          ],
        },
        {
          id: "sec-db",
          name: "DB",
          tasks: [
            { id: "task-m-3", title: "JOIN 문제 5개", done: false, dueDate: "", duration: 40 },
          ],
        },
      ],
    },
  ],

  schedule: [
    { id: "evt-1", taskId: "task-r-1", title: "Related Work 정리", subjectId: "sub-research", subject: "연구", section: "논문", start: 10, end: 11 },
    { id: "evt-2", taskId: "task-t-1", title: "TOEFL Reading", subjectId: "sub-toefl", subject: "TOEFL", section: "Reading", start: 14, end: 15 },
    { id: "evt-3", taskId: "task-m-1", title: "Simplex 복습", subjectId: "sub-major", subject: "전공 공부", section: "OR", start: 20, end: 21 },
  ],

  reviews: [
    { id: "rev-1", title: "Simplex pivot", subject: "전공 공부", level: "중요", memo: "피벗 선택 기준", done: false },
    { id: "rev-2", title: "TOEFL paraphrase", subject: "TOEFL", level: "보통", memo: "같은 의미 다른 표현", done: false },
  ],

  codingProblems: [
    {
      id: "cp-42576",
      site: "Programmers",
      externalId: "42576",
      title: "완주하지 못한 선수",
      url: "https://school.programmers.co.kr/learn/courses/30/lessons/42576",
      level: "Lv.1",
      tags: ["Hash"],
      status: "solving",
      retryDate: "",
      timeSpent: 25,
      attempts: 1,
      idea: "동명이인 처리를 위해 이름별 등장 횟수를 관리한다.",
      mistake: "처음에 Set으로 풀려고 해서 중복 이름을 놓쳤다.",
      code: "function solution(participant, completion) {\n  const map = new Map();\n  for (const name of participant) map.set(name, (map.get(name) || 0) + 1);\n  for (const name of completion) map.set(name, map.get(name) - 1);\n  for (const [name, count] of map) if (count > 0) return name;\n}",
    },
  ],

  settings: {
    studyStart: "09:00",
    studyEnd: "23:00",
    dailyGoal: 6,
    pomodoro: 25,
    breakTime: 5,
  },
};
