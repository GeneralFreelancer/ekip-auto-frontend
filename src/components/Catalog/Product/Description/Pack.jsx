import React, { useState, useEffect } from "react";
import s from "./Description.module.scss";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import { ReactComponent as Plus } from "../../../../assets/svg/plus.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../../redux/features/userSlice";

// const initialData = [
//   { name: "Кількість в коробці", value: "500 шт." },
//   { name: "Кількість в упаковці", value: "50 см" },
//   { name: "Розмір коробки", value: "40x50x50 см." },
// ];

const baseUrl = process.env.REACT_APP_BASE_URL;

const Pack = (props) => {
  const { id, deliveryOptions, role } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  const [charactData, setCharactData] = useState(deliveryOptions);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const user = useSelector(selectedUser);

  let mobileV = viewportWidth < 510;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async (id, deliveryOptions) => {
    let updDeliveryOptions = [];
    for (let item of deliveryOptions) {
      if (item.name !== "" || item.value !== "") {
        updDeliveryOptions.push({ name: item.name, value: item.value });
      }
    }
    setIsEditMode(false);
    try {
      const response = await axios.put(
        `${baseUrl}/product`,
        { id, deliveryOptions: updDeliveryOptions },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCharactData(response.data.product.deliveryOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = async() => {
    setIsEditMode(false);
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCharactData(response.data.product.deliveryOptions);
    } catch (error) {
      console.error(error);
    }
    // setCharactData(deliveryOptions.map((item) => ({ ...item })));
  };

  const handleAddCharactClick = () => {
    setCharactData((prevState) => [...prevState, { name: "", value: "" }]);
  };

  const handleCharactNameChange = (index, e) => {
    const newCharactData = [...charactData];
    newCharactData[index] = {
      ...newCharactData[index],
      name: e.target.value,
    };
    setCharactData(newCharactData);
  };

  const handleCharactValueChange = (index, e) => {
    const newCharactData = [...charactData];
    newCharactData[index] = {
      ...newCharactData[index],
      value: e.target.value,
    };
    setCharactData(newCharactData);
  };

  return (
    <div className={s.characteristic_block}>
      {role && (
        <button className={s.character_btn_editP} onClick={handleEditClick}>
          <Pen />
        </button>
      )}
      {isEditMode ? (
        <>
          <h1 className={s.characteristic_h}>Характеристики пакування:</h1>
          {charactData.map((charact, index) => (
            <div key={index} className={s.characteristic_line}>
              <input
                className={s.character_input}
                value={charact.name}
                onChange={(e) => handleCharactNameChange(index, e)}
              />
              {mobileV ? (
                <span className={s.characteristic_dotted}>
                  .............................................
                </span>
              ) : (
                <span className={s.characteristic_dotted}>
                  .................................................................................
                </span>
              )}
              <input
                className={s.character_input}
                value={charact.value}
                onChange={(e) => handleCharactValueChange(index, e)}
              />
            </div>
          ))}
          <button
            className={s.characteristic_btn_add}
            onClick={handleAddCharactClick}
          >
            <Plus />
          </button>
          <button
            className={s.character_btn_cancel}
            onClick={handleCancelClick}
          >
            <div className={s.btn_cancel}>
              <Cross />
            </div>
          </button>

          <button
            className={s.character_btn_save}
            onClick={() => handleSaveClick(id, charactData)}
          >
            <Tick />
          </button>
        </>
      ) : (
        <>
          <h1 className={s.characteristic_h}>Характеристики пакування:</h1>
          {charactData.map((char, index) => (
            <div key={index} className={s.characteristic_line}>
              <p>{char.name}</p>
              {mobileV ? (
                <span className={s.characteristic_dotted}>
                  ............................................
                </span>
              ) : (
                <span className={s.characteristic_dotted}>
                  ......................................................................
                </span>
              )}
              <p>{char.value}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Pack;
