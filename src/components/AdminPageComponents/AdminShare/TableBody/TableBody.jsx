import style from "./TableBody.module.scss";
const TableBody = (props) => {
  
  const orderDateHuman = (orderDate) => {
    return new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'numeric',day: '2-digit'}).format(orderDate); 
  }
  
  return props.data.map(
    ({ id, name, productId, status, date }) => (
      <tr key={id}>
        <td className={style.share__table_number}>{orderDateHuman(date)}</td>
        <td className={style.share__table_title}>
          <div className={style.share__table_title_row1}>
            <h2>{name}</h2>
          </div>
        </td>
        <td className={style.share__table_picture}>
          <div
            className={style.share__table_picture_item}
            // style={{ backgroundImage: `url(${})` }}
          ></div>
        </td>
        <td className={style.share__table_delete}>
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
