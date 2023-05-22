import style from "./TableBody.module.scss";
import React from "react";

const TableBodyMobile = (props) => {
  
  const orderDateHuman = (orderDate) => {
    return new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'numeric',day: '2-digit'}).format(orderDate); 
  }

  return props.data.map(
    ({ id, name, productId, status, date }, i) => (
      <React.Fragment key={i + 1}>
        <tr>
          <th colSpan={2} className={style.th_head}>
            дата
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.share__table_number}>
            {orderDateHuman(date)}
          </td>
        </tr>
        <tr>
          <th colSpan={2} className={style.th_head}>
            зображення
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.share__table_picture}>
            <div
              // style={{ backgroundImage: `url(${image[0]})` }}
            ></div>
          </td>
        </tr>
        <tr>
          <th colSpan={2} className={style.th_head}>
            ім'я
          </th>
        </tr>
        <tr>
          <td colSpan={2} className={style.share__table_title}>
            <div className={style.share__table_title_row1}>
              <h2>{name}</h2>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={style.share__table_delete_middle}>
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

export default TableBodyMobile;
