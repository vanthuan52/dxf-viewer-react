import React from "react";
import styles from "./auth-layout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default AuthLayout;
