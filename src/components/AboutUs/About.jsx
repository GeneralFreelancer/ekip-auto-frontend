import s from "./About.module.scss";
import boxes from "../../assets/Boxes.png";
import { ReactComponent as DoubleArrow } from "../../assets/svg/down_duble_arrow.svg.svg";

const About = () => {
  function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <div className={s.container_partners}>
        <div className={s.partners_empty}></div>
        <div className={s.partners_image}></div>
        <div className={s.partners_logo}>
          <div className={s.partners_text}>Читати про нас</div>
          <DoubleArrow
            className={s.partners_arrow}
            onClick={() => scrollToAnchor("lastParagraph_block")}
          />
        </div>
        <div className={s.partners_arrow}></div>
        <div className={s.partners_title}></div>
        <div className={s.partners_button}></div>
        <a id="lastParagraph_block" className={s.anchor}></a>
        <div>
          <p className={s.title}>
            Наша компанія Ekip-Auto вже більш ніж 20 років займається імпортом
            та оптовим продажем авто-аксесуарів, авто-комплектуючих та іншого
            товару в Україні.
          </p>
          <div className={s.wrapperText}>
            <div>
              <p className={s.text}>
                Наша компанія гарантує високу якість продукції та надійність в
                роботі з нашими партнерами. Ми імпортуємо товари безпосередньо з
                Китаю, що дозволяє нам мати конкурентоспроможні цілі на наш
                товар.
              </p>
              <p className={s.text}>
                Наша компанія базується в місті Одеса і ми пропонуємо постачання
                товара до будь-якого міста України, включаючи нещодавно
                де-окуповані території. Ми маємо великий досвід роботи з нашими
                українськими партнерами, та розуміємо наскільки важливо розуміти
                усі тонкощі плідної та перспективної співпраці.
                <img className={s.image} src={boxes} />
              </p>
              <p className={s.text}>
                Ми віримо, що наш досвід та індивідуальний підхід до потреб
                кожного партнера дозволять нам з вами побудувати довгі та
                вигідні відносини.
              </p>
            </div>
            <img className={s.imageMobile} src={boxes} />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
