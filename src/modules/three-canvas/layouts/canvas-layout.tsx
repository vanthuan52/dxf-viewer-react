import React from "react";
import styles from "./canvas-layout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

const CanvasLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles["canvas-layout"]}>
      <div className="">{children}</div>
    </div>
  );
};

export default CanvasLayout;
