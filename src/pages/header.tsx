import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="w-full flex justify-center items-center bg-[#3598DB] h-[8vh] pb-[6px]">
        <div onClick={toggleMenu}>遷移することです</div>
        <img src="/images/icon_POLYGON.svg" alt="Icon" />
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow p-4">
          <ul>
            <li>
              <a href="/#">topPage</a>
            </li>
            <li>
              <a href="/live#">livePage</a>
            </li>
            <a href="/shop#">shopPage</a>
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
