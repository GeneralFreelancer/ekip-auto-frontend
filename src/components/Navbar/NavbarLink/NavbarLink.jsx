import React from "react";
import { Link } from "react-router-dom";
import s from './NavbarLink.module.scss';

const NavbarLink = () => {
  return (
    <div className={s.logo_navlink}>
      <div className={s.logo}></div>
      <div className={s.nav_links}>
        <div className={s.nav_li}>
          <Link to="/about">Про нас</Link>
        </div>
        <div className={s.nav_li}>
          <Link to="/partners">Для партнерів</Link>
        </div>
        <div className={s.nav_li}>
          <Link to="/delivery">Доставка</Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLink;
