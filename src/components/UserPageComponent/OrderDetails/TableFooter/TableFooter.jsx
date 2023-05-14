import style from './TableFootet.module.scss';

const TableFooter = () => {
  return (
    <>
      <tr>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.orderDetails__table_summaryTitle}>
              <p className={style.summaryTitle}>загальна сума:</p>
            </td>
            <td className={style.orderDetails__table_summaryWrapper}>
              <div>
                <p className={style.nationalSummary}>10000000.6 &#8372;</p>
              </div>
              <div>
                <p className={style.internationalSummary}>4900.4 &#65284;</p>
              </div>
            </td>
          </tr>
    </>
  );
}

export default TableFooter;