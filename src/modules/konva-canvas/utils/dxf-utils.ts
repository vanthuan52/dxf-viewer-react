import { v4 as uuidv4 } from "uuid";
import { DrawingAction } from "../types";
import { DXFEntity } from "../types/dxf";
import { GroupProps, ShapeProps } from "../types/shapes";

export const normalizeEntities = (entities: DXFEntity[]) => {
  const allPoints = entities.flatMap((entity) => {
    switch (entity.type) {
      case "LINE":
        return [entity.start, entity.end];
      case "CIRCLE":
        return [entity.center];
      case "ARC":
        return [entity.center];
      case "TEXT":
      case "MTEXT":
        return [entity.position];
      case "INSERT":
        return [entity.position];
      case "LWPOLYLINE":
        return entity.vertices;
      default:
        return [];
    }
  });

  const xs = allPoints.map((p) => p?.x || 0);
  const ys = allPoints.map((p) => p?.y || 0);

  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  const offsetX = -minX + 50;
  const offsetY = -minY + 50;

  return entities.map((entity) => applyOffset(entity, offsetX, offsetY));
};

const applyOffset = (
  entity: DXFEntity,
  offsetX: number,
  offsetY: number
): DXFEntity => {
  const offsetPoint = (p: any) =>
    p ? { ...p, x: p.x + offsetX, y: p.y + offsetY } : p;

  switch (entity.type) {
    case "LINE":
      return {
        ...entity,
        start: offsetPoint(entity.start),
        end: offsetPoint(entity.end),
      };
    case "CIRCLE":
    case "ARC":
      return {
        ...entity,
        center: offsetPoint(entity.center),
      };
    case "TEXT":
    case "MTEXT":
      return {
        ...entity,
        position: offsetPoint(entity.position),
      };
    case "INSERT":
      return {
        ...entity,
        position: offsetPoint(entity.position),
      };
    case "LWPOLYLINE":
      return {
        ...entity,
        vertices: entity.vertices?.map(offsetPoint),
      };
    default:
      return entity;
  }
};

const dxfColorToKonvaFill = (
  colorNumber: number | undefined
): string | undefined => {
  if (colorNumber === 1) return "red";
  if (colorNumber === 2) return "yellow";
  if (colorNumber === 3) return "green";
  return "black"; // Màu mặc định
};

const dxfLineTypeToKonvaDash = (
  lineType: string | undefined,
  lineScaleFactor: number | undefined
): number[] | undefined => {
  if (!lineType || lineType === "CONTINUOUS") return undefined;
  const scale = lineScaleFactor || 1;
  switch (lineType) {
    case "DASHED":
      return [4 * scale, 4 * scale];
    case "CENTER":
      return [12 * scale, 4 * scale, 2 * scale, 4 * scale];
    case "HIDDEN":
      return [2 * scale, 2 * scale];
    // Add more
    default:
      return undefined;
  }
};

