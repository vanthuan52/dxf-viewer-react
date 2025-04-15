import React from "react";
import CanvasLayout from "@/modules/konva-canvas/layouts/canvas-layout/canvas-layout";
import CanvasStage from "@/modules/konva-canvas/components/canvas-stage/canvas-stage";

const ViewPage: React.FC = () => {
  return (
    <CanvasLayout>
      <CanvasStage />
    </CanvasLayout>
  );
};

export default ViewPage;
