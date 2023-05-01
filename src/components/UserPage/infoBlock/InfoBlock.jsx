import React from "react";
import s from "./InfoBlock.module.scss";

const InfoBlock = () => {
  return (
    <div className={s.infoBlock}>
      <h1>Увага!</h1>
      <h2>Щоб здійснити замовлення потрібно заповнити усі пункти с зірочками *</h2>
    </div>
  );
};

export default InfoBlock;
