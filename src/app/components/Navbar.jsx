import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="logo">LOGO</div>
      <div className="nav_links">
        <div className="nav_li">
          <Link to="/about">Про нас</Link>
        </div>
        <div className="nav_li">
          <Link to="/partners">Для партнерів</Link>
        </div>
        <div className="nav_li">
          <Link to="/delivery">Доставка</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
