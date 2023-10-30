import style from './TableBody.module.scss';

const TableBody = (props) => {
  return props.data.map((item, i) => (
    <tr key={i + 1}>
      <td className={style.orderDetails__table_number}>{i + 1}</td>
      <td className={style.orderDetails__table_picture}>
        <div
          className={style.orderDetails__table_picture_item}
          style={{backgroundImage: `url(${item.product.pictures[0]})`}}></div>
      </td>
      <td className={style.orderDetails__table_title}>
        <div className={style.orderDetails__table_title_row1}>
          <h2>{item.product.name}</h2>
        </div>
        <div className={style.orderDetails__table_title_row2}>
          <p className={style.product_sku}>
            Art: <span>{item.product.sku}</span>
          </p>
        </div>
      </td>
      <td className={style.orderDetails__table_price}>
        <div>
          <p className={style.nationalPrice}>{item.product.priceUAH} &#8372;</p>
        </div>
        <div>
          <p className={style.internationalPrice}>
            {item.product.priceUSD} &#65284;
          </p>
        </div>
      </td>
      <td className={style.orderDetails__table_quantity}>
        <p>{item.number} шт.</p>
      </td>
      <td className={style.orderDetails__table_summaryPrice}>
        <div>
          <p className={style.nationalSummary}>
            {item.number * item.product.priceUAH} &#8372;
          </p>
        </div>
        <div>
          <p className={style.internationSummary}>
            {item.number * item.product.priceUSD} &#65284;
          </p>
        </div>
      </td>
      <td className={style.orderDetails__table_basket}>
        <span
          id={item.product.id}
          onClick={() => {
            props.delete(item.product.id, item.number);
          }}
          className={style.icon}></span>
      </td>
    </tr>
  ));
};

export default TableBody;
