import { useState } from "react";

// modal imports
import QaModal from "../QaModal/QaModal";
import PollTypeModal from "../PollTypeModal/PollTypeModal";

// css import
import styles from "./CreateQuiz.module.css";

/* eslint-disable-next-line */
function CreateQuiz({ toggleButton }) {
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMainForm, setShowMainForm] = useState(true);
  const [quizName, setQuizName] = useState("");

  const handleCancel = () => {
    toggleButton("Dashboard");
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedType(null);
    setShowMainForm(true);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleContinue = () => {
    if (!quizName.trim()) {
      alert("Please enter a quiz name before continuing.");
    } else if (selectedType) {
      setShowModal(true);
      setShowMainForm(false);
    } else {
      alert("Please select a quiz type before continuing.");
    }
  };

  return (
    <>
      {showMainForm && (
        <div className={styles.container}>
          <div className={styles.quizContainer}>
            {/* Quiz Name */}
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Quiz Name"
                value={quizName}
                onChange={(event) => setQuizName(event.target.value)}
              />
            </div>

            {/* Quiz Type */}
            <div className={styles.typeContainer}>
              <p className={styles.typeHeading}>Quiz Type</p>
              <button
                className={styles.typeBtn}
                onClick={() => handleTypeClick("Q & A")}
                style={{
                  backgroundColor: selectedType === "Q & A" ? "#60B84B" : "",
                  color: selectedType === "Q & A" ? "#fff" : "",
                  cursor: selectedType === "Q & A" ? "default" : "pointer",
                }}
              >
                Q & A
              </button>
              <button
                className={styles.typeBtn}
                onClick={() => handleTypeClick("Poll Type")}
                style={{
                  backgroundColor:
                    selectedType === "Poll Type" ? "#60B84B" : "",
                  color: selectedType === "Poll Type" ? "#fff" : "",
                  cursor: selectedType === "Poll Type" ? "default" : "pointer",
                }}
              >
                Poll Type
              </button>
            </div>

            {/* Create Quiz */}
            <div className={styles.btnContainer}>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.continueBtn} onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {selectedType === "Q & A" ? (
              <QaModal quizName={quizName} closeModal={handleCloseModal} />
            ) : (
              <PollTypeModal
                quizName={quizName}
                closeModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateQuiz;
