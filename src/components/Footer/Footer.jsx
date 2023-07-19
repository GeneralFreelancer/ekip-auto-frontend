import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Tick } from "../../assets/svg/Tick.svg";
import { ReactComponent as Setting } from "../../assets/svg/setting.svg";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import s from "./Footer.module.scss";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Footer = (props) => {
  const [role, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currency, setCurrency] = useState("");

  const localStor = localStorage.getItem("role");
  const user = useSelector(selectedUser);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const response = await axios.get(`${baseUrl}/exchange`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCurrency(response.data.usdRate);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    if (user.token) {
      getCurrency();
    }
  }, [user.token]);

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    setIsEditMode(false);
    try {
      const response = await axios.post(
        `${baseUrl}/exchange`,
        { usdRate: currency },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
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
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
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
                    <span>{currency}</span>
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
