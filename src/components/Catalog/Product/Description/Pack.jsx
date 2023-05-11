import React, { useState, useEffect } from "react";
import s from "./Description.module.scss";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import { ReactComponent as Plus } from "../../../../assets/svg/plus.svg";

const initialData = [
  { name: "Кількість в коробці", value: "500 шт." },
  { name: "Кількість в упаковці", value: "50 см" },
  { name: "Розмір коробки", value: "40x50x50 см." },
];

const Pack = (props) => {
  const {productId, role} = props
  const [isEditMode, setIsEditMode] = useState(false);
  const [charactData, setCharactData] = useState(initialData);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setCharactData(initialData);
  };

  const handleAddCharactClick = () => {
    setCharactData((prevState) => [...prevState, { name: "", value: "" }]);
  };

  const handleCharactNameChange = (index, e) => {
    const newCharactData = [...charactData];
    newCharactData[index].name = e.target.value;
    setCharactData(newCharactData);
  };

  const handleCharactValueChange = (index, e) => {
    const newCharactData = [...charactData];
    newCharactData[index].value = e.target.value;
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

          <button className={s.character_btn_save} onClick={handleSaveClick}>
            <Tick />
          </button>
        </>
      ) : (
        <>
          <h1 className={s.characteristic_h}>Характеристики пакування:</h1>
          {charactData.map((char, index) => (
            <div key={index} className={s.characteristic_line}>
              {char.name}
              {mobileV ? (
                <span className={s.characteristic_dotted}>
                  ............................................
                </span>
              ) : (
                <span className={s.characteristic_dotted}>
                  ......................................................................
                </span>
              )}

              {char.value}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Pack;
