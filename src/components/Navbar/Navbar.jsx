import s from "./navbar.module.scss";
import MenuHamburger from './MenuHamburger';
import NavbarLink from "./NavbarLink";
import SearchBar from "./SearchBar";
import Basket from "./Basket";
import AuthNav from "./AuthNav";

const Navbar = () => {
  return (
    <section>
      <wrapper className={s.wrapper}>
          <div className={s.container}>
              <MenuHamburger />
              <NavbarLink />
              <SearchBar />
              <Basket />
              <AuthNav />
          </div>
      </wrapper>
    </section>
  );
};
export default Navbar;
