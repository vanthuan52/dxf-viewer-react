import { useEffect, useRef, useState, ChangeEvent } from "react";
import { DxfViewer, DxfViewer as DxfViewerType } from "dxf-viewer";
import { Layer } from "../types/layer";
import mainFont from "/fonts/Roboto-LightItalic.ttf";
import aux1Font from "/fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf";
import aux2Font from "/fonts/HanaMinA.ttf";
import aux3Font from "/fonts/NanumGothic-Regular.ttf";

export const useDxfViewer = () => {
  const viewerRef = useRef<DxfViewerType | null>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [layerVisibility, setLayerVisibility] = useState<
    Record<string, boolean>
  >({});
  const fonts = [mainFont, aux1Font, aux2Font, aux3Font];

  useEffect(() => {
    if (viewerContainerRef.current && !viewerRef.current) {
      try {
        viewerRef.current = new DxfViewer(viewerContainerRef.current, {
          autoResize: true,
          colorCorrection: true,
          sceneOptions: { wireframeMesh: true },
        });
      } catch (err) {
        setError("Can't initialize DXF Board");
      }
    }

    return () => {
      viewerRef.current?.Destroy();
      viewerRef.current = null;
    };
  }, []);

  const handleLayerVisibilityChange = (name: string, visible: boolean) => {
    setLayerVisibility((prev) => ({ ...prev, [name]: visible }));
    viewerRef.current?.ShowLayer(name, visible);
  };

  const loadFile = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setFileName(null);
    viewerRef.current?.Clear();

    if (!file.name.toLowerCase().endsWith(".dxf")) {
      setError("Please choose a dxf file");
      return;
    }

    if (!viewerRef.current) {
      setError("Can't initialize DXF Board");
      return;
    }

    setIsLoading(true);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const blob = new Blob([e.target?.result as ArrayBuffer], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);

      try {
        // @ts-ignore
        await viewerRef.current!.Load({ url, fonts });

        const loadedLayers = viewerRef.current!.GetLayers() as Layer[];
        setLayers(loadedLayers);

        const visibilityMap: Record<string, boolean> = {};
        loadedLayers.forEach((layer) => {
          visibilityMap[layer.name] = true;
        });
        setLayerVisibility(visibilityMap);
      } catch (loadError: any) {
        setError(
          `Error on reading DXF file: ${loadError.message || String(loadError)}`
        );
      } finally {
        setIsLoading(false);
        URL.revokeObjectURL(url);
      }
    };

    reader.onerror = () => {
      setError("Error on reading DXF file.");
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return {
    viewerContainerRef,
    loadFile,
    handleLayerVisibilityChange,
    isLoading,
    error,
    fileName,
    layers,
    layerVisibility,
  };
};
