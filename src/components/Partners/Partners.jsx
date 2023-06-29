import s from "./Partners.module.scss";
import React from "react";
import BG from "../../assets/Front-BG.jpg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Partners = () => {
  return (
    <>
      <div className={s.container_partners}>
        <div className={s.partners_bg}>
          <img src={BG} alt='bg'/>
        </div>
        <div className={s.partners_empty}></div>
        <div className={s.partners_image}></div>
        <div className={s.partners_logo}></div>
        <div className={s.partners_title}></div>
        <div className={s.partners_button}></div>
        <div className={s.partners_content}>
          <p className={s.title}>
            Наша компанія завжди відкрита для нових пропозицій і ми завжди
            готові налогодити індивідуальний формат роботи за нашими клієнтами.
          </p>
          <div className={s.wrapperText}>
            <p className={s.text}>
              У разі якщо ви не побачили позицію, котра була би Вам цікава чи ви хочете запропонувати індивідуальний формат співпраці, то ми завжди відкриті до ваших пропозицій.
            </p>
            <div className={s.text}>block</div>
          </div>
          <button>Надіслати пропозицію</button>
        </div>
      </div>
    </>
  );
};
export default Partners;
