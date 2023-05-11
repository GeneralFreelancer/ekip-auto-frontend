import s from "./AdminCardList.module.scss";

import { useState } from "react";
import AdminCard from "./AdminCard";
import AdminNewCard from "./AdminNewCard";

const images = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const AdminCardList = ({
  size,
  arr,
  onDelete,
  onChangePosition,
  name,
  addNewCard,
}) => {
  return (
    <div>
      <p className={s.size}>{size}</p>
      <div className={s.wrapperList}>
        {arr.map((image, i) => (
          <AdminCard
            name={name}
            url={image}
            index={i}
            key={i}
            total={Number(arr.length) - 1}
            onDelete={onDelete}
            onChangePosition={onChangePosition}
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
