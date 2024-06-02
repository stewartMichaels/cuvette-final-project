import React from "react";

// css import
import styles from "./Dashboard.module.css";

// react icons import
import { LuEye } from "react-icons/lu";

function Dashboard() {
  const data = [
    {
      quiz: "Quiz 1",
      createdOn: "2022-01-01",
      impressions: 100,
    },
    {
      quiz: "Quiz 2",
      createdOn: "2022-01-02",
      impressions: 200,
    },
    {
      quiz: "Quiz 3",
      createdOn: "2022-01-03",
      impressions: 300,
    },
    {
      quiz: "Quiz 4",
      createdOn: "2022-01-04",
      impressions: 400,
    },
    {
      quiz: "This is a test to see how long it can be",
      createdOn: "2022-01-05",
      impressions: 500,
    },
    {
      quiz: "Quiz 6",
      createdOn: "2022-01-06",
      impressions: 600,
    },
    {
      quiz: "Quiz 7",
      createdOn: "2022-01-07",
      impressions: 700,
    },
    {
      quiz: "Quiz 8",
      createdOn: "2022-01-08",
      impressions: 800,
    },
    {
      quiz: "Quiz 9",
      createdOn: "2022-01-09",
      impressions: 900,
    },
    {
      quiz: "Quiz 10",
      createdOn: "2022-01-10",
      impressions: 1000,
    },
    {
      quiz: "Quiz 11",
      createdOn: "2022-01-11",
      impressions: 1100,
    },
    {
      quiz: "Quiz 12",
      createdOn: "2022-01-12",
      impressions: 1200,
    },
    {
      quiz: "Quiz 13",
      createdOn: "2022-01-13",
      impressions: 1300,
    },
  ];

  const dataLimit = data.slice(0, 12);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.headingContainer}>
            <div className={`${styles.headingText} ${styles.quizCreated}`}>
              <span>12</span>&nbsp;Quiz <br /> Created
            </div>
            <div className={`${styles.headingText} ${styles.quesCreated}`}>
              <span>110</span>&nbsp;Questions <br /> Created
            </div>
            <div className={`${styles.headingText} ${styles.totalImpressions}`}>
              <span>1.4K</span>&nbsp;Total <br /> Impressions
            </div>
          </div>

          <div className={styles.contentContainer}>
            <h1>Trending Quizzes</h1>

            <div className={styles.table}>
              {dataLimit.map((row, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.tableData}>
                    {/* Name and Impression */}
                    <div className={styles.tableCell}>
                      <div className={styles.tableName}>{row.quiz}</div>
                      <div className={styles.tableImpressions}>
                        {row.impressions}
                        <LuEye className={styles.icon} />
                      </div>
                    </div>

                    {/* Created on */}
                    <div className={styles.createdOn}>
                      <span>Created On :</span>&nbsp;{row.createdOn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
