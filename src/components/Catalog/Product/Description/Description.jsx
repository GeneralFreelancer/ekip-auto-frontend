import React, { useState, useEffect } from "react";
import MainInfo from "./MainInfo";
import Characteristic from "./Characteristic";
import Pack from "./Pack";
import s from "./Description.module.scss";

const Description = (props) => {
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
        <MainInfo productId={props.productId} role={role} />
      </section>
      <section>
        <a id="characteristic" className={s.anchor}></a>
        <Characteristic productId={props.productId} role={role} />
      </section>
      <section>
        <a id="pack" className={s.anchor}></a>
        <Pack productId={props.productId} role={role} />
      </section>
    </>
  );
};

export default Description;
