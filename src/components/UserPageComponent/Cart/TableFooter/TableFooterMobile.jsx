import style from './TableFootet.module.scss';

const TableFooterMobile = (props) => {
  const { sumUAH, sumUSD } = props;

  return (
    <>
      <tr>
        <td colSpan={2} className={style.cart__table_summaryTitle}>
          <p className={style.summaryTitle}>загальна сума:</p>
        </td>
      </tr>
      <tr>
        <td colSpan={2} className={style.cart__table_summaryWrapper}>
          <div>
            <p className={style.nationalSummary}>{sumUAH} &#8372;</p>
          </div>
          <div>
            <p className={style.internationalSummary}>{sumUSD} &#65284;</p>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableFooterMobile;