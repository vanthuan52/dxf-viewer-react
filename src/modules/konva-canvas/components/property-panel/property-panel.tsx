import React from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./property-panel.module.scss";
import { ShapeProps } from "../../types/shapes";
import ShapeProperty from "../shape-property/shape-property";

type PropertyPanelProps = {
  shape: ShapeProps;
};
const PropertyPanel = ({ shape }: PropertyPanelProps) => {
  return (
    <div className={styles["property-panel"]}>
      <div className={styles["property-panel-header"]}>
        <h3 className={styles["property-panel-title"]}>{shape.type}</h3>
        <div className={styles["property-panel-header__button"]}>
          <IoMdClose size={24} />
        </div>
      </div>

      <div className={styles["property-panel-content"]}>
        <ShapeProperty shape={shape} />
      </div>
    </div>
  );
};

export default PropertyPanel;
