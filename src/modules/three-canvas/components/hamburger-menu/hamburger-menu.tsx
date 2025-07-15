import React from "react";
import { Layers } from "lucide-react";
import styles from "./hamburger-menu.module.scss";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <div
      className={styles["hamburger"]}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className={styles["hamburger-icon"]}>
        <Layers size={24} />
      </div>
    </div>
  );
};

export default HamburgerMenu;
