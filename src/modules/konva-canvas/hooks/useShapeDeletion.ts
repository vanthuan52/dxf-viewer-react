import { useEffect } from "react";
import { ShapeProps } from "../types/shapes";

interface UseShapeDeletionProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setShapes: React.Dispatch<React.SetStateAction<ShapeProps[]>>;
}

const useShapeDeletion = ({
  selectedIds,
  setSelectedIds,
  setShapes,
}: UseShapeDeletionProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedIds.length > 0
      ) {
        setShapes((prev) =>
          prev.filter((shape) => !selectedIds.includes(shape.id))
        );
        setSelectedIds([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds, setShapes, setSelectedIds]);
};

export default useShapeDeletion;
