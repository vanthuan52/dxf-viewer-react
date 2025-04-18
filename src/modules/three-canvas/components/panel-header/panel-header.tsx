import React from "react";
import styles from "./panel-header.module.scss";

const PanelHeader = () => {
  return (
    <div className={styles["panel-header"]}>
      <div className={styles["panel-header-wrapper"]}>
        <div className={styles["panel-header-title"]}>DXF Viewer</div>
      </div>
    </div>
  );
};

export default PanelHeader;
