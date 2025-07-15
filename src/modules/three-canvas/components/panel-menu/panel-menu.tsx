import React, { useState } from "react";
import { Menu } from "lucide-react";
import styles from "./panel-menu.module.scss";
import FileUploader from "../file-uploader/file-uploader";

type PanelMenuProps = {
  onFileSelected: (file: File | null) => Promise<void>;
  isFileLoading: boolean;
};

const PanelMenu = ({ onFileSelected, isFileLoading }: PanelMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles["panel-menu-button"]} onClick={toggleMenu}>
        <Menu size={26} />
      </button>
      <div
        className={`${styles["panel-menu"]} ${!isOpen ? styles["hidden"] : ""}`}
      >
        <div className={styles["panel-menu-wrapper"]}>
          <div className={styles["panel-menu-heading"]}>
            <h1>Menu</h1>
          </div>
          <div className={styles["panel-menu-content"]}>
            <div className={styles["panel-menu-items"]}>
              <div className={styles["panel-menu-items__heading"]}>
                Import DXF file
              </div>
              <FileUploader
                onFileSelected={onFileSelected}
                isFileLoading={isFileLoading}
              />
            </div>
            <div className={styles["panel-menu-items"]}>
              <div className={styles["panel-menu-items__heading"]}>Pages</div>
              <a href="/konva-drawing">Konva Drawing</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelMenu;
