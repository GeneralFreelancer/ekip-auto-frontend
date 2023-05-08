import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import style from './PageMenu.module.scss';

const PageMenu = () => {

  return(
    <div className={style.menu__wrapper}>
      <ul>
        <li>
          <h2>Моя сторінка</h2>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/myprofile/mydata">Мої данні</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/myprofile/basket">Корзина</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/myprofile/orders">Замовлення</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/myprofile/favorite">Обрані</NavLink>
        </li>
        <li>
          <button className={style.logout}>Вийти</button>
        </li>
      </ul>
    </div>
  );
}

export default PageMenu;
