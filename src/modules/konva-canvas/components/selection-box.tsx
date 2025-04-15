import React from "react";
import { Rect } from "react-konva";

interface SelectionBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

// When clicking object(s), then see the box that surrounds it
const SelectionBox: React.FC<SelectionBoxProps> = ({ x, y, width, height }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(0,0,255,0.5)"
      stroke="#0099ff"
      strokeWidth={1}
    />
  );
};

export default SelectionBox;
