import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Subjects from "./pages/Subjects/Subjects.jsx";
import StudyPlan from "./pages/StudyPlan/StudyPlan.jsx";
import Review from "./pages/Review/Review.jsx";
import Statistics from "./pages/Statistics/Statistics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/review" element={<Review />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
