import React from "react";

import styles from "./DeleteConfirmModal.module.css";

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this quiz?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelBtn} onClick={onRequestClose}>
            Cancel
          </button>
          <button className={styles.submitBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
