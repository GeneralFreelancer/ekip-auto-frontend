import s from "./InStock.module.scss";

const InStock = () => {
  return (
    <>
      <p>
        Тільки<span>в наявності</span>:
      </p>
      <div className={s.form_group}>
        <label className={s.custom_checkbox}>
          <input type="checkbox" name="rememberMe" />
          <span className={s.checkmark}></span>
          <p>- Запам'ятати мене</p>
        </label>
      </div>
    </>
  );
};

export default InStock;
