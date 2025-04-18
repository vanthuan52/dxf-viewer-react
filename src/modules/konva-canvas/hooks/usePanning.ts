import { useState, useCallback } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Coord } from "../types";

interface UsePanningProps {
  initialScale?: number;
}

const usePanning = ({ initialScale = 1 }: UsePanningProps) => {
  const [stagePos, setStagePos] = useState<Coord>({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState({
    x: initialScale,
    y: initialScale,
  });
  const [lastCenter, setLastCenter] = useState<Coord | null>(null);
  const [lastDist, setLastDist] = useState(0);
  const [dragStopped, setDragStopped] = useState(false);

  const getDistance = (p1: Coord, p2: Coord): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const getCenter = (p1: Coord, p2: Coord): Coord => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      const newPos = stage.position();
      setStagePos(newPos);
    }
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      const newPos = stage.position();
      setStagePos(newPos);
    }
  };

  const handleTouchMove = useCallback(
    (e: any) => {
      e.evt.preventDefault();
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];
      const stage = e.target.getStage();

      // we need to restore dragging, if it was cancelled by multi-touch
      if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
        stage.startDrag();
        setDragStopped(false);
      }

      if (touch1 && touch2) {
        // if the stage was under Konva's drag&drop
        // we need to stop it, and implement our own pan logic with two pointers
        if (stage.isDragging()) {
          stage.stopDrag();
          setDragStopped(true);
        }

        const p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        } as Coord;
        const p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        } as Coord;

        if (!lastCenter) {
          setLastCenter(getCenter(p1, p2));
          return;
        }
        const newCenter = getCenter(p1, p2);

        const dist = getDistance(p1, p2);

        if (!lastDist) {
          setLastDist(dist);
          return;
        }

        // local coordinates of center point
        const pointTo = {
          x: (newCenter.x - stagePos.x) / stageScale.x,
          y: (newCenter.y - stagePos.y) / stageScale.x,
        };

        const scale = stageScale.x * (dist / lastDist);

        setStageScale({ x: scale, y: scale });

        // calculate new position of the stage
        const dx = newCenter.x - lastCenter.x;
        const dy = newCenter.y - lastCenter.y;

        setStagePos({
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        });

        setLastDist(dist);
        setLastCenter(newCenter);
      }
    },
    [dragStopped, lastCenter, lastDist, stagePos, stageScale]
  );

  const handleTouchEnd = () => {
    setLastDist(0);
    setLastCenter(null);
  };

  return {
    stagePos,
    stageScale,
    handleDragMove,
    handleDragEnd,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default usePanning;
