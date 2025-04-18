import React from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./side-menu.module.scss";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${styles["side-menu"]} ${isOpen ? styles.open : ""}`}>
      <div className={styles["side-menu-header"]}>
        <button
          className={styles["side-menu-close"]}
          onClick={onClose}
          aria-label="Đóng menu"
        >
          <IoMdClose size={28} />
        </button>
      </div>

      <div className={styles["side-menu-content"]}>{children}</div>
    </div>
  );
};

export default SideMenu;
