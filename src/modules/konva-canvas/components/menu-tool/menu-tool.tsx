import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  Circle,
  Component,
  Hand,
  Hexagon,
  Minus,
  MousePointer2,
  Pencil,
  PenTool,
  Redo2,
  Square,
  Trash2,
  Type,
  Undo2,
} from "lucide-react";
import styles from "./menu-tool.module.scss";
import { ToolItems } from "@/modules/konva-canvas/types";
import { canvasActions } from "../../store/canvas-slice";
import { RootState, useAppSelector } from "@/store";
import CustomPopover from "@/components/custom-popover/custom-popover";
import ToolItem from "./tool-item";
import { DrawingAction } from "../../types";

const controlTools: ToolItems = {
  [DrawingAction.Select]: {
    id: DrawingAction.Select,
    label: "Select",
    icon: <MousePointer2 size={18} />,
  },
  [DrawingAction.Panning]: {
    id: DrawingAction.Panning,
    label: "Hand tool",
    icon: <Hand size={18} />,
  },
};

const shapeTools: ToolItems = {
  [DrawingAction.Rectangle]: {
    id: DrawingAction.Rectangle,
    label: "Rect",
    icon: <Square size={18} />,
  },
  [DrawingAction.Circle]: {
    id: DrawingAction.Circle,
    label: "Circle",
    icon: <Circle size={18} />,
  },
  [DrawingAction.Line]: {
    id: DrawingAction.Line,
    label: "Line",
    icon: <Minus size={18} />,
  },
  [DrawingAction.Ellipse]: {
    id: DrawingAction.Ellipse,
    label: "Ellipse",
    icon: <Circle size={18} />,
  },
  [DrawingAction.Polygon]: {
    id: DrawingAction.Polygon,
    label: "Polygon",
    icon: <Hexagon size={18} />,
  },
};

const drawTools: ToolItems = {
  [DrawingAction.Pen]: {
    id: DrawingAction.Pen,
    label: "Pen",
    icon: <PenTool size={18} />,
  },
  [DrawingAction.Scribble]: {
    id: DrawingAction.Scribble,
    label: "Pencil",
    icon: <Pencil size={18} />,
  },
};

const textTools: ToolItems = {
  [DrawingAction.Text]: {
    id: DrawingAction.Text,
    label: "Text",
    icon: <Type size={18} />,
  },
};

const additionalTools: ToolItems = {
  [DrawingAction.Undo]: {
    id: DrawingAction.Undo,
    label: "Undo",
    icon: <Undo2 size={18} />,
  },
  [DrawingAction.Redo]: {
    id: DrawingAction.Redo,
    label: "Redo",
    icon: <Redo2 size={18} />,
  },
  [DrawingAction.Clear]: {
    id: DrawingAction.Clear,
    label: "Clear",
    icon: <Trash2 size={18} />,
  },
};

interface MenuToolProps {
  undo?: any;
  canUndo?: boolean;
  redo?: any;
  canRedo?: boolean;
}

const MenuTool = ({}: MenuToolProps) => {
  const dispatch = useDispatch();
  const drawingAction = useAppSelector(
    (state: RootState) => state.canvas.drawingAction
  );

  const setActiveTool = (drawingAction: DrawingAction) => {
    dispatch(canvasActions.setDrawingAction(drawingAction));

    switch (drawingAction) {
      case DrawingAction.Text: {
        dispatch(canvasActions.setDrawingAction(DrawingAction.Text));
        break;
      }
      case DrawingAction.Clear: {
        dispatch(canvasActions.setDrawingAction(DrawingAction.Clear));
        break;
      }
      case DrawingAction.Undo: {
        dispatch(canvasActions.setDrawingAction(DrawingAction.Undo));
        break;
      }
      case DrawingAction.Redo: {
        dispatch(canvasActions.setDrawingAction(DrawingAction.Redo));
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={styles["canvas-tools"]}>
      <div className={styles["tools"]}>
        <ToolItem
          tools={controlTools}
          drawingAction={drawingAction}
          setActiveTool={setActiveTool}
          defaultToolId={DrawingAction.Select}
        />

        <ToolItem
          tools={shapeTools}
          drawingAction={drawingAction}
          setActiveTool={setActiveTool}
          defaultToolId={DrawingAction.Rectangle}
        />

        <ToolItem
          tools={textTools}
          drawingAction={drawingAction}
          setActiveTool={setActiveTool}
          defaultToolId={DrawingAction.Text}
        />

        <ToolItem
          tools={drawTools}
          drawingAction={drawingAction}
          setActiveTool={setActiveTool}
          defaultToolId={DrawingAction.Scribble}
        />

        <div className={styles["tools-item"]}>
          <div className={styles["tools-item__dropdown"]}>
            <CustomPopover trigger={<Component size={24} />}>
              <div className={styles["menu"]}>
                {Object.values(additionalTools).map((tool) => (
                  <div
                    key={tool.id}
                    className={clsx(styles["menu-item"], {
                      [styles["active"]]: drawingAction === tool.id,
                      [styles["disabled"]]: tool.id !== DrawingAction.Clear,
                    })}
                    onClick={() => setActiveTool(tool.id)}
                  >
                    <div className={styles["menu-item__icon"]}>{tool.icon}</div>
                    <div className={styles["menu-item__label"]}>
                      {tool.label}
                    </div>
                  </div>
                ))}
              </div>
            </CustomPopover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTool;
