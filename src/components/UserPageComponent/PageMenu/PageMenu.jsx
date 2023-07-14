import { NavLink } from "react-router-dom";
import { useState } from "react";
import style from "./PageMenu.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import {setProductsInCart} from "../../../redux/features/cartSlice"

const PageMenu = () => {
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
    dispatch(setProductsInCart(null));
  };

  return (
    <div className={style.menu__wrapper}>
      <ul>
        <li>
          <h2>Моя сторінка</h2>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/myprofile/mydata"
          >
            Мої данні
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/myprofile/basket"
          >
            Корзина
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/myprofile/order-history"
          >
            Замовлення
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/myprofile/favorite"
          >
            Обрані
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className={style.logout}>
            Вийти
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PageMenu;
