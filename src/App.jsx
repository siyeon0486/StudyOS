import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Subjects from "./pages/Subjects/Subjects.jsx";
import StudyPlan from "./pages/StudyPlan/StudyPlan.jsx";
import CalendarPage from "./pages/Calendar/Calendar.jsx";
import Review from "./pages/Review/Review.jsx";
import Coding from "./pages/Coding/Coding.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { StudyProvider } from "./context/StudyContext.jsx";
import styles from "./App.module.css";

export default function App() {
  return (
    <StudyProvider>
      <div className={styles.appShell}>
        <Sidebar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<Subjects />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </StudyProvider>
  );
}
