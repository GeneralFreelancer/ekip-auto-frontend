import style from "./TableBody.module.scss";
import React from "react";

const TableBodyMiddle = (props) => {
  const orderDateHuman = (orderDate) => {
    return new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'numeric',day: '2-digit'}).format(orderDate); 
  }
  return props.data.map(
    ({  id, name, productId, status, date }, i) => (
      <React.Fragment key={id}>
        <tr>
          <td className={style.share__table_number}>
            {orderDateHuman(date)}
          </td>
          <td colSpan="2" className={style.share__table_title}>
            <div className={style.share__table_title_row1}>
              <h2>{name}</h2>
            </div>
          </td>
          <td className={style.share__table_picture}>
            <div
              className={style.share__table_picture_item}
            ></div>
          </td>
      
          <td className={style.share__table_delete_middle}>
            <span
              id={id}
              onClick={() => {
              props.delete(id);
            }}
              className={style.icon}
            ></span>
          </td>
        </tr>
      </React.Fragment>
    )
  );
};

export default TableBodyMiddle;
