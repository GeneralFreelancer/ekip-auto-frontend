import s from "./AdminCardList.module.scss";

import AdminCard from "./AdminCard";
import AdminNewCard from "./AdminNewCard";

const AdminCardList = ({
  size,
  arr,
  onDelete,
  onChangePosition,
  name,
  addNewCard,
  styleName,
  disabled,
}) => {
  // console.log(disabled);
  return (
    <div>
      <p className={s.size}>{size}</p>
      <div className={s.wrapperList}>
        {arr.map((image, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            <AdminCard
              name={name}
              url={typeof image === "object" ? image.Image : image}
              index={i}
              total={Number(arr.length) - 1}
              onDelete={onDelete}
              onChangePosition={onChangePosition}
              styleName={styleName}
              disabled={disabled}
            />
          </div>
        ))}
        <AdminNewCard
          index={Number(arr.length)}
          addNewCard={addNewCard}
          name={name}
        />
      </div>
    </div>
  );
};

export default AdminCardList;
