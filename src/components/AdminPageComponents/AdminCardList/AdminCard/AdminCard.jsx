import s from "./AdminCard.module.scss";
import { useState } from "react";

import { ReactComponent as Cancel } from "../../../../assets/svg/admin/cancel.svg";
import { ReactComponent as Arrow } from "../../../../assets/svg/admin/up-arrow.svg";
import { ReactComponent as Upload } from "../../../../assets/svg/admin/upload.svg";

const AdminCard = ({
  url,
  index,
  name,
  total,
  onDelete,
  onHandleImageUpload,
  onChangePosition,
  styleName,
}) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const isFirstCard = index === 0;
  const isLastCard = index === total;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <>
      <div className={isFirstCard ? `${s.notBorder} ${s.card}` : s.card}>
        <div className={s.wrapperFirst}>
          <p className={s.number}>№ {index + 1}</p>
          <div className={s.wrapperIcon}>
            <Cancel
              className={`${s.cancel} ${s.icon}`}
              index={index}
              name={name}
              onClick={() => onDelete(index, name)}
            />
          </div>
        </div>
        <div
          className={styleName ? ` ${s[`${styleName}`]} ${s.img}` : s.img}
          style={{ backgroundImage: `url(${url})` }}
          onClick={toggleFullScreen}
        ></div>
        <div className={s.wrapperSecond}>
          <div>
            <button
              className={s.button}
              disabled={isFirstCard}
              direction="left"
              name={name}
              index={index}
              onClick={(e) =>
                onChangePosition(
                  e.currentTarget.getAttribute("direction"),
                  index,
                  name
                )
              }
            >
              <Arrow className={`${s.arrowLeft} ${s.arrow}`} />
            </button>
            <button
              disabled={isLastCard}
              className={s.button}
              direction="right"
              index={index}
              name={name}
              onClick={(e) =>
                onChangePosition(
                  e.currentTarget.getAttribute("direction"),
                  index,
                  name
                )
              }
            >
              <Arrow className={`${s.arrowRight} ${s.arrow}`} />
            </button>
          </div>
          <div className={s.wrapperIcon}>
            <Upload className={`${s.upload} ${s.icon}`} />
          </div>
        </div>
      </div>
      {isFullScreen && (
        <div className={s.fullScreen} onClick={toggleFullScreen}>
          <img src={url} alt={`Image ${index + 1}`} />
        </div>
      )}
    </>
  );
};

export default AdminCard;