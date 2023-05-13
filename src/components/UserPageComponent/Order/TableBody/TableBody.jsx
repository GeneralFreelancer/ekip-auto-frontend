import style from "./TableBody.module.scss";
import React from "react";
import {ReactComponent as Heart} from '../../../../assets/svg/heart.svg';
import {ReactComponent as BalckHeart} from '../../../../assets/svg/black_heart.svg';

const TableBody = (props) => {
  const riderect = (id) => {
    console.log(id)
  }
//  id: "1",
//     title: "Замовлення від 22 березня на 4500",
//     goods: [{
//       id: "1",
//       category: 'category',
//       title: "Назва товару",
//       description: 'lorem',
//       options: [],
//       deliveryOptions: [],
//       SKU: 'number12sdsd',
//       favorite: true,
//       price: [15000, 120],
//       minQuantity: 100,
//       stock: true,
//       image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
//       url: 'http://#',   
//     },
//     {
//       id: "2",
//       category: 'category',
//       title: "Назва товару",
//       description: 'lorem',
//       options: [],
//       deliveryOptions: [],
//       SKU: 'number12sdsd',
//       favorite: true,
//       price: [15000, 120],
//       minQuantity: 100,
//       stock: true,
//       image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
//       url: 'http://#',
      
//     },
//     {
//       id: "3",
//       category: 'category',
//       title: "Назва товару",
//       description: 'lorem',
//       options: [],
//       deliveryOptions: [],
//       SKU: 'number12sdsd',
//       favorite: true,
//       price: [15000, 120],
//       minQuantity: 100,
//       stock: true,
//       image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
//       url: 'http://#',
      
//     }, ],
//     deliveryWeight: 105.6,
//     totalPrice: [100000, 20000],
//     paidStatus: true,
//     url: '/myprofile/order-history-details',
//     date: 1679497533000
    
const {id, title, goods, totalPrice, deliveryWeight, paidStatus} = props.data;
  
  return (
          <tr >
            <td className={style.cart__table_number}>
              {goods.length}
            </td>
            <td className={style.cart__table_picture}>
              <div className={style.cart__table_picture_item} style={{backgroundImage: `url(${goods[0].image[0]})`} }></div>
            </td>
            <td className={style.cart__table_title}>
              <div className={style.cart__table_title_row1}>
                <h2>{title}</h2>
              </div>
            </td>
            <td className={style.cart__table_weight}>
              <div>
                <p className={style.weight}>{deliveryWeight} кг.</p>
              </div>
            </td>
          
            <td className={style.cart__table_summaryPrice}>
              <div>
                <p className={style.nationalSummary}>{totalPrice[0]} &#8372;</p>
              </div>
              <div >
                <p className={style.internationSummary}>{totalPrice[1]} &#65284;</p>
              </div>
            </td>
            <td className={style.cart__table_paid}>
              <div className={style.paidIconTrue}></div>
              <div className={style.paidIconFalse}></div>
            </td>
            <td className={style.cart__table_riderect}>
              <span id={id} onClick={() => {riderect(id)}} className={style.iconRiderect}></span>
            </td>
        </tr>
  );
};

export default TableBody;
