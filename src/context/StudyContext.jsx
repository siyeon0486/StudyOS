import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultData } from "../data/defaultData";
import { todayISO } from "../utils/dates";
import { parseProblemUrl } from "../utils/codingProblemLookup";

const StudyContext = createContext(null);
const STORAGE_KEY = "studyos-sprint5";

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

export function StudyProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const allTasks = useMemo(() => flattenTasks(data.subjects), [data.subjects]);

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
    }));
  };

  const scheduleTaskToday = (taskId) => updateTask(taskId, { dueDate: todayISO() });

  const scheduleTaskDate = (taskId, dueDate) => updateTask(taskId, { dueDate });

  const addScheduleEvent = (event) => {
    setData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { ...event, id: `evt-${Date.now()}` }],
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

  const toggleReview = (reviewId) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((item) =>
        item.id === reviewId ? { ...item, done: !item.done } : item
      ),
    }));
  };

  const updateSettings = (patch) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const addCodingProblemFromUrl = (url) => {
    const parsed = parseProblemUrl(url);
    setData((prev) => ({
      ...prev,
      codingProblems: [
        ...prev.codingProblems,
        {
          id: `cp-${parsed.externalId}-${Date.now()}`,
          ...parsed,
          retryDate: "",
          timeSpent: 0,
          attempts: 0,
          idea: "",
          mistake: "",
          code: "",
        },
      ],
    }));
  };

  const updateCodingProblem = (problemId, patch) => {
    setData((prev) => ({
      ...prev,
      codingProblems: prev.codingProblems.map((problem) =>
        problem.id === problemId ? { ...problem, ...patch } : problem
      ),
    }));
  };

  const deleteCodingProblem = (problemId) => {
    setData((prev) => ({
      ...prev,
      codingProblems: prev.codingProblems.filter((problem) => problem.id !== problemId),
    }));
  };

  const value = useMemo(
    () => ({
      data,
      allTasks,
      toggleTask,
      updateTask,
      scheduleTaskToday,
      scheduleTaskDate,
      addScheduleEvent,
      updateScheduleEvent,
      deleteScheduleEvent,
      toggleReview,
      updateSettings,
      addCodingProblemFromUrl,
      updateCodingProblem,
      deleteCodingProblem,
    }),
    [data, allTasks]
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  return useContext(StudyContext);
}
