import React from "react";
import styles from "./auth-card.module.scss";

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default AuthCard;
