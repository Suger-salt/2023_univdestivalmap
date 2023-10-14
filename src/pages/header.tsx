import React, { useState } from "react";
import styles from "@/styles/menu.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="w-full bg-[#3598DB] h-[8vh]  mb-4  relative">
        <div
          className={`absolute right-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer ${
            styles.hamburger
          } ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        <div className="absolute right-[43%] top-1/2 transform -translate-y-1/2 ">
          <img src="/images/icon_POLYGON.svg" alt="Icon" />
        </div>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      {menuOpen && (
        <div className="fixed top-[8vh] left-0 w-[30vw] h-screen bg-[#333] shadow p-4 z-10 bg-opacity-90">
          <ul className="list-none text-white">
            <li className="mb-2 ">
              <a href="/#">topPage</a>
            </li>
            <li className="mb-2">
              <a href="/live#">livePage</a>
            </li>
            <li className="mb-2">
              <a href="/shop#">shopPage</a>
            </li>
            <li>
              <a href="/stage#">stagePage</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
