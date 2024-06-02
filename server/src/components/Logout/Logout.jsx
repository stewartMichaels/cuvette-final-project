import styles from "./Logout.module.css";
import { Link } from "react-router-dom";
function logoutHandler() {
  localStorage.removeItem("name");
  localStorage.removeItem("token");
}

function Logout() {
  return (
    <button type="button" className={styles.logout} onClick={logoutHandler}>
      <Link to="/" replace className={styles.noLinkStyle}>
        Logout
      </Link>
    </button>
  );
}

export default Logout;
