import React from "react";
import {
  Rect as KonvaRect,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Ellipse as KonvaEllipse,
  Text as KonvaText,
  Arc as KonvaArc,
} from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ShapeProps } from "../../types/shapes";
import { DrawingAction } from "../../types";

type DrawingLayerProps = {
  shapes: ShapeProps[];
  shapeRefs: any;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
};

const DrawingLayer = React.memo(
  ({ shapes, shapeRefs, onDragEnd }: DrawingLayerProps) => {
    return (
      <>
        {shapes.map((shape, idx) => {
          if (!shape) return null;

          const commonProps = {
            ...shape,
            x: shape.x,
            y: shape.y,
            draggable: shape.draggable,
            ref: (node: any) => {
              if (node) {
                shapeRefs.current.set(shape.id, node);
              }
            },
            onDragEnd,
          };

          switch (shape.type) {
            case DrawingAction.Rectangle:
              return <KonvaRect key={shape.id} {...commonProps} />;
            case DrawingAction.Diamond:
              return <KonvaRect key={shape.id} {...commonProps} />;
            case DrawingAction.Circle:
              return <KonvaCircle key={shape.id} {...commonProps} />;
            case DrawingAction.Ellipse:
              return (
                <KonvaEllipse
                  key={shape.id}
                  {...commonProps}
                  radiusX={shape.radiusX}
                  radiusY={shape.radiusY}
                />
              );
            case DrawingAction.Line:
              return (
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  tension={0.5}
                  lineCap="round"
                />
              );

            case DrawingAction.Scribble:
              return (
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  tension={0.5}
                  lineCap="round"
                />
              );

            case DrawingAction.Arrow:
              return (
                <KonvaArrow
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  pointerLength={10}
                  pointerWidth={10}
                />
              );

            case DrawingAction.Text:
              return <KonvaText key={shape.id} {...commonProps} />;

            case DrawingAction.Triangle:
              return (
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  closed
                />
              );

            case DrawingAction.Polygon:
              return (
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  dash={[4, 4]}
                />
              );

            case DrawingAction.Star:
              return (
                // <KonvaStar
                //   key={shape.id}
                //   {...commonProps}
                //   numPoints={shape.numPoints || 5}
                //   innerRadius={shape.innerRadius || 30}
                //   outerRadius={shape.outerRadius || 60}
                // />
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  dash={[4, 4]}
                />
              );

            case DrawingAction.Arc:
              return (
                <KonvaArc
                  key={shape.id}
                  {...commonProps}
                  innerRadius={shape.innerRadius || 0}
                  outerRadius={shape.outerRadius || 50}
                  angle={shape.angle || 180}
                />
              );

            default:
              return null;
          }
        })}
      </>
    );
  }
);

export default DrawingLayer;
