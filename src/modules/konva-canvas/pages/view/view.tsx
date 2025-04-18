import React from "react";
import CanvasLayout from "@/modules/konva-canvas/layouts/canvas-layout/canvas-layout";
import CanvasView from "../../components/canvas-view/canvas-view";

const ViewPage: React.FC = () => {
  return (
    <CanvasLayout>
      <CanvasView />
    </CanvasLayout>
  );
};

export default ViewPage;
