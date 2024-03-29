import style from "./TableBody.module.scss";
import React from "react";
import { ReactComponent as Heart } from "../../../../assets/svg/heart.svg";
import { ReactComponent as BalckHeart } from "../../../../assets/svg/black_heart.svg";

const TableBodyMobile = (props) => {
  
  return props.data?.map(
    (item, i) => (
      <React.Fragment key={i + 1}>
        <tr>
          <th colSpan={2} className={style.th_head}>
            №
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.cart__table_number}>
            {i + 1}
          </td>
        </tr>
        <tr>
          <th colSpan={2} className={style.th_head}>
            зображення
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.cart__table_picture}>
            <div
              className={style.cart__table_picture_item}
              style={{ backgroundImage: `url(${item.product.pictures[0]})` }}
            ></div>
          </td>
        </tr>
        <tr>
          <th colSpan={2} className={style.th_head}>
            назва/ артикул
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.cart__table_title}>
            <div className={style.cart__table_title_row1}>
              <h2>{item.product.name}</h2>
            </div>
            <div className={style.cart__table_title_row2}>
              <p className={style.product_sku}>
                Art: <span>{item.product.sku}</span>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <th>ціна за шт.</th>
          <th>кількість</th>
        </tr>
        <tr>
          <td className={style.cart__table_price}>
            <div>
              <p className={style.nationalPrice}>{item.product.priceUA} &#8372;</p>
            </div>
            <div>
              <p className={style.internationalPrice}>{item.product.priceUSD} &#65284;</p>
            </div>
          </td>
          <td className={style.cart__table_quantity}>
            <div>
              <p className={style.minQuantity}>
                Введіть кратно: <br /> {item.product.minQuantity}
              </p>
            </div>
            <div>
              <span className={style.inputDisable}>
                <span className={style.navigationWrapper}>
                  <span
                    onClick={(e) => {
                      const id = e.target.dataset.id,
                        btnType = e.target.dataset.name;
                      props.changeQuantity(id, btnType);
                    }}
                    className={style.itemUp}
                    data-name={"up"}
                    data-id={item.product.id}
                  ></span>
                  <span
                    onClick={(e) => {
                      const id = e.target.dataset.id,
                        btnType = e.target.dataset.name;
                      props.changeQuantity(id, btnType);
                    }}
                    className={style.itemDown}
                    data-name={"down"}
                    data-id={item.product.id}
                  ></span>
                </span>
              </span>
              <input
                id={item.product.id}
                min={item.product.minQuantity}
                type="number"
                value={item.number}
                readOnly={true}
              />
              <p>шт.</p>
            </div>
          </td>
        </tr>
        <tr>
          <th colSpan={2}> загальна ціна</th>
        </tr>
        <tr>
          <td colSpan={2} className={style.cart__table_summaryPrice}>
            <div>
              <p className={style.nationalSummary}>{item.number * item.product.priceUAH} &#8372;</p>
            </div>
            <div>
              <p className={style.internationSummary}>{item.number * item.product.priceUSD}  &#65284;</p>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={style.cart__table_delete_middle}>
            <span
              id={item.product.id}
              onClick={() => {
                props.delete(item.product.id);
              }}
              className={style.icon}
            ></span>
          </td>
        </tr>
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    )
  );
};

export default TableBodyMobile;
