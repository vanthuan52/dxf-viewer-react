import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { DxfViewer, DxfViewer as DxfViewerType } from "dxf-viewer";
import mainFont from "/fonts/Roboto-LightItalic.ttf";
import aux1Font from "/fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf";
import aux2Font from "/fonts/HanaMinA.ttf";
import aux3Font from "/fonts/NanumGothic-Regular.ttf";

import styles from "./canvas-screen.module.scss";
import { Layer } from "../../types/layer";
import LayerPanel from "../layer-panel/layer-panel";
import FixedMenu from "../fixed-menu/fixed-menu";

const CanvasScreen: React.FC = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<DxfViewerType | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [layerVisibility, setLayerVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const fonts = [mainFont, aux1Font, aux2Font, aux3Font];

  useEffect(() => {
    if (viewerContainerRef.current && !viewerRef.current) {
      console.log("Initializing DxfViewer...");
      try {
        const viewer = new DxfViewer(viewerContainerRef.current, {
          autoResize: true,
          colorCorrection: true,
          sceneOptions: {
            wireframeMesh: true,
          },
        });

        viewerRef.current = viewer;

        console.log("DxfViewer Initialized.");
      } catch (initError) {
        console.error("Error initializing DxfViewer:", initError);
        setError(
          `Không thể khởi tạo trình xem DXF: ${
            initError instanceof Error ? initError.message : String(initError)
          }`
        );
      }
    }

    return () => {
      if (viewerRef.current) {
        console.log("Destroying DxfViewer...");
        viewerRef.current.Destroy();
        viewerRef.current = null;
        console.log("DxfViewer Destroyed.");
      }
    };
  }, []);

  const handleLayerVisibilityChange = (layerName: string, visible: boolean) => {
    setLayerVisibility((prevVisibility) => ({
      ...prevVisibility,
      [layerName]: visible,
    }));
    if (viewerRef.current) {
      viewerRef.current.ShowLayer(layerName, visible);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setFileName(null);
    viewerRef.current?.Clear();

    if (file && viewerRef.current) {
      if (!file.name.toLowerCase().endsWith(".dxf")) {
        setError("Vui lòng chọn một file có định dạng .dxf");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = async (e) => {
        const dxfBlob = new Blob([e.target?.result as ArrayBuffer], {
          type: "application/octet-stream",
        });
        const dxfUrl = URL.createObjectURL(dxfBlob);

        if (viewerRef.current) {
          setIsLoading(true);
          setFileName(file.name);
          try {
            // @ts-ignore
            await viewerRef.current.Load({ url: dxfUrl, fonts: fonts });

            const initialLayers = viewerRef.current.GetLayers() as Layer[];
            setLayers(initialLayers);

            const initialVisibility: { [key: string]: boolean } = {};
            initialLayers.forEach((layer) => {
              initialVisibility[layer.name] = true;
            });
            setLayerVisibility(initialVisibility);

            console.log("DXF Loaded successfully via URL.");
          } catch (loadError: any) {
            console.error("Error loading DXF via URL:", loadError);
            setError(
              `Lỗi khi đọc file DXF: ${loadError.message || String(loadError)}`
            );
          } finally {
            setIsLoading(false);
            URL.revokeObjectURL(dxfUrl); // Giải phóng URL sau khi tải
          }
        }
      };

      reader.onerror = (e) => {
        console.error("File reading error:", e);
        setError("Đã xảy ra lỗi khi đọc file.");
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } else {
      if (!file) {
        setError(null);
      }
      if (!viewerRef.current) {
        setError("Trình xem DXF chưa được khởi tạo.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["viewer-container"]}>
      <FixedMenu>
        <LayerPanel
          layers={layers}
          onLayerVisibilityChange={handleLayerVisibilityChange}
        />
      </FixedMenu>

      <h1 className={styles["viewer-title"]}>DXF Viewer</h1>
      <p className={styles["viewer-subtitle"]}>
        Chọn một file DXF từ máy tính của bạn:
      </p>
      <input
        type="file"
        accept=".dxf"
        onChange={handleFileChange}
        disabled={isLoading}
        className={styles["viewer-input"]}
      />

      {isLoading && (
        <p className={styles["viewer-message-info"]}>
          Đang tải file: {fileName || ""}...
        </p>
      )}
      {error && <p className={styles["viewer-message-error"]}>{error}</p>}
      {!isLoading && fileName && !error && (
        <p className={styles["viewer-message-success"]}>
          Đang hiển thị: {fileName}
        </p>
      )}

      <div
        ref={viewerContainerRef}
        className={styles["viewer-canvas-container"]}
      >
        {!viewerRef.current && !error && <p>Đang khởi tạo trình xem...</p>}
      </div>
    </div>
  );
};

export default CanvasScreen;
