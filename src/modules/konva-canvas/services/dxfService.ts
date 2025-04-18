import DxfParser from "dxf-parser";
import { DXFParsedData } from "../types/dxf";

export const parseDXF = (dxfString: string): DXFParsedData => {
  const parser = new DxfParser();
  const result = parser.parseSync(dxfString);

  if (!result || !result.entities) {
    throw new Error("Failed to parse DXF file: invalid format.");
  }

  return {
    entities: result.entities,
    blocks: result.blocks || {},
  };
};
