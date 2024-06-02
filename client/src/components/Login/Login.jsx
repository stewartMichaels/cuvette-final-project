import { useState } from "react";
import { useNavigate } from "react-router-dom";

// api import
import { loginUser } from "../../api/auth";

// css import
import styles from "./Login.module.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    const result = await loginUser(formData);

    if (result === "OK") {
      navigate("/admin");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        {/* Login form fields */}
        <div>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            name="email"
            onChange={handleFormChange}
            type="email"
            placeholder="Email"
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            name="password"
            onChange={handleFormChange}
            type="password"
            placeholder="Password"
            className={styles.input}
          />
        </div>
      </form>
      <div className={styles.btnContainer2}>
        <button type="button" onClick={handleSubmit} className={styles.btn2}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
