import style from "./TableFootet.module.scss";

const TableFooter = (props) => {
  const { sumUAH, sumUSD } = props;

  return (
    <>
      <tr>
        <td className={style.borderNone}></td>
        <td className={style.borderNone}></td>
        <td className={style.borderNone}></td>
        <td className={style.borderNone}></td>
        <td className={style.cart__table_summaryTitle}>
          <p className={style.summaryTitle}>загальна сума:</p>
        </td>
        <td className={style.cart__table_summaryWrapper}>
          <div>
            <p className={style.nationalSummary}>{sumUAH}&#8372;</p>
          </div>
          <div>
            <p className={style.internationalSummary}>{sumUSD}&#65284;</p>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableFooter;
