import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="w-full bg-[#3598DB] h-[8vh]  mb-4  relative">
        <div
          className="absolute left-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={toggleMenu}
        >
          遷移
        </div>
        <div className="absolute right-[43%] top-1/2 transform -translate-y-1/2 ">
          <img src="/images/icon_POLYGON.svg" alt="Icon" />
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow p-4">
          <ul className="list-none">
            <li className="mb-2">
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
