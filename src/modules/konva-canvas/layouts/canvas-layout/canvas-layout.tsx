import React from "react";
import MenuBar from "@/modules/konva-canvas/components/menu-bar/menu-bar";
import MenuTool from "../../components/menu-tool/menu-tool";

interface MainLayoutProps {
  children: React.ReactNode;
}

const CanvasLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <MenuBar />
      <div className="flex-1">{children}</div>
      <MenuTool />
    </div>
  );
};

export default CanvasLayout;
