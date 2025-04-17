import React from "react";
import styles from "./not-found.module.scss";
import notFoundImage from "../../assets/page-not-found.png";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
  return (
    <div
      className={styles.notFoundContainer}
      style={{ backgroundImage: `url(${notFoundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.notFoundContent}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className={styles.homeButton}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
