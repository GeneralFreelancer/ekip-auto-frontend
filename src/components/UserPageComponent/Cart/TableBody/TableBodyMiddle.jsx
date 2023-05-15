import style from "./TableBody.module.scss";
import React from "react";
import { ReactComponent as Heart } from "../../../../assets/svg/heart.svg";
import { ReactComponent as BalckHeart } from "../../../../assets/svg/black_heart.svg";

const TableBodyMiddle = (props) => {
  
  return props.data.map(
    ({ id, title, favorite, SKU, price, minQuantity, image, quantity }, i) => (
      <React.Fragment key={i + 1}>
        <tr>
          <td rowSpan="3" className={style.cart__table_number}>
            {i + 1}
          </td>
          <td className={style.cart__table_picture}>
            <div
              className={style.cart__table_picture_item}
              style={{ backgroundImage: `url(${image[0]})` }}
            ></div>
          </td>
          <td colSpan="2" className={style.cart__table_title}>
            <div className={style.cart__table_title_row1}>
              <h2>{title}</h2>
              <span id={id} className={style.favorite}>
                {favorite ? (
                  <BalckHeart
                    onClick={() => {
                    props.checkFavorire(id);
                  }}
                  />
                ) : (
                  <Heart
                    onClick={() => {
                    props.checkFavorire(id);
                  }}
                  />
                )}
              </span>
            </div>
            <div className={style.cart__table_title_row2}>
              <p className={style.product_sku}>
                Art: <span>{SKU}</span>
              </p>
            </div>
          </td>
          <td rowSpan="3" className={style.cart__table_delete_middle}>
            <span
              id={id}
              onClick={() => {
              props.delete(id);
            }}
              className={style.icon}
            ></span>
          </td>
        </tr>
        <tr>
          <th>ціна за шт.</th>
          <th>кількість</th>
          <th>загальна ціна</th>
        </tr>
        <tr>
          <td className={style.cart__table_price}>
            <div>
              <p className={style.nationalPrice}>{price[0]} &#8372;</p>
            </div>
            <div>
              <p className={style.internationalPrice}>{price[1]} &#65284;</p>
            </div>
          </td>
          <td className={style.cart__table_quantity}>
            <div>
              <p className={style.minQuantity}>
                Введіть кратно: <br /> {minQuantity}
              </p>
            </div>
            <div>
              <input min={0} type="number" defaultValue={quantity} />
              <p>шт.</p>
            </div>
          </td>
          <td className={style.cart__table_summaryPrice}>
            <div>
              <p className={style.nationalSummary}>10000 &#8372;</p>
            </div>
            <div>
              <p className={style.internationSummary}>1000 &#65284;</p>
            </div>
          </td>
        </tr>
      </React.Fragment>
    )
  );
};

export default TableBodyMiddle;
