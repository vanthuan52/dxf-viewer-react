import React, { RefObject } from "react";
import styles from "./canvas-container.module.scss";

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
}

const CanvasContainer: React.FC<Props> = ({ containerRef }) => (
  <div ref={containerRef} className={styles["canvas-container"]}></div>
);

export default CanvasContainer;
