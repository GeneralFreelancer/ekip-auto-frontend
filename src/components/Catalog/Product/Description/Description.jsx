import React, { useState, useEffect } from "react";
import MainInfo from "./MainInfo";
import Characteristic from "./Characteristic";
import Pack from "./Pack";
import s from "./Description.module.scss";

const Description = ({selectedProduct}) => {

  const {description, options, deliveryOptions} = selectedProduct;
  const [role, setRole] = useState(false);
  const localStor = localStorage.getItem("role");

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

  return (
    <>
      <section>
        <a id="mainInfo" className={s.anchor}></a>
        <MainInfo description={description} role={role} />
      </section>
      <section>
        <a id="characteristic" className={s.anchor}></a>
        <Characteristic options={options} role={role} />
      </section>
      <section>
        <a id="pack" className={s.anchor}></a>
        <Pack deliveryOptions={deliveryOptions} role={role} />
      </section>
    </>
  );
};

export default Description;
