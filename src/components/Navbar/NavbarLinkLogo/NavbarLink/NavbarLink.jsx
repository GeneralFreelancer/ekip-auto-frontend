import React from "react";
import { Link } from "react-router-dom";
import s from "./NavbarLink.module.scss";

const NavbarLink = ({styleItem}) => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className={styleItem ? `${s[`${styleItem}`]} ${s.logo_navlink}` : s.logo_navlink}>
      <div className={s.nav_links}>
        <div className={s.nav_links_wrapper}>
          <div className={s.nav_li}>
            <Link to="/about" onClick={scrollToTop}>Про нас</Link>
          </div>
        </div>
        <div className={s.nav_links_wrapper}>
          <div className={s.nav_li}>
            <Link to="/partners" onClick={scrollToTop}>Для партнерів</Link>
          </div>
        </div>
        {/* <div className={s.nav_links_wrapper}>
          <div className={s.nav_li}>
            <Link to="/delivery">Доставка</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NavbarLink;
