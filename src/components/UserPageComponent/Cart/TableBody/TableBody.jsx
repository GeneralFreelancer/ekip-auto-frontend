import style from "./TableBody.module.scss";

const TableBody = (props) => {
 
  return props.data.map(
    ({ id, title, favorite, SKU, price, minQuantity, image, quantity }, i) => (
      <tr key={i + 1}>
        <td className={style.cart__table_number}>{i + 1}</td>
        <td className={style.cart__table_picture}>
          <div
            className={style.cart__table_picture_item}
            style={{ backgroundImage: `url(${image[0]})` }}
          ></div>
        </td>
        <td className={style.cart__table_title}>
          <div className={style.cart__table_title_row1}>
            <h2>{title}</h2>
            <span id={id} className={style.favorite}>
              {favorite ? (
                <span 
                  className={style.activeFavorite} onClick={() => {
                  props.checkFavorire(id)
                }}></span>
              ) : (
                  <span 
                    className={style.hoverFavorite} onClick={() => {
                      props.checkFavorire(id)
                    }}
                  ></span>
              )}
            </span>
          </div>
          <div className={style.cart__table_title_row2}>
            <p className={style.product_sku}>
              Art: <span>{SKU}</span>
            </p>
          </div>
        </td>
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
                  data-id={id}
                ></span>
                <span
                  onClick={(e) => {
                    const id = e.target.dataset.id,
                      btnType = e.target.dataset.name;
                    props.changeQuantity(id, btnType);
                  }}
                  className={style.itemDown}
                  data-name={"down"}
                  data-id={id}
                ></span>
              </span>
            </span>
            <input
              id={id}
              min={minQuantity}
              type="number"
              value={quantity}
              readOnly={true}
            />
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
        <td className={style.cart__table_delete}>
          <span
            id={id}
            onClick={() => {
              props.delete(id);
            }}
            className={style.icon}
          ></span>
        </td>
      </tr>
    )
  );
};

export default TableBody;
