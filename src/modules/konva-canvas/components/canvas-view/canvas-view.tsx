import React, { useState } from "react";
import styles from "./canvas-view.module.scss";
import CanvasStage from "../canvas-stage/canvas-stage";
import MenuTool from "../menu-tool/menu-tool";
import FixedMenu from "../fixed-menu/fixed-menu";
import FileInput from "../file-input/file-input";
import { useDXFLoader } from "@/modules/konva-canvas/hooks/useDXFLoader";
import { ShapeProps } from "../../types/shapes";

const CanvasView = () => {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);
  const [dxfContent, setDxfContent] = useState("");
  const [resetZoomFlag, setResetZoomFlag] = useState(false);

  const dxfData = useDXFLoader(dxfContent, setShapes);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDxfContent(evt.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleResetZoom = () => {
    setResetZoomFlag(true);
    setTimeout(() => setResetZoomFlag(false), 0);
  };

  return (
    <div className={styles["canvas-view"]}>
      <FixedMenu>
        <div className={styles["sidemenu-heading"]}>
          <h3 className={styles["sidemenu-heading__header"]}>Menu</h3>
        </div>
        <div className={styles["sidemenu-content"]}>
          <div className={styles["sidemenu-items"]}>
            <div className={styles["sidemenu-items__heading"]}>
              DXF Loader (developing...)
            </div>
            <FileInput onFileSelected={handleFileChange} />
          </div>

          <div className={styles["sidemenu-items"]}>
            <div className={styles["sidemenu-items__heading"]}>Actions</div>
            <button
              className={styles["sidemenu-item__button"]}
              onClick={handleResetZoom}
            >
              Reset Zoom
            </button>
          </div>

          <div className={styles["sidemenu-items"]}>
            <div className={styles["sidemenu-items__heading"]}>Pages</div>
            <div className={styles["sidemenu-items__pages"]}>
              <button
                className={styles["sidemenu-items__pages-item"]}
                onClick={handleResetZoom}
              >
                <a href="/">DXF Viewer</a>
              </button>
            </div>
          </div>
        </div>
      </FixedMenu>
      <CanvasStage
        dxfData={dxfData}
        shapes={shapes}
        setShapes={setShapes}
        resetZoomFlag={resetZoomFlag}
        onResetZoom={() => {}}
      />
      <MenuTool />
    </div>
  );
};

export default CanvasView;
