import style from './TableHead.module.scss'

const TableHead = () => {
 return (
  <div className={style.cart__grid_header}>
    <div className={style.cart__grid_header_col1}>
      <p className={style.cart__grid_colName}>№</p>   
    </div>
    <div className={style.cart__grid_header_col2}>
      <p className={style.cart__grid_colName}>зображення</p>   
    </div>
    <div className={style.cart__grid_header_col3}>
      <p className={style.cart__grid_colName}>назва/ артикул</p>   
    </div>
    <div className={style.cart__grid_header_col4}>
      <p className={style.cart__grid_colName}>ціна за шт.</p>   
    </div>
    <div className={style.cart__grid_header_col5}>
      <p className={style.cart__grid_colName}>кількість</p>   
    </div>
    <div className={style.cart__grid_header_col6}>
      <p className={style.cart__grid_colName}>загальна ціна</p>   
    </div>
  </div>
 ); 
}

export default TableHead;