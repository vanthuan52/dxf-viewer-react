import React from "react";
import { Transformer } from "react-konva";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { KonvaEventObject } from "konva/lib/Node";

interface TransformerWrapperProps {
  transformerRef: React.RefObject<TransformerType | null>;
  handleTransformEnd: (e: KonvaEventObject<MouseEvent>) => void;
}

export const TransformerWrapper: React.FC<TransformerWrapperProps> = ({
  transformerRef,
  handleTransformEnd,
}) => {
  return (
    <Transformer
      ref={transformerRef}
      rotateEnabled
      boundBoxFunc={(oldBox, newBox) => {
        // Limit resize
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }}
      onTransformEnd={handleTransformEnd}
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
  );
};
