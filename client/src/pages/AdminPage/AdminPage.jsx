import { useState } from "react";

// component import
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analysis from "../../components/Analysis/Analysis";
import CreateQuiz from "../../components/CreateQuiz/CreateQuiz";

// css import
import styles from "./Admin.module.css";

function DashboardPage() {
  const [isActive, setIsActive] = useState("Dashboard");

  const toggleButton = (buttonName) => {
    setIsActive(buttonName);
  };

  return (
    <>
      <div className={styles.container}>
        <section className={styles.sidebarContainer}>
          <Sidebar isActive={isActive} setIsActive={setIsActive} />
        </section>
        {/* Contains the Content */}
        <section className={styles.contentContainer}>
          {isActive === "Dashboard" && <Dashboard />}
          {isActive === "Analytics" && <Analysis />}
          {isActive === "CreateQuiz" && (
            <CreateQuiz toggleButton={toggleButton} />
          )}
        </section>
      </div>
    </>
  );
}

export default DashboardPage;
