import style from "./Navbar.module.scss";
import MenuHamburger from "./MenuHamburger";
import NavbarLink from "./NavbarLink";
import SearchBar from "./SearchBar";
import Basket from "./Basket";
import AuthNav from "./AuthNav";

const Navbar = (props) => {
  return (
    <section>
      <div className={style.wrapper}>
        <div className={style.container}>
          <MenuHamburger />
          <NavbarLink />
          <SearchBar />
          <Basket />
          <AuthNav onShowModal={props.onShowModal} />
        </div>
      </div>
    </section>
  );
};
export default Navbar;