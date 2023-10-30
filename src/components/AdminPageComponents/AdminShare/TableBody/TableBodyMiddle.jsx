import style from './TableBody.module.scss';
import React from 'react';

const TableBodyMiddle = (props) => {
  const orderDateHuman = (orderDate) => {
    const date = new Date(orderDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return props.data.map(({_id, createdAt, status, user}, i) => (
    <React.Fragment key={_id}>
      <tr>
        <td className={style.share__table_number}>
          {orderDateHuman(createdAt)}
        </td>
        <td colSpan="2" className={style.share__table_title}>
          <div className={style.share__table_title_row1}>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
          </div>
        </td>
        <td className={style.share__table_picture}>
          <div className={style.share__table_picture_item}></div>
        </td>

        <td className={style.share__table_delete_middle}>
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

export default TableBodyMiddle;
