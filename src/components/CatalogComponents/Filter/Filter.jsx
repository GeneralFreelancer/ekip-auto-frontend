import s from "./Filter.module.scss";

const Filter = ({ onChangeParams }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>Спочатку:</p>
      <select
        name="filter"
        className={s.select}
        onChange={(e) => onChangeParams(e.target.name, e.target.value)}
      >
        <option value="new" className={s.option}>
          Нове
        </option>
        <option value="popular" className={s.option}>
          За популярністю
        </option>
        <option value="cheap" className={s.option}>
          Дешеві
        </option>
        <option value="expensive" className={s.option}>
          Дорожчі
        </option>
      </select>
    </div>
  );
};

export default Filter;
