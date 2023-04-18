import style from "./Navbar.module.scss";
import MenuHamburger from './MenuHamburger';
import NavbarLink from "./NavbarLink";
import SearchBar from "./SearchBar";
import Basket from "./Basket";
import AuthNav from "./AuthNav";
import Container from "../Container";

const Navbar = () => {
  return (
    <section>
      <div className={style.wrapper}>
          <Container spaceBetween={'container__space-between'} padding={'padding'} >
              <MenuHamburger />
              <NavbarLink />
              <SearchBar />
              <Basket />
              <AuthNav />   
          </Container>   
      </div>
    </section>
  );
};
export default Navbar;
