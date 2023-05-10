import style from "./TableBody.module.scss";

const TableBody = () => {
  return (
    <tr>
      <td className={style.cart__table_number}>1</td>
      <td className={style.cart__table_picture}>
        <div className={style.cart__table_picture_item}></div>
      </td>
      <td className={style.cart__table_title}>
        <div className={style.cart__table_title_row1}>
          <h2>title</h2>
          <span id="12" className={style.favorite}></span>
        </div>
        <div className={style.cart__table_title_row2}>
            <p className={style.product_sku}>Art: UD 499 12-K</p>
        </div>
      </td>
      <td className={style.cart__table_price}>
        <div>
          <p className={style.nationalPrice}>1000 &#8372;</p>
        </div>
        <div>
          <p className={style.internationalPrice}>100 &#65284;</p>
        </div>
      </td>
      <td className={style.cart__table_quantity}>
        <div>
          <p className={style.minQuantity}>
            Введіть кратно: <br /> 100
          </p>
        </div>
        <div >
          <input type="text" />
        </div>
      </td>
      <td className={style.cart__table_summaryPrice}>
        <div>
          <p className={style.nationalSummary}>10000 &#8372;</p>
        </div>
        <div >
          <p className={style.internationSummary}>1000 &#65284;</p>
        </div>
      </td>
      <td className={style.cart__table_delete}>
        <span id="12" class="cart__grid_body_delete">
          delete
        </span>
      </td>
    </tr>
  );
};

export default TableBody;
