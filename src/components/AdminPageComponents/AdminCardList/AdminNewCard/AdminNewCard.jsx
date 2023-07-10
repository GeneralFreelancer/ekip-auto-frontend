import s from "./AdminNewCard.module.scss";
import { ReactComponent as Plus } from "../../../../assets/svg/admin/plus.svg";

const AdminNewCard = ({ index, addNewCard, name }) => {
  return (
    <>
      <div className={s.card}>
        <p className={s.number}>№ {index + 1}</p>
        <div
          className={s.wrapperIcon}
          name={name}
          onClick={() => addNewCard(name)}
        >
          <Plus className={s.icon} />
        </div>
      </div>
    </>
  );
};

export default AdminNewCard;