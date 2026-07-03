import styles from "./SimpleModal.module.css";

export default function SimpleModal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <section className={styles.modal}>
        <div className={styles.head}>
          <h2>{title}</h2>
          <button type="button" onClick={onClose}>×</button>
        </div>
        {children}
      </section>
    </div>
  );
}
