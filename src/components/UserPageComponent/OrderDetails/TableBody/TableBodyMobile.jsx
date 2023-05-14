import style from "./TableBody.module.scss";
import React from "react";
import {ReactComponent as Heart} from '../../../../assets/svg/heart.svg';
import {ReactComponent as BalckHeart} from '../../../../assets/svg/black_heart.svg';

const TableBodyMobile = (props) => {
  
  const remove = (id) => {
    console.log(id)
  }
  
  const checkFavorite = (id) => {
    props.data.find(item => (
      item.id === id ? console.log(id) : '' // edit this for send request to db on change state
    ))
  }
  return (
    props.data.map(({id, title, favorite, SKU, price, minQuantity, image}, i) => (
      <React.Fragment key={i + 1}>
          <tr>
            <th colSpan={2} className={style.th_head}>№</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.orderDetails__table_number}>
              {i + 1}
            </td>
          </tr>
          <tr>
              <th colSpan={2} className={style.th_head}>зображення</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.orderDetails__table_picture}>
              <div className={style.orderDetails__table_picture_item} style={{backgroundImage: `url(${image[0]})`} }></div>
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={style.th_head}>назва/ артикул</th>
          </tr> 
          <tr>
            <td colSpan={2} className={style.orderDetails__table_title}>
              <div className={style.orderDetails__table_title_row1}>
                <h2>{title}</h2>
                <span id={id} className={style.favorite}>
                  {favorite ? <BalckHeart onClick={() => {checkFavorite(id)}}/> : <Heart onClick={() => {checkFavorite(id)}}/>}
                </span>
              </div>
              <div className={style.orderDetails__table_title_row2}>
                  <p className={style.product_sku}>Art: <span>{SKU}</span></p>
              </div>
            </td>

          </tr>
          <tr>
            <th>ціна за шт.</th>
            <th>кількість</th>
          </tr>
          <tr>
            <td className={style.orderDetails__table_price}>
              <div>
                <p className={style.nationalPrice}>{price[0]} &#8372;</p>
              </div>
              <div>
                <p className={style.internationalPrice}>{price[1]} &#65284;</p>
              </div>
            </td>
            <td className={style.orderDetails__table_quantity}>
              <div>
                <p className={style.minQuantity}>
                  Введіть кратно: <br /> {minQuantity}
                </p>
              </div>
              <div >
                <input type="number" />
                <p>шт.</p>
              </div>
            </td>
          </tr>
          <tr>
            <th colSpan={2}> загальна ціна</th>
          </tr>
          <tr>
            <td colSpan={2} className={style.orderDetails__table_summaryPrice}>
              <div>
                <p className={style.nationalSummary}>10000 &#8372;</p>
              </div>
              <div >
                <p className={style.internationSummary}>1000 &#65284;</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={style.orderDetails__table_basket_middle}>
              <span id={id} onClick={() => {remove(id)}} className={style.icon}></span>
            </td>
          </tr>
      </React.Fragment>
    ))
  );
};

export default TableBodyMobile;
