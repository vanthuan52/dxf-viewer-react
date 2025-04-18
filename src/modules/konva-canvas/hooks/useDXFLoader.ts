import { useEffect, useState } from "react";
import { parseDXF } from "../services/dxfService";
import { DXFParsedData } from "@/modules/konva-canvas/types/dxf";
import { ShapeProps } from "../types/shapes";
import { convertDxfEntityToShape } from "../utils/dxf-utils";

export const useDXFLoader = (
  dxfContent: string,
  setShapes: React.Dispatch<React.SetStateAction<ShapeProps[]>>
) => {
  const [parsedData, setParsedData] = useState<DXFParsedData | null>(null);

  useEffect(() => {
    if (dxfContent) {
      try {
        const result = parseDXF(dxfContent);
        console.log("DXF Result: ", result);
        setParsedData(result);

        if (result?.entities) {
          const konvaShapes: ShapeProps[] = result.entities.flatMap(
            (entity: any) => {
              const shape = convertDxfEntityToShape(entity);
              return shape ? (Array.isArray(shape) ? shape : [shape]) : [];
            }
          );
          setShapes((prevShapes) => [...prevShapes, ...konvaShapes]);
        }
      } catch (error) {
        console.error("DXF Parse error:", error);
        setParsedData(null);
      }
    }
  }, [dxfContent, setShapes]);

  return parsedData;
};
