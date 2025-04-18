import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./hamburger-menu.module.scss";
import { Layers } from "lucide-react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <div
      className={styles["hamburger"]}
      onClick={onClick}
      aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      aria-expanded={isOpen}
    >
      <div className={styles["hamburger-icon"]}>
        <Layers size={24} />
      </div>
    </div>
  );
};

export default HamburgerMenu;
