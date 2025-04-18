import React, { useState } from "react";
import HamburgerMenu from "../hamburger-menu/hamburger-menu";

import styles from "./fixed-menu.module.scss";
import SideMenu from "../side-menu/side-menu";

interface FixedMenuProps {
  children: React.ReactNode;
}

const FixedMenu: React.FC<FixedMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["fixed-menu"]}>
      <HamburgerMenu isOpen={isOpen} onClick={toggleMenu} />
      <SideMenu isOpen={isOpen} onClose={handleCloseMenu}>
        {children}
      </SideMenu>
    </div>
  );
};

export default FixedMenu;
