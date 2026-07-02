export const sampleData = {
  exams: [
    {
      id: "exam-ielts",
      title: "IELTS",
      date: "2026-08-20",
      completed: 92,
      total: 135,
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Test 2",
      subject: "IELTS",
      section: "Reading",
      duration: 40,
      done: false,
      today: true,
    },
    {
      id: "task-2",
      title: "Line Graph",
      subject: "IELTS",
      section: "Writing",
      duration: 50,
      done: false,
      today: true,
    },
    {
      id: "task-3",
      title: "Chapter 5: Simplex 예제 풀이",
      subject: "전공",
      section: "OR",
      duration: 60,
      done: false,
      today: true,
    },
    {
      id: "task-4",
      title: "대본 분석",
      subject: "연극",
      section: "공연 준비",
      duration: 40,
      done: false,
      today: true,
    },
  ],

  schedule: [
    { id: "s-1", time: "09:00", title: "" },
    { id: "s-2", time: "10:00", title: "OR 수업", subject: "전공", section: "OR" },
    { id: "s-3", time: "11:00", title: "" },
    { id: "s-4", time: "12:00", title: "점심" },
    { id: "s-5", time: "13:00", title: "" },
    { id: "s-6", time: "14:00", title: "IELTS Reading", subject: "IELTS", section: "Reading" },
    { id: "s-7", time: "15:00", title: "IELTS Writing", subject: "IELTS", section: "Writing" },
    { id: "s-8", time: "16:00", title: "" },
    { id: "s-9", time: "17:00", title: "" },
    { id: "s-10", time: "18:00", title: "연극 연습", subject: "연극", section: "공연 준비" },
    { id: "s-11", time: "19:00", title: "" },
    { id: "s-12", time: "20:00", title: "" },
    { id: "s-13", time: "21:00", title: "SQL 복습", subject: "전공", section: "SQL" },
    { id: "s-14", time: "22:00", title: "" },
  ],

  subjects: [
    {
      id: "sub-ielts",
      name: "IELTS",
      sections: [
        {
          id: "sec-reading",
          name: "Reading",
          tasks: [
            { id: "r-1", title: "Test 1", done: true },
            { id: "r-2", title: "Test 2", done: false },
            { id: "r-3", title: "Test 3", done: false },
          ],
        },
        {
          id: "sec-writing",
          name: "Writing",
          tasks: [
            { id: "w-1", title: "Line Graph", done: false },
            { id: "w-2", title: "Bar Chart", done: false },
          ],
        },
      ],
    },
    {
      id: "sub-major",
      name: "전공",
      sections: [
        {
          id: "sec-or",
          name: "OR",
          tasks: [
            { id: "or-1", title: "Linear Programming", done: true },
            { id: "or-2", title: "Simplex", done: false },
            { id: "or-3", title: "Duality", done: false },
          ],
        },
        {
          id: "sec-sql",
          name: "SQL",
          tasks: [{ id: "sql-1", title: "JOIN", done: false }],
        },
      ],
    },
    {
      id: "sub-theater",
      name: "연극",
      sections: [
        {
          id: "sec-stage",
          name: "공연 준비",
          tasks: [
            { id: "th-1", title: "대본 분석", done: false },
            { id: "th-2", title: "무대 디자인", done: false },
          ],
        },
      ],
    },
    {
      id: "sub-project",
      name: "프로젝트",
      sections: [
        {
          id: "sec-studyos",
          name: "StudyOS",
          tasks: [
            { id: "p-1", title: "UI 설계", done: true },
            { id: "p-2", title: "React 뼈대 제작", done: false },
          ],
        },
      ],
    },
  ],
};
