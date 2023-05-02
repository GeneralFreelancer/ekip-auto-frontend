import React from "react";
import s from './TextBlock.module.scss';

const TextBlock = () => {
  return (
    <div className={s.textBlock}>
      <div className={s.textBlock_title}>Увага!</div>
      <div className={s.textBlock_text}>Щоб здійснити замовлення потрібно заповнити усі пункти с зірочками *</div>
    </div>
  );
};

export default TextBlock;
