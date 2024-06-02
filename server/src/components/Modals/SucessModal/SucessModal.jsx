import React from "react";
import styles from "./SuccessModal.module.css";

function SuccessModal({ quizLink, closeModal }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(quizLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>Congrats! Your quiz is ready</h2>
        <p>Here is your quiz link:</p>
        <a href={quizLink} target="_blank" rel="noopener noreferrer">
          {quizLink}
        </a>
        <button onClick={copyToClipboard}>Share</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default SuccessModal;
