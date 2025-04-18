import { Stage as StageType } from "konva/lib/Stage";
import { useState, useEffect, useRef, useCallback } from "react";

interface UseZoomProps {
  stageRef: React.RefObject<StageType | null>;
  zoomSensitivity?: number;
  initialScale?: { x: number; y: number };
}

const useZoom = ({
  stageRef,
  zoomSensitivity = 0.05,
  initialScale = { x: 1, y: 1 },
}: UseZoomProps) => {
  const [scale, setScale] = useState(initialScale);
  const isCtrlPressed = useRef(false);

  const resetZoom = useCallback(() => {
    setScale(initialScale);
    const stage = stageRef.current;
    if (stage) {
      stage.scale(initialScale);
      stage.position({ x: 0, y: 0 }); // Reset position về 0,0 (tùy chọn)
      stage.batchDraw();
    }
  }, [stageRef, initialScale]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        isCtrlPressed.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        isCtrlPressed.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!isCtrlPressed.current) return;

      const delta = e.deltaY > 0 ? -zoomSensitivity : zoomSensitivity;
      const newScale = {
        x: scale.x * (1 + delta),
        y: scale.y * (1 + delta),
      };

      const minScale = 0.1;
      const maxScale = 10;
      if (
        newScale.x < minScale ||
        newScale.y < minScale ||
        newScale.x > maxScale ||
        newScale.y > maxScale
      ) {
        return;
      }

      setScale(newScale);

      const pointer = stage.getPointerPosition();
      if (pointer) {
        const mousePointTo = {
          x: (pointer.x - stage.x()) / stage.scaleX(),
          y: (pointer.y - stage.y()) / stage.scaleY(),
        };

        stage.scale(newScale);

        stage.position({
          x: pointer.x - mousePointTo.x * newScale.x,
          y: pointer.y - mousePointTo.y * newScale.y,
        });
        stage.batchDraw();
      }
    };

    const container = stage.container();
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [stageRef, scale, zoomSensitivity]);

  return { scale, resetZoom };
};

export default useZoom;
