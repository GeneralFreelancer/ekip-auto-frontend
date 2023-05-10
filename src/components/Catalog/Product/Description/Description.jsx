import React from "react";
import MainInfo from "./MainInfo";
import Characteristic from "./Characteristic";
import Pack from "./Pack";

const Description = () => {
  return (
    <>
      <section>
        <MainInfo />
      </section>
      <section>
        <Characteristic />
      </section>
      <section>
        <Pack />
      </section>
    </>
  );
};

export default Description;