export const convertDxfEntityToShape = (
  entity: DXFEntity,
  blocks?: Record<string, { entities: DXFEntity[] }>
): ShapeProps | null | ShapeProps[] => {
  switch (entity.type) {
    case "LINE":
      if (!entity.vertices || entity.vertices.length !== 2) return null;
      return {
        id: uuidv4(),
        type: DrawingAction.Line,
        x: 0,
        y: 0,
        points: [
          entity.vertices[0].x,
          -entity.vertices[0].y,
          entity.vertices[1].x,
          -entity.vertices[1].y,
        ],
        stroke: dxfColorToKonvaFill(entity.color),
        strokeWidth: entity.thickness || 1,
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
        dash: dxfLineTypeToKonvaDash(entity.lineType, entity.ltscale),
      };

    case "CIRCLE":
      if (!entity.center || entity.radius === undefined) return null;
      return {
        id: uuidv4(),
        type: DrawingAction.Circle,
        x: entity.center.x,
        y: -entity.center.y,
        radius: entity.radius,
        stroke: dxfColorToKonvaFill(entity.color),
        strokeWidth: entity.thickness || 1,
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
      };

    case "ARC": {
      const { center, radius, startAngle, endAngle } = entity;
      if (
        !center ||
        radius === undefined ||
        startAngle === undefined ||
        endAngle === undefined
      ) {
        return null;
      }

      const konvaStartDeg = -startAngle * (180 / Math.PI);
      const konvaEndDeg = -endAngle * (180 / Math.PI);
      const angle = konvaEndDeg - konvaStartDeg;

      return {
        id: uuidv4(),
        type: DrawingAction.Arc,
        x: center.x,
        y: -center.y,
        innerRadius: radius,
        outerRadius: radius,
        angle: angle,
        rotation: konvaStartDeg,
        stroke: dxfColorToKonvaFill(entity.color),
        strokeWidth: entity.thickness || 1,
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
      };
    }

    case "TEXT":
      if (!entity.startPoint || typeof entity.text !== "string") return null;
      return {
        id: uuidv4(),
        type: DrawingAction.Text,
        x: entity.startPoint.x,
        y: -entity.startPoint.y,
        text: entity.text,
        fontSize: entity.textHeight || 16,
        scaleX: entity.xScale || 1,
        fill: dxfColorToKonvaFill(entity.color),
        rotation: -(entity.rotation || 0) * (180 / Math.PI),
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
      } as ShapeProps;

    case "MTEXT": {
      if (!entity.position || typeof entity.text !== "string") return null;

      const cleanedText = entity.text
        .replace(/\\A\d+;/g, "")
        .replace(/\\P/g, "\n");

      return {
        id: uuidv4(),
        type: DrawingAction.Text,
        x: entity.position.x,
        y: -entity.position.y,
        text: cleanedText,
        fontSize: entity.height || 12,
        fill: dxfColorToKonvaFill(entity.color),
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
      } as ShapeProps;
    }

    case "LWPOLYLINE": {
      if (!entity.vertices || entity.vertices.length < 2) return null;

      const points: number[] = entity.vertices.flatMap((v: any) => [v.x, -v.y]);

      return {
        id: uuidv4(),
        type: DrawingAction.Line,
        x: 0,
        y: 0,
        points: points,
        stroke: dxfColorToKonvaFill(entity.color),
        strokeWidth: entity.thickness || 1,
        draggable: true,
        closed:
          entity.shape ||
          (entity.vertices.length >= 3 &&
            entity.vertices[0].x ===
              entity.vertices[entity.vertices.length - 1].x &&
            entity.vertices[0].y ===
              entity.vertices[entity.vertices.length - 1].y),
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
        dash: dxfLineTypeToKonvaDash(entity.lineType, entity.ltscale),
      };
    }

    case "INSERT": {
      const blockName = entity.name;
      const block = blocks?.[blockName];
      if (!block || !block.entities) {
        console.warn(
          `Block not found or has no entities: ${blockName}`,
          entity
        );
        return null;
      }

      const childrenShapes: ShapeProps[] = block.entities
        .map((childEntity) => convertDxfEntityToShape(childEntity, blocks))
        .filter((shape): shape is ShapeProps => Boolean(shape));

      return {
        id: uuidv4(),
        type: DrawingAction.Group,
        x: entity.position?.x || 0,
        y: -(entity.position?.y || 0),
        rotation: -(entity.rotation || 0),
        scaleX: entity.xScale || 1,
        scaleY: entity.yScale || 1,
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
        children: childrenShapes,
      } as GroupProps;
    }

    case "DIMENSION": {
      const blockName = entity.block;
      const block = blocks?.[blockName];
      if (!block || !block.entities) {
        console.warn(
          `Dimension block not found or has no entities: ${blockName}`,
          entity
        );
        return null;
      }

      // Tạm thời chỉ trả về group chứa các entity con
      // @ts-ignore
      const childrenShapes: ShapeProps[] = block.entities
        .map((childEntity) => convertDxfEntityToShape(childEntity, blocks))
        .filter(Boolean)
        .flat();

      return {
        id: uuidv4(),
        type: DrawingAction.Group,
        x: entity.anchorPoint?.x || 0,
        y: -(entity.anchorPoint?.y || 0),
        draggable: true,
        opacity: entity.transparency ? 1 - entity.transparency : 1,
        visible: entity.visible !== false,
        layer: entity.layer,
        children: childrenShapes,
      } as GroupProps;
    }
    // Add more entity

    default:
      return null;
  }
};
