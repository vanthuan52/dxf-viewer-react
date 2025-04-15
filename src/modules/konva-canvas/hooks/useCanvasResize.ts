import { useState, useEffect } from "react";
import { MENU_BAR_HEIGHT } from "../constants";

const useCanvasResize = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight - MENU_BAR_HEIGHT,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - MENU_BAR_HEIGHT, // minus nagivation height
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useCanvasResize;
