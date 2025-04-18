import React from "react";
import FixedMenu from "../components/fixed-menu/fixed-menu";
import LayerPanel from "../components/layer-panel/layer-panel";
import ViewerStatus from "../components/viewer-status/viewer-status";
import CanvasContainer from "../components/canvas-container/canvas-container";
import { useDxfViewer } from "../hooks/useDxfViewer";
import CanvasLayout from "../layouts/canvas-layout";
import PanelHeader from "../components/panel-header/panel-header";
import PanelMenu from "../components/panel-menu/panel-menu";

const DxfViewerPage: React.FC = () => {
  const {
    viewerContainerRef,
    loadFile,
    handleLayerVisibilityChange,
    isLoading,
    error,
    fileName,
    layers,
  } = useDxfViewer();

  return (
    <CanvasLayout>
      <PanelHeader />
      <PanelMenu onFileSelected={loadFile} isFileLoading={isLoading} />
      <ViewerStatus isLoading={isLoading} fileName={fileName} error={error} />
      <FixedMenu>
        <LayerPanel
          layers={layers}
          onLayerVisibilityChange={handleLayerVisibilityChange}
        />
      </FixedMenu>

      <CanvasContainer containerRef={viewerContainerRef} />
    </CanvasLayout>
  );
};

export default DxfViewerPage;
