import { useState, useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { EntityRenderer } from "./EntityRenderer";
import { DXFParsedData } from "../types/dxf";
import { normalizeEntities } from "@/utils/dxfUtils";

interface Props {
  dxfData: DXFParsedData;
}

export const DXFCanvas = ({ dxfData }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleSelect = (index: number) => setSelectedId(index);
  const layerRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const tool = "pan";

  const handleDragEnd = (index: number, e: any) => {
    console.log("Entity moved:", index, e.target.x(), e.target.y());
    // TODO: Update entity position in state if needed
  };

  const normalizedEntities = normalizeEntities(dxfData.entities);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "pan"}
    >
      <Layer>
        {normalizedEntities.map((entity, index) => (
          <EntityRenderer
            key={index}
            entity={entity}
            isSelected={selectedId === index}
            onSelect={() => handleSelect(index)}
            onDragEnd={(e) => handleDragEnd(index, e)}
            blocks={dxfData.blocks}
          />
        ))}
        <Transformer
          ref={transformerRef}
          rotateEnabled
          enabledAnchors={[
            "top-left",
            "top-center",
            "top-right",
            "middle-left",
            "middle-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ]}
        />
      </Layer>
    </Stage>
  );
};
