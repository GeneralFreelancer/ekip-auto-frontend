import s from "./Partners.module.scss";
import React from "react";
import { ReactComponent as PaperClip } from "../../assets/svg/paper_clip.svg.svg";
import { ReactComponent as DoubleArrow} from "../../assets/svg/down_duble_arrow.svg.svg"

const Partners = () => {

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
          <div className={s.partners_text}>Читати для партнерів</div>
          <DoubleArrow className={s.partners_arrow} onClick={() => scrollToAnchor("message_block")} />
        </div>
        <div className={s.partners_arrow}></div>
        <div className={s.partners_title}></div>
        <div className={s.partners_button}></div>
        <div className={s.partners_content}>
          <p className={s.title}>
            Наша компанія завжди відкрита для нових пропозицій<br></br> і ми
            завжди готові налогодити індивідуальний формат роботи<br></br> з
            нашими клієнтами.
          </p>
          <div className={s.wrapperText}>
            <p className={s.text}>
              У разі якщо ви не побачили позицію, котра була би Вам цікава чи ви
              хочете запропонувати індивідуальний <br></br>формат співпраці, то
              ми завжди відкриті до ваших пропозицій.
            </p>
            <div className={s.hr}></div>
          </div>
          <a id='message_block' className={s.anchor}></a>
          <div className={s.message_block}>
            <div style={{ position: "relative", maxWidth: "100%" }}>
              <textarea
                className={s.textarea}
                placeholder="Додайте свою пропозицію і ми обов'язково її розглянемо..."
              ></textarea>
              <PaperClip className={s.paper_clip} />
            </div>
            <button className={s.btn_send}>Надіслати пропозицію</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Partners;
