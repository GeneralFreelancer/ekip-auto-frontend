import style from './Order.module.scss';
import { useMediaPredicate } from "react-media-hook";
import React from "react";
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableBodyMobile from './TableBody/TableBodyMobile';

const OrderItem = (props) => {

  const desktop = useMediaPredicate("(min-width: 1071px)");
  const middle = useMediaPredicate("(min-width: 540px) and (max-width: 1070px)");
  const mobile = useMediaPredicate("(max-width: 540px)");
  return(
    <React.Fragment key={props.data.id}>
      <div className={style.order__wrappr}>
        <div className={style.order__date}></div>
        {desktop && <TableHead />}
      <table className={style.order__table}>
        <thead>
          {middle && <TableHeadMiddle />}
        </thead>
        <tbody>
          {desktop && <TableBody data={props.data}/>}
          {middle && <TableBodyMiddle data={props.data}/>}
          {mobile && <TableBodyMobile data={props.data}/>}
        </tbody>
      </table>
      </div>
    </React.Fragment>
  )
}

export default OrderItem;