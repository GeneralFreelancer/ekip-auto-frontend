import React, { useEffect, useState } from "react";
import s from "./Description.module.scss";

const MainInfo = () => {
  const [role, setRole] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", "user");
    }
  }, [role]);

  const [text, setText] = useState(`
    Серветки ColorWay для чищення екранів, моніторів, ноутбуків, телевізорів, смартфонів, комп'ютерів, периферії та іншої офісної та домашньої електроніки. Призначені для вологого чищення сильних забруднень, плям, що в'їдаються, потертостей, пилу та інших плям різного ступеня забруднення.\n
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quis numquam ratione veniam! Impedit tempora voluptatibus quia unde inventore voluptatum, autem, illo vel, similique ad eius architecto facilis officia hic. Autem, illo vel, similique ad eius architecto facilis officia hic.\n
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quis
    numquam.

    Склад: вологі серветки 100 шт.
    Розмір: 12 x 12см.`);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  return (
    <div className={s.characteristic_block}>
      {role && <button onClick={handleEditClick}>Редактировать</button>}
      {isEditMode ? (
        <>
          <h1 className={s.characteristic_h}>Основана інформація:</h1>
          <div className={s.characteristic_block}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <button onClick={handleSaveClick}>Сохранить</button>
          <button onClick={handleCancelClick}>Отмена</button>
        </>
      ) : (
        <>
          <h1 className={s.characteristic_h}>Основана інформація:</h1>
          <div className={s.characteristic_block}>{text}</div>
        </>
      )}
    </div>
  );
};

export default MainInfo;
