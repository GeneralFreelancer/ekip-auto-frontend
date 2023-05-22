import style from './TableHead.module.scss'

const TableHead = () => {
 return (
  <div className={style.share__grid_header}>
    <div className={style.share__grid_header_col1}>
      <p className={style.share__grid_colName}>дата</p>   
    </div>
    <div className={style.share__grid_header_col2}>
      <p className={style.share__grid_colName}>ім'я</p>   
    </div>
    <div className={style.share__grid_header_col3}>
      <p className={style.share__grid_colName}>позиція</p>   
    </div>
    <div className={style.share__grid_header_col4}>
      <p className={style.share__grid_colName}>дія</p>   
    </div>
  </div>
 ); 
}

export default TableHead;