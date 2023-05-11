import s from "./AdminButtons.module.scss";

import { ReactComponent as Cancel } from "../../../assets/svg/admin/cancel.svg";
import { ReactComponent as Tick } from "../../../assets/svg/admin/Tick.svg";

const AdminButtons = ({ onClickMainButton }) => {
  return (
    <div className={s.wrapper_button}>
      <div
        name="cancel"
        className={`${s.wrapperIcon} ${s.wrapper1}`}
        onClick={(e) => onClickMainButton(e.currentTarget.getAttribute("name"))}
      >
        <Cancel className={`${s.cancel} ${s.icon}`} />
      </div>
      <div
        name="save"
        className={s.wrapperIcon}
        onClick={(e) => onClickMainButton(e.currentTarget.getAttribute("name"))}
      >
        <Tick className={`${s.tick} ${s.icon}`} />
      </div>
    </div>
  );
};

export default AdminButtons;
