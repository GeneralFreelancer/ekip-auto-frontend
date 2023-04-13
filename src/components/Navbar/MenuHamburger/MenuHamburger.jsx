import style from "./hamburger.module.scss";
import { ReactComponent as Humburger } from "../../../assets/svg/hamburger.svg"

const MenuHamburgere = () => {
  return (
    <>
      <div className={style.menu__hamburger}>
            <Humburger className={style.menu__icon}/>
            <div className={style.menu__content}>
              <ul>
                <a href="#">
                  <li>test</li>
                </a>
                <a href="#">
                  <li>
                    test
                    <ul>
                      <a href="#">
                        <li>test</li>
                      </a>
                      <a href="#">
                        <li>test</li>
                      </a>
                      <a href="#">
                        <li>test</li>
                      </a>
                    </ul>
                  </li>
                </a>
                <a href="#">
                  <li>test</li>
                </a>
              </ul>
            </div>
          </div>
    </>
  );
};
export default MenuHamburgere;
