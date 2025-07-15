import React from "react";
import styles from "./viewer-status.module.scss";

interface Props {
  isLoading: boolean;
  fileName: string | null;
  error: string | null;
}

const ViewerStatus: React.FC<Props> = ({ isLoading, fileName, error }) => {
  return (
    <div className={styles["viewer-status"]}>
      <div className={styles["viewer-status-wrapper"]}>
        {!isLoading && !fileName && <p>Hello World</p>}
        {isLoading && <p>Loading: {fileName || ""}...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isLoading && fileName && <p>File: {fileName}</p>}
      </div>
    </div>
  );
};

export default ViewerStatus;
