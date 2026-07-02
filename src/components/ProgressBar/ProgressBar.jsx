import styles from "./ProgressBar.module.css";
export default function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return <div className={styles.progress}><div style={{ width: `${safeValue}%` }} /></div>;
}
