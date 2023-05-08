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
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/user-data">Мої данні</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/cart">Корзина</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/orders">Замовлення</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/favorite">Обрані</NavLink>
        </li>
        <li>
          <button className={style.logout}>Вийти</button>
        </li>
      </ul>
    </div>
  );
}

export default PageMenu;
