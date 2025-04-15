import { Line, Circle, Text, Group, Arc } from "react-konva";
import { DXFEntity } from "../types/dxf";

interface Props {
  entity: DXFEntity;
  isSelected: boolean;
  onSelect: () => void;
  onDragEnd: (e: any) => void;
  blocks?: Record<string, { entities: DXFEntity[] }>;
}

export const EntityRenderer = ({
  entity,
  isSelected,
  onSelect,
  onDragEnd,
  blocks,
}: Props) => {
  if (!entity || !entity.type) return null;

  switch (entity.type) {
    case "LINE":
      if (!entity.start || !entity.end) return null;
      return (
        <Line
          points={[
            entity.start.x,
            -entity.start.y,
            entity.end.x,
            -entity.end.y,
          ]}
          stroke="black"
          strokeWidth={2}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        />
      );

    case "CIRCLE":
      if (!entity.center || entity.radius === undefined) return null;
      return (
        <Circle
          x={entity.center.x}
          y={entity.center.y}
          radius={entity.radius}
          stroke="orange"
          strokeWidth={2}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        />
      );

    case "TEXT":
      if (!entity.startPoint || !entity.text) return null;
      return (
        <Text
          x={entity.startPoint.x}
          y={entity.startPoint.y}
          text={entity.text}
          fontSize={entity.textHeight || 16}
          scaleX={entity.xScale || 1}
          fill="#013220"
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        />
      );

    case "DIMENSION":
      if (
        !entity.linearOrAngularPoint1 ||
        !entity.linearOrAngularPoint2 ||
        !entity.middleOfText
      )
        return null;

      return (
        <Group
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        >
          {/* Đường đo */}
          <Line
            points={[
              entity.linearOrAngularPoint1.x,
              entity.linearOrAngularPoint1.y,
              entity.linearOrAngularPoint2.x,
              entity.linearOrAngularPoint2.y,
            ]}
            stroke="red"
            strokeWidth={1}
            dash={[4, 4]}
          />
          {/* Text độ dài */}
          <Text
            x={entity.middleOfText.x}
            y={entity.middleOfText.y}
            text={entity.actualMeasurement?.toFixed(2) || ""}
            fontSize={14}
            fill="red"
          />
        </Group>
      );

    case "LWPOLYLINE":
      if (!entity.vertices || entity.vertices.length < 2) return null;

      // Tạo danh sách điểm nối (x1, y1, x2, y2, ..., xn, yn)
      const points = entity.vertices.flatMap((v: any) => [v.x, v.y]);

      // Nếu đóng kín polyline (điểm đầu != điểm cuối), nối điểm cuối về đầu
      const isClosed =
        entity.shape ||
        (entity.vertices.length >= 3 &&
          entity.vertices[0].x ===
            entity.vertices[entity.vertices.length - 1].x &&
          entity.vertices[0].y ===
            entity.vertices[entity.vertices.length - 1].y);

      if (!isClosed) {
        points.push(entity.vertices[0].x, entity.vertices[0].y);
      }

      return (
        <Line
          points={points}
          stroke="#011332"
          strokeWidth={1}
          dash={entity.lineType === "HIDDEN" ? [5, 5] : undefined}
          closed={true}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        />
      );

    case "MTEXT": {
      const {
        position,
        height,
        text,
        color,
        colorIndex,
        attachmentPoint,
        drawingDirection,
      } = entity;

      if (!position || !text) return null;

      // Xử lý định dạng DXF đơn giản (bỏ các prefix như \A1;, \P)
      const cleanedText = text;
      // .replace(/\\A\d+;/g, "") // Remove alignment codes
      // .replace(/\\P/g, "\n"); // Replace paragraph separator with newline

      return (
        <Text
          x={position.x}
          y={position.y}
          text={cleanedText}
          fontSize={height || 12}
          fill="green"
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        />
      );
    }

    case "INSERT": {
      const blockName = entity.name;
      const block = blocks?.[blockName];
      if (!block) {
        console.warn(`Block not found: ${blockName}`);
        return null;
      }

      const posX = entity.position?.x || 0;
      const posY = entity.position?.y || 0;
      const rotation = entity.rotation || 0;

      return (
        <Group
          x={posX}
          y={posY}
          rotation={rotation}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={onDragEnd}
        >
          {block.entities.map((child, idx) => (
            <EntityRenderer
              key={`${blockName}-${idx}`}
              entity={child}
              isSelected={false}
              onSelect={() => {}}
              onDragEnd={() => {}}
              blocks={blocks} // 👈 để hỗ trợ INSERT lồng nhau
            />
          ))}
        </Group>
      );
    }

    // case "ARC": {
    //   const { center, radius, startAngle, endAngle } = entity;
    //   if (!center || radius == null || startAngle == null || endAngle == null)
    //     return null;

    //   // Konva's Arc uses degrees, while DXF uses radians
    //   const konvaStartDeg = (startAngle * 180) / Math.PI;
    //   const konvaEndDeg = (endAngle * 180) / Math.PI;

    //   return (
    //     <Arc
    //       x={center.x}
    //       y={center.y}
    //       innerRadius={radius}
    //       outerRadius={radius}
    //       angle={konvaEndDeg - konvaStartDeg}
    //       rotation={konvaStartDeg}
    //       stroke="red"
    //       strokeWidth={2}
    //       draggable
    //       onClick={onSelect}
    //       onTap={onSelect}
    //       onDragEnd={onDragEnd}
    //     />
    //   );
    // }

    case "ARC":
      const { center, radius, startAngle, endAngle } = entity;
      if (
        !center ||
        radius === undefined ||
        startAngle === undefined ||
        endAngle === undefined
      )
        return null;
      return (
        <Arc
          x={center.x}
          y={-center.y}
          innerRadius={radius}
          outerRadius={radius}
          angle={(endAngle - startAngle) * (180 / Math.PI)}
          rotation={-startAngle * (180 / Math.PI)}
          stroke="black"
          strokeWidth={2}
        />
      );

    default:
      console.warn("Unsupported entity type:", entity.type, entity);
      return null;
  }
};
