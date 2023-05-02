import React from "react";
import s from "./InfoBlock.module.scss";

const InfoBlock = () => {
  return (
    <div className={s.infoBlock}>
      <div className={s.infoBlock_title}>Увага!</div>
      <div className={s.infoBlock_text}>Щоб здійснити замовлення потрібно заповнити усі пункти с зірочками *</div>
    </div>
  );
};

export default InfoBlock;
