import { DXFEntity } from "../types/dxf";

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
