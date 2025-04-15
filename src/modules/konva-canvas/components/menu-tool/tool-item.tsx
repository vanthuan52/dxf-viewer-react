import React from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import styles from "./menu-tool.module.scss";
import { ToolItems } from "@/modules/konva-canvas/types";
import CustomPopover from "@/components/custom-popover/custom-popover";
import { DrawingAction } from "../../types";

interface ToolItemProps {
  tools: ToolItems;
  drawingAction: DrawingAction;
  setActiveTool: (drawingAction: DrawingAction) => void;
  defaultToolId: DrawingAction;
}

const ToolItem: React.FC<ToolItemProps> = ({
  tools,
  drawingAction,
  setActiveTool,
  defaultToolId,
}) => {
  const currentTool = tools[drawingAction] || tools[defaultToolId];

  return (
    <div className={styles["tools-item"]}>
      <div
        className={clsx(styles["tools-item__main"], {
          [styles["active"]]: drawingAction in tools,
        })}
        onClick={() => setActiveTool(defaultToolId)}
      >
        {React.cloneElement(currentTool.icon, { size: 24 })}
      </div>
      {Object.keys(tools).length > 1 && (
        <div className={styles["tools-item__dropdown"]}>
          <CustomPopover trigger={<ChevronDown size={14} />}>
            <div className={styles["menu"]}>
              {Object.values(tools).map((tool) => (
                <div
                  key={tool.id}
                  className={clsx(styles["menu-item"], {
                    [styles["active"]]: drawingAction === tool.id,
                  })}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <div className={styles["menu-item__icon"]}>{tool.icon}</div>
                  <div className={styles["menu-item__label"]}>{tool.label}</div>
                </div>
              ))}
            </div>
          </CustomPopover>
        </div>
      )}
    </div>
  );
};

export default ToolItem;
