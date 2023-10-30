import style from './TableBody.module.scss';
import React from 'react';

const TableBodyMobile = (props) => {
  const orderDateHuman = (orderDate) => {
    const date = new Date(orderDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return props.data.map(({_id, createdAt, status, user}, i) => (
    <React.Fragment key={i + 1}>
      <tr>
        <th colSpan={2} className={style.th_head}>
          дата
        </th>
      </tr>
      <tr>
        <td colSpan={2} className={style.share__table_number}>
          {orderDateHuman(createdAt)}
        </td>
      </tr>
      <tr>
        <th colSpan={2} className={style.th_head}>
          зображення
        </th>
      </tr>
      <tr>
        <td colSpan={2} className={style.share__table_picture}>
          <div></div>
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
            <h2>
              {user.firstName} {user.lastName}
            </h2>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={2} className={style.share__table_delete_middle}>
          <span
            id={_id}
            onClick={() => {
              props.delete(_id);
            }}
            className={style.icon}></span>
        </td>
      </tr>
    </React.Fragment>
  ));
};

export default TableBodyMobile;
