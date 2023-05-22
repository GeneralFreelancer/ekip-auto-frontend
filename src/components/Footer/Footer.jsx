import s from "./Footer.module.scss";
import React, { useEffect, useState } from "react";

import { ReactComponent as Tick } from "../../assets/svg/Tick.svg";
import { ReactComponent as Setting } from "../../assets/svg/setting.svg";

const Footer = (props) => {
  const [role, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(38.5);

  const localStor = sessionStorage.getItem("role");

  useEffect(() => {
    if (sessionStorage.getItem("role") === "admin") {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  return (
    <>
      <div className={s.container__footer}>
        <p className={s.text}>Ekip-Auto. All rights reserved.</p>
        <div className={s.exchageContainer}>
          <div className={s.course}>
            {role && (
              <>
                {isEditMode ? (
                  <>
                    <p className={s.textSmall}>
                      Курс доллара:
                      <input
                        className={s.input}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </p>
                    <button
                      className={`${s.icon} ${s.save}`}
                      onClick={handleSaveClick}
                    >
                      <Tick />
                    </button>
                  </>
                ) : (
                  <p className={s.textRead}>
                    Курс доллара:
                    {/* <span className={s.textRate}>{props.currentRate}</span>UAH = 1$ */}
                    <span>{text}</span>
                    {/* <input className={s.textRate} value={text} /> */}
                  </p>
                )}
                {!isEditMode && (
                  <button className={s.icon} onClick={handleEditClick}>
                    <Setting />
                  </button>
                )}
              </>
            )}
          </div>
          <p className={s.text}>2001-2023</p>
        </div>
      </div>
    </>
  );
};
export default Footer;
