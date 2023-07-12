import React, { useEffect, useState } from "react";
import s from "./Description.module.scss";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

// const initialText = `Серветки ColorWay для чищення екранів, моніторів, ноутбуків, телевізорів, смартфонів, комп'ютерів, периферії та іншої офісної та домашньої електроніки. Призначені для вологого чищення сильних забруднень, плям, що в'їдаються, потертостей, пилу та інших плям різного ступеня забруднення. 

// Lorem ipsum dolor sit amet consectetur adipisicing elit.
// Fugiat quis numquam ratione veniam! Impedit tempora voluptatibus quia unde inventore voluptatum, autem, illo vel, similique ad eius architecto facilis officia hic.

// Autem, illo vel, similique ad eius architecto facilis officia hic.Lorem ipsum dolor sit amet consectetur adipisicing elit.
// Fugiat quis numquam. 

// Склад: вологі серветки 100 шт.
// Розмір: 12 x 12см.`;

const MainInfo = (props) => {
  const {  id, description, role} = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(description);
  const user = useSelector(selectedUser);

  const textParts = text.split(/(?<=\.)\s+/);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async(id, description) => {
    setIsEditMode(false);
    try {
      const response = await axios.put(
        `${baseUrl}/product`,
        { id, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setText(description);
  };

  return (
    <div className={s.characteristic_block}>
      {role && (
        <button className={s.characteristic_btn_edit} onClick={handleEditClick}>
          <Pen />
        </button>
      )}
      {isEditMode ? (
        <>
          <h1 className={s.characteristic_h}>Основана інформація:</h1>
          <div className={s.characteristic_block}>
            <textarea
              className={s.characteristic_textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className={s.characteristic_btn_cancel}
              onClick={handleCancelClick}
            >
              <div className={s.btn_cancel}>
                <Cross />
              </div>
            </button>
            <button
              className={s.characteristic_btn_save}
              onClick={() => handleSaveClick(id, text)}
            >
              <Tick />
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className={s.characteristic_h}>Основана інформація:</h1>
          <div className={s.characteristic_block}>
            {textParts.map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                {(index + 1) % 2 === 0 && <br />}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainInfo;
