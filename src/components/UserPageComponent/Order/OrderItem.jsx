import style from './Order.module.scss';
import { useMediaPredicate } from "react-media-hook";
import React from "react";
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableFooter from './TableFooter/TableFooter';
import TableFooterMiddle from './TableFooter/TableFooterMiddle'; 
import TableBodyMobile from './TableBody/TableBodyMobile';
import TableFooterMobile from './TableFooter/TableFooterMobile';


const OrderItem = (props) => {
  // console.log('OrderItem ',props)
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate("(min-width: 540px) and (max-width: 1023px)");
  const mobile = useMediaPredicate("(max-width: 540px)");
  return(
    <React.Fragment key={props.id}>
      <div className={style.order__wrappr}>
        <div className={style.order__date}></div>
        {desktop && <TableHead />}
      <table className={style.cart__table}>
        <thead>
          {middle && <TableHeadMiddle />}
        </thead>
        <tbody>
          {desktop && <TableBody data={props.data}/>}
          {/* {middle && <TableBodyMiddle data={mockOrder}/>}
          {mobile && <TableBodyMobile data={mockOrder}/>} */}
        </tbody>
        {/* <tfoot>
          {desktop && <TableFooter />}
          {middle && <TableFooterMiddle />}
          {mobile && <TableFooterMobile />}
        </tfoot> */}
      </table>
      </div>
    </React.Fragment>
  )
}

export default OrderItem;