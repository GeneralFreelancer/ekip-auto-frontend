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
  updateLink,
}) => {

  return (
    <div>
      <p className={s.size}>{size}</p>
      <div className={s.wrapperList}>
        {arr.map((image, i) => (
          <AdminCard
            name={name}
            url={typeof image === 'object' ? image.Image : image}
            link={image.url}
            updateLink={updateLink}
            index={i}
            length={arr.length}
            key={i}
            total={Number(arr.length) - 1}
            onDelete={onDelete}
            onChangePosition={onChangePosition}
            styleName={styleName}
          />
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
