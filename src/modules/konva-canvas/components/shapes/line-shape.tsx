import React from "react";
import { Line } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface Props {
  id: string;
  x: number;
  y: number;
  points: number[];
  isSelected: boolean;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  onDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
  draggable?: boolean;
  dash?: number[];
}

const LineShape: React.FC<Props> = ({
  id,
  x,
  y,
  points,
  isSelected,
  rotation = 0,
  scaleX = 1,
  scaleY = 1,
  onClick,
  onDragEnd,
  draggable = false,
  dash,
}) => {
  return (
    <Line
      id={id}
      x={x}
      y={y}
      points={points}
      stroke={isSelected ? "black" : "blue"}
      fill={isSelected ? "red" : undefined}
      strokeWidth={2}
      rotation={rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      hitStrokeWidth={15}
      onClick={onClick}
      onDragEnd={onDragEnd}
      draggable={draggable}
      dash={dash}
    />
  );
};

export default LineShape;
