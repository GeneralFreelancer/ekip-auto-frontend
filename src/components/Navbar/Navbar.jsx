import s from "./Navbar.module.scss";
import MenuHamburger from "./MenuHamburger";
import NavbarLink from "./NavbarLink";
import SearchBar from "./SearchBar";
import Basket from "./Basket";
import AuthNav from "./AuthNav";
import Container from "../Container";

const Navbar = (props) => {
  return (
    <section>
      <div className={s.wrapper}>
        <Container styleName={"padding"}>
          {/* <MenuHamburger /> */}
          <NavbarLink />
          <SearchBar />
          <Basket />
          <AuthNav onShowModal={props.onShowModal} />
        </Container>
      </div>
    </section>
  );
};
export default Navbar;