import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import StudyPlan from "./pages/StudyPlan/StudyPlan.jsx";
import CalendarPage from "./pages/Calendar/Calendar.jsx";
import Coding from "./pages/Coding/Coding.jsx";
import English from "./pages/English/English.jsx";
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
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/study-plan/:subjectId" element={<StudyPlan />} />
            <Route path="/subjects" element={<Navigate to="/study-plan" replace />} />
            <Route path="/subjects/:subjectId" element={<Navigate to="/study-plan/:subjectId" replace />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/english" element={<English />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/review" element={<Navigate to="/english" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </StudyProvider>
  );
}
