import React from "react";
import { Tooltip } from "react-tooltip";
import styles from "./shape-property.module.scss";
import { ShapeProps } from "../../types/shapes";
import { toIntegerNumber } from "../../utils/common";

interface ShapePropertiesProps {
  shape: ShapeProps;
}

const ShapeProperty = ({ shape }: ShapePropertiesProps) => {
  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const shapeProperties = [
    {
      label: "X",
      value: toIntegerNumber(shape.x),
      setter: handleLeftChange,
      prop: "left",
      tooltipId: "x-position-tooltip",
    },
    {
      label: "Y",
      value: toIntegerNumber(shape.y),
      setter: handleTopChange,
      prop: "top",
      tooltipId: "y-position-tooltip",
    },
    {
      label: "W",
      value: toIntegerNumber(shape.width),
      setter: handleWidthChange,
      prop: "width",
      tooltipId: "width-tooltip",
    },
    {
      label: "H",
      value: toIntegerNumber(shape.height),
      setter: handleHeightChange,
      prop: "height",
      tooltipId: "height-tooltip",
    },
  ];

  return (
    <div className={styles["property"]}>
      <div className={styles["property-header"]}>
        <span className={styles["property-title"]}>Properties</span>
      </div>
      <div className={styles["property-body"]}>
        {shapeProperties.map(({ label, value, setter, prop, tooltipId }) => (
          <div key={label} className={styles["property-item"]}>
            <div
              className={styles["property-item__value"]}
              data-tooltip-id={tooltipId}
            >
              <div className={styles["property-item__label"]}>{label}</div>
              <input
                placeholder={prop}
                className={styles["property-item__input"]}
                value={value}
                onChange={setter}
              />
            </div>
          </div>
        ))}
      </div>
      <Tooltip id="x-position-tooltip" place="top" content="X-position" />
      <Tooltip id="y-position-tooltip" place="top" content="Y-position" />
      <Tooltip id="width-tooltip" place="top" content="Width" />
      <Tooltip id="height-tooltip" place="top" content="Height" />
    </div>
  );
};

export default ShapeProperty;
