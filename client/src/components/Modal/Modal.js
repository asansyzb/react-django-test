import styles from "./Modal.module.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? `${styles.modal} ${styles["display-block"]}`
    : `${styles.modal} ${styles["display-none"]}`;

  return (
    <div className={showHideClassName}>
      <section className={styles["modal-main"]}>
        {children}
        <button type="button" onClick={handleClose} className={styles.button}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
