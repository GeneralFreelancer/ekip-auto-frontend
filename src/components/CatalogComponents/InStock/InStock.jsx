import s from "./InStock.module.scss";

const InStock = ({ onChangeParams }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>
        Тільки <span className={s.span}>в наявності</span>:
      </p>
      <div className={s.form_group}>
        <label className={s.custom_checkbox} name="inStock">
          <input
            type="checkbox"
            name="inStock"
            onChange={(e) => onChangeParams(e.target.name, e.target.checked)}
          />
          <span className={s.checkmark}></span>
        </label>
      </div>
    </div>
  );
};

export default InStock;