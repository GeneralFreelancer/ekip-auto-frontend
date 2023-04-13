import style from "./navbar.module.scss";
import MenuHamburger from './MenuHamburger';
import Container from "../Container";

const Navbar = () => {
  return (
    <section>
      <wrapper className={style.wrapper}>
          <Container>
            <nav>
              <MenuHamburger />
            </nav>
          </Container>
      </wrapper>
    </section>
  );
};
export default Navbar;
