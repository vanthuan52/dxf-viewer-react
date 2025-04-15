import { useEffect, useState } from "react";
import { parseDXF } from "../services/dxfService";
import { DXFParsedData } from "../types/dxf";

export const useDXFLoader = (dxfContent: string) => {
  const [parsedData, setParsedData] = useState<DXFParsedData | null>(null);

  useEffect(() => {
    if (dxfContent) {
      try {
        const result = parseDXF(dxfContent);
        setParsedData(result);
      } catch (error) {
        console.error("DXF Parse error:", error);
      }
    }
  }, [dxfContent]);

  return parsedData;
};
