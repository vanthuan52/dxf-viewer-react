import React from "react";
import styles from "./not-found.module.scss";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
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
