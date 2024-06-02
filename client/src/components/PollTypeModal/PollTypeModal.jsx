import { useState } from "react";

// react icons
import { BiSolidTrash } from "react-icons/bi";

// api import
import { createQuiz } from "../../api/quiz";

// import css
import styles from "./PollTypeModal.module.css";

/* eslint-disable-next-line  */
function PollTypeModal({ closeModal, quizName }) {
  const [qItems, setQItems] = useState([
    {
      id: 1,
      name: "", // Add a name property for each question
      options: [
        { id: 1, text: "", imageURL: "" },
        { id: 2, text: "", imageURL: "" },
      ],
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionType, setOptionType] = useState("text");

  const [formData, setFormData] = useState({
    name: quizName, // Set the quiz name from props
    questions: [],
    options: optionType,
  });

  // handles from submission
  const handleSubmit = async () => {
    if (!formData.name || formData.questions.length < 1) {
      alert("Please enter a name for your quiz.");
      return;
    }

    try {
      await createQuiz(formData);
      closeModal();
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  // add new question to qItems array if length is less than 5
  const addQItem = () => {
    setQItems((prevItems) => {
      if (prevItems.length < 5) {
        const newQItem = {
          id: prevItems.length + 1,
          name: "", // Initialize the new question's name
          options: [
            { id: 1, text: "", imageURL: "" },
            { id: 2, text: "", imageURL: "" },
          ],
        };

        setCurrentQuestionIndex(prevItems.length);
        return [...prevItems, newQItem];
      }
      return prevItems;
    });
  };

  // remove question from qItems array
  const removeQItem = (index) => {
    setQItems((prevItems) => {
      const updatedQItems = prevItems.filter((_, i) => i !== index);

      if (index < currentQuestionIndex) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (index === currentQuestionIndex) {
        setCurrentQuestionIndex(0);
      }

      return updatedQItems;
    });

    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((_, i) => i !== index),
    }));
  };

  // add new option to qItems
  const addOptionItem = (qIndex) => {
    setQItems((prevItems) => {
      const newQItems = prevItems.map((qItem, i) => {
        if (i === qIndex) {
          const newOptions = [...qItem.options];
          if (newOptions.length < 4) {
            newOptions.push({
              id: newOptions.length + 1,
              text: "",
              imageURL: "",
            });
          }
          return { ...qItem, options: newOptions };
        }
        return qItem;
      });
      return newQItems;
    });
  };

  // remove option from qItems
  const removeOptionItem = (qIndex, oIndex) => {
    setQItems((prevItems) => {
      const newQItems = [...prevItems];
      if (oIndex > 1) {
        newQItems[qIndex].options = newQItems[qIndex].options.filter(
          (_, i) => i !== oIndex
        );
      }
      return newQItems;
    });
  };

  // handle option change: update text, imageURL
  const handleOptionChange = (event, qIndex, oIndex, type) => {
    const { value } = event.target;
    setQItems((prevItems) => {
      const newQItems = [...prevItems];
      if (type === "text") {
        newQItems[qIndex].options[oIndex].text = value;
      } else if (type === "imageURL") {
        newQItems[qIndex].options[oIndex].imageURL = value;
      } else if (type === "textImageURL") {
        newQItems[qIndex].options[oIndex].imageURL = value;
      }
      return newQItems;
    });

    setFormData((prevData) => ({
      ...prevData,
      questions: qItems.map((qItem, index) =>
        index === qIndex
          ? {
              ...qItem,
              options: qItem.options.map((option) => ({
                text: option.text,
                imageURL: option.imageURL,
              })),
            }
          : qItem
      ),
    }));
  };

  // updates name of specific question
  const handleQuestionNameChange = (event, qIndex) => {
    const { value } = event.target;
    setQItems((prevItems) => {
      const newQItems = [...prevItems];
      newQItems[qIndex].name = value;
      return newQItems;
    });

    setFormData((prevData) => ({
      ...prevData,
      questions: qItems.map((qItem, index) =>
        index === qIndex
          ? {
              ...qItem,
              name: value, // Update the specific question's name
            }
          : qItem
      ),
    }));
  };

  // updates option type state based on radio
  const handleOptionTypeChange = (event) => {
    setOptionType(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.qaContainer}>
          <div className={styles.qNumberContainer}>
            <div className={styles.listContainer}>
              <div className={styles.list}>
                {qItems.map((qItem, qIndex) => (
                  <div key={qIndex} className={styles.listItem}>
                    <span className={styles.circle}>{qItem.id}</span>
                    {qIndex > 0 && (
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeQItem(qIndex)}
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
                {qItems.length < 5 && (
                  <button onClick={addQItem} className={styles.addBtn}>
                    +
                  </button>
                )}
              </div>
              <div className={styles.qNumberHeading}>
                <p>Max 5 Questions</p>
              </div>
            </div>
          </div>

          {/* Question Name */}
          <div className={styles.qName}>
            {/* <label>Question Name:</label> */}
            <input
              className={styles.qNameInput}
              type="text"
              value={qItems[currentQuestionIndex].name}
              onChange={(event) =>
                handleQuestionNameChange(event, currentQuestionIndex)
              }
              placeholder="Poll Question"
            />
          </div>

          <div className={styles.optionsContainer}>
            <p>Option Type</p>
            <div className={styles.optionsRadio}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  value="text"
                  checked={optionType === "text"}
                  onChange={handleOptionTypeChange}
                />
                <label htmlFor="option1">Text</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  value="imageURL"
                  checked={optionType === "imageURL"}
                  onChange={handleOptionTypeChange}
                />
                <label htmlFor="option2">Image URL</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="options"
                  id="option3"
                  value="textImageURL"
                  checked={optionType === "textImageURL"}
                  onChange={handleOptionTypeChange}
                />
                <label htmlFor="option3">Text & Image URL</label>
              </div>
            </div>
          </div>

          {/* put inputs and timer here */}
          <div className={styles.inputAndTimer}>
            {/* Options */}
            <div className={styles.optionsInputContainer}>
              {qItems[currentQuestionIndex].options.map((option, oIndex) => (
                <div key={oIndex} className={styles.optionItem}>
                  {optionType === "text" && (
                    <div className={styles.optionContainer}>
                      <input
                        type="radio"
                        name={`option${currentQuestionIndex}`}
                        className={styles.optionRadio}
                      />
                      <input
                        type="text"
                        placeholder="Text"
                        className={styles.optionInput}
                        value={option.text}
                        onChange={(event) =>
                          handleOptionChange(
                            event,
                            currentQuestionIndex,
                            oIndex,
                            "text"
                          )
                        }
                      />
                    </div>
                  )}
                  {optionType === "imageURL" && (
                    <div className={styles.optionContainer}>
                      <input
                        type="radio"
                        name={`option${currentQuestionIndex}`}
                        className={styles.optionRadio}
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        className={styles.optionInput}
                        value={option.imageURL}
                        onChange={(event) =>
                          handleOptionChange(
                            event,
                            currentQuestionIndex,
                            oIndex,
                            "imageURL"
                          )
                        }
                      />
                    </div>
                  )}
                  {optionType === "textImageURL" && (
                    <div className={styles.optionContainer}>
                      <input
                        type="radio"
                        name={`option${currentQuestionIndex}`}
                        className={styles.optionRadio}
                      />
                      <input
                        type="text"
                        placeholder="Text"
                        className={styles.optionInput}
                        value={option.text}
                        onChange={(event) =>
                          handleOptionChange(
                            event,
                            currentQuestionIndex,
                            oIndex,
                            "text"
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        className={styles.optionInput}
                        value={option.imageURL}
                        onChange={(event) =>
                          handleOptionChange(
                            event,
                            currentQuestionIndex,
                            oIndex,
                            "imageURL"
                          )
                        }
                      />
                    </div>
                  )}

                  <div
                    className={`${styles.removeOptionIcon} ${
                      oIndex > 1 ? "" : styles.hidden
                    }`}
                  >
                    <BiSolidTrash
                      onClick={() =>
                        removeOptionItem(currentQuestionIndex, oIndex)
                      }
                    />
                  </div>
                </div>
              ))}

              <div className={styles.addOptionBtnContainer}>
                {qItems[currentQuestionIndex].options.length < 4 && (
                  <button
                    className={styles.addOptionBtn}
                    onClick={() => addOptionItem(currentQuestionIndex)}
                  >
                    Add Option
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={closeModal} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={handleSubmit} className={styles.submitBtn}>
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PollTypeModal;
