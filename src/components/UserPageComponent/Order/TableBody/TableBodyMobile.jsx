import style from "./TableBody.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";

const TableBodyMobile = (props) => {
  const redirect = (id) => {
    console.log(id);
  };

  const { id, title, goods, totalPrice, deliveryWeight, paidStatus } =
    props.data;

  return (
    <React.Fragment key={id}>
          <tr>
            <th colSpan={2} className={style.th_head}>позицій</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.order__table_number}>
              {goods.length}
            </td>
          </tr>
          <tr>
              <th colSpan={2} className={style.th_head}>зображення</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.order__table_picture}>
            <div
            className={style.order__table_picture}
            style={{ backgroundImage: `url(${goods[0].image[0]})` }}
          ></div>
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={style.th_head}>назва замовлення</th>
          </tr> 
          <tr>
            <td colSpan={2} className={style.order__table_title}>
              <div className={style.order__table_title_row1}>
                <h2>{title} &#65284;</h2>
              </div>
            </td>

          </tr>
          <tr>
            <th>вага замовлення</th>
            <th>сплачено</th>
          </tr>
          <tr>
            <td className={style.order__table_weight}>
              <div>
               <p className={style.weight}>{deliveryWeight} кг.</p>
              </div>
            </td>
            <td className={style.order__table_paid}>
            <div
            className={paidStatus ? style.paidIconTrue : style.paidIconFalse}
          ></div>
            </td>
          </tr>
          <tr>
            <th colSpan={2}> загальна ціна</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.order__table_summaryPrice}>
                <div>
                <p className={style.nationalSummary}>{totalPrice[0]} &#8372;</p>
              </div>
              <div>
                <p className={style.internationSummary}>{totalPrice[1]} &#65284;</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={style.order__table_riderect_middle}>
              <NavLink to='/myprofile/order-history-details' >
                <span id={id} className={style.iconRiderect} onClick={() => { redirect(id) }} ></span>
              </NavLink>
            </td>
          </tr>
      </React.Fragment>
  );
};

export default TableBodyMobile;
