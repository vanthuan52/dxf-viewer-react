import React from "react";
import { Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface Props {
  id: string;
  x: number;
  y: number;
  radius: number;
  isSelected: boolean;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  onDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
  draggable?: boolean;
  dash?: number[];
}

const CircleShape: React.FC<Props> = ({
  id,
  x,
  y,
  radius,
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
    <Circle
      id={id}
      x={x}
      y={y}
      radius={radius}
      fill={isSelected ? "red" : undefined}
      stroke={isSelected ? "black" : "blue"}
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

export default CircleShape;
