import { NavLink } from "react-router-dom";
import style from "./TableBody.module.scss";
import React from "react";

const TableBody = (props) => {
  const redirect = (id) => {
    console.log(id)
  }
    
const {id, title, goods, totalPrice, deliveryWeight, paidStatus} = props.data;
  
  return (
          <tr >
            <td className={style.order__table_number}>
              {goods.length}
            </td>
            <td className={style.order__table_picture}>
              <div className={style.order__table_picture} style={{backgroundImage: `url(${goods[0].image[0]})`} }></div>
            </td>
            <td className={style.order__table_title}>
              <div className={style.order__table_title_row1}>
                <h2>{title} &#65284;</h2>
              </div>
            </td>
            <td className={style.order__table_weight}>
              <div>
                <p className={style.weight}>{deliveryWeight} кг.</p>
              </div>
            </td>
          
            <td className={style.order__table_summaryPrice}>
              <div>
                <p className={style.nationalSummary}>{totalPrice[0]} &#8372;</p>
              </div>
              <div >
                <p className={style.internationSummary}>{totalPrice[1]} &#65284;</p>
              </div>
            </td>
            <td className={style.order__table_paid}>
              <div className={paidStatus ? style.paidIconTrue : style.paidIconFalse}></div>
            </td>
            <td className={style.order__table_riderect}>
            <NavLink to='/myprofile/order-history-details' >
              <span id={id} className={style.iconRiderect} onClick={() => { redirect(id) }} ></span>
            </NavLink>
            </td>
        </tr>
  );
};

export default TableBody;
