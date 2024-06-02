import { useState, useEffect } from "react";

// import react icons
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";

// import api
import { fetchQuizData, deleteQuiz } from "../../api/analysis";

// import modal
import DeleteConfirmationModal from "../Modals/DeleteConfirmModal/DeleteConfirmModal";

// import csss
import styles from "./Analysis.module.css";

function Analysis() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const quizzes = await fetchQuizData();
      setData(quizzes);
    };

    fetchData();
  }, []);

  const openModal = (quizId) => {
    setSelectedQuizId(quizId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedQuizId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedQuizId) {
      await deleteQuiz(selectedQuizId);
      const updatedData = data.filter((quiz) => quiz._id !== selectedQuizId);
      setData(updatedData);
      closeModal();
    }
  };

  return (
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
              <div>{row.name}</div>
              <div>{new Date(row.createdAt).toLocaleDateString()}</div>
              <div>{row.impressions || "N/A"}</div>
              <div>
                <BiEdit className={`${styles.icon} ${styles.editIcon}`} />
                <RiDeleteBin6Fill
                  className={`${styles.icon} ${styles.deleteIcon}`}
                  onClick={() => openModal(row._id)}
                />
                <FaShareAlt className={`${styles.icon} ${styles.shareIcon}`} />
              </div>
              <div>Question Wise Analysis</div>
            </div>
          ))}
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Analysis;
