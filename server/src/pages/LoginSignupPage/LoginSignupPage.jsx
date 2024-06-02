import { useEffect, useState } from "react";

// component import
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

// css import
import styles from "./LoginSignupPage.module.css";

function LoginSignupPage() {
  const [toggleAuthButton, setToggleAuthButton] = useState("sign-up");

  const toggleForm = (e) => {
    setToggleAuthButton(e.target.id);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>Quizzie</h1>

          {/* <LoginSignup /> */}
          <div className={styles.btnContainer}>
            <button
              type="button"
              id="sign-up"
              className={`${styles.btn1} ${toggleAuthButton === "sign-up" ? styles.active : ""}`}
              onClick={(e) => toggleForm(e)}
            >
              Sign Up
            </button>
            <button
              type="button"
              id="sign-in"
              className={`${styles.btn1} ${toggleAuthButton === "sign-in" ? styles.active : ""}`}
              onClick={(e) => toggleForm(e)}
            >
              Log In
            </button>
          </div>

          {/* Form */}
          <div className={styles.form}>{toggleAuthButton === "sign-up" ? <Signup setToggleAuthButton={setToggleAuthButton}/> : <Login />}</div>
        </div>
      </div>
    </>
  );
}

export default LoginSignupPage;
