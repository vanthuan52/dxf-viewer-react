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

const PolygonShape: React.FC<Props> = ({
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
      fill={isSelected ? "red" : undefined}
      stroke={isSelected ? "black" : "blue"}
      strokeWidth={2}
      closed
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

export default PolygonShape;
