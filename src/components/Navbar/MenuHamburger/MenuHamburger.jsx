import style from "./hamburger.module.scss";

const MenuHamburgere = () => {
  return (
    <>
      <div className="menu__hamburger">
            <div className="menu__content">
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
