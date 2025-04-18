import React, { useState, useEffect } from "react";
import styles from "./layer-panel.module.scss";
import { Layer } from "../../types/layer";

interface LayerPanelProps {
  layers: Layer[];
  onLayerVisibilityChange: (layerName: string, visible: boolean) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  onLayerVisibilityChange,
}) => {
  const [layerVisibility, setLayerVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    layers.forEach((layer) => {
      initialVisibility[layer.name] =
        layer.visible !== undefined ? layer.visible : true;
    });
    setLayerVisibility(initialVisibility);
  }, [layers]);

  const handleVisibilityChange = (layerName: string, isVisible: boolean) => {
    setLayerVisibility((prevVisibility) => ({
      ...prevVisibility,
      [layerName]: isVisible,
    }));
    onLayerVisibilityChange(layerName, isVisible);
  };

  return (
    <div className={styles["layers-container"]}>
      <ul className={styles["layers-list"]}>
        {layers.map((layer) => (
          <li key={layer.name} className={styles["layers-item"]}>
            <div
              className={styles["layers-color-indicator"]}
              style={{
                backgroundColor: `#${layer.color
                  .toString(16)
                  .padStart(6, "0")}`,
              }}
            ></div>
            <input
              type="checkbox"
              checked={
                layerVisibility[layer.name] === undefined
                  ? true
                  : layerVisibility[layer.name]
              }
              onChange={(e) =>
                handleVisibilityChange(layer.name, e.target.checked)
              }
            />
            <label>{layer.displayName}</label>
          </li>
        ))}
        {layers.length === 0 && <p>No layers, please load a DXF file.</p>}
      </ul>
    </div>
  );
};

export default LayerPanel;
