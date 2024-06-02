/* eslint-disable  */
// css import
import styles from "./Sidebar.module.css";
import Logout from "../Logout/Logout";

function Sidebar({ isActive, setIsActive }) {
  const toggleButton = (buttonName) => {
    setIsActive(buttonName);
  };

  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.heading}>Quizzie</h1>
      </section>
      <section className={styles.btnContainer}>
        <button
          className={isActive === "Dashboard" ? styles.active : styles.inactive}
          onClick={() => toggleButton("Dashboard")}
        >
          Dashboard
        </button>

        <button
          className={isActive === "Analytics" ? styles.active : styles.inactive}
          onClick={() => toggleButton("Analytics")}
        >
          Analytics
        </button>

        <button
          className={
            isActive === "CreateQuiz" ? styles.active : styles.inactive
          }
          onClick={() => toggleButton("CreateQuiz")}
        >
          Create Quiz
        </button>
      </section>
      <div className={styles.divider}></div>
      <Logout />
    </div>
  );
}

export default Sidebar;
