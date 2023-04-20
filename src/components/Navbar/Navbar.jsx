import style from "./Navbar.module.scss";
import { useEffect, useState } from "react";
import MenuHamburger from "./MenuHamburger";
import NavbarLink from "./NavbarLinkLogo/NavbarLink";
import SearchBar from "./SearchBar";
import Basket from "./Basket";
import AuthNav from "./AuthNav";
import Logo from "./NavbarLinkLogo/Logo/Logo";

const Navbar = (props) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  let desktopV = viewportWidth > 1024;
  let mobileV = viewportWidth > 540;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <div className={style.wrapper}>
        <div className={style.container}>
          <MenuHamburger onShowModal={props.onShowModal} />
          {mobileV && <Logo/>}
          {desktopV && <NavbarLink />}
          <SearchBar />
          <Basket />
          {desktopV && <AuthNav onShowModal={props.onShowModal} />}
        </div>
      </div>
    </section>
  );
};
export default Navbar;
