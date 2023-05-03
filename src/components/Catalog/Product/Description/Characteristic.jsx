import React from "react";
import s from "./Description.module.scss";

const Characteristic = () => {
  return (
    <div className={s.characteristic_block}>
      <h1 className={s.characteristic_h}>Характеристики:</h1>
      <div className={s.characteristic_line}>
        Висота
        <span style={{ letterSpacing: "2px" }}>
          .................................................................................
        </span>
        18 см
      </div>
      <div className={s.characteristic_line}>
        Ширина
        <span style={{ letterSpacing: "2px" }}>
          ................................................................................
        </span>
        50 см
      </div>
      <div className={s.characteristic_line}>
        Глибина
        <span style={{ letterSpacing: "2px" }}>
          ...............................................................................
        </span>
        40 см
      </div>
    </div>
  );
};

export default Characteristic;
