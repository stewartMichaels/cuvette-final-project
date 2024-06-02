// import React, { useState, useEffect } from "react";

// css import
import styles from "./Analysis.module.css";

// react icons import
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";

// api import
// import { fetchQuizData } from "../../api/analysis";

function Analysis() {
  const data = [
    {
      quiz: "Quiz 1",
      date: "2022-01-01",
      impressions: 100,
    },
    {
      quiz: "Quiz 2",
      date: "2022-01-02",
      impressions: 200,
    },
    {
      quiz: "Quiz 3",
      date: "2022-01-03",
      impressions: 300,
    },
    {
      quiz: "Quiz 4",
      date: "2022-01-04",
      impressions: 400,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Quiz Analysis</h1>

        <div className={styles.contentContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div>S.No</div>
              <div>Quiz Name</div>
              <div>Created On</div>
              <div>Impressions</div>
              <div></div>
              <div></div>
            </div>

            {data.map((row, index) => (
              <div key={index} className={styles.tableRow}>
                <div>{index + 1}</div>
                <div>{row.quiz}</div>
                <div>{row.date}</div>
                <div>{row.impressions}</div>
                <div>
                  <div>
                    <BiEdit className={`${styles.icon} ${styles.editIcon}`} />
                  </div>
                  <div>
                    <RiDeleteBin6Fill
                      className={`${styles.icon} ${styles.deleteIcon}`}
                    />
                  </div>
                  <div>
                    <FaShareAlt
                      className={`${styles.icon} ${styles.shareIcon}`}
                    />
                  </div>
                </div>
                <div>Question Wise Analysis</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Analysis;
