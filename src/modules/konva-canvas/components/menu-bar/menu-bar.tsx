import React from "react";
import { MENU_BAR_HEIGHT } from "../../constants";

const MenuBar: React.FC = () => {
  return (
    <div
      className={`w-full min-h-[${MENU_BAR_HEIGHT}px] bg-gray-100 shadow flex space-x-4 text-s`}
    >
      <div className=""></div>
      <div className="p-3 flex gap-4">
        <button className="hover:text-blue-600">File</button>
        <button className="hover:text-blue-600">Edit</button>
        <button className="hover:text-blue-600">Selection</button>
        <button className="hover:text-blue-600">View</button>
        <button className="hover:text-blue-600">Settings</button>
        <button className="hover:text-blue-600">Help</button>
      </div>
    </div>
  );
};

export default MenuBar;
