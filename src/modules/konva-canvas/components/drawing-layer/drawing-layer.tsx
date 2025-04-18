import React from "react";
import {
  Rect as KonvaRect,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Ellipse as KonvaEllipse,
  Text as KonvaText,
  Arc as KonvaArc,
  Group as KonvaGroup,
} from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  GroupProps,
  LineShape,
  ShapeProps,
  TextShape,
} from "../../types/shapes";
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
            x: shape.x || 0,
            y: shape.y || 0,
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
              return (
                <KonvaRect
                  key={shape.id}
                  {...commonProps}
                  width={shape.width}
                  height={shape.height}
                  cornerRadius={shape.cornerRadius}
                />
              );
            case DrawingAction.Diamond:
              return (
                <KonvaRect
                  key={shape.id}
                  {...commonProps}
                  sides={4}
                  radius={(shape.width ?? 50) / 2}
                  rotation={45}
                />
              );
            case DrawingAction.Circle:
              return (
                <KonvaCircle
                  key={shape.id}
                  {...commonProps}
                  radius={shape.radius}
                />
              );
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
                  lineCap="round"
                  tension={shape.tension}
                  closed={shape.closed}
                />
              );

            case DrawingAction.Arrow:
              return (
                <KonvaArrow
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  pointerLength={shape.pointerLength}
                  pointerWidth={shape.pointerWidth}
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
                  closed
                  tension={shape.tension}
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

            case DrawingAction.Triangle:
              return (
                <KonvaLine
                  key={shape.id}
                  {...commonProps}
                  points={shape.points}
                  closed
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

            case DrawingAction.Group:
              const groupProps = commonProps as GroupProps;
              return (
                <KonvaGroup key={groupProps.id} {...groupProps}>
                  {groupProps.children.map((childShape) => {
                    if (!childShape) return null;
                    const childCommonProps = {
                      ...childShape,
                      x: childShape.x || 0,
                      y: childShape.y || 0,
                      draggable: false,
                    };
                    switch (childShape.type) {
                      case DrawingAction.Line:
                        return (
                          <KonvaLine
                            key={childShape.id}
                            {...(childCommonProps as LineShape)}
                            points={childShape.points}
                            strokeWidth={(childShape as LineShape).strokeWidth}
                            stroke={(childShape as LineShape).stroke}
                            dash={(childShape as LineShape).dash}
                          />
                        );
                      case DrawingAction.Text:
                        return (
                          <KonvaText
                            key={childShape.id}
                            {...(childCommonProps as LineShape)}
                            text={childShape.text}
                            fontSize={(childShape as TextShape).fontSize}
                            fill={(childShape as TextShape).fill}
                          />
                        );
                      // Thêm các case khác cho các loại shape có thể nằm trong Group
                      default:
                        return null;
                    }
                  })}
                </KonvaGroup>
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
