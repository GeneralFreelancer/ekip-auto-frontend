import React from "react";
import s from "./Description.module.scss";

const Pack = () => {
  return (
    <div className={s.characteristic_block}>
      <h1 className={s.characteristic_h}>Характеристики пакування:</h1>
      <div className={s.characteristic_line}>
        Кількість в коробці<span style={{letterSpacing: '2px'}}>.................................................................</span>500 шт.
      </div>
      <div className={s.characteristic_line}>
        Кількість в упаковці<span style={{letterSpacing: '2px'}}>................................................................</span>100 шт.
      </div>
      <div className={s.characteristic_line}>
        Розмір коробки<span style={{letterSpacing: '2px'}}>......................................................................</span>40x50x50 см.
      </div>
    </div>
  );
};

export default Pack;
