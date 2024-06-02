import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// api import
import { signupUser } from "../../api/auth";

// css import
import styles from "./Signup.module.css";

/* eslint-disable-next-line */
const Signup = ({ setToggleAuthButton }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = yup.object({
    name: yup.string().required("Invalid Name"),
    email: yup.string().email("Invalid Email").required("Invalid Email"),
    password: yup.string().min(8, "Weak Password").required("Weak Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password doesn't match")
      .required("password doesn't match"),
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // register api
      const result = await signupUser(formData);
      if (result === "OK") {
        setToggleAuthButton("sign-in");
        // <Navigate to="/" replace />
      }
    } catch (error) {
      const newError = {};
      const innerError = error.inner;
      for (const error of innerError) {
        newError[error.path] = error.message;
      }

      setErrors(newError);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.contentContainer}>
          {/* Sign-up form fields */}
          <div>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              value={formData.name}
              placeholder={errors?.name || ""}
              className={`${styles.input} ${
                errors?.name ? styles.inputError : ""
              }`}
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              value={formData.email}
              placeholder={errors?.email || ""}
              className={`${styles.input} ${
                errors?.email ? styles.inputError : ""
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              value={formData.password}
              placeholder={errors?.password || ""}
              className={`${styles.input} ${
                errors?.password ? styles.inputError : ""
              }`}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              value={formData.confirmPassword}
              placeholder={errors?.confirmPassword || ""}
              className={`${styles.input} ${
                errors?.confirmPassword ? styles.inputError : ""
              }`}
            />
          </div>
          {/* <errors className={styles.error}>{errors?.confirmPassword}</errors> */}
        </div>
        <div className={styles.btnContainer2}>
          <button type="submit" className={styles.btn2}>
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
