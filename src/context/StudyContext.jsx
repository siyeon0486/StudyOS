import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultData } from "../data/defaultData";
import { todayISO } from "../utils/dates";

const StudyContext = createContext(null);
const STORAGE_KEY = "studyos-data";

function flattenTasks(subjects) {
  return subjects.flatMap((subject) =>
    subject.sections.flatMap((section) =>
      section.tasks.map((task) => ({
        ...task,
        subjectId: subject.id,
        subject: subject.name,
        sectionId: section.id,
        section: section.name,
      }))
    )
  );
}

function normalizeData(raw) {
  return {
    ...defaultData,
    ...raw,
    subjects: raw?.subjects || defaultData.subjects,
    schedule: raw?.schedule || [],
    calendarMemos: raw?.calendarMemos || [],
    codingProblems: raw?.codingProblems || defaultData.codingProblems || [],
    englishNotes: raw?.englishNotes || defaultData.englishNotes || [],
    weeklyGoals: raw?.weeklyGoals || defaultData.weeklyGoals || [],
    exams: raw?.exams || defaultData.exams || [],
    settings: { ...defaultData.settings, ...(raw?.settings || {}) },
  };
}

export function StudyProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      return normalizeData(JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData);
    } catch {
      return normalizeData(defaultData);
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const allTasks = useMemo(() => flattenTasks(data.subjects), [data.subjects]);

  const addSubject = (name) => {
    if (!name.trim()) return;
    const id = `sub-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { id, name: name.trim(), sections: [{ id: `sec-${Date.now()}`, name: "기본", tasks: [] }] }],
    }));
  };

  const addSection = (subjectId, name) => {
    if (!name.trim()) return;
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) =>
        subject.id !== subjectId
          ? subject
          : { ...subject, sections: [...subject.sections, { id: `sec-${Date.now()}`, name: name.trim(), tasks: [] }] }
      ),
    }));
  };

  const addTask = ({ subjectId, sectionId, title, dueDate = "", duration = 40, note = "" }) => {
    const id = `task-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) =>
        subject.id !== subjectId
          ? subject
          : {
              ...subject,
              sections: subject.sections.map((section) =>
                section.id !== sectionId
                  ? section
                  : { ...section, tasks: [...section.tasks, { id, title, dueDate, duration, note, done: false }] }
              ),
            }
      ),
    }));
    return id;
  };

  const toggleTask = (taskId) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) => ({
        ...subject,
        sections: subject.sections.map((section) => ({
          ...section,
          tasks: section.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task
          ),
        })),
      })),
    }));
  };

  const updateTask = (taskId, patch) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) => ({
        ...subject,
        sections: subject.sections.map((section) => ({
          ...section,
          tasks: section.tasks.map((task) =>
            task.id === taskId ? { ...task, ...patch } : task
          ),
        })),
      })),
      schedule: patch.dueDate !== undefined
        ? prev.schedule.map((event) =>
            event.taskId === taskId ? { ...event, date: patch.dueDate } : event
          )
        : prev.schedule,
    }));
  };

  const deleteTask = (taskId) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) => ({
        ...subject,
        sections: subject.sections.map((section) => ({
          ...section,
          tasks: section.tasks.filter((task) => task.id !== taskId),
        })),
      })),
      schedule: prev.schedule.filter((event) => event.taskId !== taskId),
    }));
  };

  const scheduleTaskToday = (taskId) => updateTask(taskId, { dueDate: todayISO() });
  const scheduleTaskDate = (taskId, dueDate) => updateTask(taskId, { dueDate });

  const addScheduleEvent = (event) => {
    setData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { ...event, date: event.date || todayISO(), id: `evt-${Date.now()}` }],
    }));
  };

  const updateScheduleEvent = (eventId, patch) => {
    setData((prev) => ({
      ...prev,
      schedule: prev.schedule.map((event) =>
        event.id === eventId ? { ...event, ...patch } : event
      ),
    }));
  };

  const deleteScheduleEvent = (eventId) => {
    setData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((event) => event.id !== eventId),
    }));
  };

  const addCalendarMemo = (date, title) => {
    setData((prev) => ({ ...prev, calendarMemos: [...prev.calendarMemos, { id: `memo-${Date.now()}`, date, title }] }));
  };
  const updateCalendarMemo = (memoId, patch) => {
    setData((prev) => ({ ...prev, calendarMemos: prev.calendarMemos.map((memo) => memo.id === memoId ? { ...memo, ...patch } : memo) }));
  };
  const deleteCalendarMemo = (memoId) => {
    setData((prev) => ({ ...prev, calendarMemos: prev.calendarMemos.filter((memo) => memo.id !== memoId) }));
  };

  const addWeeklyGoal = (title) => {
    if (!title.trim()) return;
    setData((prev) => ({ ...prev, weeklyGoals: [...prev.weeklyGoals, { id: `goal-${Date.now()}`, title: title.trim(), done: false }] }));
  };
  const toggleWeeklyGoal = (goalId) => {
    setData((prev) => ({ ...prev, weeklyGoals: prev.weeklyGoals.map((goal) => goal.id === goalId ? { ...goal, done: !goal.done } : goal) }));
  };
  const deleteWeeklyGoal = (goalId) => {
    setData((prev) => ({ ...prev, weeklyGoals: prev.weeklyGoals.filter((goal) => goal.id !== goalId) }));
  };

  const updateExam = (examId, patch) => {
    setData((prev) => ({ ...prev, exams: prev.exams.map((exam) => exam.id === examId ? { ...exam, ...patch } : exam) }));
  };
  const addExam = (exam = {}) => {
    setData((prev) => ({
      ...prev,
      exams: [
        ...prev.exams,
        {
          id: `exam-${Date.now()}`,
          title: exam.title || "새 시험",
          date: exam.date || todayISO(),
          completed: Number(exam.completed || 0),
          total: Number(exam.total || 100),
        },
      ],
    }));
  };

  const deleteExam = (examId) => {
    setData((prev) => ({ ...prev, exams: prev.exams.filter((exam) => exam.id !== examId) }));
  };

  const updateSettings = (patch) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const addCodingProblem = (problem = {}) => {
    const item = {
      id: `cp-${Date.now()}`,
      title: problem.title || "새 문제",
      type: problem.type || "구현",
      subType: problem.subType || "",
      level: problem.level || "Lv.0",
      source: problem.source || "Programmers",
      status: problem.status || "todo",
      solvedDate: problem.solvedDate || "",
      retryDate: problem.retryDate || "",
      url: problem.url || "",
      comment: problem.comment || "",
      idea: problem.idea || "",
      mistake: problem.mistake || "",
      memo: problem.memo || "",
      code: problem.code || "",
    };
    setData((prev) => ({ ...prev, codingProblems: [...prev.codingProblems, item] }));
  };
  const updateCodingProblem = (problemId, patch) => {
    setData((prev) => ({ ...prev, codingProblems: prev.codingProblems.map((problem) => problem.id === problemId ? { ...problem, ...patch } : problem) }));
  };
  const deleteCodingProblem = (problemId) => {
    setData((prev) => ({ ...prev, codingProblems: prev.codingProblems.filter((problem) => problem.id !== problemId) }));
  };

  const addEnglishNote = (note) => {
    setData((prev) => ({
      ...prev,
      englishNotes: [
        ...prev.englishNotes,
        {
          id: `eng-${Date.now()}`,
          front: note.front || "",
          back: note.back || "",
          phrase: note.phrase || "",
          mySentence: note.mySentence || "",
          tags: note.tags || "",
          source: note.source || "TOEFL",
          reviewDate: note.reviewDate || "",
          difficulty: note.difficulty || "Again",
          memo: note.memo || "",
          done: false,
        },
      ],
    }));
  };
  const updateEnglishNote = (noteId, patch) => {
    setData((prev) => ({ ...prev, englishNotes: prev.englishNotes.map((note) => note.id === noteId ? { ...note, ...patch } : note) }));
  };
  const deleteEnglishNote = (noteId) => {
    setData((prev) => ({ ...prev, englishNotes: prev.englishNotes.filter((note) => note.id !== noteId) }));
  };
  const toggleEnglishNote = (noteId) => {
    setData((prev) => ({ ...prev, englishNotes: prev.englishNotes.map((note) => note.id === noteId ? { ...note, done: !note.done } : note) }));
  };

  const value = useMemo(
    () => ({
      data, allTasks,
      addSubject, addSection,
      addTask, toggleTask, updateTask, deleteTask, scheduleTaskToday, scheduleTaskDate,
      addScheduleEvent, updateScheduleEvent, deleteScheduleEvent,
      addCalendarMemo, updateCalendarMemo, deleteCalendarMemo,
      addWeeklyGoal, toggleWeeklyGoal, deleteWeeklyGoal,
      updateExam, addExam, deleteExam, updateSettings,
      addCodingProblem, updateCodingProblem, deleteCodingProblem,
      addEnglishNote, updateEnglishNote, deleteEnglishNote, toggleEnglishNote,
    }),
    [data, allTasks]
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  return useContext(StudyContext);
}
