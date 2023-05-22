import s from "./Filter.module.scss";
import {ReactComponent as Arrow} from '../../../assets/svg/up-arrow.svg';

import React from "react";

const Filter = ({ onChangeParams }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>Спочатку:</p>
      <div
        className={s.wrapperSelect}
        onChange={(e) => onChangeParams(e.target.name, e.target.value)}
      >
        <select name="filter" className={s.select}>
          <option value="new" className={s.option}>
            Нове
          </option>
          <option value="popular" className={s.option}>
            За популярністю
          </option>
          <option value="cheap" className={s.option}>
            Дешеві
          </option>
          <option value="expensive" className={s.option}>
            Дорожчі
          </option>
        </select>
        <Arrow/>
      </div>
    </div>
  );
};

export default Filter;
